const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const loader = document.querySelector("#loader");
const revealItems = document.querySelectorAll(".reveal");
const floatingField = document.querySelector(".floating-field");
const practiceSection = document.querySelector(".practice");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const closeLightbox = lightbox?.querySelector(".lightbox-close");

window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("pageshow", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  window.setTimeout(() => {
    document.body.classList.remove("is-loading");
    loader?.classList.add("is-hidden");
  }, prefersReducedMotion ? 80 : 1250);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(item);
});

if (!prefersReducedMotion && floatingField) {
  const shapes = Array.from(floatingField.querySelectorAll(".float-shape"));
  let latestY = 0;
  let ticking = false;

  const renderShapes = () => {
    shapes.forEach((shape, index) => {
      const depth = (index + 1) * 0.018;
      const rotate = (index % 2 === 0 ? 1 : -1) * latestY * 0.01;
      shape.style.translate = `0 ${latestY * depth}px`;
      shape.style.rotate = `${rotate}deg`;
    });
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      latestY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(renderShapes);
        ticking = true;
      }
    },
    { passive: true },
  );
}

const initPracticeAnimation = () => {
  if (!practiceSection) return;

  const wrap = practiceSection.querySelector(".orbit-wrap");
  const orbit = practiceSection.querySelector(".skill-orbit");
  const title = practiceSection.querySelector(".orbit-wrap p");
  const globes = Array.from(practiceSection.querySelectorAll(".skill-globe"));
  const entryOffsets = [
    { x: -220, y: -310, r: -18 },
    { x: 420, y: -120, r: 14 },
    { x: -120, y: 420, r: -10 },
  ];

  const applyProgress = (progress) => {
    const moveProgress = Math.min(Math.max(progress / 0.72, 0), 1);
    const revealProgress = Math.min(Math.max((progress - 0.48) / 0.24, 0), 1);
    const labelProgress = Math.min(Math.max((progress - 0.6) / 0.18, 0), 1);
    const eased = 1 - Math.pow(1 - moveProgress, 3);
    const reveal = 1 - Math.pow(1 - revealProgress, 2);
    const labelReveal = 1 - Math.pow(1 - labelProgress, 2);

    globes.forEach((globe, index) => {
      const offset = entryOffsets[index] || entryOffsets[0];
      const drift = Math.sin(progress * Math.PI + index * 0.8) * 12;
      const x = offset.x * (1 - eased);
      const y = offset.y * (1 - eased) + drift;
      const rotation = offset.r * (1 - eased);
      const scale = 0.88 + eased * 0.12;
      const label = globe.querySelector("span");

      globe.style.opacity = `${0.92}`;
      globe.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
      if (label) label.style.opacity = `${labelReveal}`;
    });

    if (orbit) {
      orbit.style.opacity = `${reveal * 0.78}`;
      orbit.style.transform = `rotate(${-18 + eased * 18}deg) scale(${0.92 + reveal * 0.08})`;
    }

    if (title) {
      title.style.opacity = `${labelReveal}`;
      title.style.transform = `translate3d(0, ${(1 - labelReveal) * 24}px, 0)`;
    }
  };

  if (prefersReducedMotion) {
    wrap?.classList.add("is-active");
    applyProgress(1);
    return;
  }

  let ticking = false;

  const update = () => {
    const rect = practiceSection.getBoundingClientRect();
    const scrollable = Math.max(1, rect.height - window.innerHeight * 0.25);
    const raw = (window.innerHeight - rect.top) / scrollable;
    const progress = Math.min(Math.max(raw, 0), 1);
    const isActive = rect.top <= window.innerHeight && rect.bottom >= window.innerHeight * 0.25;

    wrap?.classList.toggle("is-active", isActive);
    applyProgress(progress);
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
};

initPracticeAnimation();

document.querySelectorAll("[data-lightbox]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector("img")?.alt || "";
    document.body.classList.add("lightbox-open");

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    }
  });
});

const dismissLightbox = () => {
  if (!lightbox) return;
  lightbox.close();
  document.body.classList.remove("lightbox-open");
};

closeLightbox?.addEventListener("click", dismissLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) dismissLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.open) {
    document.body.classList.remove("lightbox-open");
  }
});

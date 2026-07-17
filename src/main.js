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

const initVibeDemo = () => {
  const demo = document.querySelector(".vibe-demo-window--library");
  if (!demo) return;

  const title = demo.querySelector("[data-demo-title]");
  const description = demo.querySelector("[data-demo-description]");
  const search = demo.querySelector("[data-demo-search]");
  const library = demo.querySelector("[data-demo-library]");
  const detailMode = demo.querySelector("[data-demo-detail-mode]");
  const detailTitle = demo.querySelector("[data-demo-detail-title]");
  const detailLines = Array.from(demo.querySelectorAll("[data-demo-detail-line]"));
  const categoryButtons = Array.from(demo.querySelectorAll("[data-demo-category]"));
  const languageButtons = Array.from(demo.querySelectorAll("[data-demo-language]"));

  const data = {
    en: {
      motivation: {
        search: "motivation · fit · career story",
        title: "Start from the question, then retrieve the story.",
        description: "The library turns vague interview prompts into prepared, reusable evidence.",
        questions: [
          {
            id: "Q01",
            status: "Ready",
            title: "Why are you interested in this role?",
            keywords: "Keywords: motivation · product design · France",
            meta: "2 answer angles · 2 versions",
            detailTitle: "Story angle: role fit",
            lines: [
              "Situation: applications require a clear, role-specific motivation.",
              "Action: connect the target role with verified project experience.",
              "Result: each answer stays specific without rewriting from zero.",
            ],
          },
          {
            id: "Q03",
            status: "Customize",
            title: "What makes your profile different?",
            keywords: "Keywords: design systems · AI prototyping · multilingual context",
            meta: "3 answer angles · 2 versions",
            detailTitle: "Story angle: hybrid product profile",
            lines: [
              "Situation: the profile combines UX, visual systems and AI-assisted building.",
              "Action: frame the mix as a product strength, not a scattered path.",
              "Result: recruiters see a clearer design narrative.",
            ],
          },
        ],
      },
      behavioral: {
        search: "conflict · ambiguity · decision",
        title: "Use one verified story across multiple behavioral questions.",
        description: "Instead of memorizing separate answers, the product maps reusable stories to question families.",
        questions: [
          {
            id: "Q08",
            status: "Ready",
            title: "Tell me about a project where you turned messy information into a clear system.",
            keywords: "Keywords: information architecture · complexity · product judgment",
            meta: "3 answer angles · 2 versions",
            detailTitle: "Story angle: external memory system",
            lines: [
              "Situation: interview stories were scattered across notes and screenshots.",
              "Action: structure facts before generating polished answers.",
              "Result: one verified story can map to multiple questions.",
            ],
          },
          {
            id: "Q21",
            status: "Needs fact check",
            title: "Tell me about a time you handled stakeholder disagreement.",
            keywords: "Keywords: alignment · constraint · trade-off",
            meta: "2 answer angles · 1 version",
            detailTitle: "Story angle: decision clarity",
            lines: [
              "Situation: different stakeholders cared about different outcomes.",
              "Action: translate opinions into shared criteria and product risks.",
              "Result: the conversation moved from preference to decision.",
            ],
          },
        ],
      },
      ai: {
        search: "AI · validation · prototype",
        title: "Show AI as a design capability, not a shortcut.",
        description: "The MVP captures where AI helped, where human judgment intervened, and how the result was tested.",
        questions: [
          {
            id: "Q14",
            status: "Voice check",
            title: "How do you integrate AI into your design workflow?",
            keywords: "Keywords: vibe coding · validation · iteration",
            meta: "2 answer angles · 3 versions",
            detailTitle: "Story angle: human-AI workflow",
            lines: [
              "Situation: AI could generate fast drafts, but not product judgment.",
              "Action: use Codex to build, then test interaction logic manually.",
              "Result: the designer role shifts toward framing, critique and iteration.",
            ],
          },
          {
            id: "Q15",
            status: "Ready",
            title: "What did you learn from building a working product with AI?",
            keywords: "Keywords: shipping · debugging · system thinking",
            meta: "3 answer angles · 2 versions",
            detailTitle: "Story angle: prototype to product logic",
            lines: [
              "Situation: a static portfolio could not demonstrate interaction thinking.",
              "Action: build a real web MVP and document each product decision.",
              "Result: the project shows both UX structure and technical execution.",
            ],
          },
        ],
      },
      france: {
        search: "France · CDI · product designer",
        title: "Adapt the same memory system to a specific job market.",
        description: "The product keeps recurring France-specific application questions close to the stories that support them.",
        questions: [
          {
            id: "Q18",
            status: "Customize",
            title: "Why do you want to work in France?",
            keywords: "Keywords: context · language · market",
            meta: "2 answer angles · 2 versions",
            detailTitle: "Story angle: local context",
            lines: [
              "Situation: French applications often ask for context and motivation.",
              "Action: connect language, design culture and product ambition.",
              "Result: the answer feels grounded instead of generic.",
            ],
          },
          {
            id: "Q22",
            status: "Ready",
            title: "How do you collaborate in multilingual teams?",
            keywords: "Keywords: EN · FR · CN · communication",
            meta: "2 answer angles · 3 versions",
            detailTitle: "Story angle: multilingual collaboration",
            lines: [
              "Situation: design work often moves between languages and levels of detail.",
              "Action: separate concept clarity from final phrasing.",
              "Result: communication becomes easier to adapt without losing meaning.",
            ],
          },
        ],
      },
    },
    fr: {
      motivation: {
        search: "motivation · poste · parcours",
        title: "Partir de la question, puis retrouver la bonne histoire.",
        description: "La bibliothèque transforme les questions vagues en preuves préparées et réutilisables.",
        questions: [
          {
            id: "Q01",
            status: "Prêt",
            title: "Pourquoi ce poste vous intéresse-t-il ?",
            keywords: "Mots-clés : motivation · product design · France",
            meta: "2 angles · 2 versions",
            detailTitle: "Angle : adéquation avec le rôle",
            lines: [
              "Situation : les candidatures demandent une motivation précise.",
              "Action : relier le poste ciblé à une expérience vérifiée.",
              "Résultat : chaque réponse reste spécifique sans repartir de zéro.",
            ],
          },
          {
            id: "Q03",
            status: "À adapter",
            title: "Qu’est-ce qui différencie votre profil ?",
            keywords: "Mots-clés : design systems · prototypage IA · contexte multilingue",
            meta: "3 angles · 2 versions",
            detailTitle: "Angle : profil produit hybride",
            lines: [
              "Situation : le profil combine UX, systèmes visuels et construction assistée par IA.",
              "Action : présenter ce mélange comme une force produit.",
              "Résultat : le récit devient plus lisible pour les recruteurs.",
            ],
          },
        ],
      },
      behavioral: {
        search: "conflit · ambiguïté · décision",
        title: "Réutiliser une histoire vérifiée pour plusieurs questions comportementales.",
        description: "Le produit relie les histoires fortes à des familles de questions, au lieu de mémoriser des réponses isolées.",
        questions: [
          {
            id: "Q08",
            status: "Prêt",
            title: "Parlez d’un projet où vous avez transformé des informations confuses en système clair.",
            keywords: "Mots-clés : architecture d’information · complexité · jugement produit",
            meta: "3 angles · 2 versions",
            detailTitle: "Angle : système de mémoire externe",
            lines: [
              "Situation : les histoires d’entretien étaient dispersées.",
              "Action : structurer les faits avant de générer une réponse polie.",
              "Résultat : une histoire vérifiée peut répondre à plusieurs questions.",
            ],
          },
          {
            id: "Q21",
            status: "À vérifier",
            title: "Parlez d’un désaccord avec des parties prenantes.",
            keywords: "Mots-clés : alignement · contrainte · arbitrage",
            meta: "2 angles · 1 version",
            detailTitle: "Angle : clarté de décision",
            lines: [
              "Situation : les parties prenantes défendaient des résultats différents.",
              "Action : transformer les opinions en critères partagés.",
              "Résultat : la discussion passe de la préférence à la décision.",
            ],
          },
        ],
      },
      ai: {
        search: "IA · validation · prototype",
        title: "Montrer l’IA comme une capacité de design, pas comme un raccourci.",
        description: "Le MVP montre où l’IA aide, où le jugement humain intervient, et comment le résultat est testé.",
        questions: [
          {
            id: "Q14",
            status: "Voix à vérifier",
            title: "Comment intégrez-vous l’IA dans votre workflow design ?",
            keywords: "Mots-clés : vibe coding · validation · itération",
            meta: "2 angles · 3 versions",
            detailTitle: "Angle : workflow humain-IA",
            lines: [
              "Situation : l’IA génère vite, mais ne remplace pas le jugement produit.",
              "Action : utiliser Codex pour construire, puis tester la logique d’usage.",
              "Résultat : le rôle design se déplace vers le cadrage et l’itération.",
            ],
          },
          {
            id: "Q15",
            status: "Prêt",
            title: "Qu’avez-vous appris en construisant un produit fonctionnel avec l’IA ?",
            keywords: "Mots-clés : livraison · debug · pensée système",
            meta: "3 angles · 2 versions",
            detailTitle: "Angle : du prototype à la logique produit",
            lines: [
              "Situation : un portfolio statique ne montrait pas la pensée interactive.",
              "Action : construire un MVP web et documenter les décisions produit.",
              "Résultat : le projet montre la structure UX et l’exécution technique.",
            ],
          },
        ],
      },
      france: {
        search: "France · CDI · product designer",
        title: "Adapter le système de mémoire à un marché précis.",
        description: "Le produit garde les questions récurrentes du marché français près des histoires qui les soutiennent.",
        questions: [
          {
            id: "Q18",
            status: "À adapter",
            title: "Pourquoi souhaitez-vous travailler en France ?",
            keywords: "Mots-clés : contexte · langue · marché",
            meta: "2 angles · 2 versions",
            detailTitle: "Angle : contexte local",
            lines: [
              "Situation : les candidatures françaises demandent souvent du contexte.",
              "Action : relier langue, culture design et ambition produit.",
              "Résultat : la réponse paraît située plutôt que générique.",
            ],
          },
          {
            id: "Q22",
            status: "Prêt",
            title: "Comment collaborez-vous dans des équipes multilingues ?",
            keywords: "Mots-clés : EN · FR · CN · communication",
            meta: "2 angles · 3 versions",
            detailTitle: "Angle : collaboration multilingue",
            lines: [
              "Situation : le design circule entre langues et niveaux de détail.",
              "Action : séparer la clarté du concept de la formulation finale.",
              "Résultat : la communication s’adapte sans perdre le sens.",
            ],
          },
        ],
      },
    },
  };

  let activeLanguage = "en";
  let activeCategory = "motivation";
  let activeQuestion = 0;

  const renderDetail = () => {
    const question = data[activeLanguage][activeCategory].questions[activeQuestion];
    if (!question) return;
    if (detailMode) detailMode.textContent = `Learning mode · ${activeLanguage.toUpperCase()}`;
    if (detailTitle) detailTitle.textContent = question.detailTitle;
    detailLines.forEach((line, index) => {
      line.textContent = question.lines[index] || "";
    });
  };

  const bindQuestionEvents = () => {
    library.querySelectorAll("[data-demo-question]").forEach((card) => {
      const activate = () => {
        activeQuestion = Number(card.dataset.demoQuestion || 0);
        library.querySelectorAll("[data-demo-question]").forEach((item) => {
          const isActive = item === card;
          item.classList.toggle("vibe-demo-question--active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });
        renderDetail();
      };

      card.addEventListener("click", activate);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
  };

  const renderDemo = () => {
    const current = data[activeLanguage][activeCategory];
    title.textContent = current.title;
    description.textContent = current.description;
    search.textContent = current.search;
    library.querySelectorAll(".vibe-demo-question").forEach((card) => card.remove());

    current.questions.forEach((question, index) => {
      const card = document.createElement("article");
      card.className = `vibe-demo-question${index === activeQuestion ? " vibe-demo-question--active" : ""}`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("data-demo-question", String(index));
      card.setAttribute("aria-pressed", String(index === activeQuestion));
      card.innerHTML = `
        <div><span>${question.id}</span><b>${question.status}</b></div>
        <h2>${question.title}</h2>
        <p>${question.keywords}</p>
        <small>${question.meta}</small>
      `;
      library.insertBefore(card, library.querySelector(".vibe-demo-detail"));
    });

    renderDetail();
    bindQuestionEvents();
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.demoCategory || activeCategory;
      activeQuestion = 0;
      categoryButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderDemo();
    });
  });

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeLanguage = button.dataset.demoLanguage || activeLanguage;
      activeQuestion = 0;
      languageButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-on", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderDemo();
    });
  });

  bindQuestionEvents();
};

initVibeDemo();

const initLVVDemo = () => {
  const demo = document.querySelector("[data-lvv-demo]");
  if (!demo) return;

  const buttons = Array.from(demo.querySelectorAll("[data-lvv-step]"));
  const image = demo.querySelector("[data-lvv-image]");
  const status = demo.querySelector("[data-lvv-status]");
  const number = demo.querySelector("[data-lvv-number]");
  const note = demo.querySelector("[data-lvv-note]");
  const steps = [
    {
      src: "./assets/lvv/01-start.png",
      alt: "Original multilingual LVV delivery service start screen",
      status: "Language and service entry",
      note: "Set language and frame the assisted service before the order begins.",
    },
    {
      src: "./assets/lvv/02-destination.png",
      alt: "Original destination selection screen with popular countries and search",
      status: "Destination first",
      note: "Destination narrows carrier, price, time, insurance and required information.",
    },
    {
      src: "./assets/lvv/03-service.png",
      alt: "Original carrier comparison screen showing speed and starting price",
      status: "Comparable service trade-offs",
      note: "Consistent rows and labels turn carrier options into price and speed decisions.",
    },
    {
      src: "./assets/lvv/04-item.png",
      alt: "Original item information screen with structured fields and optional photos",
      status: "Structured item evidence",
      note: "Brand, description, quantity and optional photos reduce ambiguous free text.",
    },
    {
      src: "./assets/lvv/05-finish.png",
      alt: "Original order completion screen with order number and staff handoff instruction",
      status: "Order created, service continues",
      note: "The product ends by exposing the order and handing payment and operations back to staff.",
    },
  ];

  const showStep = (index) => {
    const step = steps[index];
    if (!step || !image) return;

    image.classList.add("is-changing");
    window.setTimeout(() => {
      image.src = step.src;
      image.alt = step.alt;
      if (status) status.textContent = step.status;
      if (number) number.textContent = `${String(index + 1).padStart(2, "0")} / 05`;
      if (note) note.textContent = step.note;
      image.classList.remove("is-changing");
    }, prefersReducedMotion ? 0 : 140);

    buttons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => showStep(Number(button.dataset.lvvStep || 0)));
  });
};

initLVVDemo();

const initLVVSystemDemo = () => {
  const demo = document.querySelector("[data-lvv-system]");
  if (!demo) return;

  const buttons = Array.from(demo.querySelectorAll("[data-system-step]"));
  const counter = demo.querySelector("[data-system-counter]");
  const title = demo.querySelector("[data-system-title]");
  const helper = demo.querySelector("[data-system-helper]");
  const value = demo.querySelector("[data-system-value]");
  const action = demo.querySelector("[data-system-action]");
  const steps = [
    ["Where is the parcel going?", "Destination sets the rules for every decision that follows.", "France", "Continue →"],
    ["How much does it weigh?", "A bounded numeric input keeps carrier calculations comparable.", "3.5 kg", "Continue →"],
    ["Which service fits best?", "Price and speed share one comparison structure.", "Express · 2–4 days", "Choose service →"],
    ["What is inside?", "Structured item details reduce ambiguous descriptions.", "Clothing · 2 items", "Continue →"],
    ["Who should we contact?", "Contact details are grouped for review before hand-off.", "Recipient confirmed", "Continue →"],
    ["Does it need protection?", "Insurance appears as a deliberate choice, not a hidden add-on.", "Standard coverage", "Review order →"],
    ["Ready for staff hand-off", "The final state exposes the order reference and next action.", "Order created", "Finish"],
  ];

  const showStep = (index) => {
    const step = steps[index];
    if (!step) return;

    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("is-complete", buttonIndex < index);
      button.classList.toggle("is-current", buttonIndex === index);
      button.setAttribute("aria-selected", String(buttonIndex === index));
    });

    if (counter) counter.textContent = `Step ${String(index + 1).padStart(2, "0")} / 07`;
    if (title) title.textContent = step[0];
    if (helper) helper.textContent = step[1];
    if (value) value.textContent = step[2];
    if (action) action.textContent = step[3];
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => showStep(Number(button.dataset.systemStep || 0)));
  });

  action?.addEventListener("click", () => {
    const current = buttons.findIndex((button) => button.classList.contains("is-current"));
    showStep(Math.min(current + 1, steps.length - 1));
  });
};

initLVVSystemDemo();

const initFTLCase = () => {
  const tours = new WeakMap();
  const startTour = async (image, duration = 22000) => {
    if (!image || prefersReducedMotion) return;

    try {
      if (!image.complete && typeof image.decode === "function") await image.decode();
    } catch {
      // The load event below provides a second attempt when decoding is deferred.
    }

    window.requestAnimationFrame(() => {
      tours.get(image)?.cancel();
      const viewport = image.parentElement;
      const distance = Math.max(image.getBoundingClientRect().height - (viewport?.clientHeight || 0), 0);
      if (distance < 12) return;
      const animation = image.animate(
        [
          { transform: "translate3d(0, 0, 0)", offset: 0 },
          { transform: "translate3d(0, 0, 0)", offset: 0.06 },
          { transform: `translate3d(0, ${-distance}px, 0)`, offset: 0.94 },
          { transform: `translate3d(0, ${-distance}px, 0)`, offset: 1 },
        ],
        { duration, iterations: Infinity, direction: "alternate", easing: "cubic-bezier(.45, 0, .55, 1)" },
      );
      tours.set(image, animation);
    });
  };

  document.querySelectorAll("[data-ftl-tour]").forEach((image, index) => {
    startTour(image, index === 0 ? 26000 : 23000);
    image.addEventListener("load", () => startTour(image, index === 0 ? 26000 : 23000));
  });

  const heroDevice = document.querySelector("[data-ftl-hero-device]");
  if (heroDevice && !prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    heroDevice.addEventListener("pointermove", (event) => {
      const bounds = heroDevice.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      heroDevice.style.setProperty("--hero-tilt-y", `${x * 7 - 4}deg`);
      heroDevice.style.setProperty("--hero-tilt-x", `${y * -4}deg`);
    });
    heroDevice.addEventListener("pointerleave", () => {
      heroDevice.style.removeProperty("--hero-tilt-x");
      heroDevice.style.removeProperty("--hero-tilt-y");
    });
  }

  const foldGroup = document.querySelector("[data-ftl-folds]");
  if (foldGroup) {
    const folds = Array.from(foldGroup.querySelectorAll("[data-ftl-fold]"));
    const openFold = (target) => {
      folds.forEach((fold) => {
        const open = fold === target;
        fold.classList.toggle("is-open", open);
        const trigger = fold.querySelector("[data-ftl-fold-trigger]");
        trigger?.setAttribute("aria-expanded", String(open));
        const symbol = trigger?.querySelector("i");
        if (symbol) symbol.textContent = open ? "−" : "+";
      });
    };

    folds.forEach((fold) => {
      fold.querySelector("[data-ftl-fold-trigger]")?.addEventListener("click", () => {
        if (fold.classList.contains("is-open")) return;
        openFold(fold);
      });
    });
  }

  const evidenceLayers = document.querySelectorAll(".ftl2-evidence-layer");
  if (evidenceLayers.length) {
    const layerObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-active", entry.isIntersecting)),
      { rootMargin: "-18% 0px -22% 0px", threshold: 0.18 },
    );
    evidenceLayers.forEach((layer) => layerObserver.observe(layer));
  }

  const lab = document.querySelector("[data-ftl-device-lab]");
  if (!lab) return;

  const darkHeaderObserver = new IntersectionObserver(
    ([entry]) => document.body.classList.toggle("ftl-dark-header", entry.isIntersecting),
    { rootMargin: "-12% 0px -70% 0px", threshold: 0 },
  );
  darkHeaderObserver.observe(lab);

  const controls = Array.from(lab.querySelectorAll("[data-device-view]"));
  const desktop = lab.querySelector("[data-device-desktop]");
  const mobile = lab.querySelector("[data-device-mobile]");
  const url = lab.querySelector("[data-device-url]");
  const count = lab.querySelector("[data-device-count]");
  const label = lab.querySelector("[data-device-label]");
  const views = [
    {
      desktop: "./assets/ftl-website/01-final-site.png",
      mobile: "./assets/ftl-website/08-mobile-home.png",
      desktopAlt: "FTL Group overview on desktop",
      mobileAlt: "FTL Group overview on mobile",
      url: "ftl-group.com",
      label: "Corporate overview",
    },
    {
      desktop: "./assets/ftl-website/11-desktop-solutions.png",
      mobile: "./assets/ftl-website/10-mobile-ecommerce.png",
      desktopAlt: "FTL e-commerce solutions on desktop",
      mobileAlt: "FTL e-commerce solutions on mobile",
      url: "ftl-group.com/e-commerce",
      label: "E-commerce journey",
    },
    {
      desktop: "./assets/ftl-website/13-desktop-wholesale.png",
      mobile: "./assets/ftl-website/09-mobile-wholesale.png",
      desktopAlt: "FTL wholesaler solutions on desktop",
      mobileAlt: "FTL wholesaler solutions on mobile",
      url: "ftl-group.com/wholesale",
      label: "Wholesaler journey",
    },
  ];
  let active = 0;
  let autoplay;

  const showView = (index, userInitiated = false) => {
    const view = views[index];
    if (!view || !desktop || !mobile) return;
    active = index;
    lab.classList.add("is-changing");
    window.setTimeout(() => {
      desktop.src = view.desktop;
      desktop.alt = view.desktopAlt;
      mobile.src = view.mobile;
      mobile.alt = view.mobileAlt;
      if (url) url.textContent = view.url;
      if (count) count.textContent = `${String(index + 1).padStart(2, "0")} / 03`;
      if (label) label.textContent = view.label;
      controls.forEach((button, buttonIndex) => {
        const selected = buttonIndex === index;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
      });
      lab.classList.remove("is-changing");
      startTour(desktop, 23000);
      startTour(mobile, 25000);
    }, prefersReducedMotion ? 0 : 180);

    if (userInitiated && autoplay) {
      window.clearInterval(autoplay);
      autoplay = window.setInterval(() => showView((active + 1) % views.length), 28000);
    }
  };

  controls.forEach((button) => {
    button.addEventListener("click", () => showView(Number(button.dataset.deviceView || 0), true));
  });

  if (!prefersReducedMotion) {
    autoplay = window.setInterval(() => showView((active + 1) % views.length), 28000);
  }
};

initFTLCase();

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

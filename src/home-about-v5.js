(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (from, to, progress) => from + (to - from) * progress;
  const smoothstep = (value) => {
    const progress = clamp(value);
    return progress * progress * (3 - 2 * progress);
  };

  const revealItems = document.querySelectorAll('[data-reveal]');
  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.18 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const folderStage = document.querySelector('.folder-stage');
  const folderTrigger = document.querySelector('.folder-trigger');
  if (folderStage) {
    const toggleFolder = () => {
      const open = !folderStage.classList.contains('is-open');
      folderStage.classList.toggle('is-open', open);
      folderStage.setAttribute('aria-expanded', String(open));
      folderTrigger?.setAttribute('aria-expanded', String(open));
      if (folderTrigger) folderTrigger.querySelector('span').textContent = open ? 'Close my file' : 'Open my file';
    };
    folderStage.addEventListener('click', toggleFolder);
    folderStage.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFolder();
      }
    });
    folderTrigger?.addEventListener('click', toggleFolder);
  }

  if (!document.body.classList.contains('home-v5') || reduceMotion) return;

  const hero = document.querySelector('[data-scene="hero"]');
  const practice = document.querySelector('[data-scene="practice"]');
  const capabilities = document.querySelector('[data-scene="capabilities"]');
  const work = document.querySelector('[data-scene="work"]');
  const method = document.querySelector('[data-scene="method"]');
  const about = document.querySelector('[data-scene="about"]');
  const contact = document.querySelector('[data-scene="contact"]');
  const rows = [...document.querySelectorAll('.capability-row')];
  let currentScroll = window.scrollY;
  let targetScroll = currentScroll;
  let raf = 0;

  const sceneProgress = (section) => clamp(
    (currentScroll + window.innerHeight - section.offsetTop) /
    (window.innerHeight + section.offsetHeight)
  );

  const render = () => {
    currentScroll += (targetScroll - currentScroll) * 0.11;
    const heroProgress = clamp(currentScroll / Math.max(1, hero.offsetHeight));
    const practiceProgress = sceneProgress(practice);
    const workProgress = sceneProgress(work);
    const methodProgress = sceneProgress(method);
    const aboutProgress = sceneProgress(about);
    const contactProgress = sceneProgress(contact);

    const continuity = document.querySelector('.continuity-diamond');
    const takeover = smoothstep((heroProgress - .46) / .54);
    const practiceLocal = clamp((currentScroll - hero.offsetHeight) / Math.max(1, practice.offsetHeight));
    const exit = smoothstep((practiceLocal - .58) / .42);
    const capabilityLocal = clamp((currentScroll - capabilities.offsetTop) / Math.max(1, capabilities.offsetHeight * .48));
    const fillScale = Math.max(window.innerWidth, window.innerHeight) / 160 * 1.42;
    const x = lerp(window.innerWidth * .73, window.innerWidth * .5, takeover) - exit * window.innerWidth * .35;
    const y = lerp(window.innerHeight * .9, window.innerHeight * .5, takeover) + exit * window.innerHeight * .25;
    const scale = lerp(1, fillScale, takeover) * lerp(1, .29, exit);
    const rotation = 45 + takeover * 88 + practiceLocal * 22 - exit * 44;
    continuity.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%) rotate(${rotation}deg) scale(${scale})`;
    continuity.style.borderRadius = `${lerp(0, 34, practiceLocal) + exit * 70}px`;
    continuity.style.opacity = String(clamp(1 - capabilityLocal * 1.35));
    document.querySelector('.hero-orb--coral').style.transform = `translate3d(${heroProgress * 45}px, ${heroProgress * 110}px, 0) scale(${1 + heroProgress * .16})`;
    document.querySelector('.hero-orb--sky').style.transform = `translate3d(${-heroProgress * 55}px, ${heroProgress * 90}px, 0) scale(${1 + heroProgress * .1})`;
    document.querySelector('.hero-star').style.transform = `translate3d(${heroProgress * 70}px, ${heroProgress * 30}px, 0) rotate(${heroProgress * 80}deg)`;
    document.querySelector('.hero-asterisk').style.transform = `translate3d(0, ${heroProgress * 80}px, 0) rotate(${-heroProgress * 70}deg)`;

    if (capabilities) {
      const rect = capabilities.getBoundingClientRect();
      const local = clamp((window.innerHeight * .58 - rect.top) / Math.max(1, rect.height - window.innerHeight * .3));
      const activeIndex = Math.min(rows.length - 1, Math.floor(local * rows.length));
      rows.forEach((row, index) => row.classList.toggle('is-active', index === activeIndex));
      document.querySelector('.capability-orbit').style.transform = `rotate(${-16 + local * 44}deg)`;
      document.querySelector('.capability-glow').style.transform = `translate3d(${local * 85}px, ${local * 70}px, 0) scale(${1 + local * .12})`;
    }

    document.querySelector('.work-field').style.transform = `translate(-50%,-50%) rotate(${-4 + workProgress * 4}deg) scale(${.9 + workProgress * .1})`;
    document.querySelector('.project-ftl').style.transform = `translate3d(0, ${80 - workProgress * 120}px, 0) rotate(${-15 + workProgress * 7}deg)`;
    document.querySelector('.project-lvv').style.transform = `translate3d(0, ${120 - workProgress * 165}px, 0) rotate(${9 - workProgress * 6}deg)`;
    document.querySelector('.project-ai').style.transform = `translate3d(0, ${160 - workProgress * 205}px, 0) rotate(${17 - workProgress * 8}deg)`;

    const cardProgress = clamp((methodProgress - .12) / .62);
    const cards = [
      ['.card-one', -6, 0], ['.card-two', 3, .12], ['.card-three', -2, .24]
    ];
    cards.forEach(([selector, rotation, delay]) => {
      const element = document.querySelector(selector);
      const progress = clamp((cardProgress - delay) / Math.max(.01, 1 - delay));
      element.style.opacity = String(progress);
      element.style.transform = `translate3d(0, ${(1 - progress) * 150}px, 0) rotate(${rotation + (1 - progress) * 8}deg)`;
    });
    document.querySelector('.signal-line').style.transform = `rotate(-5deg) scaleX(${clamp(cardProgress * 1.16)})`;
    document.querySelector('.method-note').style.transform = `translate3d(0, ${(1 - cardProgress) * 85}px, 0) rotate(${9 - cardProgress * 5}deg)`;

    document.querySelector('.portrait-portal').style.transform = `translate3d(0, ${55 - aboutProgress * 95}px, 0) rotate(${-3 + aboutProgress * 3}deg)`;
    document.querySelector('.label-one').style.transform = `translate3d(${aboutProgress * 18}px, ${-aboutProgress * 22}px, 0) rotate(-8deg)`;
    document.querySelector('.label-two').style.transform = `translate3d(${-aboutProgress * 16}px, ${aboutProgress * 18}px, 0) rotate(7deg)`;
    document.querySelector('.window-light').style.transform = `perspective(1200px) translate3d(${contactProgress * 35}px, ${20 - contactProgress * 42}px, 0) rotateZ(${-9 + contactProgress * 3}deg) skewX(-9deg)`;

    raf = requestAnimationFrame(render);
  };

  const updateTarget = () => { targetScroll = window.scrollY; };
  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('resize', updateTarget);
  raf = requestAnimationFrame(render);
  window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
})();

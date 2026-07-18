const section = document.querySelector('.practice-motion');
const heading = document.querySelector('.practice-heading');
const cards = [...document.querySelectorAll('.skill-card')];
const statusNumber = document.querySelector('.status-number');
const statusFill = document.querySelector('.status-line i');
const closingNote = document.querySelector('.closing-note');
const coral = document.querySelector('.ambient-coral');
const sky = document.querySelector('.ambient-sky');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let ticking = false;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (from, to, amount) => from + (to - from) * amount;
const ease = value => 1 - Math.pow(1 - clamp(value), 4);

function renderPractice() {
  ticking = false;
  if (innerWidth <= 900 || reducedMotion.matches) return;

  const rect = section.getBoundingClientRect();
  const isHomepage = document.body.classList.contains('home-v5');
  const distance = section.offsetHeight - innerHeight;
  const progress = clamp(-rect.top / distance);
  const width = innerWidth;
  const height = innerHeight;
  const cardWidth = clamp(width * .24, 280, 360);
  const horizontal = Math.min(width * .31, (width - cardWidth) / 2 - 34);
  const verticalTop = Math.min(height * .145, 112);
  const verticalBottom = Math.min(height * .22, 170);

  cards.forEach((card, index) => {
    const local = ease((progress - index * .025) / .835);
    const column = Number(card.style.getPropertyValue('--x'));
    const row = Number(card.style.getPropertyValue('--y'));
    const targetX = column * horizontal;
    const targetY = row < 0 ? -verticalTop : verticalBottom;
    const startY = index * 6;
    const startRotation = (index - 2.5) * .45;
    const targetRotation = parseFloat(card.style.getPropertyValue('--r')) || 0;
    const x = mix(0, targetX, local);
    const y = mix(startY, targetY, local);
    const rotation = mix(startRotation, targetRotation, local);
    const scale = mix(1 - index * .012, 1, local);
    card.style.zIndex = String(30 - index);
    card.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotate(${rotation}deg) scale(${scale})`;
    card.style.opacity = String(mix(index === 5 ? 1 : .84, 1, local));
  });

  const compactHeading = ease(progress / .3);
  heading.style.transform = `translateX(-50%) translateY(${-compactHeading * 8}px) scale(${mix(1,.9,compactHeading)})`;
  heading.style.opacity = '1';
  statusFill.style.width = `${progress * 100}%`;
  statusNumber.textContent = String(Math.min(6, Math.floor(progress * 6) + 1)).padStart(2, '0');
  const closeProgress = ease((progress - .78) / .18);
  closingNote.style.opacity = String(closeProgress);
  closingNote.style.transform = `translate(-50%,${mix(18,0,closeProgress)}px)`;
  coral.style.transform = `translate3d(${progress * 8}vw,${progress * 9}vh,0) scale(${1 + progress * .18})`;
  sky.style.transform = `translate3d(${-progress * 7}vw,${-progress * 8}vh,0) scale(${1 + progress * .12})`;
}

function requestRender() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(renderPractice);
}

addEventListener('scroll', requestRender, { passive: true });
addEventListener('resize', requestRender);
reducedMotion.addEventListener('change', requestRender);
renderPractice();

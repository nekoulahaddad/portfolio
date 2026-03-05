const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 60, 280)}ms`;
  observer.observe(el);
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', active);
    });
  });
}, { threshold: 0.42 });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

const heroMetaItems = document.querySelectorAll('.hero-meta > div');
window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;
  heroMetaItems.forEach((item, idx) => {
    const offset = (idx + 1) * 2.2;
    item.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
  });
});

const stackBoard = document.getElementById('stack-game-board');
if (stackBoard) {
  const bubbles = Array.from(stackBoard.querySelectorAll('.stack-bubble'));
  let dragState = null;
  let zCounter = 20;
  let physicsRaf = null;
  const collideUntil = new Map();
  const bubbleState = new Map();
  const dirtyBubbles = new Set();

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const gap = 6;

  const getBoardRect = () => stackBoard.getBoundingClientRect();

  const maxXFor = (bubble) => Math.max(0, stackBoard.clientWidth - bubble.offsetWidth);
  const maxYFor = (bubble) => Math.max(0, stackBoard.clientHeight - bubble.offsetHeight);

  const writeBubblePosition = (bubble, x, y) => {
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
  };

  const setBubblePosition = (bubble, x, y) => {
    const state = bubbleState.get(bubble);
    if (!state) return;
    const nx = clamp(x, 0, maxXFor(bubble));
    const ny = clamp(y, 0, maxYFor(bubble));
    if (Math.abs(state.x - nx) < 0.01 && Math.abs(state.y - ny) < 0.01) return;
    state.x = nx;
    state.y = ny;
    dirtyBubbles.add(bubble);
  };

  const flushBubblePositions = () => {
    if (dirtyBubbles.size === 0) return;
    dirtyBubbles.forEach((bubble) => {
      const state = bubbleState.get(bubble);
      if (!state) return;
      writeBubblePosition(bubble, state.x, state.y);
    });
    dirtyBubbles.clear();
  };

  const getCenter = (bubble) => {
    const state = bubbleState.get(bubble);
    return {
      x: state.x + bubble.offsetWidth / 2,
      y: state.y + bubble.offsetHeight / 2,
      r: bubble.offsetWidth / 2,
    };
  };

  const placeBubbles = () => {
    const boardW = Math.max(1, stackBoard.clientWidth);
    const boardH = Math.max(1, stackBoard.clientHeight);

    bubbles.forEach((bubble) => {
      if (bubble.dataset.moved === '1') {
        const state = bubbleState.get(bubble);
        if (state) setBubblePosition(bubble, state.x, state.y);
        return;
      }
      const x = Number(bubble.dataset.x || 50);
      const y = Number(bubble.dataset.y || 50);
      const px = boardW * (x / 100) - bubble.offsetWidth / 2;
      const py = boardH * (y / 100) - bubble.offsetHeight / 2;
      setBubblePosition(bubble, px, py);
    });

    resolveOverlaps(null, 1, false);
    flushBubblePositions();
  };

  const markCollision = (bubble) => {
    bubble.classList.add('is-colliding');
    collideUntil.set(bubble, performance.now() + 130);
  };

  const kickBubble = (bubble, vx, vy) => {
    const state = bubbleState.get(bubble);
    if (!state) return;
    state.vx = clamp(state.vx + vx, -28, 28);
    state.vy = clamp(state.vy + vy, -28, 28);
  };

  const moveBubbleBy = (bubble, dx, dy) => {
    const state = bubbleState.get(bubble);
    if (!state) return;
    setBubblePosition(bubble, state.x + dx, state.y + dy);
  };

  const resolveOverlaps = (activeBubble, power = 1, withEffects = true) => {
    const iterations = 8;

    for (let iter = 0; iter < iterations; iter += 1) {
      let changed = false;

      for (let i = 0; i < bubbles.length; i += 1) {
        for (let j = i + 1; j < bubbles.length; j += 1) {
          const a = bubbles[i];
          const b = bubbles[j];
          const ca = getCenter(a);
          const cb = getCenter(b);
          const dx = cb.x - ca.x;
          const dy = cb.y - ca.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minDist = ca.r + cb.r + gap;

          if (dist >= minDist) continue;

          changed = true;
          if (withEffects && (activeBubble || power > 1.2)) {
            markCollision(a);
            markCollision(b);
          }
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          if (a === activeBubble) {
            moveBubbleBy(b, nx * overlap, ny * overlap);
            kickBubble(b, nx * overlap * 0.22 * power, ny * overlap * 0.22 * power);
            continue;
          }

          if (b === activeBubble) {
            moveBubbleBy(a, -nx * overlap, -ny * overlap);
            kickBubble(a, -nx * overlap * 0.22 * power, -ny * overlap * 0.22 * power);
            continue;
          }

          const half = overlap * 0.5;
          moveBubbleBy(a, -nx * half, -ny * half);
          moveBubbleBy(b, nx * half, ny * half);
          kickBubble(a, -nx * half * 0.06, -ny * half * 0.06);
          kickBubble(b, nx * half * 0.06, ny * half * 0.06);
        }
      }

      if (!changed) break;
    }
  };

  const runPhysics = () => {
    const now = performance.now();
    let keepRunning = dragState !== null;

    bubbles.forEach((bubble) => {
      const until = collideUntil.get(bubble);
      if (until && now >= until) {
        bubble.classList.remove('is-colliding');
        collideUntil.delete(bubble);
      }

      const state = bubbleState.get(bubble);
      if (!state) return;
      let { x, y, vx, vy } = state;
      const moving = Math.abs(vx) > 0.08 || Math.abs(vy) > 0.08;
      if (!moving) return;

      x += vx;
      y += vy;

      const maxX = maxXFor(bubble);
      const maxY = maxYFor(bubble);

      if (x < 0 || x > maxX) {
        x = clamp(x, 0, maxX);
        vx *= -0.58;
      }
      if (y < 0 || y > maxY) {
        y = clamp(y, 0, maxY);
        vy *= -0.58;
      }

      setBubblePosition(bubble, x, y);
      state.vx = vx * 0.9;
      state.vy = vy * 0.9;
      keepRunning = true;
    });

    resolveOverlaps(null, 1, false);
    flushBubblePositions();

    if (keepRunning || collideUntil.size > 0) {
      physicsRaf = window.requestAnimationFrame(runPhysics);
    } else {
      physicsRaf = null;
    }
  };

  const startPhysics = () => {
    if (physicsRaf !== null) return;
    physicsRaf = window.requestAnimationFrame(runPhysics);
  };

  const onPointerMove = (event) => {
    if (!dragState) return;

    const { bubble, offsetX, offsetY, boardRect } = dragState;
    const x = clamp(event.clientX - boardRect.left - offsetX, 0, maxXFor(bubble));
    const y = clamp(event.clientY - boardRect.top - offsetY, 0, maxYFor(bubble));

    setBubblePosition(bubble, x, y);

    const now = performance.now();
    const dt = Math.max(1, now - dragState.lastTime);
    const mdx = event.clientX - dragState.lastClientX;
    const mdy = event.clientY - dragState.lastClientY;
    const speed = Math.hypot(mdx, mdy) / dt;
    const pointerPower = clamp(0.9 + speed * 0.55, 0.9, 2.8);

    dragState.lastTime = now;
    dragState.lastClientX = event.clientX;
    dragState.lastClientY = event.clientY;
    dragState.pointerVX = mdx / dt;
    dragState.pointerVY = mdy / dt;

    resolveOverlaps(bubble, pointerPower);
    flushBubblePositions();
    startPhysics();
  };

  const endDrag = () => {
    if (!dragState) return;

    const { bubble, pointerVX = 0, pointerVY = 0 } = dragState;
    bubble.classList.remove('is-dragging');
    kickBubble(bubble, pointerVX * 6.5, pointerVY * 6.5);
    resolveOverlaps(null);
    flushBubblePositions();
    startPhysics();
    dragState = null;

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', endDrag);
    window.removeEventListener('pointercancel', endDrag);
  };

  stackBoard.addEventListener('pointerdown', (event) => {
    const bubble = event.target.closest('.stack-bubble');
    if (!bubble) return;

    event.preventDefault();
    const rect = bubble.getBoundingClientRect();
    const boardRect = getBoardRect();

    dragState = {
      bubble,
      boardRect,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      lastClientX: event.clientX,
      lastClientY: event.clientY,
      lastTime: performance.now(),
      pointerVX: 0,
      pointerVY: 0,
    };

    bubble.classList.add('is-dragging');
    bubble.dataset.moved = '1';
    bubble.style.zIndex = `${zCounter += 1}`;
    setBubblePosition(bubble, rect.left - boardRect.left, rect.top - boardRect.top);
    flushBubblePositions();

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  });

  bubbles.forEach((bubble) => {
    bubbleState.set(bubble, { x: 0, y: 0, vx: 0, vy: 0 });
  });
  placeBubbles();
  window.addEventListener('resize', placeBubbles);
}

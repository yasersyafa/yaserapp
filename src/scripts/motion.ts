const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;

function initCursor() {
  if (reduced || coarse) return;
  if (document.getElementById('cursor-dot')) return;

  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  dot.innerHTML = `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <line x1="10" y1="2"  x2="10" y2="7"  />
      <line x1="10" y1="13" x2="10" y2="18" />
      <line x1="2"  y1="10" x2="7"  y2="10" />
      <line x1="13" y1="10" x2="18" y2="10" />
    </svg>`;

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.innerHTML = `
    <svg class="ring-svg" viewBox="0 0 60 60" aria-hidden="true">
      <circle cx="30" cy="30" r="28" />
    </svg>
    <span class="bracket tl"></span>
    <span class="bracket tr"></span>
    <span class="bracket bl"></span>
    <span class="bracket br"></span>`;

  const label = document.createElement('div');
  label.id = 'cursor-label';

  const trail: HTMLDivElement[] = [];
  const TRAIL_N = 6;
  for (let i = 0; i < TRAIL_N; i++) {
    const t = document.createElement('div');
    t.className = 'cursor-trail-dot';
    t.style.opacity = String((1 - i / TRAIL_N) * 0.5);
    trail.push(t);
  }

  document.body.append(...trail, ring, dot, label);

  let dx = -100, dy = -100, rx = -100, ry = -100;
  const trailPos = trail.map(() => ({ x: -100, y: -100 }));
  const ease = 0.18;

  const onMove = (e: PointerEvent) => { dx = e.clientX; dy = e.clientY; };
  const onLeave = () => {
    dot.classList.add('hide'); ring.classList.add('hide');
    label.classList.add('hide');
    trail.forEach((t) => t.classList.add('hide'));
  };
  const onEnter = () => {
    dot.classList.remove('hide'); ring.classList.remove('hide');
    trail.forEach((t) => t.classList.remove('hide'));
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);
  document.addEventListener('pointerenter', onEnter);

  const interactiveSel = 'a, button, [role="button"], input, textarea, select, label, .magnet, [data-cursor]';

  document.addEventListener('pointerover', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>(interactiveSel);
    if (!t) return;
    ring.classList.add('grow');
    dot.classList.add('grow');
    const text = t.dataset.cursor
      ?? (t.matches('input, textarea, select') ? 'type' : 'click');
    label.textContent = text;
    label.classList.add('show');
  });
  document.addEventListener('pointerout', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>(interactiveSel);
    if (!t) return;
    ring.classList.remove('grow');
    dot.classList.remove('grow');
    label.classList.remove('show');
  });

  document.addEventListener('pointerdown', () => {
    ring.classList.add('press');
    dot.classList.add('press');
  });
  document.addEventListener('pointerup', () => {
    ring.classList.remove('press');
    dot.classList.remove('press');
  });

  function tick() {
    rx += (dx - rx) * ease;
    ry += (dy - ry) * ease;
    dot.style.transform = `translate3d(${dx - 10}px, ${dy - 10}px, 0)`;
    ring.style.transform = `translate3d(${rx - 30}px, ${ry - 30}px, 0)`;
    label.style.transform = `translate3d(${rx + 24}px, ${ry + 18}px, 0)`;

    let px = dx, py = dy;
    for (let i = 0; i < trail.length; i++) {
      const p = trailPos[i];
      p.x += (px - p.x) * (0.28 - i * 0.025);
      p.y += (py - p.y) * (0.28 - i * 0.025);
      trail[i].style.transform = `translate3d(${p.x - 3}px, ${p.y - 3}px, 0)`;
      px = p.x; py = p.y;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function initReveal() {
  if (reduced) {
    document.querySelectorAll('.reveal, .stagger').forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );
  document.querySelectorAll('.reveal, .stagger').forEach((el) => io.observe(el));
}

function initMagnet() {
  if (reduced || coarse) return;
  document.querySelectorAll<HTMLElement>('.magnet').forEach((el) => {
    const strength = Number(el.dataset.magnet ?? '0.25');
    let raf = 0;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
}

function initTilt() {
  if (reduced || coarse) return;
  document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
    const max = Number(el.dataset.tilt ?? '6');
    let raf = 0;
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(800px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
      });
    });
    el.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
    });
  });
}

function initCount() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (els.length === 0) return;
  if (reduced) {
    els.forEach((el) => {
      el.textContent = el.dataset.count ?? el.textContent;
    });
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = Number(el.dataset.count ?? '0');
        const dur = Number(el.dataset.countDur ?? '1200');
        const suffix = el.dataset.countSuffix ?? '';
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  els.forEach((el) => io.observe(el));
}

function init() {
  initCursor();
  initReveal();
  initMagnet();
  initTilt();
  initCount();
}

init();
document.addEventListener('astro:after-swap', init);

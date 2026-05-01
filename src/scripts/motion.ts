const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(hover: none), (pointer: coarse)').matches;

function initCursor() {
  if (reduced || coarse) return;
  if (document.getElementById('cursor-dot')) return;

  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  document.body.append(dot, ring);

  let dx = -100, dy = -100, rx = -100, ry = -100;
  const ease = 0.18;

  const onMove = (e: PointerEvent) => {
    dx = e.clientX;
    dy = e.clientY;
  };
  const onLeave = () => { dot.classList.add('hide'); ring.classList.add('hide'); };
  const onEnter = () => { dot.classList.remove('hide'); ring.classList.remove('hide'); };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);
  document.addEventListener('pointerenter', onEnter);

  document.addEventListener('pointerover', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('a, button, [role="button"], input, textarea, select, label, .magnet')) {
      ring.classList.add('grow');
    }
  });
  document.addEventListener('pointerout', (e) => {
    const t = e.target as HTMLElement;
    if (t.closest('a, button, [role="button"], input, textarea, select, label, .magnet')) {
      ring.classList.remove('grow');
    }
  });

  function tick() {
    rx += (dx - rx) * ease;
    ry += (dy - ry) * ease;
    dot.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
    ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
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

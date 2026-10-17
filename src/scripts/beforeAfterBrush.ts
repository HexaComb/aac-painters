/**
 * Interactive Paintbrush Before/After Slider with Disappearing Wet-Paint Trail
 * Applies to all [data-ba-slider] viewports across the site.
 */

interface TrailPoint {
  x: number;
  y: number;
  time: number;
}

interface PaintDrop {
  x: number;
  y: number;
  r: number;
  color: string;
  born: number;
  duration: number;
}

interface BrushStroke {
  direction: -1 | 1;
  points: TrailPoint[];
  drops: PaintDrop[];
  seed: number;
}

interface BristleFilament {
  offsetY: number;
  width: number;
  rgb: string;
  baseAlpha: number;
  freq: number;
  phase: number;
  lifeScale: number;
}

const STROKE_LIFETIME_MS = 820;

// 9 layered bristle filaments that form a realistic wet contractor paintbrush stroke
const BRISTLE_FILAMENTS: BristleFilament[] = [
  // Subtle under-shadow so wet paint is visible even on bright white stucco/concrete
  { offsetY: 2, width: 34, rgb: '9, 13, 18', baseAlpha: 0.22, freq: 0.03, phase: 0.0, lifeScale: 0.95 },
  // Primary wide wet paint body (AAC Cerulean Blue)
  { offsetY: 0, width: 26, rgb: '4, 147, 188', baseAlpha: 0.52, freq: 0.04, phase: 0.5, lifeScale: 1.0 },
  // Upper & lower feathered bristle ridges
  { offsetY: -16, width: 6.5, rgb: '20, 168, 232', baseAlpha: 0.58, freq: 0.09, phase: 1.1, lifeScale: 0.86 },
  { offsetY: -10, width: 9, rgb: '4, 147, 188', baseAlpha: 0.64, freq: 0.07, phase: 2.3, lifeScale: 0.95 },
  { offsetY: 9, width: 8.5, rgb: '20, 168, 232', baseAlpha: 0.6, freq: 0.08, phase: 3.4, lifeScale: 0.92 },
  { offsetY: 16, width: 5.5, rgb: '8, 112, 158', baseAlpha: 0.54, freq: 0.11, phase: 4.2, lifeScale: 0.82 },
  // Outer dry-brush bristle tips (fade slightly faster like real outer bristles)
  { offsetY: -22, width: 3.2, rgb: '20, 168, 232', baseAlpha: 0.45, freq: 0.14, phase: 5.0, lifeScale: 0.74 },
  { offsetY: 21, width: 3.0, rgb: '157, 190, 57', baseAlpha: 0.42, freq: 0.13, phase: 1.8, lifeScale: 0.76 },
  // Glossy wet-paint specular highlight streaks
  { offsetY: -6, width: 4.2, rgb: '255, 255, 255', baseAlpha: 0.68, freq: 0.06, phase: 0.9, lifeScale: 0.88 },
  { offsetY: 4, width: 2.4, rgb: '255, 255, 255', baseAlpha: 0.48, freq: 0.08, phase: 2.7, lifeScale: 0.8 }
];

function computeLife(ageMs: number, durationMs: number): number {
  if (ageMs <= 0) return 1;
  if (ageMs >= durationMs) return 0;
  // Hold rich wet look for first 18% of lifetime, then smooth cubic evaporation
  const t = ageMs / durationMs;
  if (t < 0.18) return 1;
  const fadeT = (t - 0.18) / 0.82;
  return Math.max(0, 1 - fadeT * fadeT * (3 - 2 * fadeT));
}

export function initBeforeAfterSliders(): void {
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sliders = document.querySelectorAll<HTMLElement>('[data-ba-slider]');

  sliders.forEach((slider) => {
    if (slider.dataset.bound === 'true') return;
    slider.dataset.bound = 'true';

    const input = slider.querySelector<HTMLInputElement>('.ba-range-input');
    const clip = slider.querySelector<HTMLElement>('.ba-before-clip');
    const divider = slider.querySelector<HTMLElement>('.ba-divider');

    if (!input || !clip || !divider) return;

    // Ensure a dedicated paint-trail canvas exists inside the slider container
    let canvas = slider.querySelector<HTMLCanvasElement>('.ba-paint-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'ba-paint-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      divider.parentElement?.insertBefore(canvas, divider);
    }

    const ctx = canvas.getContext('2d');
    let cssWidth = 0;
    let cssHeight = 0;
    let dpr = 1;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = slider.getBoundingClientRect();
      cssWidth = rect.width;
      cssHeight = rect.height;
      if (cssWidth === 0 || cssHeight === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(cssWidth * dpr);
      const targetH = Math.round(cssHeight * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
    };

    resizeCanvas();
    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(slider);

    let lastPct = Number(input.value) || 50;
    let brushYRatio = 0.5;
    let strokes: BrushStroke[] = [];
    let rafId: number | null = null;
    let settleTimer: number | null = null;

    // Sync initial CSS custom properties
    const syncStaticProps = (valPct: number) => {
      const pctStr = `${valPct}%`;
      clip.style.setProperty('--pos', pctStr);
      divider.style.setProperty('--pos', pctStr);
      input.style.setProperty('--control-value', String(valPct));
      input.setAttribute('aria-valuenow', String(Math.round(valPct)));
    };
    syncStaticProps(lastPct);

    const renderFrame = (now: number) => {
      if (!ctx || !canvas || cssWidth === 0 || cssHeight === 0) {
        rafId = null;
        return;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      let hasActivePaint = false;

      // Prune expired points and strokes
      strokes.forEach((stroke) => {
        stroke.points = stroke.points.filter((pt) => now - pt.time < STROKE_LIFETIME_MS);
        stroke.drops = stroke.drops.filter((d) => now - d.born < d.duration);
      });
      strokes = strokes.filter((s) => s.points.length >= 2 || s.drops.length > 0);

      for (const stroke of strokes) {
        const pts = stroke.points;
        if (pts.length >= 2) {
          hasActivePaint = true;
          const tailPt = pts[0];
          const midPt = pts[Math.floor(pts.length / 2)];
          const tipPt = pts[pts.length - 1];

          const tipAge = now - tipPt.time;
          const midAge = now - midPt.time;
          const tailAge = now - tailPt.time;

          const tipLife = computeLife(tipAge, STROKE_LIFETIME_MS);
          const midLife = computeLife(midAge, STROKE_LIFETIME_MS);
          const tailLife = computeLife(tailAge, STROKE_LIFETIME_MS);

          // 1. Subtle full-height wet glaze across the swept reveal slice
          const minX = Math.min(tailPt.x, tipPt.x);
          const maxX = Math.max(tailPt.x, tipPt.x);
          const spanW = maxX - minX;

          if (spanW > 1 && tipLife > 0.01) {
            const glazeGrad = ctx.createLinearGradient(tailPt.x, 0, tipPt.x, 0);
            glazeGrad.addColorStop(0, 'rgba(20, 168, 232, 0)');
            glazeGrad.addColorStop(0.45, `rgba(20, 168, 232, ${(0.07 * midLife).toFixed(3)})`);
            glazeGrad.addColorStop(1, `rgba(255, 255, 255, ${(0.16 * tipLife).toFixed(3)})`);
            ctx.fillStyle = glazeGrad;
            ctx.fillRect(minX, 0, spanW, cssHeight);
          }

          // 2. Multi-bristle paintbrush stroke over where the brush was dragged
          for (const filament of BRISTLE_FILAMENTS) {
            const fDur = STROKE_LIFETIME_MS * filament.lifeScale;
            const fTipLife = computeLife(tipAge, fDur);
            const fMidLife = computeLife(midAge, fDur);
            const fTailLife = computeLife(tailAge, fDur);

            if (fTipLife <= 0.01 && fMidLife <= 0.01) continue;

            const grad = ctx.createLinearGradient(tailPt.x, tailPt.y, tipPt.x, tipPt.y);
            grad.addColorStop(0, `rgba(${filament.rgb}, 0)`);
            grad.addColorStop(
              0.25,
              `rgba(${filament.rgb}, ${(filament.baseAlpha * fTailLife * 0.65).toFixed(3)})`
            );
            grad.addColorStop(
              0.65,
              `rgba(${filament.rgb}, ${(filament.baseAlpha * fMidLife).toFixed(3)})`
            );
            grad.addColorStop(
              1,
              `rgba(${filament.rgb}, ${(filament.baseAlpha * fTipLife).toFixed(3)})`
            );

            ctx.beginPath();
            for (let i = 0; i < pts.length; i++) {
              const p = pts[i];
              const wobble =
                Math.sin(p.x * filament.freq + stroke.seed * 6.28 + filament.phase) * 1.6;
              const py = p.y + filament.offsetY + wobble;
              if (i === 0) {
                ctx.moveTo(p.x, py);
              } else {
                ctx.lineTo(p.x, py);
              }
            }

            ctx.strokeStyle = grad;
            ctx.lineWidth = filament.width * (0.72 + 0.28 * fTipLife);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
          }
        }

        // 3. Tiny wet paint micro-droplets / beads left behind by bristles
        for (const drop of stroke.drops) {
          const dLife = computeLife(now - drop.born, drop.duration);
          if (dLife <= 0.01) continue;
          hasActivePaint = true;

          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.r * (0.6 + 0.4 * dLife), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${drop.color}, ${(0.72 * dLife).toFixed(3)})`;
          ctx.fill();
        }
      }

      ctx.restore();

      if (hasActivePaint) {
        rafId = requestAnimationFrame(renderFrame);
      } else {
        rafId = null;
      }
    };

    const ensureLoop = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    const recordBrushMove = (newPct: number, clientY?: number) => {
      const dxPct = newPct - lastPct;
      syncStaticProps(newPct);

      if (cssWidth === 0 || cssHeight === 0) {
        resizeCanvas();
      }

      if (clientY !== undefined && cssHeight > 0) {
        const rect = slider.getBoundingClientRect();
        const relY = (clientY - rect.top) / rect.height;
        brushYRatio = Math.max(0.18, Math.min(0.82, relY));
        divider.style.setProperty('--brush-y', `${(brushYRatio * 100).toFixed(1)}%`);
      }

      if (Math.abs(dxPct) < 0.04) {
        lastPct = newPct;
        return;
      }

      const direction: -1 | 1 = dxPct < 0 ? -1 : 1;

      // Dynamic paintbrush tilt & active wet state
      if (!reducedMotionQuery.matches) {
        const tiltDeg =
          direction < 0
            ? Math.max(-20, dxPct * 2.8 - 9)
            : Math.min(20, dxPct * 2.8 + 9);
        divider.style.setProperty('--brush-tilt', `${tiltDeg.toFixed(1)}deg`);
        divider.setAttribute('data-painting', 'true');
        divider.setAttribute('data-swipe-dir', direction < 0 ? 'left' : 'right');

        if (settleTimer !== null) {
          window.clearTimeout(settleTimer);
        }
        settleTimer = window.setTimeout(() => {
          divider.style.setProperty('--brush-tilt', '0deg');
          divider.removeAttribute('data-painting');
        }, 170);
      }

      // Spawn wet paint trail over where the brush was dragged
      if (!reducedMotionQuery.matches && cssWidth > 0 && cssHeight > 0) {
        const now = performance.now();
        const x0 = (lastPct / 100) * cssWidth;
        const x1 = (newPct / 100) * cssWidth;
        const y = brushYRatio * cssHeight;

        let activeStroke = strokes[strokes.length - 1];
        const lastPt = activeStroke?.points[activeStroke.points.length - 1];

        // Start a fresh stroke if first move, paused > 130ms, or reversed swipe direction
        if (
          !activeStroke ||
          activeStroke.direction !== direction ||
          !lastPt ||
          now - lastPt.time > 130
        ) {
          activeStroke = {
            direction,
            points: [{ x: x0, y, time: now }],
            drops: [],
            seed: Math.random()
          };
          strokes.push(activeStroke);
        }

        // Interpolate intermediate points if the user swiped a large jump in one frame
        const dist = Math.abs(x1 - x0);
        const steps = Math.max(1, Math.min(8, Math.ceil(dist / 14)));
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const ix = x0 + (x1 - x0) * t;
          activeStroke.points.push({ x: ix, y, time: now });
        }

        // Occasionally flick a tiny wet paint bead behind the bristles on brisk swipes
        if (dist > 4 && Math.random() < 0.48 && activeStroke.drops.length < 18) {
          const dropColors = ['20, 168, 232', '255, 255, 255', '252, 187, 31'];
          activeStroke.drops.push({
            x: x0 + (x1 - x0) * 0.5 + (Math.random() - 0.5) * 14,
            y: y + (Math.random() < 0.5 ? -1 : 1) * (16 + Math.random() * 14),
            r: 1.6 + Math.random() * 2.2,
            color: dropColors[Math.floor(Math.random() * dropColors.length)],
            born: now,
            duration: 520 + Math.random() * 260
          });
        }

        ensureLoop();
      }

      lastPct = newPct;
    };

    // Track pointer Y so the brush can follow the user's swipe height naturally
    let activePointerY: number | undefined;
    slider.addEventListener(
      'pointerdown',
      (e: PointerEvent) => {
        activePointerY = e.clientY;
      },
      { passive: true }
    );
    slider.addEventListener(
      'pointermove',
      (e: PointerEvent) => {
        if (e.buttons > 0 || e.pointerType === 'touch') {
          activePointerY = e.clientY;
        }
      },
      { passive: true }
    );

    input.addEventListener(
      'input',
      () => {
        recordBrushMove(Number(input.value), activePointerY);
      },
      { passive: true }
    );
  });
}

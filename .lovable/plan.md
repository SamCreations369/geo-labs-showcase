

## Plan: GSAP ScrollTrigger 3D Carousel

Replace the Framer Motion ShowcaseCarousel with a GSAP + ScrollTrigger scroll-locked 3D carousel. Three files changed, nothing else touched.

---

### File 1: `package.json`
Add `"gsap": "^3.12.7"` to dependencies.

### File 2: `src/components/sections/ShowcaseCarousel.tsx` — Full rewrite

**No Framer Motion.** Pure GSAP + React refs.

**Structure:**
- Outer `<section>` with `height: slides.length * 100vh` (scroll runway)
- Inner `<div>` with `position: sticky; top: 0; height: 100vh` (viewport)
- Perspective container (`perspective: 1200px`) with 4 absolutely-positioned cards
- Bottom bar: label, optional link, dot indicators

**GSAP setup in `useLayoutEffect`:**
- `gsap.registerPlugin(ScrollTrigger)`
- Wrap in `gsap.context()` for cleanup
- ONE `ScrollTrigger.create()` — trigger is the outer section, `pin: false` (CSS sticky handles it), `scrub: 0.8`
- `onUpdate(self)`: compute `activeProgress = self.progress * (slides.length - 1)`, then for each card ref compute `diff = index - activeProgress` and apply transforms via `gsap.set()`:
  - `xPercent: diff * 55` (desktop), `yPercent: diff * 110` (mobile)
  - `z: -Math.abs(diff) * 300` (desktop only)
  - `rotateY: diff * -35` (desktop only)
  - `scale: 1 - Math.abs(diff) * 0.2` (clamped to 0.6 min)
  - `opacity: Math.abs(diff) < 1.5 ? 1 - Math.abs(diff) * 0.6 : 0`
  - `filter: blur(${Math.abs(diff) * 2}px)`
- Update `activeIndex` state (rounded) for bottom bar label/dots

**Mobile:** No ScrollTrigger, no rotateY, no perspective. Simple stacked cards — only active card visible, scroll-snapped vertically. Height reduced to auto.

**prefers-reduced-motion:** Detect via `window.matchMedia`. If enabled, skip ScrollTrigger entirely, show all cards stacked statically.

**Bottom bar:** CSS transitions only (no Framer Motion). Label + link update via React state driven by `activeIndex`. Dots are buttons that scroll to the corresponding progress point.

**Slides array** kept identical to current (video/image/video/image order with links).

### File 3: `src/components/sections/Hero.tsx`

Minimal changes only:
- Remove `imageY`, `imageScale`, `imageRotateX` transforms (lines 16-18)
- Remove the `motion.div` wrapper around `<ShowcaseCarousel />` (lines 68-76)
- Place `<ShowcaseCarousel />` after the closing `</div>` of `section-container` (line 77), still inside the `<section>`
- Keep `useScroll`/`useTransform` imports if still used elsewhere, otherwise clean up unused imports
- All clouds, text animation, sky-gradient, AnimatedButton — completely untouched


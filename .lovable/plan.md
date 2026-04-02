

## Plan: Sticky Scroll-Locked 3D Carousel with Reference-Style Animation

**What**: Rebuild the ShowcaseCarousel to use a sticky scroll-locking mechanism (like the reference site) so the carousel "stops" the page and you must scroll through all 4 slides before continuing. On desktop, cards rotate on the Y-axis in a true 3D cylinder layout. On mobile, cards slide in from the bottom instead of the right.

---

### How the reference site works

The reference uses a tall scroll track (`carousel_track` at ~300vh) with a `position: sticky` inner container. All cards are placed on a 3D cylinder using `rotateY` + `translateZ`. As the user scrolls, the cylinder rotates — each card steps into view one at a time. The scroll is "consumed" by the carousel before the page continues.

---

### Changes to `src/components/sections/ShowcaseCarousel.tsx` (full rewrite)

**Sticky scroll-lock approach:**
- Wrap carousel in a tall outer div (height: `slides.length * 100vh`) to create scroll runway
- Inside, a `position: sticky; top: 0; height: 100vh` container holds the 3D scene
- Use `useScroll({ target: outerRef })` to get `scrollYProgress` (0→1 across the tall div)
- Map `scrollYProgress` to `activeIndex` (0→3), so each ~25% of scroll advances one slide

**Desktop 3D cylinder (matching reference):**
- Cards arranged in a cylinder: each card gets `rotateY(index * angleStep)` + `translateZ(radius)`
- The whole cylinder rotates via `rotateY` driven by scroll progress
- `angleStep = 360 / slides.length` (90deg per card for 4 items)
- Adjacent cards visible at reduced opacity, creating the depth effect from the reference

**Mobile — cards from bottom:**
- No Y-axis rotation; instead use `translateY` for transitions
- Active card at `translateY(0)`, next cards below at `translateY(100%)`, previous above at `translateY(-100%)`
- Smooth vertical slide animation as you scroll

**Navigation:** Keep arrow buttons and dots for manual control, but scroll is the primary driver.

### Changes to `src/components/sections/Hero.tsx`

- Remove the `motion.div` wrapper around `<ShowcaseCarousel />` that applies `imageY`, `imageScale`, `imageRotateX` — the carousel now manages its own scroll behavior internally
- Move `<ShowcaseCarousel />` **outside** the `section-container` div so the sticky positioning works against the full viewport
- The Hero section no longer needs `min-h-screen` since the carousel's scroll runway provides the height

### Technical details

- Framer Motion `useScroll` with `target` set to the outer scroll-runway div and `offset: ['start start', 'end end']`
- `useTransform` to map `scrollYProgress` → rotation angle (desktop) or translateY (mobile)
- CSS `perspective` on the 3D scene container, `transform-style: preserve-3d` on the cylinder wrapper
- Videos keep `autoPlay`, `muted`, `loop`, `playsInline`


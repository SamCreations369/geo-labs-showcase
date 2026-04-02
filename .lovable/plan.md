

## Plan: 3D Scroll Carousel Showcase

**What**: Replace the current static dashboard image in the Hero section with a 3D perspective carousel that scrolls through 4 items: the ahrefs screenshot, Google Search Console screenshot, and two auto-playing website showcase videos (PGR Window Tinting and About Aria). The carousel uses a 3D rotation effect inspired by the reference site, where the active card is front-and-center and adjacent cards are rotated/scaled back in perspective.

---

### Assets to add
- `src/assets/ahrefs-showcase.png` — uploaded ahrefs image
- `src/assets/google-search-console.png` — uploaded GSC image
- `public/videos/pgr-showcase.mp4` — PGR website scroll video
- `public/videos/aboutaria-showcase.mp4` — About Aria website scroll video

Videos go in `public/` since they are large media files loaded via `<video>` tags.

---

### New component: `src/components/sections/ShowcaseCarousel.tsx`

A scroll-linked 3D carousel with 4 slides displayed in a perspective container:

- **3D layout**: Cards arranged horizontally with CSS `perspective` on the parent. The active card is at full scale/opacity, facing forward. Adjacent cards rotate on the Y-axis (approx. -45deg left, +45deg right), scale down, and reduce opacity — mimicking the reference site's depth effect.
- **Navigation**: Arrow buttons (left/right) and auto-advance timer. Scroll-based progression using Framer Motion's `useScroll` is preserved to tie into the existing parallax system.
- **Card content**:
  - Cards 1 & 2: `<img>` tags for ahrefs and GSC screenshots in rounded tile cards with shadow
  - Cards 3 & 4: `<video>` tags with `autoPlay`, `muted`, `loop`, `playsInline` for the two website showcase videos, same tile card styling
- **Mobile**: Simplified to single-card view with swipe/tap navigation, no 3D rotation.

### Changes to `src/components/sections/Hero.tsx`

- Remove the existing static dashboard `<img>` block (lines 78-100)
- Import and render `<ShowcaseCarousel />` in its place, keeping the same perspective wrapper and scroll-linked `rotateX` entrance animation

### Changes to `src/pages/Index.tsx`

No changes needed — the carousel lives inside the Hero section.

---

### Technical details

- Framer Motion `AnimatePresence` and `animate` for card transitions (rotateY, scale, translateX, opacity)
- `useScroll` + `useTransform` for the overall section parallax (already in Hero)
- Videos use native `<video>` element — no external player library needed
- Carousel state managed with `useState` for active index, `useEffect` for auto-advance interval


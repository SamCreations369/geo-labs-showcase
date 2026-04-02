

## Plan: Match Hero Cloud Background to Contact Section

### What's being removed (Hero lines 13-36)
- 12 desktop clouds (3 xlarge, 3 large, 3 medium, 3 small) — static `div` elements, no parallax
- 3 mobile clouds — static `div` elements with `animation: none`
- The `isMobile` conditional rendering

### What's being added (exact copy from Contact lines 120-147)
7 `motion.div` cloud elements with scroll-linked parallax, no mobile conditional:

1. `cloud-large cloud-animate-1` — y: cloud1Y
2. `cloud-large cloud-animate-2` — y: cloud2Y
3. `cloud-medium cloud-animate-3` — y: cloud3Y
4. `cloud-medium cloud-animate-1` — y: cloud4Y
5. `cloud-small cloud-animate-2` — y: cloud3Y
6. `cloud-small cloud-animate-3` — y: cloud1Y
7. `cloud-medium cloud-animate-1` — y: cloud2Y

### Adaptations for top-of-page placement
- Contact uses `bottom: X` positioning → Hero will use `top: X` with equivalent values
- Contact uses `useScroll` with `offset: ['start end', 'end end']` → Hero will use `offset: ['start start', 'end start']` (scrolling away from top)
- Contact parallax moves clouds from offset→0 → Hero will mirror: from 0→offset (clouds drift upward as you scroll down)

### Other changes to Hero.tsx
- Add `useScroll, useTransform` imports from framer-motion (already imported `motion`)
- Add 4 parallax transform values (cloud1Y–cloud4Y) matching Contact's exact values but inverted direction
- Remove `useIsMobile` import (no longer needed for cloud conditional)
- Remove `isMobile` variable
- Keep everything else: `sky-gradient`, `section-container`, `motion.div` text animation, `AnimatedButton`, `ShowcaseCarousel`

### Files changed
| File | Change |
|------|--------|
| `src/components/sections/Hero.tsx` | Replace cloud elements only |

No other files touched.


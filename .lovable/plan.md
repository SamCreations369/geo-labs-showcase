

## Plan: Replace DeviceFeature Mobile Mockup Image

**What**: Replace the first image in the DeviceFeature sliding container (the "Mobile" tab image) with the uploaded photo of a phone showing the PGR Window Tint website.

**Steps**:
1. Copy `user-uploads://image-47.png` to `src/assets/pgr-mobile-mockup.png`
2. In `src/components/sections/DeviceFeature.tsx`, import the new image and replace the `src` on line 66 (currently `/lovable-uploads/3a3051e7-...`) with the imported asset


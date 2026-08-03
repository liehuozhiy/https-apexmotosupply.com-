# F29 gallery image record

## Final core-highlight images

The official F29 page supplies the four selected highlight titles and matching close-up photographs. The original files are preserved unchanged. Because their high-key white studio areas conflict with the final page's dark-industrial visual rule, each final image is an `image_gen` scene/lighting edit of its matching official close-up, using `f29-angle-01-front-dark-industrial-ai-v2.png` only as the studio-style reference. The prompts explicitly lock the original component structure, graphics, color, hardware, crop and camera angle and prohibit adding, removing, mirroring or redesigning parts.

| Highlight | Official title/source image | Final page image | Verified data used in copy |
| --- | --- | --- | --- |
| Battery bay | Website title `电池仓位`; `f29-highlight-01-battery-bay-official.jpg` | `f29-highlight-01-battery-bay-dark-industrial-ai-v2.png` | 72V60Ah battery: current website data |
| Professional off-road suspension | Website title `专业级越野减震`; `f29-highlight-02-offroad-suspension-official.jpg` | `f29-highlight-02-offroad-suspension-dark-industrial-ai-v2.png` | Front 838 mm / rear 509 mm: Excel |
| Front LED lighting | Website title `前脸LED灯光`; `f29-highlight-03-front-led-light-official.jpg` | `f29-highlight-03-front-led-light-dark-industrial-ai-v2.png` | LED lighting: Excel |
| Gearless motor | Website title `无档电机`; `f29-highlight-04-direct-drive-motor-official.jpg` | `f29-highlight-04-direct-drive-motor-dark-industrial-ai-v2.png` | Permanent-magnet synchronous motor / 29 kW: Excel and current website data |

Official source base: `https://h5.cqxstx.com/?lang=zh-CN&id=f29`; the four source files were downloaded from the corresponding official `media.php` paths embedded in that page.

Common highlight edit prompt invariant: preserve the exact official F29 close-up and every visible component, fastener, cable, graphic, color, proportion, crop and camera angle; replace only white/high-key background areas and adapt illumination to a deep black/charcoal steel or subtle brick studio with a restrained blurred red vertical light accent and controlled fill that keeps black components readable. No people, other vehicles, text overlays, watermarks or extra logos.

Per-image prompt focus and consistency audit:

- `f29-highlight-01-battery-bay-dark-industrial-ai-v2.png`: edit target `f29-highlight-01-battery-bay-official.jpg`; preserve the battery enclosure, frame tubes, fork segment, cables, fasteners, silver frame piece and black/gold graphics; change only the high-key scene and lighting. Audit: enclosure geometry, graphics, cable routing and visible hardware retained.
- `f29-highlight-02-offroad-suspension-dark-industrial-ai-v2.png`: edit target `f29-highlight-02-offroad-suspension-official.jpg`; preserve the orange coil spring, damper hardware, black frame tubes, adjacent plastics, tire edge, fasteners and camera angle; change only the high-key background and lighting. Audit: spring color/count appearance, frame relationship and crop retained.
- `f29-highlight-03-front-led-light-dark-industrial-ai-v2.png`: edit target `f29-highlight-03-front-led-light-official.jpg`; preserve the headlight housing and optics, two indicators, fork tubes/clamps, fender, black/gold mask, graphics and fasteners; do not invent a different light pattern. Audit: lamp outline/optics, indicator positions, fork and fender relationship retained.
- `f29-highlight-04-direct-drive-motor-dark-industrial-ai-v2.png`: edit target `f29-highlight-04-direct-drive-motor-official.jpg`; preserve the oval drive housing, embossed circular details, bolts, cables, braided line, frame rails, cast frame piece, footpeg and adjacent enclosure; do not expose or invent internals. Audit: housing outline, bolt pattern, cable routing, frame and footpeg relationship retained.

## Final dark-industrial gallery (v2)

All five final images use the built-in `image_gen` edit/reference workflow. The common scene prompt specifies a deep black/charcoal metal studio, central steel panels, subtle dark brick sides, two restrained red vertical light strips, a dark slightly wet micro-reflective floor, controlled low fog, a front-left key/rim light and right soft fill. Each prompt locks the original angle, motorcycle identity, proportions, components, livery and decals; it prohibits people, other vehicles, text, watermarks, extra brands and model redesign.

| Final file | Angle | Identity/edit target | Scene/style reference |
| --- | --- | --- | --- |
| `f29-angle-01-front-dark-industrial-ai-v2.png` | Straight front | `f29-angle-01-front-official.jpg` | Common dark-industrial prompt |
| `f29-angle-02-left-front-half-dark-industrial-ai-v2.png` | Left-front 1/2 | `f29-angle-02-left-front-half-ai-v1.png`, originally based on official left/front photos | Final v2 straight-front image |
| `f29-angle-03-left-dark-industrial-ai-v2.png` | Left side | `f29-angle-03-left-official.jpg` | Final v2 straight-front image |
| `f29-angle-04-left-rear-half-dark-industrial-ai-v2.png` | Left-rear 1/2 | `f29-angle-04-left-rear-half-ai-v1.png`, originally based on official left/rear photos | Final v2 straight-front image |
| `f29-angle-05-rear-dark-industrial-ai-v2.png` | Straight rear | `f29-angle-05-rear-official.jpg` | Final v2 straight-front image |

Final prompt invariant: change only the scene and studio lighting; preserve the exact F29 frame, electric motor, battery enclosure, wheel set, suspension, plastics, lights, decals, colors and asymmetric chain/sprocket placement. Match the same camera height, focal feel, lighting direction, subject scale and landscape 3:2 framing across all five angles.

## Superseded light-background AI images

The following filenames are retained only for the generation history. Their superseded local image files were removed during the 2026-07-24 project cleanup and are not referenced by the final page:

- `f29-angle-02-left-front-half-ai-v1.png`
- `f29-angle-04-left-rear-half-ai-v1.png`

## Initial AI image 02 — left-front 1/2

- Tool: built-in `image_gen` edit/reference workflow
- References:
  - Official F29 orange/white left-side photo: `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-2.jpg`
  - Official F29 straight-front photo: `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-5.jpg`
- Saved output: `frontend/assets/img/f29-detail/f29-angle-02-left-front-half-ai-v1.png`
- Prompt: Create the missing left-front half-angle studio product photo of the exact F29. Preserve the orange/white livery, frame, battery enclosure, motor, suspension, wheels, brakes, chain, plastics, seat, handlebars, lights and decals. Change only the camera viewpoint; use a seamless white catalog background; do not mirror, crop, add accessories, text or watermarks.

## Initial AI image 04 — left-rear 1/2

- Tool: built-in `image_gen` edit/reference workflow
- References:
  - Official F29 orange/white left-side photo: `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-2.jpg`
  - Official F29 orange/white straight-rear photo: `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-6.jpg`
- Saved output: `frontend/assets/img/f29-detail/f29-angle-04-left-rear-half-ai-v1.png`
- Prompt: Create the missing left-rear half-angle studio product photo of the exact F29. Preserve the orange/white livery, frame, battery enclosure, motor, suspension, wheels, brakes, left-side chain and sprocket, plastics, seat, handlebars, lights and decals. Change only the camera viewpoint; use a seamless white catalog background; do not mirror, crop, add accessories, text or watermarks.

## Preserved official identity references

- `f29-angle-01-front-official.jpg` — official straight-front photo
- `f29-angle-03-left-official.jpg` — official left-side photo
- `f29-angle-05-rear-official.jpg` — official straight-rear photo

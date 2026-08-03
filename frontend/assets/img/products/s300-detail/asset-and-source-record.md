# S300 asset and source record

## Scope

- Page: `frontend/pages/s300.html`
- Product-specific asset directory: `frontend/assets/img/products/s300-detail/`
- Image generation mode: built-in `image_gen`
- Final gallery order: front → left-front 1/2 → left side → left-rear 1/2 → rear

## Official identity references

1. `official-s300-right-side.jpg`
   - Read-only source: `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/products/s300.jpg`
   - Role: official S300 right-side identity reference.
2. `official-s300-right-front.png`
   - Read-only source: `C:/Users/Administrator/Documents/Codex/2026-06-24/http-apexmotosupply-com/outputs/apex-moto-static/frontend/assets/img/products/3.4/s300.png`
   - Role: official S300 right-front identity reference.

The official images are preserved as references and are not used by the final page because their light backgrounds do not satisfy the final dark-industrial gallery specification.

## Final AI gallery

| Order | Angle | Final file | Identity reference | Additional consistency reference |
| --- | --- | --- | --- | --- |
| 01 | Front | `s300-ai-angle-01-front-v2-dark.png` | Both official images | None; establishes the dark series |
| 02 | Left-front 1/2 | `s300-ai-angle-02-left-front-half-v2-dark.png` | Both official images | Final dark front |
| 03 | Left side | `s300-ai-angle-03-left-side-v2-dark.png` | Both official images | Final dark front |
| 04 | Left-rear 1/2 | `s300-ai-angle-04-left-rear-half-v3-dark.png` | Both official images | Final dark front + final dark left side |
| 05 | Rear | `s300-ai-angle-05-rear-v2-dark.png` | Both official images | Final dark front |

## Core-highlight source mapping

The current website data explicitly supplies the four S300 highlights below but does not supply separate highlight images. The page therefore keeps the website highlight titles and verified values, while the images are AI-assisted component close-ups generated from the official S300 photos.

| Order | Final title / description | Copy source | Final image | Image source |
| --- | --- | --- | --- | --- |
| 01 | `NC300 four-stroke` / `Engine type: NC300 four-stroke.` | Website `site-data.js` highlight + engine field | `s300-highlight-01-nc300-engine-v1-dark-ai.png` | AI supplement using both official S300 photos as identity references |
| 02 | `25KW` / `Maximum power: 25 kW.` | Website `site-data.js` highlight | `s300-highlight-02-25kw-power-v1-dark-ai.png` | AI supplement using both official S300 photos as identity references |
| 03 | `27Nm` / `Maximum torque: 27 Nm.` | Website `site-data.js` highlight | `s300-highlight-03-27nm-torque-v1-dark-ai.png` | AI supplement using both official S300 photos as identity references |
| 04 | `11.4L petrol tank` / `Petrol tank capacity: 11.4 L.` | Website `site-data.js` highlight | `s300-highlight-04-11-4l-tank-v1-dark-ai.png` | AI supplement using both official S300 photos as identity references |

No Excel-only highlight replaces these four website highlights. Excel-backed suspension, lighting and chain data remain available in the specification table, but are not presented as the primary core-highlight cards.

### Core-highlight prompt record

All four images used built-in `image_gen` in reference/edit mode. Identity references:

- `official-s300-right-side.jpg` — official S300 structure and right-side component reference.
- `official-s300-right-front.png` — official S300 structure, plastics, graphics and component reference.
- `s300-ai-angle-02-left-front-half-v2-dark.png` — scene/lighting reference only.

Shared prompt constraints:

> Create a photorealistic landscape 3:2 macro product close-up for an S300 product-detail core-highlight card. Images 1 and 2 are official identity references of the exact S300; Image 3 is only the approved dark-industrial scene reference. Preserve every visible component shape, mounting point, fastener, finish, frame geometry, blue/yellow plastics, graphics language and color from the official references. Use the same deep black/charcoal metal industrial studio, subtle steel/brick layers, restrained blurred red vertical light accents, dark wet micro-reflective floor glow, minimal haze, cool upper-front-left key and cool rear-right rim. No whole motorcycle, people, other vehicles, text, watermark, extra logos, labels, gauges, effects, duplicate parts or imaginary technology. Do not redesign the S300 or invent features.

Angle/component-specific instructions:

- `s300-highlight-01-nc300-engine-v1-dark-ai.png`: tight right-side close-up centered on crankcase, cylinder area, visible exhaust routing, black frame cradle and skid plate.
- `s300-highlight-02-25kw-power-v1-dark-ai.png`: front-right mechanical close-up of cylinder/head area, crankcase, radiator edge, exhaust header, frame cradle and skid plate; no meters, power graphics or effects.
- `s300-highlight-03-27nm-torque-v1-dark-ai.png`: low right-side close-up of lower engine cases, frame cradle, skid plate, serrated footpeg, linkage edge and swingarm; do not expose a chain on the wrong side.
- `s300-highlight-04-11-4l-tank-v1-dark-ai.png`: upper right-side close-up of the translucent white petrol tank, filler cap/neck, seat edge, blue/yellow shrouds and frame mounts; no extra cap, gauge, hose or capacity text.

## Prompt record

All final prompts used this shared production specification:

> Use case: product-mockup. Asset type: FINAL S300 product-detail gallery image, dark industrial series. Images 1 and 2 are official identity references of the exact S300. Reconstruct only the requested viewpoint and scene; do not redesign the motorcycle. Use the same deep black/charcoal industrial garage, black metal wall with subtle steel-panel and dark brick texture, two restrained vertical red light strips far behind the bike, dark wet micro-reflective concrete floor and very light controlled floor haze. Use a consistent camera at motorcycle mid-height, a 55 mm catalog lens look, landscape 3:2 framing, matching subject scale and padding. Use a cool soft key from upper front-left, a cool rim from upper rear-right and restrained red environmental accents. Preserve the official S300 headlight mask, blue/yellow graphics language, fork, blue rims, tire tread, frame, engine, plastics, seat and proportions. Keep black frame, tire, engine, chain and exhaust details readable. No rider, people, other vehicles, text, watermark, added logos, props or cropped tires. Avoid white/light/transparent backgrounds, ecommerce cutouts, altered graphics, duplicate parts, distorted wheels, crushed blacks and heavy fog.

Angle-specific prompt instructions:

- Front: strict symmetrical head-on view; handlebars straight and wheels aligned.
- Left-front 1/2: front-left 45-degree view; show the motorcycle's left flank; the right-side exhaust remains hidden and is not mirrored.
- Left side: strict orthographic left profile, front wheel pointing left; show chain/sprocket side; exhaust remains hidden on the right side.
- Left-rear 1/2: rear-left 45-degree view with rear wheel closer; show the chain/sprocket side. The corrected prompt explicitly required no visible muffler, exhaust canister, outlet or tailpipe on the left.
- Rear: strict symmetrical straight-behind view; rear tire centered; retain anatomically correct right-side exhaust placement.

## 2026-07-27 panoramic gallery and panel background

Built-in `image_gen` was used in identity-preserving edit mode. Every output used
`official-s300-right-front.png` and `official-s300-right-side.jpg` as the S300
identity references. The previous approved angle image supplied the requested
viewpoint, while `s300-wide-angle-01-front-v1-sample-dark.png` supplied the
approved panoramic scene consistency reference.

| Order | Angle | Final file | Dimensions |
| --- | --- | --- | --- |
| 01 | Straight front | `s300-wide-angle-01-front-v1-dark.png` | 1942 x 809 |
| 02 | Left-front 3/4 | `s300-wide-angle-02-left-front-v1-dark.png` | 1942 x 809 |
| 03 | Left side | `s300-wide-angle-03-left-side-v1-dark.png` | 1942 x 809 |
| 04 | Left-rear 3/4 | `s300-wide-angle-04-left-rear-v1-dark.png` | 1942 x 809 |
| 05 | Straight rear | `s300-wide-angle-05-rear-v1-dark.png` | 1942 x 809 |

Shared panoramic prompt constraints:

> Expand the approved S300 angle to an approximately 12:5 (2.4:1) photorealistic dark-metal industrial studio image by extending the environment naturally on both sides. Preserve the exact S300 blue/yellow/white plastics, headlight mask, fork, blue rims, tires, frame, engine, seat, swingarm, chain, exhaust placement and proportions from the official identity references. Keep the complete motorcycle and all extremities inside frame with generous safe padding. Match the approved black and charcoal metal wall, subtle steel and brick layers, restrained red vertical lights, wet micro-reflective floor, minimal haze and cool detail-preserving key light. No HS85 or other motorcycle, redesign, mirroring, recoloring, altered decals, invented or missing parts, cropped vehicle, black bars, letterboxing, stretched pixels, duplicated seams, people, text, watermark, white background, heavy fog or full red wash.

Angle-specific invariants:

- 01: strict symmetrical head-on view with aligned wheels and straight handlebars.
- 02: true front-left 45-degree view with the left chain/sprocket side visible and no mirrored right-side exhaust.
- 03: strict orthographic left profile with the chain/sprocket side visible and the right-side exhaust hidden.
- 04: true rear-left 45-degree view with the rear wheel closer; no muffler, exhaust canister, outlet or tailpipe on the left.
- 05: strict symmetrical straight-behind view with the rear tire centered and the exhaust retained only in its correct right-side position.

Upper-right panel background:

- Final file: `s300-hero-panel-left-front-red-v1-dark.png`
- Dimensions: 1672 x 941
- Identity references: both official S300 images and
  `s300-wide-angle-02-left-front-v1-dark.png`
- Style-only reference:
  `frontend/assets/img/sj300-hero-panel-red-v2.png`

Panel prompt:

> Create a photorealistic 16:9 S300 upper-right product panel background in the established SJ300 visual treatment. Show one complete exact S300 in a clear front-left 45-degree three-quarter view, placed slightly right of center, with the entire handlebars, fenders, wheels, tires and tail inside frame. Keep the surrounding industrial metal wall and wet floor predominantly black. Concentrate strong red smoke and rim light immediately behind the motorcycle with a contained red wet-floor reflection below it; do not tint the entire canvas red or obscure the S300 bodywork and mechanical detail. The SJ300 reference controls only the lighting and composition treatment and must not contribute any motorcycle component.

## Deprecated and rejected images

The following files are retained for the work record but are not referenced by `s300.html`:

- `s300-ai-angle-01-front-v1.png` — deprecated light studio background.
- `s300-ai-angle-02-left-front-half-v1.png` — deprecated light studio background.
- `s300-ai-angle-03-left-side-v1.png` — deprecated light studio background.
- `s300-ai-angle-04-left-rear-half-v1.png` — deprecated light studio background.
- `s300-ai-angle-05-rear-v1.png` — deprecated light studio background.
- `s300-ai-angle-04-left-rear-half-v2-rejected-exhaust-drift.png` — rejected because the exhaust was incorrectly placed on the visible left chain side.

## Parameter evidence

Priority applied field by field:

1. Current website data in `frontend/assets/js/site-data.js`.
2. When absent from website data, the designated workbook:
   `J:/微信聊天存档/xwechat_files/wxid_pfd6tdg6bno721_fc81/temp/RWTemp/2026-07/8ffc9c1fc734a6ad93d90a836600b04d/2026H&Q产品参数（英）.xlsx`
3. Workbook evidence range for S300: worksheet `S300`, model column `B`, rows `3:25`.

| Field | Final value | Source |
| --- | --- | --- |
| Model | S300 | Website |
| Apparent size | 2200 × 820 × 1200 mm | Website |
| Wheelbase | 1500 mm | Website |
| Ground clearance | 330 mm | Website |
| Seat height | 970 mm | Website |
| Kerb weight | 120 kg | Website |
| Max load | 150 kg | Excel |
| Front tire | 90/90-21 | Website |
| Rear tire | 140/80-18 | Website |
| Brake modes | Front and rear disc brakes | Excel |
| Front shock absorber | Length: 950 mm | Excel |
| Rear shock absorber | Length: 480 mm | Excel |
| Transmission mode | Chain drive 520 / 110L / 42T | Website |
| Sprocket | Alloy | Excel |
| Light | LED | Excel |
| Petrol tank | 11.4 L | Website |
| Endurance | 220 km at ≤ 50 km/h | Website |
| Top speed | 110 km/h | Website |
| Maximum climbing angle | >70° | Excel |
| Engine type | NC300 four-stroke | Website |
| Maximum torque | 27 Nm | Website |
| Maximum power | 25 kW | Website |
| Starter battery | 2A Li-ion battery | Excel |
| Gear setting | International gear | Website |

## 2026-07-23 incremental presentation and lightbox QA

- S300 page updated: `2026-07-23 21:36:43 +08:00`.
- The five-angle main image and all five thumbnails use `object-fit: contain`.
- Safe image padding ranges from `10px` at 375/768 to `26px` at 2560.
- The four core-highlight cards use independent gaps, equal-height gradient panels and a fixed `306px` card height.
- SY300 height evidence: the final source template CSS sets `.sy300-preview-tech-cards article` to `min-height:306px` in `frontend/assets/css/styles.css`; S300 renders all four cards at exactly `306px` at every required width.
- The highlight lightbox provides a close button, backdrop close, Escape close, focus restoration and document-scroll restoration.
- Seven-language × seven-width matrix: 49 cases, 0 failures.
- RTL: Arabic reports `dir="rtl"` at all seven widths.
- Browser console: no page JavaScript errors or warnings. The QA runner locally fulfilled the static server's unsupported analytics POST and missing favicon request; production routes and shared scripts were not changed.
- Evidence directory: `output/playwright/s300-incremental-qa/`.

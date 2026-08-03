# SN300 image generation record

## Identity references

- `../products/3.4/sn300.png` — official SN300 right-front studio photograph.
- `../products/sn300.jpg` — official SN300 right-side studio photograph.
- SHA-256 values match the read-only current source copies.

No other motorcycle model was used.

## Final gallery — dark industrial v2

Shared prompt:

> Preserve the exact SN300 motorcycle identity from the official references and the approved camera angle. Replace the scene with a deep black and charcoal metallic photography studio / industrial garage: layered black steel wall panels with subtle plate and dark brick texture, exactly two restrained vertical red light strips far behind the motorcycle, a dark wet micro-reflective floor and very light controlled floor haze. Use photorealistic premium automotive catalog photography, a consistent 55 mm equivalent lens, cool soft key from camera-left and a subtle rim from camera-right. Keep black tires, frame, engine, chain, exhaust and metal details separated from the dark background. Change the background and lighting environment only; do not redesign or alter the motorcycle, body graphics, headlight mask, fenders, forks, wheels, proportions or accessories. No people, other vehicles, text, watermark or added branding.

| Order | Angle-specific prompt | Final file |
| --- | --- | --- |
| 01 | Symmetrical straight-front view at axle-to-headlight height; front wheel straight. | `sn300-ai-angle-01-front-dark-v2.png` |
| 02 | Left-front three-quarter view at mid-bike height; show the left side and front. | `sn300-ai-angle-02-left-front-half-dark-v2.png` |
| 03 | True 90-degree left profile at axle height; front wheel points left. | `sn300-ai-angle-03-left-dark-v2.png` |
| 04 | Left-rear three-quarter view at mid-bike height; keep the right-side exhaust mechanically consistent. | `sn300-ai-angle-04-left-rear-half-dark-v2.png` |
| 05 | Symmetrical straight-rear view at rear-axle-to-seat height; preserve the right-side exhaust and do not invent lights. | `sn300-ai-angle-05-rear-dark-v2.png` |

All five final files are 4:3 landscape images saved in this directory and are referenced by `frontend/pages/sn300.html`.

## Final gallery completeness diagnosis

The five v2 source files were visually inspected at original resolution before page integration. The page uses `object-fit: contain` for the active gallery image.

| Order | Source diagnosis | Page diagnosis / correction |
| --- | --- | --- |
| 01 front | Complete handlebar, front fender, tire and vehicle silhouette; safe margin on every edge. | The SY300 baseline used `cover`; SN300 overrides the active image to `contain`. |
| 02 left-front 1/2 | Complete front/rear wheels, handlebar, fenders and tail; safe margin. | `contain`; no page crop or stretch. |
| 03 left side | Complete front/rear wheels, handlebar, front fender and tail; safe margin. | `contain`; no page crop or stretch. |
| 04 left-rear 1/2 | Complete front/rear wheels, handlebar, fenders and tail; safe margin. | `contain`; no page crop or stretch. |
| 05 rear | Complete handlebar, rear wheel, body and exhaust silhouette; safe margin. | `contain`; no page crop or stretch. |

## Core-highlight AI close-ups

All four highlight images use the two official SN300 photos above plus `sn300-ai-angle-02-left-front-half-dark-v2.png` as the scene/lighting reference. The common instruction was: preserve the exact SN300 identity and only reproduce parts supported by the official photos; use the same charcoal metal studio, restrained red vertical light, wet reflective floor, cool-neutral key light and slight haze; no people, other vehicles, text overlay, watermark, invented branding or redesigned components.

| Order | Website highlight / data source | Component prompt and consistency control | Final file |
| --- | --- | --- | --- |
| 01 | `NB300 four-stroke` (current website) | Tight engine, cylinder/crankcase, hoses, skid plate and blue/black frame close-up; do not invent components. | `sn300-ai-highlight-01-nb300-engine-dark-v1.png` |
| 02 | `19Kw` maximum power (current website) | Tight real engine powertrain and exhaust-header junction; retain the official frame, engine geometry and nearby bodywork. | `sn300-ai-highlight-02-19kw-powertrain-dark-v1.png` |
| 03 | `119Kg` kerb weight (current website) | Central frame, engine mounts, skid plate, swingarm pivot and foot peg; do not imply unverified materials. An earlier generation with altered lettering was rejected and is not stored or used. | `sn300-ai-highlight-03-119kg-chassis-dark-v1.png` |
| 04 | `21/18 wheels` (current website; tire sizes also current website) | Front 80/100-21 spoked wheel, fork, hub, disc and caliper; preserve spoke layout, disc silhouette, caliper position, tread and scale. | `sn300-ai-highlight-04-21-18-wheel-brake-dark-v1.png` |

The page presents exactly four equal-height cards at each SY300 template breakpoint. Each close-up is constrained to the existing SY300 image area and opens the original file in an in-page lightbox.

## Deprecated light-background v1

The following filenames are retained only as generation history. Their superseded local image files were removed during the 2026-07-24 project cleanup and are not referenced by the final page:

- `sn300-ai-angle-01-front-v1.png`
- `sn300-ai-angle-02-left-front-half-v1.png`
- `sn300-ai-angle-03-left-v1.png`
- `sn300-ai-angle-04-left-rear-half-v1.png`
- `sn300-ai-angle-05-rear-v1.png`

The official files copied into this directory are also retained for audit and identity comparison, but are not used as final gallery or preview images because their light backgrounds do not meet the final visual specification.

## Responsive visual QA

Final Browser geometry was compared with the read-only final SY300 template at each required breakpoint. The SN300 highlight region never exceeds the SY300 region, every card has the same height at the same breakpoint, and no highlight text box overflows. Each card now has its own complete 1 px border, rounded background gradient and shadow, with a consistent 12 px grid gap. The image track is 188 px on four-column layouts, 182 px at 768 px and 179 px at 375 px so the new separation does not increase the section height.

| Width | SN300 highlight height | SY300 baseline | Card layout / height |
| --- | ---: | ---: | --- |
| 375 | 1425 px | 1428 px | 1 column; 297 px each; 12 px gap |
| 768 | 813 px | 814 px | 2 columns; 300 px each; 12 px gap |
| 1024 | 507 px | 507 px | 4 columns; 306 px each |
| 1280 | 507 px | 634 px | 4 columns; 306 px each |
| 1440 | 507 px | 560 px | 4 columns; 306 px each |
| 1920 | 507 px | 515 px | 4 columns; 306 px each |
| 2560 | 507 px | 507 px | 4 columns; 306 px each |

Seven-language (`en`, `zh-CN`, `zh-TW`, `ru`, `ar`, `es`, `pt`) checks passed at all seven widths with no document-level horizontal overflow; Arabic uses RTL. The in-page highlight lightbox passed close-button, backdrop and Escape-key closing, restores page scrolling after close, and keeps the original image inside a 375 × 1000 viewport.

Final evidence screenshots (not referenced by the page). The two highlight screenshots are element-level captures of the complete `#core-highlights` region after the card-separation fix:

- `qa-sn300-1280-top.png`
- `qa-sn300-1280-highlights.png`
- `qa-sn300-375-top.png`
- `qa-sn300-375-highlights.png`

The earlier `qa-sn300-1280-full.png` and `qa-sn300-375-full.png` are retained only as superseded Browser screenshot attempts; they are not page assets and are not delivery evidence.

## Wide gallery remediation v3

The existing dark v2 gallery remains unchanged. Its five source ratios are
1.333, 1.333, 1.333, 1.368 and 1.333; the approved angle order is retained.

All five new gallery files are 1942 x 809 px (2.400:1). Each output uses its
matching v2 angle as the edit target, the approved 01 v3 image as the shared
scene and scale reference, and `official-sn300-right-front.png` plus
`official-sn300-right-side.jpg` as SN300 identity references.

Shared prompt:

> Create a full-bleed 2.4:1 panoramic catalog photograph by naturally extending
> the dark studio horizontally. Preserve the exact SN300 identity, geometry,
> mechanical structure, decals and blue-white-yellow colorway. Keep the
> requested camera angle unchanged. Show the complete motorcycle with wheels,
> handlebar ends, fenders and tail inside the frame, generous safe margins and
> a consistent tire baseline. Use the approved 01 subject height and the same
> deep black/charcoal metal studio, steel-panel and brick texture, restrained
> red vertical lights, wet micro-reflective floor, neutral cool key light and
> slight haze. Keep black mechanical details legible and the overall frame
> black rather than red. Fill every edge with natural scene detail. No bars,
> borders, transparency, text, watermark, people, other vehicles or added
> branding.

| Order | Edit target and angle lock | New final file |
| --- | --- | --- |
| 01 | `sn300-ai-angle-01-front-dark-v2.png`; dead-straight symmetrical front | `sn300-ai-angle-01-front-wide-dark-v3.png` |
| 02 | `sn300-ai-angle-02-left-front-half-dark-v2.png`; left-front three-quarter | `sn300-ai-angle-02-left-front-half-wide-dark-v3.png` |
| 03 | `sn300-ai-angle-03-left-dark-v2.png`; true 90-degree left profile | `sn300-ai-angle-03-left-wide-dark-v3.png` |
| 04 | `sn300-ai-angle-04-left-rear-half-dark-v2.png`; left-rear three-quarter, correct right-side exhaust | `sn300-ai-angle-04-left-rear-half-wide-dark-v3.png` |
| 05 | `sn300-ai-angle-05-rear-dark-v2.png`; dead-straight symmetrical rear, no invented lamps | `sn300-ai-angle-05-rear-wide-dark-v3.png` |

## SJ300-style upper-right panel background

- New file: `sn300-ai-hero-left-front-red-smoke-wide-v1.png`
- Output: 1672 x 941 px (1.777:1)
- SN300 edit target: `sn300-ai-angle-02-left-front-half-wide-dark-v3.png`
- SN300 identity references: `official-sn300-right-front.png`,
  `official-sn300-right-side.jpg`
- Mood/composition-only reference: `sj300-hero-panel-red-v2.png`; its motorcycle
  and parts were explicitly excluded from identity guidance.
- Prompt:

> Create a full-bleed 16:9 dark cinematic industrial upper-right panel. Keep
> the complete SN300 in the same left-front three-quarter orientation, slightly
> right of center, with both wheels, handlebar ends, front fender and tail
> safely inside the frame and dark negative space on the left. Preserve the
> exact SN300 bodywork, decals, wheels, tires, frame, NB300 engine, exhaust,
> swingarm, brakes, seat and proportions. Use a black textured metal garage,
> wet reflective floor and controlled black haze. Add a concentrated strong
> red smoke bloom and rim light only behind and around the motorcycle, plus a
> local red floor reflection. Keep the large left background and frame edges
> neutral black/charcoal; do not tint the whole image red. No vertical gallery
> lights, borders, text, watermark, people, other vehicles or added branding.

## Gallery 04 direction correction v4

The v3 04 file is retained but rejected for final use because its front wheel,
headlight face and fork front remained visually dominant, so it read as another
left-front view.

- Rejected file retained: `sn300-ai-angle-04-left-rear-half-wide-dark-v3.png`
- New final file: `sn300-ai-angle-04-left-rear-half-wide-dark-v4.png`
- Output: 1942 x 809 px (2.400:1)
- Identity/structure references:
  `sn300-ai-angle-03-left-wide-dark-v3.png`,
  `sn300-ai-angle-05-rear-wide-dark-v3.png`,
  `official-sn300-right-side.jpg`
- Scene/scale reference:
  `sn300-ai-angle-04-left-rear-half-wide-dark-v3.png`
- Direction check: camera is behind and left of the motorcycle; rear wheel and
  tail are closer and larger, front wheel recedes, near-side chain and rear
  sprocket are visible, and the headlight front face is hidden.
- Prompt:

> Create a true left-rear three-quarter view with the motorcycle facing left.
> Put the camera behind the motorcycle and to its left, aimed forward along the
> seat. Make the rear wheel and tail visibly closer, larger and dominant; make
> the front wheel smaller and farther away. Show the rear-fender top, near-side
> chain, rear sprocket and swingarm. Hide the headlight lens and fork front
> faces. Preserve the exact SN300 colors, graphics, frame, NB300 engine, 21/18
> wheels, brakes, seat and mechanically correct right-side silencer. Match the
> approved 2.4:1 dark metal studio, red side lights, wet floor, scale, baseline
> and safe margins. No mirroring, redesigned parts, black bars, text, people,
> watermark, other vehicles or added branding.

Final five-angle review sheet:
`qa-sn300-five-angle-wide-v4-contact-sheet-v2.png` (1800 x 650 px).

# F4 dark industrial gallery — imagegen record

Generation mode: built-in `image_gen`, identity-preserving edit.

## Shared prompt

Use case: `precise-object-edit`.

Replace only the official photograph's white background and studio lighting with a unified deep-black/charcoal metallic photography studio or industrial garage. Use layered black steel wall or subtle dark brick/plate texture, two restrained vertical red light strips in the distant background, a dark slightly wet micro-reflective floor, and very subtle low fog only near the floor. Preserve the exact F4 electric bike, camera angle, geometry, proportions, wheel alignment, handlebar, cables, fork, frame, seat, pedals, tires, hub motor, suspension, components, green accents, and all visible details. Do not redesign, add, remove, mirror, rotate, or substitute any vehicle part. Keep the full bike centered with complete tires and handlebars visible, consistent padding, low-to-mid product camera height, neutral focal length, upper-front-left key light, and subtle cool edge light. Reveal all black frame, tire, motor, suspension, and mechanical detail without crushed blacks. The bike must be the only subject. No people, other vehicles, text, watermark, new logos, transparent background, white/light-gray backdrop, excessive smoke, or motion blur.

## Final gallery and panel outputs

| Order | View | Official identity reference | Angle-specific prompt constraint | Built-in generated file | Final project file |
| --- | --- | --- | --- | --- | --- |
| 01 | Front | `f4-angle-01-front.jpg` | Exact straight-front F4; expand naturally to about 2.4:1; cool-gray rim and upper-side soft light separate every black structure; full vehicle and safe padding. | `C:\Users\Administrator\.codex\generated_images\019f8cae-f5d8-7971-9944-0aa20b7bd92b\call_jaeq0La3MjLaHqzUfdsmIheB.png` | `f4-angle-01-front-dark-industrial-panorama-v4.png` |
| 02 | Left-front 3/4 | `f4-angle-02-left-front-half.jpg` | Exact left-front three-quarter F4; match the approved 01 lighting, camera height, scale, 2.4:1 expansion and safe padding. | `C:\Users\Administrator\.codex\generated_images\019f8cae-f5d8-7971-9944-0aa20b7bd92b\call_om4Fe0STNSglr9KvTJYEzdyL.png` | `f4-angle-02-left-front-half-dark-industrial-panorama-v3.png` |
| 03 | Left side | `f4-angle-03-left.jpg` | Exact 90-degree left-side F4; match the approved 01 lighting, camera height, scale, 2.4:1 expansion and safe padding. | `C:\Users\Administrator\.codex\generated_images\019f8cae-f5d8-7971-9944-0aa20b7bd92b\call_wTlfMTJNzs0AGZJ5RQM786H7.png` | `f4-angle-03-left-dark-industrial-panorama-v3.png` |
| 04 | Left-rear 3/4 | `f4-angle-04-left-rear-half.jpg` | Exact left-rear three-quarter F4; match the approved 01 lighting, camera height, scale, 2.4:1 expansion and safe padding. | `C:\Users\Administrator\.codex\generated_images\019f8cae-f5d8-7971-9944-0aa20b7bd92b\call_ZmVlPJUOXJoD3eqEVNm2wtYK.png` | `f4-angle-04-left-rear-half-dark-industrial-panorama-v3.png` |
| 05 | Rear | `f4-angle-05-rear.jpg` | Exact straight-rear F4; match the approved 01 lighting, camera height, scale, 2.4:1 expansion and safe padding. | `C:\Users\Administrator\.codex\generated_images\019f8cae-f5d8-7971-9944-0aa20b7bd92b\call_KnpxZe5Z5BNRrz8nYzELgxSv.png` | `f4-angle-05-rear-dark-industrial-panorama-v3.png` |
| Panel | Left-front 3/4 | `f4-angle-02-left-front-half.jpg` | Complete F4 slightly right of frame; black industrial atmosphere with localized strong red smoke/rim light and wet reflection, never an all-red image. | `C:\Users\Administrator\.codex\generated_images\019f8cae-f5d8-7971-9944-0aa20b7bd92b\call_Ew6v7WVUxZzdfrOXtBegqEGS.png` | `f4-panel-left-front-red-industrial-v2.png` |

The original official white-background files and official detail crops are retained unchanged as source records.

## F4 highlight-card sources

The four independently spaced highlight cards in `frontend/pages/f4.html` use four unique F4 sources:

| Card | Subject | Source file | Provenance |
| --- | --- | --- | --- |
| 01 | 2500W hub motor | `f4-highlight-hub-motor-dark-industrial-v2.png` | Precise identity-preserving background/lighting edit of official `f4-highlight-hub-motor.jpg`; generated as `call_iFk6L7HOUMngTB8TAajah89Y.png` |
| 02 | 50Km endurance | `f4-angle-02-left-front-half-dark-industrial-panorama-v3.png` | Identity-preserving panorama edit of official `f4-angle-02-left-front-half.jpg`; generation record above |
| 03 | 25Kg kerb weight | `f4-highlight-frame-battery-dark-industrial-v2.png` | Precise identity-preserving background/lighting edit of official `f4-highlight-aluminum-body.jpg`; generated as `call_xc9U1Q5nJLpOPSqEe5kAyhUK.png` |
| 04 | 2000-pound rear shock | `f4-highlight-rear-shock-dark-industrial-v2.png` | Precise identity-preserving background/lighting edit of official `f4-highlight-rear-shock.jpg`; generated as `call_i7PVVcECv1IN7rTEY5OprX5U.png` |

The three highlight edits use the same dark industrial studio, restrained red vertical light, wet micro-reflective floor and cool-gray separation light as the gallery. The prompt explicitly preserves every referenced F4 component, crop and marking and forbids redesign, other models, added parts, white backgrounds, text, watermark and embedded black bars.

All five main-gallery views remain F4-specific identity-preserving edits. Each final panorama is 1942 × 809 (about 2.4005:1), with naturally extended scenery and no embedded black border. The page uses `object-fit: contain` for the main image so the complete motorcycle remains visible.

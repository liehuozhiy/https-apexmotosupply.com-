# F29 wide-gallery consistency audit

Audit date: 2026-07-26

Scope: F29 gallery assets only. No page references were changed.

## Existing five-angle set

The existing PNG sources are 1536 x 1024 (approximately 1.5:1); the current page frame presents them at approximately 1.33:1. The requested replacement target is approximately 2.4:1 with a naturally extended studio background.

| Slot | Existing file | Required angle | Identity/version result | Angle result | Disposition |
| --- | --- | --- | --- | --- | --- |
| 01 | `f29-angle-01-front-dark-industrial-ai-v2.png` | Straight front | **Mismatch.** Black/gold F29 color version; it does not match slots 02–05. | Correct straight front | Do not use in the unified final set |
| 02 | `f29-angle-02-left-front-half-dark-industrial-ai-v2.png` | Left-front 3/4 | White/red/blue plastics, orange frame; consistent with 03–05 | Correct left-front 3/4 | Valid identity/angle reference for wide remake |
| 03 | `f29-angle-03-left-dark-industrial-ai-v2.png` | Left side | White/red/blue plastics, orange frame; matches official left-side photo | Correct left side | Valid identity/angle reference for wide remake |
| 04 | `f29-angle-04-left-rear-half-dark-industrial-ai-v2.png` | Left-rear 3/4 | White/red/blue plastics, orange frame; consistent with 02, 03 and 05 | Correct left-rear 3/4 | Valid identity/angle reference for wide remake |
| 05 | `f29-angle-05-rear-dark-industrial-ai-v2.png` | Straight rear | White/red/blue plastics, orange frame; matches official rear photo | Correct straight rear | Valid identity/angle reference for wide remake |

Shared identity confirmed for slots 02–05: white/red/blue plastics and graphics, orange frame, silver main frame members and swingarm, orange rear spring, black battery enclosure and drive housing, black spoked off-road wheels, left-side chain/sprocket, matching headlight/indicator/seat/tail structures.

## First wide sample

- File: `f29-angle-01-front-dark-industrial-wide-ai-v3-sample.png`
- Dimensions: 1942 x 809
- Ratio: 2.400:1
- SHA-256: `50E1233D9C4F25606B477A0A90501456B77C1C2AF3FE33975CD14588B9A40941`
- Tool: built-in `image_gen`
- Status: audit sample only; not referenced by `f29.html`

### References

1. `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-2.jpg`
   - Role: official white/red/blue orange-frame F29 left-side identity reference.
2. `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-6.jpg`
   - Role: official matching F29 straight-rear identity reference.
3. `f29-angle-02-left-front-half-dark-industrial-ai-v2.png`
   - Role: existing dark-industrial scene/lighting reference only.

### Prompt

Create a photorealistic straight-on front view of the exact white/red/blue F29 with orange frame as a very wide approximately 2.4:1 dark-metal industrial studio photograph. Preserve the official F29 headlight mask, front fender, fork structure/colors, handlebar controls/cables, wheels, knobby tires, silver frame members, battery enclosure, suspension, plastics, decals and all visible hardware. Do not use the black/gold color variant. Use a deep black/charcoal steel-panel and dark-brick studio, restrained vertical red accents, a dark wet micro-reflective floor and controlled light haze. Keep the complete motorcycle centered and fully visible with generous safe space around handlebar ends, tire contact patch and all bodywork. No black borders, letterboxing, wide-angle distortion, redesign, mirrored parts, component substitution, extra accessories, people, other vehicles, text, watermark or added logo.

### Sample consistency result

- Correct straight-front camera angle.
- White/red/blue plastics and orange-frame version matches slots 02–05.
- Complete handlebar, headlight, fender, forks and front wheel remain inside the frame with safe space.
- Background extends continuously to 2.4:1 with no black border or matte.
- Red light is localized to vertical accents and floor reflections; the image is not globally red.
- Black tire, cables and fork details remain readable.

The first sample was visually approved and promoted unchanged to the versioned final slot-01 file.

## Final wide gallery and upper-right panel

Completion date: 2026-07-27

All six deliverables were generated with the built-in `image_gen` editor, saved under new versioned filenames, and leave every earlier official, AI and audit-sample file intact.

| Slot | Final file | Dimensions | Ratio | Required view | Identity / framing result |
| --- | --- | ---: | ---: | --- | --- |
| 01 | `f29-angle-01-front-dark-industrial-wide-ai-v3.png` | 1942 x 809 | 2.400:1 | Straight front | Approved sample promoted unchanged; white/red/blue F29, orange frame, complete motorcycle and safe space |
| 02 | `f29-angle-02-left-front-dark-industrial-wide-ai-v3.png` | 1939 x 811 | 2.391:1 | Left-front 3/4 | Same color/version and dark studio; complete vehicle, no matte or black border |
| 03 | `f29-angle-03-left-dark-industrial-wide-ai-v3.png` | 1942 x 809 | 2.400:1 | Left side | Same color/version and dark studio; exact side profile, complete vehicle |
| 04 | `f29-angle-04-left-rear-dark-industrial-wide-ai-v3.png` | 1942 x 809 | 2.400:1 | Left-rear 3/4 | Same color/version; left chain and rear sprocket retained, complete vehicle |
| 05 | `f29-angle-05-rear-dark-industrial-wide-ai-v3.png` | 1942 x 809 | 2.400:1 | Straight rear | Centered rear view; complete bar ends, tail, exhaust and rear tire |
| Panel | `f29-panel-left-front-dark-red-ai-v2.png` | 1672 x 941 | 1.777:1 | Left-front 3/4 | Complete F29 slightly right; black copy area at left, localized red smoke/rim light and wet-floor reflection |

### Shared identity references

1. `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-2.jpg`
   - Official white/red/blue, orange-frame F29 identity and left-side structure.
2. `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-6.jpg`
   - Official matching F29 rear identity and rear hardware.
3. The matching slot-specific v2 file in this directory.
   - Camera-angle and F29 component reference; never overwritten.
4. `f29-angle-01-front-dark-industrial-wide-ai-v3-sample.png`
   - Approved lighting, lens height, panoramic framing and studio reference for slots 02–05.
5. `C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend\assets\img\sj300-hero-panel-red-v2.png`
   - Panel composition and localized-red atmosphere reference only; no SJ300 motorcycle content was copied.

### Prompt records

#### Slot 02

Edit the matching F29 slot-02 image using the official F29 and approved slot-01 sample as references. Produce the exact same white/red/blue F29 with orange frame in a left-front three-quarter view, approximately 2.4:1, in the approved dark charcoal metal studio with restrained red vertical lights, wet reflective floor and light haze. Preserve all frame, motor, wheel, suspension, plastic, light, decal and color details. Keep the complete vehicle and shadow inside generous safe margins with a naturally extended background and no black bars. No redesign, black/gold version, people, other vehicle, text or watermark.

#### Slot 03

Edit the matching F29 slot-03 image using the official F29 and approved slot-01 sample as references. Produce the exact same white/red/blue F29 with orange frame in an exact left-side profile, approximately 2.4:1, with the same dark industrial studio, camera height, lighting direction, red accents, wet reflective floor and haze. Preserve all verified parts and proportions. Keep the complete motorcycle and shadow inside safe margins with no black bars. No redesign, black/gold version, people, other vehicle, text or watermark.

#### Slot 04

Edit the matching F29 slot-04 image using the official left-side and rear F29 photos plus the approved slot-01 sample. Produce the exact same white/red/blue F29 with orange frame in an exact left-rear three-quarter view, approximately 2.4:1. Preserve the left-side chain and rear sprocket, frame, motor, suspension, swingarm, brakes, plastics, decals and colors. Match the approved dark-metal studio, red vertical lights, wet floor and haze. Keep the complete vehicle and shadow within safe margins, with no black bars, redesign, black/gold version, people, other vehicle, text or watermark.

#### Slot 05

Edit the matching F29 slot-05 image using the official rear F29 photo and approved slot-01 sample. Produce the exact same white/red/blue F29 with orange frame in an exact straight-rear view, approximately 2.4:1, centered with balanced bar ends and only the real chain/exhaust asymmetries. Match the approved dark-metal studio, red vertical lights, wet floor and haze. Keep the complete bars, tail, tire, exhaust, shadow and reflection within safe margins with no black bars. No redesign, black/gold version, people, other vehicle, text or watermark.

#### Upper-right panel

Edit the existing F29 panel using the official F29 image and SJ300 panel only as composition/atmosphere references. Show the exact complete white/red/blue F29 with orange frame in a left-front three-quarter view, slightly right of center. Use a wide near-black charcoal industrial studio with substantial clean black copy space on the left, localized strong red smoke and rim light around the motorcycle, and a restrained red wet-floor reflection. Keep most of the frame neutral black and preserve all F29 structure, colors, decals and proportions. No crop, black bars, global red wash, redesign, black/gold version, people, other vehicle, text or watermark.

### Final consistency decision

- Slots 01–05 are the same white/red/blue F29 version with the orange tubular frame; the rejected black/gold slot-01 v2 file is not referenced.
- The five required views are ordered front → left-front 3/4 → left side → left-rear 3/4 → rear.
- Every final gallery image is approximately 2.4:1 with a naturally continuous studio background and no black border.
- The upper-right panel follows the SJ300 composition standard while remaining an F29-only asset.

## 2026-07-27 full-range review correction

The 27-model review found that `f29-angle-04-left-rear-dark-industrial-wide-ai-v3.png` still read visually as a left-front-biased view: the front assembly was too prominent and the headlight face remained visible. It is retained for history but is no longer approved for slot 04.

- Replacement: `f29-angle-04-left-rear-dark-industrial-wide-ai-v4.png`
- Dimensions: 1942 x 809
- Ratio: 2.400:1
- SHA-256: `A5F77216C52BBEFF15182C20413257BA9F4C12F4B412D6E31CF8F6CB6C1B1C5B`
- Built-in tool: `image_gen`
- Edit target: `f29-angle-04-left-rear-half-dark-industrial-ai-v2.png`
- Official identity references:
  - `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-2.jpg`
  - `C:\Users\Administrator\AppData\Local\Temp\f29-audit\angle-6.jpg`
- Studio/rear reference: `f29-angle-05-rear-dark-industrial-wide-ai-v3.png`

### Correction prompt

Preserve the v2 slot-04 camera position because it is the required left-rear three-quarter view: camera behind the motorcycle on its left side, rear wheel and tail closer and larger than the front wheel, left chain and rear sprocket facing the camera, and front headlight face turned away. Do not rotate the motorcycle toward a front view. Extend only the dark industrial studio naturally to approximately 2.4:1. Preserve the exact white/red/blue F29 with orange frame, all verified components, complete motorcycle and safe margins. Avoid front-three-quarter view, side profile, altered parts, mirrored drivetrain, black/gold colorway, crop, black bars, people, text or watermark.

### Correction result

- Rear wheel and tail are the near end of the motorcycle; front wheel is visibly farther away.
- Left-side chain and sprocket remain visible.
- Front headlight face is no longer presented toward the camera.
- The complete motorcycle, both wheels, handlebar, fenders, tail and reflection remain inside the frame.
- The 2.4:1 studio background is continuous and has no border or matte.

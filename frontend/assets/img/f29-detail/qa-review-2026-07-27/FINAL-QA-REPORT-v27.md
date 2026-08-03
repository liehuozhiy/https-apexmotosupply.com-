# F29 v27 final QA — 2026-07-27

## Build and scope

- Tested URL: `http://127.0.0.1:2840/pages/f29.html`
- Shared CSS query verified in generated page: `product-detail.css?v=20260727-product-detail-v27`
- Single-model build: `node scripts/build-product-pages.mjs f29` — passed
- JSON SHA-256: `E609CACBD5DC4E7369BF40294F3DC40830847B72855F00A30599055D87958464`
- HTML SHA-256: `8F3A5D4F840102A35CFAF5987C0FCA9CF46847B55ADBBBCD50E2BA34FD779219`
- `git diff --check` for F29 JSON/page/assets — passed with no output
- Model-only data correction: added the existing panel CTA source key to all seven language dictionaries; Arabic renders `ابدأ الاستفسار`.

## Final 28-combination matrix

Widths: `375 / 1440 / 1920 / 2560`.

| Language | 375 | 1440 | 1920 | 2560 |
|---|---:|---:|---:|---:|
| en | PASS | PASS | PASS | PASS |
| zh-CN | PASS | PASS | PASS | PASS |
| zh-TW | PASS | PASS | PASS | PASS |
| ru | PASS | PASS | PASS | PASS |
| ar | PASS | PASS | PASS | PASS |
| es | PASS | PASS | PASS | PASS |
| pt | PASS | PASS | PASS | PASS |

All 28 combinations returned HTTP 200 with:

- document width equal to viewport width; no horizontal page overflow;
- no visible text overflow, horizontal escape, broken image, unexpected HTTP response, or unexpected console error;
- process and benefits headings inside their panels, no heading overflow, and no two-column overlap;
- exactly four equal-height highlight cards: `300px` at 375 and `306px` at 1440/1920/2560;
- Arabic `lang=ar`, `dir=rtl`, and RTL body state;
- panel computed URL `http://127.0.0.1:2840/assets/img/f29-detail/f29-panel-left-front-dark-red-ai-v2.png`, HTTP 200, with no `/assets/assets/` prefix.

Chromium reports a synthetic `scrollWidth=365` on the Arabic RTL flex CTA although its container is `273.69–547.44`; exact rendered child rectangles are fully contained: label `480.72–530.44`, arrow `290.69–301.64`. The final gate therefore uses child geometry for this RTL flex element while retaining `scrollWidth` checks for all other text.

## Gallery and panel assets

| Slot | Angle | File | Pixels | Ratio | Result |
|---:|---|---|---:|---:|---|
| 01 | front | `f29-angle-01-front-dark-industrial-wide-ai-v3.png` | 1942×809 | 2.400 | PASS |
| 02 | left-front 3/4 | `f29-angle-02-left-front-dark-industrial-wide-ai-v3.png` | 1939×811 | 2.391 | PASS |
| 03 | left side | `f29-angle-03-left-dark-industrial-wide-ai-v3.png` | 1942×809 | 2.400 | PASS |
| 04 | left-rear 3/4 | `f29-angle-04-left-rear-dark-industrial-wide-ai-v4.png` | 1942×809 | 2.400 | PASS |
| 05 | rear | `f29-angle-05-rear-dark-industrial-wide-ai-v3.png` | 1942×809 | 2.400 | PASS |

The five assets are versioned F29-only AI edits from official F29 identity references. They show the same white/red/blue motorcycle with orange frame, complete vehicle, safe margins, naturally extended dark industrial backgrounds, and no embedded black bars. Slot 04 v4 corrects the earlier viewpoint ambiguity. Reference images, prompt, path, and SHA-256 are recorded in `WIDE-GALLERY-AUDIT.md`.

Panel asset `f29-panel-left-front-dark-red-ai-v2.png` is 1672×941 and uses the same F29 identity in the approved black/red, wet-floor composition.

## Highlights and interactions

- Four official F29 highlight images loaded: battery bay, off-road suspension, front LED lighting, and gearless motor.
- Gallery slot 04 click selected index 3 and loaded the v4 left-rear file; frame code changed to `STILL IMAGE / 04`.
- Language menu switched to zh-CN and all three inquiry links retained `lang=zh-CN`.
- Technical tab click and keyboard `Home` navigation passed.
- All four highlight lightboxes opened with loaded images.
- Close button, overlay click, and Escape each closed the lightbox.
- Body scrolling locked while open and restored after close.
- Focus returned to the opener for all three close methods.
- Scroll position stayed at `520` for all three close methods.

## Final screenshots

- `f29-v27-final-1440-en.jpg`
- `f29-v27-final-1440-panel.png`
- `f29-v27-final-375-ar.jpg`

These files were created after the v27 rebuild and are not reused from any earlier gate.

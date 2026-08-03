# F29R final responsive QA — 2026-07-23

Page under test:

`C:\Users\Administrator\.codex\worktrees\fa6a\apex-moto-static\frontend\pages\f29r.html`

Local test URL:

`http://127.0.0.1:2858/pages/f29r.html`

## Fixed four-highlight source list

1. Battery compartment
   - Title and image: official F29R website.
   - Description datum: specified Excel, battery `96V55Ah`.
   - Local image: `feature-01-battery-bay-official.jpg`.
2. Professional off-road suspension
   - Title and image: official F29R website.
   - Description data: specified Excel, front shock `838 mm`, rear shock `509 mm`.
   - Local image: `feature-02-pro-offroad-suspension-official.jpg`.
3. Front LED lighting
   - Title and image: official F29R website.
   - Description datum: specified Excel, lighting `LED`.
   - Local image: `feature-03-front-led-light-official.jpg`.
4. Gearless motor
   - Title, image, and conservative direct-drive description: official F29R website.
   - Local image: `feature-04-gearless-motor-official.jpg`.

The official front-wheel-assembly image remains in the audit folder but is not
referenced by the fixed-four page. No AI-generated highlight image is used.

## SY300 height comparison

Measured in the same browser session and viewport with the exact selector
`#core-highlights.getBoundingClientRect().height`. Values are CSS pixels.

| Width | SY300 | F29R | Margin below SY300 | Result |
|---:|---:|---:|---:|---|
| 375 | 1427.625 | 1333.594 | 94.031 | PASS |
| 768 | 813.625 | 773.594 | 40.031 | PASS |
| 1024 | 506.625 | 488.594 | 18.031 | PASS |
| 1280 | 634.016 | 514.531 | 119.485 | PASS |
| 1440 | 560.203 | 500.063 | 60.140 | PASS |
| 1920 | 515.422 | 493.391 | 22.031 | PASS |
| 2560 | 506.625 | 493.391 | 13.234 | PASS |

The four F29R cards have independent borders and gaps, equal heights, and the
same scoped dark gradient treatment. The highlight block uses `align-self:
start`, preventing unrelated overview/order copy from stretching its grid row.
The image row is fixed at 156 px so intrinsic source-image ratios cannot inflate
the cards at 768 or 2560. Localized copy is not clipped.

## Seven-language × seven-width QA

Tested all 49 combinations of `en`, `zh-CN`, `zh-TW`, `ru`, `ar`, `es`, `pt`
at `375`, `768`, `1024`, `1280`, `1440`, `1920`, `2560`.

- `49/49` combinations passed the same SY300 selector-height ceiling.
- Four cards rendered in every combination.
- Card heights were equal within every combination.
- No highlight heading or description clipping was detected.
- No broken referenced image was detected.
- No horizontal document overflow was detected.
- Arabic rendered with `dir="rtl"`; all other languages rendered LTR.
- Localized lightbox open/close accessible labels were present.

## Seven-width QA

Tested widths: `375`, `768`, `1024`, `1280`, `1440`, `1920`, `2560`.

At every width:

- requested viewport width matched `window.innerWidth`;
- no horizontal document overflow;
- four equal-height highlight cards;
- five gallery thumbnails;
- main image and thumbnails used `object-fit: contain`;
- zero broken referenced images;
- three F29R inquiry links remained routed to `inquiry.html?model=F29R`.

## Lightbox interaction record

Opened from the first official highlight after real browser auto-scroll.

| Close path | Dialog hidden | Body unlocked | Restored scroll | Focus returned |
|---|---|---|---:|---|
| Visible close button | yes | yes | 380 / 380 | opener |
| Backdrop click | yes | yes | 361 / 361 | opener |
| `Esc` | yes | yes | 361 / 361 | opener |

Each restored-scroll cell shows `stored / restored`. The open state also
verified: modal visible, official image loaded, close button focused, body
locked, and `body.style.top` matched the captured scroll position.

## Other interaction and console QA

- Specifications tab selected successfully.
- Overview panel hidden and technical panel shown.
- 26 specification rows rendered.
- Browser console errors/warnings: `0`.

## Screenshot evidence

- `qa-f29r-1440-final.png`
- `qa-f29r-375-final.png`
- `qa-f29r-lightbox-1440-final.png`

The 1440 and 375 highlight screenshots were regenerated after the height fix.
Visual inspection confirmed the battery enclosure, orange suspension spring,
front LED assembly, and gearless motor remain inside their image safe areas.

## Main-project synchronization regression — 2026-07-24

The synchronized main-project copy was served from its own static root and
returned HTTP `200`. A main-project shared-style interaction at 1024 px was
fixed locally in `f29r.html` by constraining the gallery to its grid track; no
shared stylesheet was changed.

The final 49-case matrix adds per-card geometry assertions:

- every `h3` and `p` rectangle stays inside its parent card rectangle;
- card, copy container, heading, and paragraph each satisfy
  `scrollWidth <= clientWidth`;
- all four cards remain equal height;
- page overflow, SY300 height ceiling, gallery, inquiry, broken-image, and RTL
  checks remain active.

Result: `49/49 PASS`.

Critical Russian measurements:

- 1280, card 2: copy `134/134`, title `112/112`; title height `70`.
- 1440, card 2: copy `154/154`, title `132/132`; title height `52.5`.
- Cards 2 and 4 have no rectangle or scroll-width overflow at either width.
- 1024: all seven languages use a `488.594` px highlight region against the
  `506.625` px SY300 ceiling, with no horizontal overflow.

The close button, backdrop, and `Esc` each restored scroll position `441/441`,
unlocked the body, hid the dialog, and returned focus to the opener. Console
errors/warnings: `0`.

# SJ300 visual validation

Date: 2026-07-23

## Five-angle source and display diagnosis

The source check was performed against the final dark-studio PNG itself, not the
old white-background identity reference.

| Order | Final source | Source diagnosis | Page diagnosis before correction | Final handling |
| --- | --- | --- | --- | --- |
| 01 Front | `01-front-v2-dark-studio.png` (1536×1024) | Complete: handlebar, front tyre, front fender and visible silhouette have safe space on every edge. | Main view used `contain`; thumbnail used `cover` and could crop the horizontal handlebar. | Source retained; main view and thumbnail forced to centered `contain`. |
| 02 Left-front 1/2 | `02-left-front-half-v2-dark-studio.png` (1537×1023) | Complete: both wheels, handlebar, front/rear fenders and tail are inside the frame with safe space. | Main view used `contain`; thumbnail used `cover` and could crop the end regions. | Source retained; main view and thumbnail forced to centered `contain`. |
| 03 Left side | `03-left-side-v2-dark-studio.png` (1536×1024) | Complete: both wheels and the entire side silhouette are inside the frame with the largest horizontal safety margin of the angled views. | Main view used `contain`; thumbnail used `cover` and could crop a wheel edge. | Source retained; main view and thumbnail forced to centered `contain`. |
| 04 Left-rear 1/2 | `04-left-rear-half-v2-dark-studio.png` (1536×1024) | Complete: both wheels, handlebar, rear fender and tail remain inside the frame with safe space. | Main view used `contain`; thumbnail used `cover` and could crop the front/rear endpoints. | Source retained; main view and thumbnail forced to centered `contain`. |
| 05 Rear | `05-rear-v2-dark-studio.png` (1536×1024) | Complete: handlebar, rear tyre, rear fender and tail are fully visible with generous side safety space. | Main view used `contain`; thumbnail used `cover` and could crop the handlebar. | Source retained; main view and thumbnail forced to centered `contain`. |

No replacement image was generated in this correction pass because none of the
five final sources was intrinsically cropped.

## Responsive geometric evidence

Playwright tested all seven languages (`en`, `zh-CN`, `zh-TW`, `ru`, `ar`,
`es`, `pt`) at every required viewport: 49 combinations total, 49 passed.
Arabic was additionally required to resolve to `dir="rtl"`.

The height gate uses the controller's exact selector:
`document.querySelector('#core-highlights').getBoundingClientRect().height`.
The final rule makes this grid item top-aligned so adjacent translated content
cannot stretch it.

| Viewport | SJ300 `#core-highlights` | SY300 limit | Delta | Horizontal / text overflow |
| ---: | ---: | ---: | ---: | --- |
| 375 | 1424.625 px | 1427.625 px | −3 px | 0 / 0 px |
| 768 | 812.625 px | 813.625 px | −1 px | 0 / 0 px |
| 1024 | 506.625 px | 506.625 px | 0 px | 0 / 0 px |
| 1280 | 506.625 px | 634.02 px | −127.395 px | 0 / 0 px |
| 1440 | 506.625 px | 560.20 px | −53.575 px | 0 / 0 px |
| 1920 | 506.625 px | 515.42 px | −8.795 px | 0 / 0 px |
| 2560 | 506.625 px | 506.63 px | −0.005 px | 0 / 0 px |

Every card stayed inside the viewport. Each card has an independent border and
background, a uniform image row (0 px height delta), a dark image-to-copy
gradient, and no copy clipping. Card heights are 300 px at 375, 302 px at 768,
and 306 px from 1024 upward; all four cards have a 0 px height difference at
every breakpoint. Main and thumbnail images remain centered `contain`. The
English, Russian, Spanish and Portuguese highlight descriptions were
conservatively shortened without removing any verified numerical parameters so
that every translation fits the SY300-sized text region.

## Lightbox interaction evidence

Playwright opened the original full-resolution highlight image and verified:

| Interaction | Opened | Closed | Body scroll locked while open | Scroll restored | Focus returned |
| --- | --- | --- | --- | --- | --- |
| Close button | Yes | Yes | Yes | Yes (80 px before and after) | Yes |
| Backdrop click | Yes | Yes | Yes | Yes (80 px before and after) | Yes |
| Escape key | Yes | Yes | Yes | Yes (80 px before and after) | Yes |

At 375×812, the dialog and image both remained within the viewport, the body
was locked while open, the tested source loaded at 4752×3168, and Escape
closed the dialog, restored page scrolling, and returned focus to the fourth
highlight trigger.

## Screenshots

- `sj300-1440-full.png`: 1440×1344 desktop full-page evidence, regenerated
  after the final same-selector height fix.
- `sj300-375-full.png`: 375×4733 mobile full-page evidence, regenerated after
  the final same-selector height fix.
- `sj300-1440-highlights.png`: 694×507 isolated 1440 core-highlights evidence.
- `sj300-375-highlights.png`: 343×1425 isolated 375 core-highlights evidence; the fixed
  page header was temporarily hidden only during this long-element capture to
  prevent Playwright screenshot stitching from repeating it over the cards.
- `sj300-1440-lightbox.png`: 1440×1000 open-lightbox evidence.

The localhost-only console reports a favicon 404 and a 501 for the analytics
POST because the validation server is a static Python server. There were no
page-script exceptions; production API routes were not changed.

## Main-project synchronization regression

Date: 2026-07-24

The synchronized page was served from the main-project static root:
`C:\Users\Administrator\Documents\Codex\2026-06-24\http-apexmotosupply-com\outputs\apex-moto-static\frontend`.

- SJ300 and the final SY300 baseline both returned HTTP 200.
- The browser dynamically measured the main project's SY300 at each viewport
  and reran SJ300 across all seven languages and seven widths: 49/49 passed.
- `#core-highlights` remained at or below the corresponding main-project
  SY300 measurement at every width.
- All 11 non-empty page images loaded; the five gallery triggers each selected
  the matching dark-studio main image with `object-fit: contain`.
- Overview and technical tabs both selected and hid/showed their corresponding
  panels correctly.
- All three inquiry links resolved to `inquiry.html?lang=zh-CN` in the Chinese
  run, and the language parameter matched every tested language.
- Close button, backdrop and Escape all closed the lightbox, restored scroll
  position, and returned focus to the originating card.
- The 375 px Arabic test used RTL, kept both the modal panel and image inside
  the viewport, and restored focus after Escape.
- Browser page errors: 0. Unexpected console errors: 0.

Main-project render evidence:

- `sj300-main-1440-regression.png`: 1440×1429 full-page main-project render.
- `sj300-main-375-regression.png`: 375×4799 full-page main-project render.
- `sj300-main-1440-lightbox-regression.png`: 1440×1000 main-project lightbox
  render.

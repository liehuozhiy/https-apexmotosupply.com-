# F29 unified gate report — QA2

Generated: 2026-07-23 after the desktop four-column correction
Page: `frontend/pages/f29.html`
Reference: rendered final SY300 template from the authoritative read-only source tree
Runtime: installed Google Chrome controlled by the bundled Playwright runtime

This report replaces the rejected 2 × 2 desktop report. None of the previous geometry results are reused.

## Seven-width English geometry

| Width | F29 layout | Card size | F29 total height | SY300 total height | Difference | Overflow / overlap | Fresh screenshot |
| ---: | --- | --- | ---: | ---: | ---: | --- | --- |
| 375 | 4 rows × 1 column | 305 × 118 px | 748.1 px | 1427.6 px | -679.5 px | None | `f29-375.jpg` |
| 768 | 4 rows × 1 column | 658 × 118 px | 748.1 px | 813.6 px | -65.5 px | None | `f29-768.jpg` |
| 1024 | 2 rows × 2 columns | 436.3 × 118 px | 488.1 px | 506.6 px | -18.5 px | None | `f29-1024.jpg` |
| 1280 | 2 rows × 2 columns | 320.5 × 118 px | 493.7 px | 634.0 px | -140.3 px | None | `f29-1280.jpg` |
| 1440 | **1 row × 4 columns** | 176.5 × 222.8 px | 473.4 px | 560.2 px | -86.8 px | None | `f29-1440.jpg` |
| 1920 | **1 row × 4 columns** | 243.3 × 202.6 px | 458.2 px | 515.4 px | -57.2 px | None | `f29-1920.jpg` |
| 2560 | **1 row × 4 columns** | 337.9 × 202.6 px | 458.2 px | 506.6 px | -48.4 px | None | `f29-2560.jpg` |

Every width has exactly four cards, a 12 px independent gap, equal card heights within that width, and the same dark gradient treatment. The desktop breakpoint is `min-width: 1281px`; therefore 1440/1920/2560 remain one-row four-column layouts while 1280/1024/768/375 reduce columns according to available content width.

## Seven-language × seven-width stress gate

All 49 combinations of `en`, `zh-CN`, `zh-TW`, `ru`, `ar`, `es`, and `pt` at 375/768/1024/1280/1440/1920/2560 passed:

- no horizontal overflow;
- no card overlap;
- equal card heights per rendered set;
- exactly four cards;
- one-row four-column layout at 1440/1920/2560;
- total highlight height not greater than the corresponding SY300 height;
- Arabic uses `dir="rtl"`.

Worst rendered language height at each width:

| Width | Tallest language | Maximum F29 height | SY300 height | Passed |
| ---: | --- | ---: | ---: | --- |
| 375 | Russian | 861.6 px | 1427.6 px | Yes |
| 768 | English | 748.1 px | 813.6 px | Yes |
| 1024 | English | 488.1 px | 506.6 px | Yes |
| 1280 | Russian | 560.8 px | 634.0 px | Yes |
| 1440 | Russian | 509.3 px | 560.2 px | Yes |
| 1920 | Russian | 478.4 px | 515.4 px | Yes |
| 2560 | English | 458.2 px | 506.6 px | Yes |

## Gallery gate

Five gallery thumbnails and five main views loaded successfully. The main frame uses `object-fit: contain`, so each complete motorcycle remains inside the available frame.

## Official-image lightbox gate

The four highlight cards open their matching preserved official photographs.

| Interaction | Result |
| --- | --- |
| Close button | Passed |
| Backdrop click | Passed |
| Escape key | Passed |
| Keyboard Enter opens focused card | Passed |
| Official image loaded | Passed |
| Body locked while open | Passed |
| Body styles restored | Passed |
| Scroll restoration | 500 px before opening → 500 px after closing |
| Focus restoration | Returned to triggering card |
| Fresh evidence | `f29-lightbox-1440.jpg` |

## Environment-only messages

F29 HTML, CSS, JavaScript, and image resources had no request failures or page exceptions. The local static server does not implement the shared `/api/analytics` endpoint, and the sandbox blocks Google Tag Manager; neither condition is introduced by the F29 page.

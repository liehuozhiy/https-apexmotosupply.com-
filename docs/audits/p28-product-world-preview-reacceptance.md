# P28 Product-world preview re-acceptance

Date: 2026-08-02

Scope: all 27 preview assets currently mapped by `frontend/assets/js/main.js`.

Reference gate: `f4-preview-headlight-centered-v6.png` (`941×1672`, SHA-256 prefix `32f5d104f7d7`). The required visual contract is a near-1:2 portrait, complete front-facing vehicle centered at a comparable scale, clearly illuminated headlight, dark industrial corridor, restrained side red light, and wet-floor reflection. No text or watermark is allowed.

## Passed visual gate

| Model | Current asset | SHA-256 prefix |
| --- | --- | --- |
| Babey | `babey-preview-headlight-v3.png` | `44fe3145569e` |
| Babey+ | `babey-plus-preview-headlight-v5.png` | `ae6ad3fa9f07` |
| Bumblebee | `bumblebee-preview-headlight-v5.png` | `587534b6912e` |
| ER3 | `er3-preview-headlight-v3.png` | `c2cb506fed96` |
| ET | `et-preview-headlight-v1.png` | `f8936b54313c` |
| ET 2022 | `et-2022-preview-headlight-v3.png` | `d6f7b83b62fc` |
| ET5 | `et5-preview-headlight-v1.png` | `39aaab43dd66` |
| F4 | `f4-preview-headlight-centered-v6.png` | `32f5d104f7d7` |
| F9 | `f9-preview-headlight-v1.png` | `ea1f7724ac95` |
| F29R | `f29r-preview-headlight-v1.png` | `b693fdb446d4` |
| HS85 | `hs85-preview-headlight-v3.png` | `d46456ac5290` |
| S300R | `s300r-preview-headlight-v2.png` | `a47423852ae4` |
| SJ250 | `sj250-preview-headlight-v1.png` | `37fd5d8953d4` |
| SJ300 | `sj300-preview-headlight-v3.png` | `a498640a3ff9` |
| SY300 | `sy300-preview-headlight-v2.png` | `947a4ff55df0` |

## Rejected from the F4 visual gate

| Model | Current asset | Reason |
| --- | --- | --- |
| ER5 | `er5-preview-nolight-v2.png` | Explicit no-light asset; headlight gate fails. |
| ER7 | `er7-preview-headlight-v1.png` | Vehicle and headlight are too dark to read at menu-card size. |
| ES11 | `es11-preview-headlight-v1.png` | Vehicle silhouette is underexposed; lighting and reflection are insufficient. |
| ET 2024 | `et-2024-preview-headlight-v1.png` | Vehicle scale is materially smaller than the F4 reference. |
| ET3 | `et3-preview-headlight-v1.png` | No clear lit-headlight focal point. |
| ET7 | `et7-preview-headlight-v2.png` | Soft, low-contrast vehicle presentation does not hold the F4 card standard. |
| ET9 | `et9-preview-headlight-v1.png` | Headlight and centered vehicle hierarchy are insufficient. |
| F4+ | `f4-plus-preview-headlight-v1.png` | Vehicle is too small and the headlight treatment is not equivalent to F4. |
| F29 | `f29-preview-headlight-v3.png` | Vehicle is too small and too dark for the menu-card gate. |
| H300 | `h300-preview-headlight-v2.png` | Headlight is not visibly illuminated to the reference standard. |
| S300 | `s300-preview-nolight-v2.png` | Explicit no-light asset; headlight gate fails. |
| SN300 | `sn300-preview-nolight-v4.png` | Explicit no-light asset; headlight gate fails. |

## Decision

- 15 assets pass; 12 assets are rejected for a future replacement batch.
- This audit changes no asset mapping and generates no images.
- The existing filenames still provide the current model association. Any replacement batch must re-check identity against model reference images before mapping it into `main.js`.

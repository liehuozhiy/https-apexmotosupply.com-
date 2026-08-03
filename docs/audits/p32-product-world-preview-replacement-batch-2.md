# P32 Product-world preview replacement batch 2

Date: 2026-08-02

## Scope

This batch addresses the nine still-rejected items from P28. Every replacement is a new, versioned asset; the prior mapped asset remains in the repository. No product JSON, shared CSS, or shared page templates were changed.

## Gate

All accepted previews use the F4 visual rule: portrait approximately 1:2, a complete centered front vehicle with handlebar, tyre, and footpegs visible, a dark industrial corridor, restrained red side light, wet-floor reflection, no people, no logo/text/watermark, and a readable front lamp where the model has one.

| Model | Accepted asset | SHA-256 | Identity and gate result |
| --- | --- | --- | --- |
| ET 2024 | `et-2024-preview-headlight-v2.png` | `7d55308692e56bf52b5a7986e7304f3916c62553b32aaeb91a9f05887bbc26ce` | White/blue front assembly and central lamp retained; passed. |
| ET3 | `et3-preview-headlight-v2.png` | `ceb262069cb7798b5ab35dce97300cdc6545d955cfe2880090720ee56e60447e` | Red/black front structure and lamp retained; passed. |
| ET7 | `et7-preview-headlight-v3.png` | `212235abf810bf3d95680f758e216c9e37f1f33788748c427eac38d72ec8c79f` | Grey angular mask, central LED and amber signals retained; passed. |
| ET9 | `et9-preview-headlight-v2.png` | `6eab6d54280c0bdf08f5ad77f1df2148fdbcc9da3a63daaf8a204cb4da8257da` | Red plastics, gold forks and white guards retained; passed. |
| F4+ | `f4-plus-preview-headlight-v2.png` | `3357ce6d747a2d711eced84e60011a0cb37d3845817ed312b4b17397a4642309` | Bare black front end and exposed fork/cable structure retained; passed. This model has no verified lamp housing, so no fabricated headlight was added. |
| F29 | `f29-preview-headlight-v4.png` | `4d9eae4eebc935f588b997fee9dd7131ded0a93eed3a09e2105e984c00b41866` | White, blue, and red cowl plus angular lamp retained; passed. |
| H300 | `h300-preview-headlight-v3.png` | `64da5386c1067159b38e729316722cd9b97da1c4ae52ccfb2a069531513726be` | Yellow/grey rally bodywork, tall screen and central lamp retained; passed. |
| S300 | `s300-preview-headlight-v3.png` | `e595f923b0e09486c511006e4deda11b750269d1702ae217c6a00d903746fd28` | Blue/yellow angular front cowl and lamp housing retained; passed. |
| SN300 | `sn300-preview-headlight-v5.png` | `83616ffda0498dc214d13b2743394974f478b2805399d114c25554afc9d9044c` | Blue/white/yellow front cowl and broad lamp retained; passed. |

## Integration and verification

- `frontend/assets/js/main.js` maps each model to the accepted versioned asset.
- `node --check frontend/assets/js/main.js` passed.
- `node scripts/prepare-deploy.mjs` completed without error.
- All nine generated deploy assets returned HTTP 200 from `http://127.0.0.1:8010/`.
- `git diff --check` passed; only pre-existing LF/CRLF warnings were emitted.

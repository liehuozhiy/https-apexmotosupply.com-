# Product detail static generator

Product pages are compiled to complete UTF-8 HTML. Browsers never fetch the JSON
data at runtime, so SEO content and the complete product record remain available
from `file:///` and with JavaScript disabled.

## Build

```text
node scripts/build-product-pages.mjs sj300
node scripts/build-product-pages.mjs --all
```

The command requires an explicit model id or `--all`. It validates the data
against `schema.json`, renders to a temporary file, validates the generated HTML,
and atomically replaces only the requested page.

## Add a model

1. Create `data/<model-id>.json` that passes `schema.json`.
2. Keep the five gallery angles in this order: front, left-front, left-side,
   left-rear, rear.
3. Supply exactly four stats, four selling points, four highlights, all image
   alt text, parameter groups, the inquiry route, and all seven translation maps.
4. Build the model explicitly and run the responsive and interaction checks
   before adding it to a multi-model build.

The shared browser script is intentionally limited to gallery, tabs, language,
lightbox, and local-file link behavior.

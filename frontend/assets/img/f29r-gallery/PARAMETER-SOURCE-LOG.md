# F29R parameter source map

Source priority applied:

1. F29R official/current website data when the field is explicit.
2. The specified `2026H&Q产品参数（英）.xlsx` workbook for fields not present
   in current website data.
3. No guessed value.

## Website/current website data

The F29R record in `frontend/assets/js/site-data.js` explicitly supplies:

- model: `F29R`;
- series: `Time-F Series`;
- type: electric, race-oriented off-road;
- intro: race-oriented electric version;
- overall size: `2120 × 800 × 1235 mm`;
- wheelbase: `1440 mm`;
- ground clearance: `340 mm`;
- seat height: `910 mm`;
- kerb weight: `127 kg`;
- front/rear tires: `90/90-21` / `140/80-18`;
- endurance: `120 km` at `≤50 km/h`;
- top speed: `120 km/h`;
- maximum power: `32 kW`;
- modes: `ECO / Sport / Race`;
- battery: `96V55Ah`;
- charging time: `4 h`;
- IP rating: `IP67`.

The official F29R page also explicitly supplies the four displayed highlight
titles/images and the gearless high-energy direct-drive wording. See
`FEATURE-SOURCE-LOG.md`.

## Excel supplements

The specified workbook supplies fields absent from the current website record:

- maximum load: `150 kg`;
- front/rear braking: disc brakes;
- front shock absorber: `838 mm`;
- rear shock absorber: `509 mm`;
- transmission: `520 / 108L / 42T`;
- sprocket material: alloy;
- drive: chain drive;
- light: `LED`;
- maximum climbing angle: `＞70°`;
- motor type: permanent-magnet synchronous motor;
- wheel torque: `580 N·m`;
- battery temperature: charge `0→45°C`, discharge `−20→60°C`.

All values shown in `frontend/pages/f29r.html` are covered by one of these two
sources.

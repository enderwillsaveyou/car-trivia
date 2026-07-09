# Car Trivia Data Layer

This folder holds the **trivia data** that powers the game. It is the single source of truth for which cars appear in the game, what the correct answer is, what the four multiple-choice options are, and which image goes with each question.

The UI should read from this file only. Do not hardcode car names, choices, or image paths anywhere else in the app.

---

## 1. What `carTriviaData.json` is for

`carTriviaData.json` is an array of trivia question objects. One object per car. The MVP ships with 20 cars (`car_001` through `car_020`).

Each entry has the following shape:

```json
{
  "id": "car_001",
  "answer": "Ford Mustang",
  "brand": "Ford",
  "model": "Mustang",
  "era": "1960s-1970s",
  "difficulty": "easy",
  "image": "/assets/cars/car_001_ford_mustang.png",
  "choices": [
    "Ford Mustang",
    "Mercury Cougar",
    "Chevrolet Camaro",
    "Pontiac Firebird"
  ],
  "hint": "Classic pony car proportions: long hood, short rear deck..."
}
```

Field meanings:

- **id** — stable identifier, format `car_###`. Never change an existing id; it may be referenced by saves, analytics, or share links later.
- **answer** — the full correct answer string (must match the brand + model exactly).
- **brand** / **model** — split components of the answer for filtering, scoring tweaks, or "by brand" packs later.
- **era** — currently `"1960s-1970s"` for the entire MVP pack.
- **difficulty** — one of `"easy"`, `"medium"`, `"hard"`. Used by the game to weight or group questions.
- **image** — public-served path to the front 3/4 photorealistic image. Must start with `/assets/cars/`.
- **choices** — exactly **4** strings. Must contain the `answer` exactly once. The other 3 are plausible distractors.
- **hint** — short visual hint focused on the front of the car (hood, grille, headlights, badging).

---

## 2. How image filenames map to the game

Images live in:

```
public/assets/cars/
```

Filenames follow the convention:

```
car_###_<brand>_<model>.png
```

Examples:

- `car_001_ford_mustang.png`
- `car_007_chevrolet_chevelle_ss.png`
- `car_020_chevrolet_el_camino_ss.png`

Rules:

- Lowercase only.
- Spaces in the model become underscores (`Chevelle SS` → `chevelle_ss`).
- The `id` in `carTriviaData.json` must match the `###` in the filename.
- The `image` field is the **public URL path**, not the disk path: `/assets/cars/car_001_ford_mustang.png`. The leading slash is required so it resolves correctly from any route.
- A separate manifest at `public/assets/cars/metadata/car_asset_manifest.json` tracks the asset side (image + prompt file paths). Keep `id`, `brand`, `model`, `era`, `difficulty`, and `image` consistent between the two files.

---

## 3. How to add more cars later

To add a new car (e.g. `car_021`):

1. **Drop the image** into `public/assets/cars/` using the naming convention above:
   `car_021_<brand>_<model>.png`
2. **Append a new object** to the end of `carTriviaData.json` with:
   - a new unique `id` (next number in sequence — never reuse retired ids)
   - all required fields filled in
   - exactly 4 entries in `choices`, including the correct `answer`
   - `image` path matching the file you just added
3. **Update the asset manifest** at `public/assets/cars/metadata/car_asset_manifest.json` so the asset and trivia layers stay in sync.
4. **Validate** the file is still valid JSON (no trailing commas, all strings quoted) before committing.

Tips for good distractors in `choices`:

- Pick cars from the **same era and category** (pony car vs. mid-size muscle vs. compact vs. sports).
- Mix the position of the correct answer across questions — don't always make it `choices[0]`.
- Try not to overuse the same 2–3 wrong options across many questions.
- Use full "Brand Model" strings exactly as they appear in other entries' `answer` field.

---

## 4. How to avoid breaking the game when adding new assets

The game treats this JSON as a contract. Things that will break the UI:

- **Mismatched filename / image path.** If `image` points to a file that isn't in `public/assets/cars/`, the question will render with a broken image. Always verify the file is committed and the path is exactly right (case-sensitive on most servers).
- **Fewer or more than 4 choices.** The UI assumes exactly 4 options. Always 4.
- **Correct answer missing from `choices`.** The `answer` string must appear in `choices` verbatim (case, spacing, punctuation all matter).
- **Duplicate `id` values.** Ids must be unique across the file. Reusing an id will silently overwrite the older question depending on how it's keyed.
- **Invalid `difficulty`.** Stick to `"easy"`, `"medium"`, or `"hard"` — adding a new value will require UI changes first.
- **Invalid JSON.** Trailing commas, unquoted keys, or smart quotes will prevent the file from loading at all and the entire game will fail to start. Run the file through a JSON validator (or `node -e "JSON.parse(require('fs').readFileSync('src/data/carTriviaData.json','utf8'))"`) before committing.
- **Renaming a brand or model in only one place.** If you change `answer`, also update any `choices` arrays in other entries that reference that car as a distractor — they need to match exactly.

A simple sanity check before shipping a new pack:

- Every entry has all required fields.
- Every `choices` array has length 4 and contains the entry's `answer`.
- Every `image` file exists on disk.
- All `id` values are unique and follow the `car_###` format.
- Counts of easy / medium / hard still feel balanced for the pack.

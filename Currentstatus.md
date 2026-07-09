# Current Status — Classic Car ID

Last updated: 2026-07-08

## Project Status

**V2 complete and live.** The game plays as a full session: branded start screen → 20 unique questions via full shuffle queue (no repeats) → end-of-round summary with score, percentage, grade label, and Play Again. Deployed to GitHub Pages. Ready for end-to-end mobile playtest. Only outstanding content issue is the AMX image (#16).

**Live URL:** https://enderwillsaveyou.github.io/car-trivia/
**GitHub repo:** https://github.com/enderwillsaveyou/car-trivia

## Current Gameplay Loop

1. First load shows a branded start screen ("Classic Car ID" / "Chrome, shadows, and old garage clues" / "Start Engine" button).
2. Tapping Start Engine shuffles all 20 cars into a queue and begins the round.
3. Each question pulls the next car from the queue — no car repeats within a round.
4. Display the car image (WebP); if missing, display "Image unavailable."
5. Display the question and four large tap-friendly answer choices.
6. Player taps an answer; app shows correct/incorrect feedback and the hint, and updates score.
7. Player taps "Next Car" (labeled "See Results" on the final car).
8. When the queue empties, a full-screen end card shows final score (X / 20), percentage, and a grade label (Gear Head ≥90%, Garage Regular ≥75%, Shade Tree Mechanic ≥50%, Weekend Tinkerer ≥25%, Fresh Off the Lot below).
9. "Play Again" resets score and reshuffles the queue, returning straight to gameplay (start screen appears on first load only).

## Current Source-of-Truth Decision

Main gameplay data source:

src/data/carTriviaData.json

This file drives the actual quiz experience. All 20 entries reference `.webp` images.

Asset tracking file:

public/assets/cars/metadata/car_asset_manifest.json

Tracks image asset metadata. Mirrors the gameplay data and also points to `.webp` paths.

## Completed Work

- Asset folder structure in place (`public/assets/cars/`, `prompts/`, `metadata/`, `public/assets/ui/`).
- Image prompt files written (master style, batch generation prompt, 20 individual car prompts, garage backdrop prompt).
- Asset manifest written and aligned to gameplay data.
- Gameplay trivia data written (`src/data/carTriviaData.json`) — 20 cars, each with id, answer, brand, model, era, difficulty, image, choices, and hint.
- Vanilla web app shell (index.html, style.css, app.js) wired to the gameplay data, with random selection (no immediate repeat), shuffled choices, image fallback, score tracking, answer feedback, and hint display.
- All 20 car images generated as PNG into `public/assets/cars/`.
- Garage backdrop image generated.
- **Data integrity audit passed**: 20/20 cars validated. Choices contain the answer, no duplicate choices, image filenames match expected stems, no field gaps, hint lengths in target range, no duplicate answers across cars.
- **Image optimization complete**: all 20 car images and the garage backdrop converted to WebP at quality 82. Total asset payload dropped from ~41MB to ~2.6MB (94% reduction). Visual quality preserved. PNG originals retained alongside as source files.
- JSON references (gameplay data + manifest) updated to point to `.webp`.
- **V2 polish sprint (2026-07-08)**: full shuffle queue replacing "skip last car" logic (no repeats until all 20 shown); end-of-round summary screen with score, percentage, grade label, and Play Again; branded start screen (first load only); Next button relabels to "See Results" on the final car. Verified: syntax check passed, offline queue simulation confirmed 20 unique rounds with zero repeats, grade bands validated at all boundaries.
- **AMX regeneration prompt updated** (`public/assets/cars/prompts/car_016_amc_amx_prompt.md`): now specifies Big Bad Blue or Big Bad Green, two-seat roofline with no rear quarter window, short rear deck, and explicit differentiation from the Javelin. Image not yet regenerated — prompt is ready to fire.

## Current MVP Car Pack

1. Ford Mustang
2. Chevrolet Camaro
3. Dodge Charger
4. Dodge Challenger
5. Chevrolet Corvette
6. Pontiac GTO
7. Chevrolet Chevelle SS
8. Plymouth Road Runner
9. Pontiac Firebird
10. Plymouth Barracuda
11. Chevrolet Nova SS
12. Ford Torino GT
13. Mercury Cougar
14. Oldsmobile 442
15. Buick GSX
16. AMC AMX
17. AMC Javelin
18. Dodge Dart Swinger
19. Plymouth GTX
20. Chevrolet El Camino SS

## Known Issues / Watch Items

- **AMC AMX (#16) and AMC Javelin (#17) look near-identical in current images** — both rendered in the same copper/orange and as long fastback coupes. The AMX's defining trait (2-seater, no rear quarter window, shorter wheelbase) isn't clearly visible. Recommendation: regenerate the AMX in a different color (e.g., Big Bad Blue or Big Bad Green) so the two cars are easily distinguishable.
- The app should be tested through a local server, not by opening index.html directly.
- Two related data files exist (`carTriviaData.json` and `car_asset_manifest.json`). They currently align, but future updates must update both unless they're consolidated.
- PNG sources (~39MB total) are still present in `public/assets/cars/` alongside the WebPs. They aren't referenced by the app and don't ship in deployed traffic, but if you want a smaller repo, they can be moved to a separate `source/` folder or removed.

## Current Recommended Next Task

1. **Regenerate the AMX image** using the updated prompt in `public/assets/cars/prompts/car_016_amc_amx_prompt.md`, then convert to WebP (Pillow, quality=82, method=6) and replace `car_016_amc_amx.webp`.
2. **Full mobile playtest**: start a local server (`python -m http.server 8080`), open `http://<lan-ip>:8080` from a phone, and play a complete 20-question round end-to-end — start screen, no-repeat queue, end card, Play Again.
3. After playtesting: deploy to a static host (Vercel / Netlify / GitHub Pages) to close out V2.

## Future Improvement Ideas

- Add difficulty filter.
- Add streak tracking.
- Add sound effects toggle.
- Add daily challenge mode.
- Add image reveal animation.
- Add PWA manifest + service worker for installable mobile experience.
- Deploy to a simple static host.

## AI Agent Handoff Rule

Before making any changes, AI agents must:

1. Read README.md.
2. Read Currentstatus.md.
3. Read AI_Agent_Council.md (proposals, decisions, attribution log).
4. Confirm the current source-of-truth files.
5. Make only the requested focused change.
6. Summarize changed files.
7. Update Currentstatus.md if project *state* changes.
8. Add an attributed entry to AI_Agent_Council.md if making a *recommendation, decision, or implementation note* (use the entry template in that file).

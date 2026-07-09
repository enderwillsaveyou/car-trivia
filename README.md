# Classic Car ID

Classic Car ID is a mobile-first classic American car trivia game.

The player sees a front 3/4 image of a classic American car focused on the hood, grille, headlights, bumper, and front fenders, then chooses the correct brand + model from four multiple-choice answers.

## Current MVP Goal

Build a playable pure trivia mode:

1. Show one car image or placeholder.
2. Ask: "Which classic American car is this?"
3. Display four large tap-friendly answer choices.
4. Show correct/incorrect feedback.
5. Show a hint after answering.
6. Track score.
7. Move to the next car.

## Current Tech Approach

This project currently uses a simple vanilla web app structure:

- index.html
- style.css
- app.js

The goal is to keep the MVP simple, mobile-first, and easy to test locally.

## Source of Truth

The main gameplay data source is:

src/data/carTriviaData.json

This file includes:

- id
- answer
- brand
- model
- era
- difficulty
- image
- choices
- hint

Future AI agents should treat this file as the gameplay source of truth.

The asset manifest exists here:

public/assets/cars/metadata/car_asset_manifest.json

That file is for asset tracking and should not replace the gameplay trivia data unless the project owner explicitly decides to merge the data model later.

## Image Assets

Final car images should be saved here:

public/assets/cars/

Expected image filename format:

car_001_ford_mustang.png
car_002_chevrolet_camaro.png
car_003_dodge_charger.png

The app should continue working even when images are missing by showing an "Image coming soon" placeholder.

## Prompt Files

Image-generation prompts are stored here:

public/assets/cars/prompts/

These prompt files are used to manually generate consistent car images.

Do not modify these prompt files unless the task is specifically about improving or changing the image-generation workflow.

## How to Run Locally

From the project root:

C:\Users\Mike\Documents\Projects\Car_Trivia

Run:

python -m http.server 8080

Then open:

http://localhost:8080

If port 8080 is unavailable, use a nearby port such as 8081, 8082, 5173, or 5174.

## AI Agent Startup Rule

Before making changes, every AI coding agent must review:

1. README.md
2. Currentstatus.md
3. AI_Agent_Council.md

The agent should understand the current project state, source-of-truth decisions, recent changes, known issues, active proposals, and next recommended task before modifying files.

After making meaningful changes or recommendations, the agent must add an attributed entry to `AI_Agent_Council.md` (see that file's entry template) so future agents and Mike can trace who suggested what and why.

## Development Rules

- Keep changes focused.
- Avoid redesigning the whole app unless specifically requested.
- Do not create competing data sources.
- Do not add unnecessary dependencies.
- Preserve the mobile-first MVP direction.
- Keep the app playable even before final images are added.
- Summarize files changed after each task.
- Update Currentstatus.md after meaningful changes.

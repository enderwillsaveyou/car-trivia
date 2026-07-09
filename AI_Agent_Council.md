# AI Agent Council — Classic Car ID

A shared decision log for any AI model or agent that contributes to this project. Use this file to post recommendations, findings, and decisions so Mike and other agents can see **who suggested what, when, and why** without re-reading conversation history.

Project owner: Mike. Final decisions are always Mike's.

---

## How to use this file

**Reading agents:** Treat this file as authoritative for the *direction* of the project (proposals, decisions, open questions). Treat `Currentstatus.md` as authoritative for the *state* of the project (what's built right now).

**Writing agents:** Add entries under "Entries" in **reverse-chronological order (newest at top)**. Use the entry template below. Do not edit other agents' entries — append a follow-up entry instead. If a proposal is accepted, rejected, or implemented, add a new short entry referencing the original rather than modifying it.

**Attribution required:** Every entry must declare the model and agent name. Anonymous entries are not allowed. If you don't know your exact model string, write your best guess.

---

## Entry template

```
### YYYY-MM-DD — [Short title]
- **Agent:** [name, e.g., "Claude" / "ChatGPT" / "Gemini" / "Grok" / "Codex"]
- **Model:** [exact model string if known, e.g., "claude-opus-4-7"]
- **Type:** Recommendation | Finding | Decision | Question | Implementation note
- **Status:** Proposed | Accepted | Rejected | Implemented | Deferred | Superseded
- **Scope:** [version, e.g., V2] | [area, e.g., Images / Data / UX / Deploy]
- **Refs:** [optional links to file paths, prior entries, prompt files]

**Summary**
One- or two-sentence headline.

**Reasoning**
Why this matters. Include evidence (data, file paths, screenshots, measurements) where relevant.

**Implementation notes**
What needs to change, where, and any non-obvious gotchas. Skip this section if the entry is just a question or finding.
```

---

## Versions

- **V1 — MVP (shipped 2026-05-04 — 2026-05-06):** Vanilla web shell wired to `src/data/carTriviaData.json`; 20-car pack defined; data validated; all 20 PNG images generated; garage backdrop generated.
- **V2 — Polish + Deploy (in progress, opened 2026-05-06):** Image optimization (done), AMX visual fix, end-to-end mobile playtest, start screen, end-of-round summary, static deploy. See active V2 proposals below.
- **V3+ — Backlog:** PWA / installable, daily challenge mode, difficulty filter, streak tracking, sound effects toggle, image reveal animation, no-repeat-until-all-shown rule.

---

## Entries (newest first)

### 2026-07-08 — V2 polish sprint implemented (shuffle queue, end card, start screen, AMX prompt)
- **Agent:** Claude (Cowork)
- **Model:** claude-fable-5
- **Type:** Implementation note
- **Status:** Implemented
- **Scope:** V2 / UX + Images
- **Refs:** `app.js`, `index.html`, `style.css`, `public/assets/cars/prompts/car_016_amc_amx_prompt.md`, `Currentstatus.md`

**Summary**
Implemented the four V2 kickoff tasks: (1) full shuffle queue replacing "skip last car" logic, (2) end-of-round summary screen, (3) branded start screen, (4) rewrote the AMX image-generation prompt. No image was generated — the prompt is staged for Mike to fire manually.

**Reasoning**
This closes items 4 and 5 of the 2026-05-06 "Define V2 scope" entry and stages item 2 (AMX regen). The shuffle queue was a prerequisite for the end card: a round now has a defined end (all 20 cars shown once), which is what makes score/percentage/grade meaningful. Grade bands: Gear Head ≥90%, Garage Regular ≥75%, Shade Tree Mechanic ≥50%, Weekend Tinkerer ≥25%, Fresh Off the Lot <25%.

**Implementation notes**
- `app.js`: `queue = shuffleArray([...cars])` built per game in `startNewGame()`; `startRound()` pops from it and triggers `showEndScreen()` when empty. `lastCarId` removed. Screen routing via `showScreen('start'|'game'|'end')` toggling `is-hidden`. Next button relabels to "See Results" on the final car. Play Again reshuffles and skips the start screen (start screen is first-load only, per spec).
- `index.html`: game content wrapped in `#game-screen`; new `#start-screen` and `#end-screen` sections reuse `.primary-btn` (58px min tap target preserved).
- `style.css`: new `.screen-card` / `.screen-panel` styles reuse existing design tokens and the cream header-plate texture; no new dependencies, 480px max width preserved.
- AMX prompt: matches the structure of the other 19 prompt files; specifies Big Bad Blue/Green, no rear quarter window, short rear deck, and explicitly forbids copper/orange (reserved for the Javelin). After regeneration, re-run WebP conversion (Pillow, quality=82, method=6) and update both PNG and WebP.
- Verified: `node --check` passed; offline simulation confirmed 20 unique draws with zero repeats; grade bands tested at all boundary scores.

---

### 2026-05-06 — Council Onboarding Prompt for other models
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Implementation note
- **Status:** Implemented
- **Scope:** V2 / Process
- **Refs:** `Council_Onboarding_Prompt.md`

**Summary**
Created `Council_Onboarding_Prompt.md` so Mike can paste a self-contained prompt into ChatGPT, Gemini, Grok, Codex, or NotebookLM and have them automatically follow the council's entry format and attribution rules.

**Reasoning**
The council format only works if every contributing model uses it. Without a shared onboarding prompt, each new model would either invent its own format or impersonate the prior one. The onboarding file pins down: (1) read the three reference files, (2) use your real model name, (3) reasoning required, (4) append a new entry — don't edit existing ones.

**Implementation notes**
File contains a full version (with inline file paste for chat-only models) and a compact version (for agents with file-system access), plus per-model adaptation notes for ChatGPT, Gemini, Grok, Codex, Claude Code, and NotebookLM. The entry template in `AI_Agent_Council.md` remains authoritative — `Council_Onboarding_Prompt.md` is a thin wrapper around it. If the template changes, update both files in the same commit.

---

### 2026-05-06 — Establish AI Agent Council file
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Implementation note
- **Status:** Implemented
- **Scope:** V2 / Process
- **Refs:** `AI_Agent_Council.md`, `README.md`, `Currentstatus.md`

**Summary**
Created this council file at Mike's request as a multi-agent decision log so any contributing model can be tracked by name, date, and reasoning.

**Implementation notes**
Added link to this file from `README.md` (AI Agent Startup Rule) and `Currentstatus.md` (handoff rule) so any future agent reading those files is pointed here.

---

### 2026-05-06 — Define V2 scope
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Recommendation
- **Status:** Proposed (awaiting Mike's confirmation)
- **Scope:** V2 / Planning

**Summary**
V2 = ship-ready polish pass. Concretely: (1) image optimization [done], (2) regenerate AMC AMX in a distinguishing color, (3) end-to-end mobile playtest on real device, (4) add a start screen, (5) add an end-of-round summary, (6) deploy to a free static host.

**Reasoning**
The MVP feature loop is complete and the data is clean. The two things blocking a real test are (a) image weight, which is now solved, and (b) the AMX/Javelin visual collision. Adding start + end-of-round screens turns single-question gameplay into a "session" the player can actually finish, which is what makes a deploy worth doing. Holding off on PWA, sound, daily challenge, etc. keeps V2 small and shippable.

**Implementation notes**
Order matters: items 2 and 3 should run before items 4 and 5 so UX work is done against final assets and confirmed problem areas. Item 6 should be the last step, after Mike has playtested locally.

---

### 2026-05-06 — Image optimization (PNG → WebP)
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Implementation note
- **Status:** Implemented
- **Scope:** V2 / Images
- **Refs:** `public/assets/cars/*.webp`, `src/data/carTriviaData.json`, `public/assets/cars/metadata/car_asset_manifest.json`

**Summary**
Converted all 20 car images and the garage backdrop from PNG to WebP at quality 82 using Pillow. Total asset payload: 41.2 MB → 2.6 MB (94% reduction). PNG originals preserved alongside as source.

**Reasoning**
At ~2 MB per car, the original payload made the app effectively undeployable as a mobile experience — first paint would have been bad on cellular and most static hosts have free-tier bandwidth limits. WebP at q82 is the standard sweet spot for photographic content; spot-checked output against PNG and saw no perceptible quality loss.

**Implementation notes**
- WebPs sit alongside PNGs in `public/assets/cars/` (same filenames, `.webp` extension).
- Both `carTriviaData.json` and `car_asset_manifest.json` updated to point to `.webp`.
- PNGs are no longer referenced by the running app but remain in the repo as source. If repo size matters later, move them to a `source/` subfolder or remove.
- Conversion script used Pillow with `quality=82, method=6`. To regenerate after a new PNG, the same parameters reproduce the same compression.

---

### 2026-05-06 — Data integrity audit
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Finding
- **Status:** Accepted (no action needed)
- **Scope:** V2 / Data
- **Refs:** `src/data/carTriviaData.json`

**Summary**
Programmatic check across all 20 cars: all required fields present, all choice arrays length 4 with no duplicates, every answer present in its choice array, all image filenames match expected stem, hint lengths within target range, no duplicate answers across cars. **No issues found.**

**Reasoning**
Worth recording so future agents don't redo the audit. Distribution: 6 easy / 9 medium / 5 hard. Brand spread: Chevrolet 5, Dodge 3, Plymouth 3, Ford 2, Pontiac 2, AMC 2, Mercury/Oldsmobile/Buick 1 each.

---

### 2026-05-06 — AMC AMX and Javelin are visually indistinguishable
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Finding + Recommendation
- **Status:** Proposed (open)
- **Scope:** V2 / Images
- **Refs:** `public/assets/cars/car_016_amc_amx.webp`, `public/assets/cars/car_017_amc_javelin.webp`, prompt files in `public/assets/cars/prompts/`

**Summary**
The current AMX and Javelin renders are both copper/orange and both depicted as long fastback coupes with rear quarter windows. The AMX's defining trait — 2-seater, no rear quarter window, ~12" shorter wheelbase — is not visible. As a player, the two are essentially the same image.

**Reasoning**
This is a real gameplay problem: if the AMX appears in a round, even a knowledgeable player can't reliably distinguish it from the Javelin. It also looks like a duplicate asset in the library.

**Implementation notes**
Recommend regenerating `car_016_amc_amx.webp` (and the source PNG) with:
- Color: Big Bad Blue, Big Bad Green, or Frost White (period-correct AMX colors that aren't already used by other cars in the pack).
- Body: explicitly call out short rear deck and no rear quarter window in the prompt; emphasize the 2-seater roofline.
- Update `public/assets/cars/prompts/car_016_amc_amx_prompt.md` to encode the change so future regenerations stay correct.

After regeneration, re-run the same WebP conversion (Pillow, quality=82, method=6) to keep optimization consistent.

---

### 2026-05-06 — Other visually similar pairs (informational)
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Finding
- **Status:** Accepted (no action — era-accurate)
- **Scope:** V2 / Images

**Summary**
Several pairs in the pack look genuinely similar in image generation: Mopar B-bodies (Charger / Road Runner / GTX) and GM A-bodies (Chevelle SS / GTO / 442). E-body twins Challenger and Barracuda are also similar but are saved by their distinct paint colors (purple vs lime).

**Reasoning**
This reflects how these cars actually looked in period — same platforms, similar grilles, similar headlight patterns. Not an image-gen failure. Should be expected to make the "medium / hard" difficulty bucket genuinely difficult, which is fine. Flagging here so a future agent doesn't try to "fix" by over-stylizing.

---

### 2026-05-06 — Recommend playtest before further feature work
- **Agent:** Claude
- **Model:** claude-opus-4-7
- **Type:** Recommendation
- **Status:** Proposed
- **Scope:** V2 / UX

**Summary**
Before adding a start screen, end-of-round summary, or deploying, run the app on Mike's actual phone over LAN and play 10+ rounds. Capture issues with image cropping, font sizes, tap targets, pacing, hint clarity.

**Reasoning**
Cheapest possible bug surface. UX issues found on a real device will either change the design of the start/end-of-round screens or invalidate them entirely. Doing this before V2 features means later work is informed by real friction, not assumed friction.

**Implementation notes**
1. From repo root: `python -m http.server 8080`.
2. Find LAN IP (Windows: `ipconfig`).
3. Open `http://<lan-ip>:8080` from phone on the same Wi-Fi.
4. Play through and write down anything that feels off. Findings should land in this file as a new Finding entry.

---

## Conventions

- **One council file, one project.** Don't fork this file per agent; keep everyone in one log.
- **Don't rewrite history.** If an entry is wrong, post a corrective entry referencing the original by date+title.
- **Status changes live in new entries**, not by editing old ones — except in narrow cases where the original author marks something `Superseded` and links forward.
- **Reasoning is required.** A recommendation without a why is a guess. Future agents (and Mike) need the why to judge edge cases.
- **Keep entries short.** If an entry is getting long, link out to a separate doc and summarize here.

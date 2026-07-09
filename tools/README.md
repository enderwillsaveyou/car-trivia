# Tools — Image Import Workflow

This folder contains a single helper script for getting the 20 car images out of Google AI Studio (Imagen) and into the trivia game with the correct filenames and format.

## Why this exists

The game's data file (`src/data/carTriviaData.json`) expects images at very specific paths like `/assets/cars/car_001_ford_mustang.webp`. Doing the rename + WebP conversion by hand for 20 images is annoying and error-prone. This script does it for you.

## One-time setup

Install Pillow (the only dependency):

```
pip install Pillow
```

That's it.

## The loop

Open PowerShell in the project root (`C:\Users\Mike\Documents\Projects\Car_Trivia`) and keep two windows handy: one for this script, one for your browser pointed at https://aistudio.google.com.

### 1. See what's next

```
python tools/import_image.py --next
```

This prints the next pending car and dumps its prompt file to stdout, ready to copy.

### 2. Generate in AI Studio

- Open https://aistudio.google.com
- Pick an Imagen model (Imagen 4 / Imagen 4 Ultra are both fine)
- Set aspect ratio to **16:9 landscape**
- Paste the prompt
- Generate. Pick the best of the candidates.
- Save the image. Don't worry about the filename — leave it as whatever AI Studio gives you. Save to `Downloads` or any folder you like.

### 3. Import it

```
python tools/import_image.py "C:\Users\Mike\Downloads\<whatever-filename>.png"
```

The script will:

1. Pick the next pending car automatically (lowest `car_NNN` with no image yet)
2. Convert the source image to WebP (quality 90)
3. Save it to `public/assets/cars/` with the correct filename
4. Print the served URL so you can verify in the browser
5. Show you what car is next, and the path to its prompt

### 4. Repeat 20 times

Refresh the game in your browser between rounds (or after a batch). The placeholders will be replaced with real photos as soon as the files appear.

## Other commands

### Check progress

```
python tools/import_image.py --status
```

Shows how many of the 20 are done, lists any that are still missing.

### Redo a specific car

If you don't like the image you generated for, say, car_007 and want to replace it:

```
python tools/import_image.py 7 "C:\Users\Mike\Downloads\new-image.png"
```

The number is just `7`, not `007` — the script handles padding. This will overwrite the existing file.

## Troubleshooting

**`ModuleNotFoundError: No module named 'PIL'`** — Pillow isn't installed. Run `pip install Pillow`.

**`python` not recognized** — Use `py` instead: `py tools/import_image.py --status`.

**The image looks broken in the game even though the file exists** — Hard-refresh the browser (Ctrl+Shift+R) to bypass cache. The Python http.server doesn't send strong cache headers but the browser may still cache the placeholder behavior.

**Imagen filename collisions in Downloads** — Doesn't matter. The script reads from wherever you point it and writes the correct final name into `public/assets/cars/`. The original download is untouched and can be deleted whenever.

**You generated images out of order** — Use the specific-car mode (`python tools/import_image.py <number> <path>`) instead of auto-mode. Auto-mode always picks the lowest pending number.

## What this script does NOT do

- Generate images. That's still on you and AI Studio.
- Resize or crop. Whatever resolution Imagen gives you is what gets saved (only the format and compression change).
- Modify the trivia data file. Filenames in the JSON are the source of truth; the script reads them and writes outputs to match.
- Delete or back up your original downloads. They stay where you saved them.

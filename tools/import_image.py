#!/usr/bin/env python3
r"""
import_image.py — drop a generated car image into the trivia game.

Reads the trivia data file to know which 20 cars are expected and what each
final filename should be. Converts whatever image you point it at (PNG, JPG,
WebP, etc.) to .webp at quality 90, and saves it under public/assets/cars/
with the exact filename the JSON references.

Usage:
  python tools/import_image.py --status
      Show how many of the 20 car images are already in place.

  python tools/import_image.py --next
      Print the next pending car and the path to its prompt file.

  python tools/import_image.py <image_path>
      Auto-mode: import this image as the next missing car (lowest car_id
      that has no image yet).

  python tools/import_image.py <car_number> <image_path>
      Specific mode: import this image as car_<NNN>, regardless of what's
      already there. Will overwrite an existing image. Useful for redos.

Examples (PowerShell):
  python tools/import_image.py --status
  python tools/import_image.py "$env:USERPROFILE\Downloads\imagen-1234.png"
  python tools/import_image.py 7 "$env:USERPROFILE\Downloads\imagen-9999.png"

Requires: Pillow (pip install Pillow)
"""

import json
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow is required. Install with:")
    print("  pip install Pillow")
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "src" / "data" / "carTriviaData.json"
OUT_DIR = ROOT / "public" / "assets" / "cars"
PROMPTS_DIR = ROOT / "public" / "assets" / "cars" / "prompts"

WEBP_QUALITY = 90
WEBP_METHOD = 6  # 0..6, higher = better compression, slower; fine for one-offs


def load_cars():
    if not DATA_FILE.exists():
        print(f"ERROR: data file not found: {DATA_FILE}")
        sys.exit(1)
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def target_path_for(car):
    # car["image"] looks like "/assets/cars/car_001_ford_mustang.webp"
    return OUT_DIR / Path(car["image"]).name


def find_prompt_for(car):
    matches = list(PROMPTS_DIR.glob(f"{car['id']}_*.md"))
    return matches[0] if matches else None


def cmd_status(cars):
    done, missing = [], []
    for c in cars:
        (done if target_path_for(c).exists() else missing).append(c)
    print(f"Images present: {len(done)} / {len(cars)}")
    if missing:
        print("\nMissing:")
        for c in missing:
            print(f"  {c['id']}  {c['answer']}")
    else:
        print("\nAll 20 car images are in place.")


def cmd_next(cars):
    pending = [c for c in cars if not target_path_for(c).exists()]
    if not pending:
        print("All 20 car images are in place. Nothing pending.")
        return
    nxt = pending[0]
    print(f"Next pending: {nxt['id']}  {nxt['answer']}  ({nxt['difficulty']})")
    prompt = find_prompt_for(nxt)
    if prompt:
        print(f"Prompt file:  {prompt.relative_to(ROOT)}")
        print("\n--- prompt contents ---")
        print(prompt.read_text(encoding="utf-8"))
    else:
        print("WARNING: no prompt file found for this car.")


def import_image(car, src_path):
    src = Path(src_path).expanduser()
    if not src.exists():
        print(f"ERROR: image not found: {src}")
        sys.exit(1)

    target = target_path_for(car)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    try:
        im = Image.open(src)
        # Drop alpha if present; WebP handles RGB fine and files are smaller
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        elif im.mode == "RGBA":
            im = im.convert("RGB")
        im.save(target, "WEBP", quality=WEBP_QUALITY, method=WEBP_METHOD)
    except Exception as e:
        print(f"ERROR: failed to convert {src}: {e}")
        sys.exit(1)

    size_kb = target.stat().st_size / 1024
    print(f"OK  {car['id']}  {car['answer']}")
    print(f"    source : {src}")
    print(f"    saved  : {target}  ({size_kb:.1f} KB)")
    print(f"    served : http://localhost:8080{car['image']}")


def main():
    args = sys.argv[1:]
    cars = load_cars()

    if not args:
        print(__doc__)
        sys.exit(0)

    if args == ["--status"]:
        cmd_status(cars)
        return

    if args == ["--next"]:
        cmd_next(cars)
        return

    # Specific mode: <car_number> <image_path>
    if len(args) == 2 and args[0].isdigit():
        n = int(args[0])
        car_id = f"car_{n:03d}"
        car = next((c for c in cars if c["id"] == car_id), None)
        if car is None:
            print(f"ERROR: no entry with id {car_id} in data file")
            sys.exit(1)
        import_image(car, args[1])
        return

    # Auto mode: <image_path>
    if len(args) == 1:
        pending = [c for c in cars if not target_path_for(c).exists()]
        if not pending:
            print("All 20 car images already exist. Use specific mode to overwrite:")
            print("  python tools/import_image.py <car_number> <image_path>")
            sys.exit(0)
        import_image(pending[0], args[0])
        # Show what's next so the loop is obvious
        still_pending = [c for c in cars if not target_path_for(c).exists()]
        if still_pending:
            nxt = still_pending[0]
            print(f"\nNext up: {nxt['id']}  {nxt['answer']}  ({nxt['difficulty']})")
            prompt = find_prompt_for(nxt)
            if prompt:
                print(f"Prompt:  {prompt.relative_to(ROOT)}")
        else:
            print("\nAll 20 car images are now in place. Game is fully visual.")
        return

    print("ERROR: unrecognized arguments.")
    print(__doc__)
    sys.exit(1)


if __name__ == "__main__":
    main()

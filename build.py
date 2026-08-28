#!/usr/bin/env python3
"""Build Chrome and Firefox extension packages from src/.

Usage:
    python3 build.py

Produces:
    dist/note-search-for-sap-chrome.zip
    dist/note-search-for-sap-firefox.zip

The two browsers have slightly different manifest requirements:
  - Chrome uses `background.service_worker`
  - Firefox uses `background.scripts` and requires `browser_specific_settings.gecko.id`

Everything else is identical, so we ship one source tree and rewrite the
manifest at build time.
"""
from __future__ import annotations

import json
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"

# Source files to include in every build (relative to src/).
SHIP_FILES = [
    "manifest.json",
    "popup.html",
    "popup.css",
    "popup.js",
    "background.js",
    "icons/icon16.png",
    "icons/icon48.png",
    "icons/icon128.png",
]


def load_base_manifest() -> dict:
    return json.loads((SRC / "manifest.json").read_text())


def chrome_manifest(base: dict) -> dict:
    """Chrome MV3 manifest — the source manifest is already Chrome-shaped."""
    m = json.loads(json.dumps(base))  # deep copy
    m["background"] = {"service_worker": "background.js"}
    return m


def firefox_manifest(base: dict) -> dict:
    """Firefox MV3 manifest.

    Differences from Chrome:
      - Requires browser_specific_settings.gecko.id (for signing/install).
      - Uses background.scripts (broadly compatible with Firefox 115+).
    """
    m = json.loads(json.dumps(base))
    m["browser_specific_settings"] = {
        "gecko": {
            "id": "note-search-for-sap@pearl-bst.github.io",
            "strict_min_version": "115.0",
        }
    }
    m["background"] = {"scripts": ["background.js"]}
    return m


def build(target: str, manifest: dict) -> Path:
    DIST.mkdir(exist_ok=True)
    out_path = DIST / f"note-search-for-sap-{target}.zip"

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zf:
        # Write the customized manifest
        zf.writestr("manifest.json", json.dumps(manifest, indent=2) + "\n")
        # Write the rest of the source files as-is
        for rel in SHIP_FILES:
            if rel == "manifest.json":
                continue
            src = SRC / rel
            if not src.exists():
                raise FileNotFoundError(f"Missing source file: src/{rel}")
            zf.write(src, arcname=rel)

    size_kb = out_path.stat().st_size / 1024
    print(f"  wrote {out_path.relative_to(ROOT)}  ({size_kb:.1f} KB)")
    return out_path


def main():
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir()

    base = load_base_manifest()
    print("Building Chrome…")
    build("chrome", chrome_manifest(base))
    print("Building Firefox…")
    build("firefox", firefox_manifest(base))

    print()
    print("Done.")
    print("  Chrome:  chrome://extensions -> 'Load unpacked' -> select the src/ folder")
    print("           (or unzip dist/note-search-for-sap-chrome.zip and load that)")
    print("  Firefox: about:debugging -> 'Load Temporary Add-on…' ->")
    print("           select dist/note-search-for-sap-firefox.zip")


if __name__ == "__main__":
    main()

# SAP Note Search — Browser Extension

A minimal, English-language extension to quickly open SAP Notes by number and
jump to common SAP for Me services. Works in Chrome and Firefox.

## Features

- **Popup search** — type a note number, press Enter to open it
- **Right-click context menu** — highlight a note number on any page → open it directly
- **Keyboard shortcut** — `Alt+S` opens the popup with the input focused
- **Search history with pinning** — recent notes are saved; star ones you reference often so they stay at the top
- **Light / dark theme** — toggle in the header, preference is remembered
- **Quick links** — Remote Connectivity, Service Requests, Cases, Software Center
- **Smart number parsing** — accepts pasted numbers with whitespace (`" 2 937 925 "`),
  embedded numbers (`see SAP Note 2937925`), and leading zeros (`0002937925`)

## Install — Chrome

1. Build the zips: `python3 build.py` (or use `dist/sap-note-search-chrome.zip`).
2. Unzip somewhere permanent.
3. Open `chrome://extensions`, enable **Developer mode** (top-right toggle).
4. Click **Load unpacked**, select the unzipped folder.
5. Pin the extension from the puzzle-piece menu in the toolbar.

## Install — Firefox

1. Build: `python3 build.py` → produces `dist/sap-note-search-firefox.zip`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…**.
4. Select the `manifest.json` file inside the unzipped firefox build (or the
   `.zip` directly — Firefox accepts both).

Note: temporary add-ons are unloaded when Firefox restarts. For a persistent
install you'd need to sign the extension via Mozilla's add-on developer hub.

## Use

**From the toolbar (or `Alt+S`):**
- Type a note number (e.g. `2937925`), press **Enter**.
- A new tab opens at `https://me.sap.com/notes/<number>`.

**From any web page:**
- Highlight a note number (or text containing one).
- Right-click → **Open as SAP Note: "..."**.

**History:**
- Recent notes appear under "recent" in the popup.
- Click a row to reopen the note.
- Click the star to pin (pinned notes stick to the top, never auto-trimmed).
- Click the × to remove an entry.
- Up to 25 unpinned entries are kept; pinned ones are unlimited.

You'll need an active S-user session for SAP for Me to display notes.

## File overview

```
sap-note-search/
├── manifest.json     ← Source manifest (Chrome shape)
├── popup.html        ← Popup UI
├── popup.css         ← Styling, with light/dark theme variables
├── popup.js          ← Form, history, theme toggle
├── background.js     ← Service worker / event page (context menu)
├── icons/            ← 16 / 48 / 128 px PNG icons
├── make_icons.py     ← Regenerate icons
├── build.py          ← Build Chrome + Firefox zips into dist/
└── dist/             ← Build output (created by build.py)
```

## Customizing

- **More quick links**: edit the `<nav class="links">` block in `popup.html`.
- **Different URL pattern**: edit `noteUrl()` in `popup.js` and `NOTE_URL` in
  `background.js`. For the classic launchpad, use
  `https://launchpad.support.sap.com/#/notes/<number>`.
- **Different shortcut**: change the `commands._execute_action.suggested_key`
  block in `manifest.json`. Users can also rebind via `chrome://extensions/shortcuts`.
- **Theme defaults**: change `loadTheme()` in `popup.js` — currently defaults to dark.
- **Colors**: edit the `:root` and `:root[data-theme="light"]` blocks in `popup.css`.

## Building

```bash
python3 build.py
# → dist/sap-note-search-chrome.zip
# → dist/sap-note-search-firefox.zip
```

The build script keeps one source manifest and rewrites it for each browser
(Firefox needs `browser_specific_settings.gecko.id` and uses
`background.scripts` instead of `background.service_worker`).

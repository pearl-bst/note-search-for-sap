# Contributing

Thanks for your interest in improving Note Search for SAP.

## Reporting bugs and requesting features

Open a [GitHub Issue](../../issues) with:

- A clear title describing the problem or request
- Steps to reproduce (for bugs), or a description of the desired behavior (for features)
- Browser and version (e.g. Chrome 128 on macOS)
- Extension version — visible in `chrome://extensions` or `about:addons`

## Submitting changes

For small fixes (typos, minor UI tweaks, obvious bugs), feel free to open a pull request directly. For larger changes (new features, refactors, dependency additions), open an issue first to discuss the approach before writing code.

## Local development

### Prerequisites

- **Chrome** or **Firefox** for testing
- **Python 3** — only needed if you want to run `build.py` to produce distributable zips

### Loading the extension for development

You don't need to build anything to develop — you can load the `src/` folder directly.

**Chrome:**
1. Open `chrome://extensions`
2. Enable Developer mode (toggle in the top-right)
3. Click "Load unpacked"
4. Select the `src/` folder
5. After code changes, click the reload icon on the extension's card

**Firefox:**
1. Open `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on…"
3. Select `src/manifest.json`
4. After code changes, click "Reload" on the extension's card

Note: Firefox uses a slightly different manifest format for the background script. When loading `src/` directly in Firefox for development, the background script may not initialize because the source manifest is Chrome-shaped. Build first (`python3 build.py`) and load `dist/note-search-for-sap-firefox.zip` for full Firefox testing.

### Building distributable zips

```bash
python3 build.py
```

Outputs go to `dist/`:
- `note-search-for-sap-chrome.zip` — upload to Chrome Web Store
- `note-search-for-sap-firefox.zip` — install in Firefox

## Coding conventions

- **Vanilla JavaScript** — no build step, no bundler, no dependencies. Keep it that way.
- **Cross-browser** — use the `api` shim at the top of each script (`const api = (typeof browser !== "undefined") ? browser : chrome;`) rather than referencing `chrome` or `browser` directly.
- **CSS variables** for theming — see the `:root` and `:root[data-theme="light"]` blocks in `popup.css`. Don't hardcode colors elsewhere.
- **No new permissions without discussion** — the extension deliberately requests as few permissions as possible. If a feature would need a new permission, open an issue first.

## Testing checklist before submitting a PR

- [ ] Popup opens without console errors
- [ ] Note number search works (try `2937925`)
- [ ] Right-click on a highlighted number opens the note
- [ ] `Alt+S` shortcut opens the popup
- [ ] History persists across popup close/reopen
- [ ] Pin and remove buttons in history work
- [ ] Theme toggle works and persists
- [ ] Quick links open the correct URLs
- [ ] Both light and dark themes render correctly

## Releasing (maintainers)

1. Bump `version` in `src/manifest.json` (semver: patch for fixes, minor for features)
2. Run `python3 build.py` to generate fresh zips
3. Commit and tag: `git tag v1.x.x && git push --tags`
4. Upload `dist/note-search-for-sap-chrome.zip` to the Chrome Web Store dashboard
5. Attach both zips to a new [GitHub Release](../../releases)

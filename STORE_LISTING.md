# Chrome Web Store — Listing Copy

Copy-paste this into the corresponding fields of the Developer Dashboard
when creating your store listing.

**Extension name:** Note Search for SAP
**Visibility:** Public (searchable on the Chrome Web Store)

---

## Extension name

```
Note Search for SAP
```

(Maximum 75 characters.)

---

## Short description (132 chars max)

```
Open any SAP Note instantly. Search by number, right-click selected text, or use Alt+S. Includes pinnable history and quick links.
```

(That's exactly 132 characters. If you need to trim: `Open any SAP Note instantly. Search by number, right-click text, or use Alt+S. Includes history and quick links.` — 113 chars.)

---

## Category

`Productivity` (best fit) — *or* `Developer Tools` if you'd rather signal the technical audience.

---

## Language

`English`

---

## Detailed description

```
Note Search for SAP is a focused, no-frills extension for anyone who works with SAP support content every day — Basis administrators, consultants, ABAP developers, and functional analysts.

WHAT IT DOES

Type a SAP Note number into the toolbar popup and press Enter — the note opens at https://me.sap.com/notes/<number> in a new tab. That's the core. Everything else is built around making that single action as fast as possible.

THREE WAYS TO OPEN A NOTE

• Toolbar popup — click the icon (or press Alt+S) and type
• Right-click menu — highlight a number anywhere on the web → "Open as SAP Note"
• History — click any number you've opened before to jump back

SMART NUMBER PARSING

Paste messy text — the extension will find the number. Works with:
• Clean numbers: 2937925
• Whitespace: " 2 937 925 "
• Leading zeros: 0002937925
• Embedded in text: "see SAP Note 2937925 for details"

HISTORY WITH PINNING

Every note you open is saved locally. Click the star to pin notes you reference often — pinned notes stay at the top and aren't trimmed when the history fills up. Click the × to remove single entries.

QUICK LINKS

One-click access to the SAP for Me services you actually use:
• Remote Connectivity
• Service Requests
• Cases
• Software Center

KEYBOARD SHORTCUT

Alt+S opens the popup with the search field focused. Rebindable from chrome://extensions/shortcuts.

LIGHT OR DARK

Toggle the theme from the popup header. Your choice is remembered.

PRIVACY

No analytics. No telemetry. No third-party requests. Everything is stored locally in your browser — see the privacy policy for the (very short) details.

NOT AFFILIATED WITH SAP

This extension is an independent tool. It is not affiliated with, endorsed by, or sponsored by SAP SE. "SAP" and "SAP for Me" are trademarks of SAP SE.
```

---

## Permission justifications

When the Developer Dashboard asks you to justify each permission, paste these:

### `tabs`
```
Used to open SAP Notes in new browser tabs when the user clicks a search result, history item, quick link, or uses the right-click context menu. The extension only creates new tabs; it does not read information about the user's existing tabs.
```

### `contextMenus`
```
Used to add a single "Open as SAP Note" item to the browser's right-click menu, which appears only when the user has highlighted text on a page. This is one of the core features of the extension.
```

### `notifications`
```
Used to display a brief desktop notification when the user invokes the right-click "Open as SAP Note" menu but the highlighted text does not contain a valid SAP Note number. This gives clear feedback instead of silently doing nothing.
```

### `storage`
```
Used to persist two preferences locally via chrome.storage.local: (1) the user's theme choice (light or dark), and (2) the recent-note history (note numbers and pinned/unpinned flags) so users can quickly reopen previously visited notes. No data is transmitted anywhere.
```

### Host permissions
This extension does **not** request any host permissions. You can leave this section empty.

### Remote code
This extension does **not** execute any remote code. All JavaScript ships in the package.

---

## Data usage disclosures

In the **Privacy Practices** tab of the Developer Dashboard:

### "What user data will this extension collect?"

Check **only**: **Website content** (because the right-click selection text is briefly processed in memory).

Uncheck everything else (Personally identifiable info, Health, Financial, Authentication, Personal communications, Location, Web history, User activity).

### Certifications

Tick all three:
- ✓ I do not sell or transfer user data to third parties, outside of the approved use cases
- ✓ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ✓ I do not use or transfer user data to determine creditworthiness or for lending purposes

### Single purpose

```
The single purpose of this extension is to help users quickly open SAP Notes and access SAP for Me services by searching, right-clicking selected text, or using a keyboard shortcut.
```

### Privacy policy URL

Paste the URL where you've hosted PRIVACY_POLICY.md (e.g. a GitHub Pages site, your personal website, or a Gist's raw URL).

---

## Visibility

**Selected: Public** — the extension is searchable by anyone in the Chrome Web Store.

For reference, the alternatives would have been:
- **Unlisted** — only people with the direct URL can install it (good for team-internal tools)
- **Private** — restricted to a Google group you specify (good for enterprise distribution)

Going public means the wider SAP community can find the extension via Chrome Web Store search. A few practical things that come with this choice:

- **Listing quality matters more.** Reviewers and users will read the short description first, so make sure the field reads well.
- **Be ready for user feedback.** Once published, you'll get user reviews. Most will be a 5-star "thanks, useful tool!" type — but expect occasional bug reports or feature requests via the support email or extension reviews.
- **Updates take a fresh review.** Every version bump goes through another review (usually fast for established extensions).

---

## Visual assets uploaded

| Asset | Resolution | Required | File |
|---|---|---|---|
| Store icon | 128 × 128 | ✓ | Already inside `note-search-for-sap-chrome.zip` |
| Screenshot 1 (hero) | 1280 × 800 | ✓ | `launch/screenshot_1_hero_dark.png` |
| Screenshot 2 (themes) | 1280 × 800 | optional | `launch/screenshot_2_themes_light.png` |
| Screenshot 3 (shortcuts) | 1280 × 800 | optional | `launch/screenshot_3_shortcuts_dark.png` |
| Small promo tile | 440 × 280 | optional* | `launch/promo_tile_440x280.png` |

*Required if you want the listing to be eligible for the "Featured" section.

You can upload up to 5 screenshots; the three provided are enough.

---

## Submission checklist

- [ ] Register developer account at https://chrome.google.com/webstore/devconsole ($5 one-time)
- [ ] Use a dedicated Google account (recommended — protects your personal account)
- [ ] Host `PRIVACY_POLICY.md` somewhere public; copy the URL
  - Easiest: create a public GitHub repo, push the file, enable GitHub Pages → use `https://<username>.github.io/<repo>/PRIVACY_POLICY.html` (you'll need to convert .md to .html, or use a Gist with the "Raw" URL)
- [ ] Replace "[your email here]" and "[your repository URL here]" in the privacy policy
- [ ] Click **New item** → upload `note-search-for-sap-chrome.zip`
- [ ] Paste name, descriptions, category from this file
- [ ] Upload icon (already in the zip — used automatically), 1–3 screenshots, optional promo tile
- [ ] Paste permission justifications in the **Privacy** tab
- [ ] Set data disclosures and certifications
- [ ] Paste privacy policy URL
- [ ] Set visibility to **Public**
- [ ] Submit for review

Review takes anywhere from a few hours to ~2 weeks. Expect 1–3 days for a clean, low-risk extension like this one.

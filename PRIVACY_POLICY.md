# Privacy Policy — Note Search for SAP

**Last updated:** May 26, 2026

## Summary

Note Search for SAP does not collect, transmit, or share any personal data. The extension performs no analytics, no telemetry, and makes no requests to any third-party servers. All extension data stays in your browser, on your device.

## What the extension stores

The extension stores two pieces of information **locally** in your browser, using the standard `chrome.storage.local` API:

1. **Theme preference** — whether you've chosen the light or dark theme. A single value: `"light"` or `"dark"`.
2. **Note history** — the SAP Note numbers you've opened through the extension, with a timestamp and a pinned/unpinned flag. Limited to 25 unpinned entries plus any number of pinned entries. You can remove individual entries or clear the history by uninstalling the extension.

This data never leaves your device. It is not synced, transmitted, or accessible to anyone other than you in your browser profile.

## What the extension does NOT do

- Does not collect personally identifiable information (name, email, address, IP, etc.).
- Does not track your browsing activity.
- Does not read page content, except the single highlighted text snippet you explicitly send via the right-click "Open as SAP Note" menu — and that snippet is only used in-memory to extract a note number, then discarded.
- Does not include any analytics, advertising SDKs, or third-party scripts.
- Does not make network requests of its own. The only network activity caused by the extension is the standard browser navigation when you open a SAP Note URL — at which point your browser communicates with `me.sap.com` directly, governed by SAP's own privacy policy.

## Permissions explained

The extension requests these permissions only:

- **`tabs`** — to open SAP Note URLs in new browser tabs when you click a result or use the right-click menu. The extension does not read information about your other tabs.
- **`contextMenus`** — to add the right-click "Open as SAP Note" item to the browser's context menu.
- **`notifications`** — to show a brief notification when a highlighted text selection does not contain a valid SAP Note number.
- **`storage`** — to save your theme preference and recent-note history locally, as described above.

## Third parties

The extension navigates to `me.sap.com` (SAP's official customer portal) when you request to open a note. Your interaction with that site is governed by [SAP's Privacy Statement](https://www.sap.com/about/legal/privacy.html), not this one.

The extension does not embed or load resources from any other third-party service.

## Children

The extension is a developer utility for SAP customers and is not directed at children under 13.

## Changes to this policy

If this policy changes materially, an updated version will be published at the same URL with a new "Last updated" date.

## Contact

For questions or concerns about this privacy policy, contact: brian.strandby@pearlgroup.dk

The extension is open source. You can review the full source code at: https://gist.githubusercontent.com/pearl-bst/056d1abce7993e6465cca226d5af158e/raw/PRIVACY_POLICY.md

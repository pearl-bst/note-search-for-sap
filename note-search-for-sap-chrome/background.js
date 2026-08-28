// Cross-browser shim
const api = (typeof browser !== "undefined") ? browser : chrome;

const MENU_ID = "open-as-sap-note";
const HISTORY_KEY = "noteHistory";
const MAX_HISTORY = 25;

const NOTE_URL = (n) => `https://me.sap.com/notes/${n}`;

// ---------- Number extraction ----------
function extractNoteNumber(raw) {
  if (!raw) return null;
  // Collapse whitespace between digits ("2 937 925" -> "2937925")
  const collapsed = raw.replace(/(\d)\s+(?=\d)/g, "$1");
  const match = collapsed.match(/\d+/);
  if (!match) return null;
  const num = match[0].replace(/^0+/, "");
  if (!num || num.length < 4 || num.length > 12) return null;
  return num;
}

// ---------- History (kept in sync with popup) ----------
async function addToHistory(number) {
  const data = await api.storage.local.get(HISTORY_KEY);
  const history = Array.isArray(data[HISTORY_KEY]) ? data[HISTORY_KEY] : [];
  const existing = history.find((h) => h.number === number);
  if (existing) {
    existing.ts = Date.now();
  } else {
    history.push({ number, pinned: false, ts: Date.now() });
  }
  const pinned = history.filter((h) => h.pinned);
  const unpinned = history
    .filter((h) => !h.pinned)
    .sort((a, b) => b.ts - a.ts)
    .slice(0, MAX_HISTORY);
  await api.storage.local.set({ [HISTORY_KEY]: [...pinned, ...unpinned] });
}

// ---------- Context menu setup ----------
function createMenu() {
  // removeAll first to avoid "duplicate id" errors on reload
  api.contextMenus.removeAll(() => {
    api.contextMenus.create({
      id: MENU_ID,
      title: 'Open as SAP Note: "%s"',
      contexts: ["selection"],
    });
  });
}

api.runtime.onInstalled.addListener(createMenu);
if (api.runtime.onStartup) {
  api.runtime.onStartup.addListener(createMenu);
}

// ---------- Click handler ----------
api.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== MENU_ID) return;

  const noteNumber = extractNoteNumber(info.selectionText);

  if (!noteNumber) {
    // Notifications API may be unavailable in some contexts; guard it.
    if (api.notifications && api.notifications.create) {
      api.notifications.create({
        type: "basic",
        iconUrl: "icons/icon128.png",
        title: "SAP Note Search",
        message:
          "No valid note number found in the selection. " +
          "Highlight a number like 2937925 and try again.",
      });
    }
    return;
  }

  await addToHistory(noteNumber);
  api.tabs.create({
    url: NOTE_URL(noteNumber),
    index: tab ? tab.index + 1 : undefined,
  });
});

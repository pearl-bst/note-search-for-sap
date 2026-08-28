// Cross-browser API shim: Firefox exposes `browser`, Chrome exposes `chrome`.
// Both implement the same surface for the methods we use here.
const api = (typeof browser !== "undefined") ? browser : chrome;

// ---------- Constants ----------
const HISTORY_KEY = "noteHistory";
const THEME_KEY = "theme";
const MAX_HISTORY = 25;

// ---------- Note URL ----------
function noteUrl(n) {
  return `https://me.sap.com/notes/${n}`;
}

// ---------- Note number cleanup ----------
// Accept pasted/typed input, strip whitespace, validate.
function cleanNoteNumber(raw) {
  if (raw == null) return null;
  const stripped = String(raw).replace(/\s+/g, "");
  if (!/^\d+$/.test(stripped)) return null;
  const num = stripped.replace(/^0+/, "");
  if (!num || num.length < 4 || num.length > 12) return null;
  return num;
}

// ---------- Open note (and record in history) ----------
async function openNote(noteNumber) {
  const cleaned = cleanNoteNumber(noteNumber);
  if (!cleaned) return false;
  await addToHistory(cleaned);
  api.tabs.create({ url: noteUrl(cleaned) });
  return true;
}

// ---------- History storage ----------
//
// History shape: array of { number: string, pinned: boolean, ts: number }
// Pinned items always sort to the top.
async function getHistory() {
  const data = await api.storage.local.get(HISTORY_KEY);
  return Array.isArray(data[HISTORY_KEY]) ? data[HISTORY_KEY] : [];
}

async function setHistory(history) {
  await api.storage.local.set({ [HISTORY_KEY]: history });
}

async function addToHistory(number) {
  const history = await getHistory();
  const existing = history.find((h) => h.number === number);
  if (existing) {
    existing.ts = Date.now();
  } else {
    history.push({ number, pinned: false, ts: Date.now() });
  }
  // Trim unpinned entries beyond MAX_HISTORY (oldest first).
  const pinned = history.filter((h) => h.pinned);
  const unpinned = history
    .filter((h) => !h.pinned)
    .sort((a, b) => b.ts - a.ts)
    .slice(0, MAX_HISTORY);
  await setHistory([...pinned, ...unpinned]);
}

async function togglePin(number) {
  const history = await getHistory();
  const item = history.find((h) => h.number === number);
  if (item) item.pinned = !item.pinned;
  await setHistory(history);
}

async function removeFromHistory(number) {
  const history = await getHistory();
  await setHistory(history.filter((h) => h.number !== number));
}

// ---------- History rendering ----------
async function renderHistory() {
  const section = document.getElementById("history-section");
  const list = document.getElementById("history-list");
  const history = await getHistory();

  if (history.length === 0) {
    section.hidden = true;
    return;
  }
  section.hidden = false;

  // Sort: pinned first (most recent first within each group)
  const sorted = [...history].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.ts - a.ts;
  });

  list.innerHTML = "";
  for (const item of sorted) {
    const li = document.createElement("li");
    li.className = "history-item";
    li.dataset.number = item.number;

    const num = document.createElement("span");
    num.className = "history-number";
    num.textContent = item.number;

    const pinBtn = document.createElement("button");
    pinBtn.className = "history-pin" + (item.pinned ? " is-pinned" : "");
    pinBtn.title = item.pinned ? "Unpin" : "Pin";
    pinBtn.setAttribute("aria-label", pinBtn.title);
    pinBtn.innerHTML = item.pinned
      ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.39 6.96H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.55L2 8.96h7.61L12 2z"/></svg>`
      : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.39 6.96H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.55L2 8.96h7.61L12 2z"/></svg>`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "history-remove";
    removeBtn.title = "Remove";
    removeBtn.setAttribute("aria-label", "Remove from history");
    removeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;

    li.append(num, pinBtn, removeBtn);
    list.appendChild(li);
  }
}

// ---------- Theme management ----------
async function loadTheme() {
  const data = await api.storage.local.get(THEME_KEY);
  const theme = data[THEME_KEY] === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
}

async function toggleTheme() {
  const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
  const next = current === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  await api.storage.local.set({ [THEME_KEY]: next });
}

// ---------- Wire-up ----------
document.addEventListener("DOMContentLoaded", async () => {
  // Theme: load before paint feels best, but DOMContentLoaded is fine here
  // since the popup is small and paints are cheap.
  await loadTheme();

  const form = document.getElementById("search-form");
  const input = document.getElementById("note-input");
  const errorMsg = document.getElementById("error-msg");

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cleaned = cleanNoteNumber(input.value);
    if (!cleaned) {
      errorMsg.hidden = false;
      input.focus();
      return;
    }
    errorMsg.hidden = true;
    await openNote(cleaned);
    window.close();
  });

  // Auto-clean whitespace as user types/pastes
  input.addEventListener("input", () => {
    const cleaned = input.value.replace(/\s+/g, "");
    if (cleaned !== input.value) input.value = cleaned;
    if (!errorMsg.hidden) errorMsg.hidden = true;
  });

  // Quick links
  document.querySelectorAll(".link-item").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const url = a.dataset.url;
      if (url) {
        api.tabs.create({ url });
        window.close();
      }
    });
  });

  // Theme toggle
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

  // History (delegated handler)
  const historyList = document.getElementById("history-list");
  historyList.addEventListener("click", async (e) => {
    const item = e.target.closest(".history-item");
    if (!item) return;
    const number = item.dataset.number;

    if (e.target.closest(".history-pin")) {
      await togglePin(number);
      await renderHistory();
      return;
    }
    if (e.target.closest(".history-remove")) {
      await removeFromHistory(number);
      await renderHistory();
      return;
    }
    // Click on the row itself: open the note
    await openNote(number);
    window.close();
  });

  await renderHistory();
});

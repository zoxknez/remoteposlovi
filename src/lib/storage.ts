import type { TrackerEntry } from "@/types";

const KEYS = {
  savedResources: "rp.savedResources",
  wizard: "rp.wizard",
} as const;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedResources(): string[] {
  return readJson<string[]>(KEYS.savedResources, []);
}

export function toggleSavedResource(id: string): string[] {
  const current = getSavedResources();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  writeJson(KEYS.savedResources, next);
  return next;
}

const DB_NAME = "remoteposlovi";
const STORE = "tracker";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function listTracker(): Promise<TrackerEntry[]> {
  if (typeof indexedDB === "undefined") return [];
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).getAll();
    request.onsuccess = () => {
      const items = (request.result as TrackerEntry[]).sort((a, b) => b.savedAt.localeCompare(a.savedAt));
      resolve(items);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function upsertTracker(entry: TrackerEntry): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(entry);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getTracker(id: string): Promise<TrackerEntry | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(STORE, "readonly").objectStore(STORE).get(id);
    request.onsuccess = () => resolve((request.result as TrackerEntry) ?? null);
    request.onerror = () => reject(request.error);
  });
}

export async function removeTracker(id: string): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function createTrackerEntry(
  partial: Pick<TrackerEntry, "id" | "jobId" | "slug" | "title" | "company" | "applyUrl" | "source"> &
    Partial<TrackerEntry>,
): TrackerEntry {
  return {
    cvVersion: "",
    contactName: "",
    contactEmail: "",
    note: "",
    nextStep: "",
    followUpAt: null,
    appliedAt: null,
    status: "saved",
    savedAt: new Date().toISOString(),
    ...partial,
  };
}

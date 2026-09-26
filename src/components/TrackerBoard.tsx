"use client";

import { useEffect, useState } from "react";
import { addDays, buildFollowUpIcs } from "@/lib/ics";
import { formatDateSr } from "@/lib/format";
import { listTracker, removeTracker, upsertTracker } from "@/lib/storage";
import type { TrackerEntry, TrackerStatus } from "@/types";

const STATUSES: TrackerStatus[] = ["saved", "applied", "interview", "offer", "rejected", "archived"];
const STATUS_LABEL: Record<TrackerStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
  archived: "Archived",
};

function downloadIcs(entry: TrackerEntry, days: number) {
  const followUpAt = addDays(entry.appliedAt ? new Date(entry.appliedAt) : new Date(), days);
  const ics = buildFollowUpIcs({
    title: entry.title,
    company: entry.company,
    url: entry.applyUrl,
    note: entry.note,
    followUpAt,
  });
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `follow-up-${entry.company}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export function TrackerBoard() {
  const [items, setItems] = useState<TrackerEntry[]>([]);

  async function reload() {
    setItems(await listTracker());
  }

  useEffect(() => {
    let cancelled = false;
    listTracker().then((entries) => {
      if (!cancelled) setItems(entries);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-[#17312a]/10 bg-white p-8 text-sm text-[#52675f]">
        Još uvek nema sačuvanih oglasa. Sačuvajte oglas na stranici Poslovi. Sve ostaje u ovom pregledaču.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {items.map((entry) => (
        <article key={entry.id} className="rounded-lg border border-[#17312a]/10 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl">{entry.title}</h2>
              <p className="text-sm text-[#426052]">{entry.company}</p>
            </div>
            <select
              value={entry.status}
              onChange={async (event) => {
                const status = event.target.value as TrackerStatus;
                const next = {
                  ...entry,
                  status,
                  appliedAt: status === "applied" && !entry.appliedAt ? new Date().toISOString() : entry.appliedAt,
                };
                await upsertTracker(next);
                reload();
              }}
              className="min-h-11 rounded-full border border-[#17312a]/15 px-3 text-sm"
              aria-label="Status prijave"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABEL[status]}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="grid gap-1 text-xs font-bold">
              Datum prijave
              <input
                type="date"
                value={entry.appliedAt?.slice(0, 10) ?? ""}
                onChange={async (event) => {
                  await upsertTracker({ ...entry, appliedAt: event.target.value ? new Date(event.target.value).toISOString() : null });
                  reload();
                }}
                className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
              />
            </label>
            <label className="grid gap-1 text-xs font-bold">
              CV verzija
              <input
                value={entry.cvVersion}
                onChange={async (event) => {
                  await upsertTracker({ ...entry, cvVersion: event.target.value });
                }}
                onBlur={reload}
                className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
                placeholder="QA-v4.pdf"
              />
            </label>
            <label className="grid gap-1 text-xs font-bold">
              Kontakt
              <input
                value={entry.contactName}
                onChange={async (event) => {
                  await upsertTracker({ ...entry, contactName: event.target.value });
                }}
                className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
              />
            </label>
            <label className="grid gap-1 text-xs font-bold">
              Email kontakta
              <input
                type="email"
                value={entry.contactEmail}
                onChange={async (event) => {
                  await upsertTracker({ ...entry, contactEmail: event.target.value });
                }}
                className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
              />
            </label>
          </div>
          <label className="mt-3 grid gap-1 text-xs font-bold">
            Napomena
            <textarea
              value={entry.note}
              onChange={async (event) => {
                await upsertTracker({ ...entry, note: event.target.value });
              }}
              className="rounded-lg border border-[#17312a]/15 px-3 py-2"
              rows={3}
            />
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {[3, 5, 7, 14].map((days) => (
              <button
                key={days}
                type="button"
                className="min-h-11 rounded-full border border-[#17312a]/15 px-4 text-xs font-bold"
                onClick={() => downloadIcs(entry, days)}
              >
                Follow-up {days} dana · ICS
              </button>
            ))}
            <a href={entry.applyUrl} target="_blank" rel="noreferrer" className="min-h-11 content-center text-xs font-bold text-[#dc5b38]">
              Oglas ↗
            </a>
            <button
              type="button"
              className="min-h-11 text-xs font-bold text-[#7a3030]"
              onClick={async () => {
                await removeTracker(entry.id);
                reload();
              }}
            >
              Ukloni
            </button>
          </div>
          {entry.appliedAt ? (
            <p className="mt-3 text-xs text-[#7c8c84]">Prijavljeno: {formatDateSr(entry.appliedAt)}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

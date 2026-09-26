"use client";

import { useState } from "react";
import { checkScamSignals, SCAM_OFFICIAL_LINKS } from "@/lib/scam";

export function ScamChecker() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const result = checkScamSignals({ url, text });

  return (
    <div className="grid gap-6">
      <form className="grid gap-4 rounded-lg border border-[#17312a]/10 bg-white p-6">
        <label className="grid gap-1 text-sm font-bold">
          URL oglasa
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
            placeholder="https://"
          />
        </label>
        <label className="grid gap-1 text-sm font-bold">
          Tekst oglasa ili poruke
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={8}
            className="rounded-lg border border-[#17312a]/15 px-3 py-2"
            placeholder="Nalepite tekst oglasa. Provera ostaje u pregledaču."
          />
        </label>
      </form>
      <section className="rounded-lg border border-[#17312a]/10 bg-white p-6">
        <h2 className="font-serif text-2xl">{result.summary}</h2>
        {result.signals.length > 0 ? (
          <ul className="mt-4 grid gap-3">
            {result.signals.map((signal) => (
              <li key={signal.id} className="rounded-lg bg-[#f8eee9] p-4">
                <strong>{signal.title}</strong>
                <p className="mt-1 text-sm text-[#52675f]">{signal.detail}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-[#52675f]">
            Algoritam ne garantuje da je oglas legitiman. Proverite kompanijski sajt i karijernu stranicu.
          </p>
        )}
      </section>
      <ul className="text-sm">
        {SCAM_OFFICIAL_LINKS.map((link) => (
          <li key={link.url}>
            <a href={link.url} className="text-[#dc5b38] underline" target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

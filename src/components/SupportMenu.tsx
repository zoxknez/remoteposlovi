"use client";

import { useEffect, useRef, useState } from "react";

export function SupportMenu({
  paypalUrl,
  kofiUrl,
}: {
  paypalUrl?: string;
  kofiUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAny = Boolean(paypalUrl || kofiUrl);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7">
      {open ? (
        <div className="mb-3 w-[250px] overflow-hidden rounded-[1.35rem] border border-[#17312a]/10 bg-white/96 p-3 shadow-[0_24px_70px_rgba(23,49,42,0.18)] backdrop-blur-xl">
          <div className="px-2 pb-2 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#839089]">Podrži projekat</p>
            <p className="mt-1 text-xs leading-5 text-[#60736b]">Ako ti je sajt koristan, možeš da podržiš projekat.</p>
          </div>

          <div className="mt-1 grid gap-2">
            <a
              href={paypalUrl || "#"}
              target={paypalUrl ? "_blank" : undefined}
              rel={paypalUrl ? "noreferrer" : undefined}
              aria-disabled={!paypalUrl}
              onClick={(event) => {
                if (!paypalUrl) event.preventDefault();
              }}
              className={`flex min-h-14 items-center justify-between rounded-2xl border px-3.5 transition ${
                paypalUrl
                  ? "border-[#17312a]/8 bg-[#f8faf7] hover:border-[#17312a]/16 hover:bg-[#f2f6f1]"
                  : "cursor-not-allowed border-[#17312a]/5 bg-[#f8f8f5] opacity-45"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[#e7f4ff] font-bold text-[#1677c8]">P</span>
                <span className="text-sm font-bold text-[#17312a]">PayPal</span>
              </span>
              <span className="text-[#90a098]">→</span>
            </a>

            <a
              href={kofiUrl || "#"}
              target={kofiUrl ? "_blank" : undefined}
              rel={kofiUrl ? "noreferrer" : undefined}
              aria-disabled={!kofiUrl}
              onClick={(event) => {
                if (!kofiUrl) event.preventDefault();
              }}
              className={`flex min-h-14 items-center justify-between rounded-2xl border px-3.5 transition ${
                kofiUrl
                  ? "border-[#17312a]/8 bg-[#f8faf7] hover:border-[#17312a]/16 hover:bg-[#f2f6f1]"
                  : "cursor-not-allowed border-[#17312a]/5 bg-[#f8f8f5] opacity-45"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[#fff3d9] text-lg">☕</span>
                <span className="text-sm font-bold text-[#17312a]">Ko-fi</span>
              </span>
              <span className="text-[#90a098]">→</span>
            </a>
          </div>

          {!hasAny ? (
            <p className="px-2 pb-1 pt-3 text-[10px] leading-4 text-[#8a9690]">
              Support linkovi još nisu podešeni.
            </p>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-[#17312a] px-4 text-sm font-bold text-white shadow-[0_16px_38px_rgba(23,49,42,0.22)] transition hover:-translate-y-0.5 hover:bg-[#21483c]"
      >
        <span className="grid size-7 place-items-center rounded-full bg-white/10 text-sm" aria-hidden>☕</span>
        <span>Podrži projekat</span>
        <span className={`text-[11px] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>⌃</span>
      </button>
    </div>
  );
}

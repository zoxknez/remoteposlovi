"use client";

import { useMemo, useState } from "react";

const TEMPLATES = {
  cv: `Prilagodi CV oglasu. Ne izmišljaj iskustvo.

Ciljna pozicija: {{role}}
Ton: {{tone}}
Jezik: {{language}}

CV:
{{cv}}

Oglas:
{{jd}}

Vrati:
1. prilagođeni CV u istom jeziku
2. listu ključnih reči iz oglasa koje su pokrivene
3. listu rupa koje ne treba lažirati`,
  cover: `Napiši kratko cover pismo od 180-220 reči.

Pozicija: {{role}}
Ton: {{tone}}
Jezik: {{language}}

CV:
{{cv}}

Oglas:
{{jd}}

Bez klišea. Poveži 2 konkretna rezultata iz CV-ja sa zahtevima oglasa.`,
  interview: `Pripremi me za intervju.

Pozicija: {{role}}
Jezik: {{language}}

CV:
{{cv}}

Oglas:
{{jd}}

Daj:
- 10 pitanja za tehnički/stručni deo
- 8 behavior pitanja
- 6 pitanja koja ja postavljam njima
- kratke okvire odgovora na STAR formatu`,
  salary: `Pripremi pregovor o plati za kandidata iz Srbije.

Pozicija: {{role}}
Jezik: {{language}}

Oglas:
{{jd}}

Ne izmišljaj tačan iznos ako nema javnih podataka. Daj raspon pitanja, kako da pitam za budžet, i crvene linije (EOR, contractor, oprema, overlap).`,
  recruiter: `Napiši kratak odgovor recruiteru.

Ton: {{tone}}
Jezik: {{language}}
Pozicija: {{role}}

Poruka recruitera / kontekst:
{{jd}}

Maksimalno 90 reči. Jasno, bez preterane entuzijastičnosti.`,
  followup: `Napiši follow-up email posle prijave.

Pozicija: {{role}}
Jezik: {{language}}
Ton: {{tone}}

Oglas:
{{jd}}

Kratko, 70-100 reči, bez pritiska.`,
  linkedin: `Napiši LinkedIn poruku recruiteru ili hiring manageru.

Pozicija: {{role}}
Jezik: {{language}}
Ton: {{tone}}

CV sažetak:
{{cv}}

Oglas:
{{jd}}

Do 70 reči.`,
};

export function PromptToolkit() {
  const [kind, setKind] = useState<keyof typeof TEMPLATES>("cv");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("profesionalan, konkretan");
  const [language, setLanguage] = useState("srpski, latinica");
  const [cv, setCv] = useState("");
  const [jd, setJd] = useState("");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    return TEMPLATES[kind]
      .replaceAll("{{role}}", role || "[upisite poziciju]")
      .replaceAll("{{tone}}", tone)
      .replaceAll("{{language}}", language)
      .replaceAll("{{cv}}", cv || "[nalepite CV]")
      .replaceAll("{{jd}}", jd || "[nalepite oglas]");
  }, [kind, role, tone, language, cv, jd]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries({
          cv: "CV tailoring",
          cover: "Cover letter",
          interview: "Intervju",
          salary: "Pregovor o plati",
          recruiter: "Odgovor recruiteru",
          followup: "Follow-up",
          linkedin: "LinkedIn poruka",
        }).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setKind(id as keyof typeof TEMPLATES)}
            className={`min-h-11 rounded-full px-4 text-xs font-bold ${
              kind === id ? "bg-[#17312a] text-white" : "border border-[#17312a]/10 bg-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Ciljna pozicija"
          className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
        />
        <input
          value={tone}
          onChange={(event) => setTone(event.target.value)}
          className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
        />
        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="min-h-11 rounded-lg border border-[#17312a]/15 px-3"
        >
          <option value="srpski, latinica">Srpski</option>
          <option value="english">English</option>
        </select>
      </div>
      <textarea
        value={cv}
        onChange={(event) => setCv(event.target.value)}
        rows={7}
        className="rounded-lg border border-[#17312a]/15 px-3 py-2"
        placeholder="Nalepite CV. Ne šalje se na server."
      />
      <textarea
        value={jd}
        onChange={(event) => setJd(event.target.value)}
        rows={7}
        className="rounded-lg border border-[#17312a]/15 px-3 py-2"
        placeholder="Nalepite oglas. Ne šalje se na server."
      />
      <pre className="overflow-auto rounded-lg bg-[#17312a] p-4 text-xs text-[#e7f0df]">{prompt}</pre>
      <button
        type="button"
        className="min-h-11 w-fit rounded-full bg-[#17312a] px-5 text-sm font-bold text-white"
        onClick={async () => {
          await navigator.clipboard.writeText(prompt);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Kopirano" : "Kopiraj prompt"}
      </button>
    </div>
  );
}

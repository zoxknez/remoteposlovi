"use client";

import { useMemo, useState } from "react";

const TEMPLATES = {
  cv: { label: "CV tailoring", hint: "Prilagodite postojeći CV oglasu bez izmišljanja iskustva.", body: `Prilagodi CV oglasu. Ne izmišljaj iskustvo.

Ciljna pozicija: {{role}}
Ton: {{tone}}
Jezik: {{language}}

CV:
{{cv}}

Oglas:
{{jd}}

Vratite:
1. prilagođeni CV u istom jeziku
2. ključne reči iz oglasa koje su pokrivene
3. rupe koje ne treba lažirati
4. najviše 5 konkretnih poboljšanja` },
  cover: { label: "Cover letter", hint: "Kratko pismo zasnovano samo na stvarnom CV-u.", body: `Napiši kratko cover pismo od 180-220 reči.

Pozicija: {{role}}
Ton: {{tone}}
Jezik: {{language}}

CV:
{{cv}}

Oglas:
{{jd}}

Bez klišea. Poveži 2 konkretna rezultata iz CV-ja sa zahtevima oglasa.` },
  interview: { label: "Intervju", hint: "Pitanja, STAR priprema i pitanja za poslodavca.", body: `Pripremi me za intervju.

Pozicija: {{role}}
Jezik: {{language}}

CV:
{{cv}}

Oglas:
{{jd}}

Daj:
- 10 stručnih pitanja
- 8 behavioral pitanja
- 6 pitanja koja ja postavljam njima
- kratke STAR okvire odgovora
- oblasti koje treba dodatno da ponovim` },
  salary: { label: "Pregovor o plati", hint: "Kako da tražite budžet i pregovarate bez izmišljene tržišne cifre.", body: `Pripremi pregovor o plati za kandidata iz Srbije.

Pozicija: {{role}}
Jezik: {{language}}

Oglas:
{{jd}}

Ne izmišljaj tačan iznos ako nema javnih podataka. Daj pitanja za budžet, način pregovora i stavke koje treba proveriti: EOR, contractor, oprema, valuta, porez i timezone overlap.` },
  recruiter: { label: "Recruiter odgovor", hint: "Kratka, normalna i profesionalna poruka.", body: `Napiši kratak odgovor recruiteru.

Ton: {{tone}}
Jezik: {{language}}
Pozicija: {{role}}

Poruka recruitera / kontekst:
{{jd}}

Maksimalno 90 reči. Jasno, bez preterane entuzijastičnosti.` },
  followup: { label: "Follow-up", hint: "Nenametljiv follow-up posle prijave ili intervjua.", body: `Napiši follow-up email posle prijave.

Pozicija: {{role}}
Jezik: {{language}}
Ton: {{tone}}

Kontekst:
{{jd}}

Kratko, 70-100 reči, bez pritiska.` },
  linkedin: { label: "LinkedIn poruka", hint: "Kratak outreach recruiteru ili hiring manageru.", body: `Napiši LinkedIn poruku recruiteru ili hiring manageru.

Pozicija: {{role}}
Jezik: {{language}}
Ton: {{tone}}

CV sažetak:
{{cv}}

Oglas:
{{jd}}

Do 70 reči.` },
};

export function PromptToolkit() {
  const [kind, setKind] = useState<keyof typeof TEMPLATES>("cv");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("profesionalan, konkretan");
  const [language, setLanguage] = useState("srpski, latinica");
  const [cv, setCv] = useState("");
  const [jd, setJd] = useState("");
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => TEMPLATES[kind].body
    .replaceAll("{{role}}", role || "[upišite poziciju]")
    .replaceAll("{{tone}}", tone)
    .replaceAll("{{language}}", language)
    .replaceAll("{{cv}}", cv || "[nalepite CV]")
    .replaceAll("{{jd}}", jd || "[nalepite oglas ili kontekst]"), [kind, role, tone, language, cv, jd]);

  const reset = () => { setRole(""); setTone("profesionalan, konkretan"); setLanguage("srpski, latinica"); setCv(""); setJd(""); setCopied(false); };

  return (
    <div className="premium-panel overflow-hidden">
      <div className="border-b border-[#17312a]/8 p-5 md:p-7">
        <div className="flex flex-wrap gap-2">
          {Object.entries(TEMPLATES).map(([id, template]) => (
            <button key={id} type="button" onClick={() => setKind(id as keyof typeof TEMPLATES)} className={`chip ${kind === id ? "chip-active" : ""}`}>{template.label}</button>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#60736b]">{TEMPLATES[kind].hint}</p>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="grid gap-4 border-b border-[#17312a]/8 p-5 md:p-7 lg:border-b-0 lg:border-r">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold text-[#52675f]">Ciljna pozicija<input value={role} onChange={(e) => setRole(e.target.value)} placeholder="npr. QA Engineer" className="premium-field mt-1.5 font-normal" /></label>
            <label className="text-xs font-bold text-[#52675f]">Jezik<select value={language} onChange={(e) => setLanguage(e.target.value)} className="premium-field mt-1.5 font-normal"><option value="srpski, latinica">Srpski</option><option value="english">English</option></select></label>
          </div>
          <label className="text-xs font-bold text-[#52675f]">Ton<input value={tone} onChange={(e) => setTone(e.target.value)} className="premium-field mt-1.5 font-normal" /></label>
          <label className="text-xs font-bold text-[#52675f]">CV / iskustvo<textarea value={cv} onChange={(e) => setCv(e.target.value)} rows={7} className="premium-field mt-1.5 resize-y font-normal" placeholder="Nalepite CV. Ostaje u pregledaču." /></label>
          <label className="text-xs font-bold text-[#52675f]">Oglas / kontekst<textarea value={jd} onChange={(e) => setJd(e.target.value)} rows={7} className="premium-field mt-1.5 resize-y font-normal" placeholder="Nalepite oglas ili poruku." /></label>
        </div>

        <div className="flex min-h-[520px] flex-col bg-[#17312a] p-5 text-[#e7f0df] md:p-7">
          <div className="flex items-center justify-between gap-3">
            <div><p className="text-[10px] font-bold tracking-[.13em] text-[#a9c1b5]">GENERISANI PROMPT</p><p className="mt-1 text-xs text-[#bed0c7]">{prompt.length.toLocaleString("sr-Latn-RS")} karaktera</p></div>
            <button type="button" onClick={reset} className="rounded-full border border-white/15 px-3 py-2 text-[10px] font-bold">Očistite</button>
          </div>
          <pre className="mt-5 flex-1 whitespace-pre-wrap overflow-auto rounded-2xl border border-white/10 bg-black/10 p-4 font-mono text-xs leading-6 text-[#e7f0df]">{prompt}</pre>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-full bg-[#dc5b38] px-5 text-xs font-bold text-white" onClick={async () => { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 1600); }}>{copied ? "Kopirano ✓" : "Kopirajte prompt"}</button>
            <a href="https://chatgpt.com/" target="_blank" rel="noreferrer" className="min-h-11 content-center rounded-full border border-white/15 px-4 text-xs font-bold">ChatGPT ↗</a>
            <a href="https://claude.ai/" target="_blank" rel="noreferrer" className="min-h-11 content-center rounded-full border border-white/15 px-4 text-xs font-bold">Claude ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}

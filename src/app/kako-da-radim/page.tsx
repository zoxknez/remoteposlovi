import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Kako da radim remote iz Srbije",
  "Razlike između frilensera, preduzetnika, DOO, zaposlenja, contractora i EOR-a. Informativno, nije pravni savet.",
  "/kako-da-radim",
);

const MODELS = [
  {
    title: "Frilenser, samooporezivanje",
    points:
      "Fizičko lice prijavljuje prihod od isplatioca koji ne obustavlja porez u Srbiji. Kvartalno, portal Frilenseri, dve opcije. Nije pravni status, već poreski režim.",
  },
  {
    title: "Preduzetnik (paušal ili knjige)",
    points:
      "Registracija preko APR-a. Paušal ima fiksnu osnovicu koju određuje Poreska uprava. Knjige prate stvarne prihode i rashode. Postoje pragovi i obaveze evidencije.",
  },
  {
    title: "DOO",
    points:
      "Privredno društvo sa punom računovodstvenom evidencijom. Odgovara kada ima više klijenata, zaposlenih ili veći promet. Osnivanje i obaveze su na APR-u i Poreskoj upravi.",
  },
  {
    title: "Direktno zaposlenje",
    points:
      "Radni odnos kod poslodavca. Za stranu firmu u Srbiji to obično ide preko lokalnog entiteta ili EOR-a. Prava i obaveze zavise od ugovora i merodavnog prava.",
  },
  {
    title: "Contractor",
    points:
      "Ugovor o pružanju usluga, bez radnog odnosa. Vi fakturišete. Porez i doprinosi su vaša obaveza, osim ako klijent ima lokalnu obavezu po odbitku.",
  },
  {
    title: "Employer of Record (EOR)",
    points:
      "Treća firma vas zaposli, a vi radite za njihovog klijenta. Primeri servisa, samo kao informacija: Remote.com, Deel, Oyster. Proverite da li pokrivaju Srbiju za konkretnu ulogu.",
  },
];

export default function KakoDaRadimPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-12">
      <h1 className="font-serif text-4xl md:text-6xl">Kako da radim</h1>
      <p className="mt-4 text-[#52675f]">
        Ovo je pregled razlika, ne preporuka modela. Za registraciju koristite APR, za porez Poresku upravu.
      </p>
      <div className="mt-8 grid gap-4">
        {MODELS.map((model) => (
          <article key={model.title} className="rounded-lg border border-[#17312a]/10 bg-white p-6">
            <h2 className="font-serif text-2xl">{model.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#52675f]">{model.points}</p>
          </article>
        ))}
      </div>
      <ul className="mt-8 grid gap-2 text-sm">
        <li>
          <a className="text-[#dc5b38]" href="https://www.apr.gov.rs/" target="_blank" rel="noreferrer">
            Agencija za privredne registre (APR)
          </a>
        </li>
        <li>
          <a className="text-[#dc5b38]" href="https://frilenseri.purs.gov.rs/" target="_blank" rel="noreferrer">
            Portal Frilenseri
          </a>
        </li>
        <li>
          <a className="text-[#dc5b38]" href="https://www.purs.gov.rs/" target="_blank" rel="noreferrer">
            Poreska uprava
          </a>
        </li>
      </ul>
    </main>
  );
}

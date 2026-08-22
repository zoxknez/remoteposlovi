"use client";

import { useState, useId, useEffect } from "react";

type SourceItem = readonly [
  name: string,
  description: string,
  url: string,
  region: "Srbija" | "Evropa / EMEA" | "Globalno",
  kind: "Oglasi" | "Freelance" | "Alat",
  label: string
];

const sources: readonly SourceItem[] = [
  ["HelloWorld", "Domaći IT, podrška, prodaja, marketing i QA oglasi sa jasnim remote filterom.", "https://www.helloworld.rs/oglasi-za-posao/remote", "Srbija", "Oglasi", "Lokalno"],
  ["Himalayas", "Remote pozicije sa preciznim filterima za Srbiju, nivo iskustva i tehnički stack.", "https://himalayas.app/jobs/countries/serbia", "Srbija", "Oglasi", "Za Srbiju"],
  ["Dynamite Jobs", "Kurirani remote oglasi proverenih firmi otvorenih za zapošljavanje iz Srbije.", "https://dynamitejobs.com/country/remote-jobs-in-serbia", "Srbija", "Oglasi", "Za Srbiju"],
  ["Remote in Europe", "Kurirani poslovi prilagođeni evropskim vremenskim zonama u više digitalnih disciplina.", "https://remoteineurope.com/", "Evropa / EMEA", "Oglasi", "EU fokus"],
  ["Remotive", "Specijalna EMEA kategorija za product, tech, marketing i customer support uloge.", "https://remotive.com/remote-emea-jobs", "Evropa / EMEA", "Oglasi", "EMEA"],
  ["We Work Remotely", "Jedna od najvećih i najstarijih globalnih zajednica za 100% rad na daljinu.", "https://weworkremotely.com/100-percent-remote-jobs", "Globalno", "Oglasi", "Kurirano"],
  ["Wellfound", "Pozicije u međunarodnim tehnološkim startupima za product, razvoj, dizajn i operacije.", "https://wellfound.com/jobs", "Globalno", "Oglasi", "Startupi"],
  ["Work at a Startup", "Zvanična Y Combinator platforma za remote poslove u top svetskim startupima uz direktan kontakt sa osnivačima.", "https://www.workatastartup.com/", "Globalno", "Oglasi", "Startupi"],
  ["4 Day Week", "Kurirana baza proverenih remote poslova sa 4-dnevnom radnom nedeljom (32h) i punom kompenzacijom.", "https://4dayweek.io/", "Globalno", "Oglasi", "Balans"],
  ["DailyRemote", "Dnevno ažurirani remote oglasi za programiranje, dizajn, marketing, prodaju i podršku.", "https://dailyremote.com/", "Globalno", "Oglasi", "Globalno"],
  ["Upwork", "Vodeća globalna freelance platforma za projekte iz razvoja, dizajna, marketinga i administracije.", "https://www.upwork.com/freelance-jobs/", "Globalno", "Freelance", "Projekti"],
  ["Contra", "Moderna freelance mreža sa 0% provizije za klijente i portfolio-first profilima.", "https://contra.com/features/find-freelance-jobs", "Globalno", "Freelance", "Nezavisno"],
  ["Hubstaff Talent", "Besplatna globalna mreža za direktno povezivanje freelancera i kompanija bez ikakvih provizija.", "https://hubstafftalent.com/", "Globalno", "Freelance", "Bez provizije"],
  ["Outlier", "Plaćeni zadaci za treniranje i evaluaciju naprednih AI modela (Scale AI), sa nedeljnim isplatama i podrškom za Srbiju.", "https://outlier.ai/", "Globalno", "Freelance", "AI trening"],
  ["NativeCamp", "Online časovi engleskog jezika sa fleksibilnim rasporedom 24/7, popularno među predavačima u Srbiji i sa lokalnim centrom.", "https://nativecamp.net/tutors", "Srbija", "Freelance", "Podučavanje"],
  ["Engoo", "Globalna platforma za online časove engleskog jezika uz obezbeđene nastavne lekcije i 25-minutne formate.", "https://teach.engoo.com/", "Globalno", "Freelance", "Podučavanje"],
  ["Preply", "Kreiraj predavački profil i samostalno postavi satnicu za online časove jezika ili drugih predmeta.", "https://preply.com/en/teach", "Globalno", "Freelance", "Podučavanje"],
  ["Cambly", "Fleksibilni konverzacijski časovi engleskog jezika sa učenicima širom sveta u terminima koje sam biraš.", "https://www.cambly.com/tutors", "Globalno", "Freelance", "Podučavanje"],
  ["italki", "Postavi cene i termine za online časove jezika uz sigurnu međunarodnu naplatu i veliku bazu učenika.", "https://teach.italki.com/", "Globalno", "Freelance", "Podučavanje"],
  ["Twenix", "Online konverzacijski časovi engleskog za poslovne ljude u Evropi uz obezbeđene materijale.", "https://twenix.com/tweachers-apply/", "Evropa / EMEA", "Freelance", "Podučavanje"],
  ["Lingo Turtle", "Online časovi engleskog za mlade učenike, sa rasporedom koji možeš samostalno da postaviš.", "https://lingo-turtle.com/", "Srbija", "Freelance", "Podučavanje"],
  ["Reactive Resume", "Besplatan i open-source alat za brzo kreiranje i izvoz modernog, ATS-optimizovanog CV-ja.", "https://rxresu.me/", "Globalno", "Alat", "CV"],
  ["Huntr", "Kompletan tracker za praćenje poslatih prijava, intervjua, kontakata i beleški u jednom kanbanu.", "https://huntr.co/", "Globalno", "Alat", "Organizacija"],
  ["Jobscan", "Uporedi svoj CV sa konkretnim oglasom, pronađi nedostajuće ATS ključne reči i proveri prolaznost.", "https://www.jobscan.co/resume-scanner", "Globalno", "Alat", "ATS CV"],
  ["Interviewing.io", "Anonimne probne tehničke simulacije intervjua i vežbe za kodiranje i system design.", "https://interviewing.io/", "Globalno", "Alat", "Intervju"],
  ["Resume Worded", "AI analiza CV-ja i LinkedIn profila sa konkretnim smernicama za povećanje broja poziva na intervju.", "https://resumeworded.com/", "Globalno", "Alat", "CV"],
  ["Frilenseri Poreska", "Zvanični državni portal Poreske uprave Srbije za kalkulator, kvartalnu prijavu i samooporezivanje prihoda.", "https://frilenseri.ujp.gov.rs/", "Srbija", "Alat", "Porezi"],
  ["Digitalna Zajednica", "Udruženje, pravni saveti, test samostalnosti i kalkulatori za digitalne radnike i paušalce u Srbiji.", "https://digitalnazajednica.org/", "Srbija", "Alat", "Zajednica"],
  ["Paušal.rs", "Vodeći vodič i aplikacija za jednostavno otvaranje i vođenje paušalne agencije i deviznih faktura.", "https://www.pausal.rs/", "Srbija", "Alat", "Paušal"],
  ["Good Air Language", "Sveobuhvatna baza i vodič kroz kompanije za online predavanje engleskog jezika, sa platama i zahtevima.", "https://www.goodairlanguage.com/teaching-english-online-2", "Globalno", "Alat", "ESL vodič"],
  ["Levels.fyi", "Referentna baza plata, satnica i ukupnih kompenzacija za remote i IT uloge širom sveta.", "https://www.levels.fyi/", "Globalno", "Alat", "Plate"],
  ["Glassdoor", "Provera reputacije poslodavaca, realnih plata zaposlenih i iskustava sa selekcionih procesa.", "https://www.glassdoor.com/Reviews/index.htm", "Globalno", "Alat", "Istraživanje"],
  ["Joberty", "Istraži regionalne IT kompanije, iskustva zaposlenih, procese intervjua i raspone plata u Srbiji.", "https://joberty.com/IT-companies?page=1&sort=featured", "Srbija", "Alat", "Istraživanje"],
  ["GitLab All-Remote", "Najdetaljniji besplatni svetski priručnik o asinhronoj komunikaciji, dokumentovanju i radu u remote timu.", "https://handbook.gitlab.com/handbook/company/culture/all-remote/", "Globalno", "Alat", "Vodič"],
  ["Remote.co Blog", "Stručni saveti za selekciju poslodavaca, optimizaciju remote prijave i produktivnost od kuće.", "https://remote.co/blog", "Globalno", "Alat", "Vodič"],
  ["Remoters", "Baza remote poslova, digitalnih alata, događaja i resursa za digitalne nomade i rad sa bilo koje lokacije.", "https://remoters.net/", "Globalno", "Alat", "Vodič"],
  ["Zapier Remote Guide", "Praktični vodič za automatizaciju, alate i efikasnu organizaciju samostalnog remote rada.", "https://zapier.com/blog/remote-work/", "Globalno", "Alat", "Vodič"],
  ["Teal", "Napredni CV builder i tracker za praćenje svih faza konkurisanja i optimizaciju profila.", "https://www.tealhq.com/", "Globalno", "Alat", "CV"],
  ["Simplify", "Ekstenzija za automatsko popunjavanje prijava za posao jednim klikom i praćenje statusa.", "https://simplify.jobs/", "Globalno", "Alat", "Organizacija"],
  ["Built In", "Remote tech oglasi i profili inovativnih kompanija u razvoju softvera, data nauci i operacijama.", "https://builtin.com/jobs/remote", "Globalno", "Oglasi", "Tech"],
  ["Authentic Jobs", "Specijalizovani direktorijum za UI/UX dizajnere, developere i digitalne kreativce.", "https://authenticjobs.com/?search_location=remote", "Globalno", "Oglasi", "Kreativno"],
  ["Behance Jobs", "Kreativne freelance i full-time pozicije za grafički dizajn, 3D, ilustraciju i motion grafiku.", "https://www.behance.net/joblist", "Globalno", "Oglasi", "Dizajn"],
  ["Dribbble Jobs", "Otvorene pozicije za vizuelne dizajnere, product dizajnere i art direktore u remote timovima.", "https://dribbble.com/jobs", "Globalno", "Oglasi", "Dizajn"],
  ["UI/UX Jobs Board", "Kurirani remote i ugovorni oglasi namenjeni isključivo dizajnerima korisničkog iskustva.", "https://uiuxjobsboard.com/design-jobs/remote", "Globalno", "Oglasi", "Dizajn"],
  ["Freelance Writing", "Oglasi za copywritere, content autore, urednike i tehničke pisce sa filtrima po nišama.", "https://www.freelancewriting.com/writer-jobs/", "Globalno", "Freelance", "Pisanje"],
  ["Content Writing Jobs", "Redovno ažurirani poslovi pisanja sadržaja, blog članaka i marketinških tekstova.", "https://contentwritingjobs.com/", "Globalno", "Oglasi", "Pisanje"],
  ["ProBlogger Jobs", "Vodeća berza poslova za blogere, autore tekstova, copywritere i urednike sadržaja.", "https://problogger.com/jobs/", "Globalno", "Oglasi", "Pisanje"],
  ["JournalismJobs", "Oglasi za novinare, istraživače, autore i editore sa virtuelnim i remote opcijama.", "https://www.journalismjobs.com/job-listings?virtual=3", "Globalno", "Oglasi", "Novinarstvo"],
  ["Support Driven Jobs", "Zajednica i oglasi za stručnjake u korisničkoj podršci i customer success ulogama.", "https://jobs.supportdriven.com/", "Globalno", "Oglasi", "Podrška"],
  ["PowerToFly", "Platforma i karijerni resursi sa fokusom na inkluzivno zapošljavanje u tech sektoru.", "https://powertofly.com/jobs", "Globalno", "Oglasi", "Karijera"],
  ["Jobgether", "Verifikovani remote poslovi uz detaljne filtere nivoa fleksibilnosti i dozvoljenih lokacija.", "https://jobgether.com/remote-jobs", "Globalno", "Oglasi", "Verifikovano"],
  ["FlexJobs", "Kurirana platforma sa ručno proverenim oglasima bez spama i lažnih kompanija.", "https://www.flexjobs.com/remote-jobs", "Globalno", "Oglasi", "Kurirano"],
  ["Virtual Vocations", "Velika baza proverenih poslova na daljinu u zdravstvu, edukaciji, IT-ju i administraciji.", "https://www.virtualvocations.com/browse", "Globalno", "Oglasi", "Oblasti"],
  ["NoDesk", "Sveobuhvatan direktorijum remote-first kompanija, aktuelnih oglasa i vodiča za rad od kuće.", "https://nodesk.co/remote-jobs/", "Globalno", "Oglasi", "Kurirano"],
  ["JustRemote", "Globalni poslovi iz programiranja, digitalnog marketinga, dizajna i korisničkog servisa.", "https://justremote.co/remote-jobs/", "Globalno", "Oglasi", "Globalno"],
  ["Jobspresso", "Kvalitetno selektovani i ručno provereni remote oglasi u vodećim svetskim kompanijama.", "https://jobspresso.co/remote-work/", "Globalno", "Oglasi", "Kurirano"],
  ["Remote OK", "Jedan od najposećenijih svetskih portala za tehničke i netehničke remote uloge.", "https://remoteok.com/", "Globalno", "Oglasi", "Globalno"],
  ["Remote.com Jobs", "Međunarodne remote pozicije sa jasno navedenim podržanim državama za zapošljavanje.", "https://remote.com/jobs", "Globalno", "Oglasi", "Globalno"],
  ["Startup Jobs", "Otvorene pozicije u ranim i scale-up startupima širom sveta, uključujući EMEA timove.", "https://startup.jobs/", "Globalno", "Oglasi", "Startupi"],
  ["Welcome to the Jungle", "Evropski oglasi sa detaljnim profilima firmi, video intervjuima tima i uvidom u kulturu.", "https://www.welcometothejungle.com/en/jobs", "Evropa / EMEA", "Oglasi", "Kompanije"],
  ["Landing.Jobs", "Tehnološke pozicije u evropskim kompanijama sa podrškom za legalan rad na daljinu.", "https://landing.jobs/jobs", "Evropa / EMEA", "Oglasi", "Tech"],
  ["Remotify Europe", "Evropske remote kompanije sa eksplicitnim filterom po državi prebivališta kandidata.", "https://remotifyeurope.com/remote-jobs?country=Serbia", "Evropa / EMEA", "Oglasi", "EU fokus"],
  ["Working Nomads", "Kurirani oglasi kategorisani po oblastima i usklađeni sa evropskim radnim vremenom.", "https://www.workingnomads.com/remote-europe-jobs", "Evropa / EMEA", "Oglasi", "EU fokus"],
  ["Wellfound Europe", "Mogućnosti rada u evropskim startupima u oblastima marketinga, sales-a i razvoja.", "https://wellfound.com/location/europe", "Evropa / EMEA", "Oglasi", "Startupi"],
  ["EURES", "Zvanični evropski portal za mobilnost radne snage, međunarodne konkurse i pravne savete.", "https://eures.europa.eu/index_en", "Evropa / EMEA", "Oglasi", "EU zvanično"],
  ["European Job Days", "Zvanični virtuelni sajmovi zapošljavanja u Evropi sa direktnim video intervjuima sa poslodavcima.", "https://www.europeanjobdays.eu/en", "Evropa / EMEA", "Oglasi", "Događaji"],
  ["Europass", "Zvanični evropski standardizovani alat za kreiranje CV-ja i pasoša digitalnih veština.", "https://europass.europa.eu/en", "Evropa / EMEA", "Alat", "CV"],
  ["Poslovi Infostud", "Najveći domaći portal sa namenskim filterom za pozicije od kuće u Srbiji i regionu.", "https://poslovi.infostud.com/remote", "Srbija", "Oglasi", "Lokalno"],
  ["Startuj", "Prakse, plaćeni juniorski programi i entry-level pozicije za početak karijere u IT-ju.", "https://startuj.infostud.com/prakse", "Srbija", "Oglasi", "Junior"],
  ["Ovde Jobs", "Otvorene pozicije regionalnih i stranih kompanija koje traže kandidate sa našeg govornog područja.", "https://ovdejobs.com/", "Srbija", "Oglasi", "Region"],
  ["Arc", "Platforma za povezivanje programera i dizajnera iz Srbije sa međunarodnim remote kompanijama.", "https://arc.dev/en-rs/remote-jobs", "Srbija", "Oglasi", "Tech"],
  ["Remote Rocketship", "Pretraživač remote oglasa sa preciznim indeksiranjem podrške za kandidate iz Srbije.", "https://www.remoterocketship.com/country/serbia/jobs/", "Srbija", "Oglasi", "Za Srbiju"],
  ["EU Remote Jobs", "Baza u kojoj je Srbija eksplicitno navedena kao prihvaćena lokacija za ugovorni rad.", "https://euremotejobs.com/job-region/serbia/", "Srbija", "Oglasi", "Za Srbiju"],
  ["NCR Voyix Careers", "Direktne otvorene remote i hibridne pozicije globalne kompanije NCR sa bazom u Beogradu.", "https://www.ncrvoyix.com/about/careers", "Srbija", "Oglasi", "Kompanije"],
  ["Freelancer", "Velika međunarodna berza za ugovorne poslove, grafičke konkurse i programerske zadatke.", "https://www.freelancer.com/jobs/", "Globalno", "Freelance", "Projekti"],
  ["Fiverr", "Globalna platforma na kojoj nudiš svoje standardizovane digitalne pakete direktnim klijentima.", "https://www.fiverr.com/", "Globalno", "Freelance", "Usluge"],
  ["PeoplePerHour", "Britanska i globalna freelance platforma za dizajn, copywriting, SEO i tehničke projekte.", "https://www.peopleperhour.com/freelance-jobs", "Globalno", "Freelance", "Projekti"],
  ["Toptal", "Ekskluzivna mreža koja okuplja top 3% globalnih freelancera u programiranju, dizajnu i finansijama.", "https://www.talent.toptal.com/join", "Globalno", "Freelance", "Senior"],
  ["Gun.io", "Specijalizovana platforma za iskusne softverske inženjere i dugoročne freelance ugovore.", "https://gun.io/", "Globalno", "Freelance", "Tech"],
] as const;

const categories = [
  {
    title: "Poslovi za Srbiju",
    value: "Srbija",
    badge: "🇷🇸 Lokalno & Region",
    description: "Izvori koji provereno zapošljavaju kandidate iz Srbije i regiona.",
    icon: "🏢",
    gradient: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "Evropa i EMEA",
    value: "Evropa / EMEA",
    badge: "🇪🇺 Evropsko radno vreme",
    description: "Pozicije usklađene sa vremenskom zonom i evropskim pravnim modelima.",
    icon: "🇪🇺",
    gradient: "from-blue-500/10 to-indigo-500/5",
  },
  {
    title: "Globalni oglasi",
    value: "Globalno",
    badge: "🌍 YC & Svetske firme",
    description: "Međunarodne remote-first kompanije, 4-dnevna nedelja i tech giganti.",
    icon: "🌍",
    gradient: "from-amber-500/10 to-orange-500/5",
  },
  {
    title: "Freelance & AI",
    value: "Freelance",
    badge: "⚡ Projekti, AI & Časovi",
    description: "Outlier AI trening, ESL predavanja, Upwork i direktni klijenti.",
    icon: "⚡",
    gradient: "from-purple-500/10 to-pink-500/5",
  },
  {
    title: "Alati & Porezi",
    value: "Alat",
    badge: "🛠️ UJP, Paušal & CV",
    description: "Poreski kalkulatori, pravni saveti za Srbiju, plate i ATS priprema.",
    icon: "⚖️",
    gradient: "from-teal-500/10 to-emerald-500/5",
  },
] as const;

const resourceGroups = [
  {
    kind: "Oglasi",
    title: "Oglasi za posao",
    badge: "💼 Baze poslova",
    description: "Platforme sa direktnim oglasima kompanija koje zapošljavaju na daljinu.",
    color: "bg-emerald-100/70 text-emerald-900 border-emerald-300/60",
    dot: "bg-emerald-600",
  },
  {
    kind: "Freelance",
    title: "Freelance, AI i Podučavanje",
    badge: "⚡ Samostalni rad",
    description: "Projekti, platforme bez provizije, evaluacija AI modela i online časovi.",
    color: "bg-amber-100/70 text-amber-900 border-amber-300/60",
    dot: "bg-amber-600",
  },
  {
    kind: "Alat",
    title: "Porezi, Alati, Plate i Vodiči",
    badge: "🛠️ Resursi i Zakon",
    description: "Zvanični UJP portal, paušalni vodiči, provera zarada i optimizacija CV-ja.",
    color: "bg-indigo-100/70 text-indigo-900 border-indigo-300/60",
    dot: "bg-indigo-600",
  },
] as const;

const filterButtons = [
  { label: "Sve platforme", value: "Sve", icon: "✨" },
  { label: "Srbija & Region", value: "Srbija", icon: "🇷🇸" },
  { label: "Evropa & EMEA", value: "Evropa / EMEA", icon: "🇪🇺" },
  { label: "Globalno & YC", value: "Globalno", icon: "🌍" },
  { label: "Freelance & AI", value: "Freelance", icon: "⚡" },
  { label: "Alati & Porezi", value: "Alat", icon: "🛠️" },
] as const;

export default function Home() {
  const [filter, setFilter] = useState("Sve");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const searchInputId = useId();

  // Load saved from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("remoteposlovi_saved");
      if (stored) {
        setSaved(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  const persistSaved = (items: string[]) => {
    setSaved(items);
    try {
      localStorage.setItem("remoteposlovi_saved", JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  const toggleSaved = (name: string) => {
    if (saved.includes(name)) {
      const next = saved.filter((item) => item !== name);
      persistSaved(next);
      showToast(`Uklonjeno iz sačuvanih: ${name}`);
    } else {
      const next = [...saved, name];
      persistSaved(next);
      showToast(`Sačuvano u tvojoj listi: ${name}`);
    }
  };

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        document.getElementById("main-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const matches = sources.filter(([name, description, , region, kind, label]) => {
    const matchesFilter = filter === "Sve" || region === filter || kind === filter;
    const matchesSaved = !showSaved || saved.includes(name);
    const searchTarget = `${name} ${description} ${label} ${region} ${kind}`.toLowerCase();
    const queryTerm = query.trim().toLowerCase();
    const matchesQuery = queryTerm === "" || searchTarget.includes(queryTerm);
    return matchesFilter && matchesSaved && matchesQuery;
  });

  const groupedMatches = resourceGroups
    .map((group) => ({
      ...group,
      items: matches.filter(([, , , , sourceKind]) => sourceKind === group.kind),
    }))
    .filter((group) => group.items.length > 0);

  const totalSourcesCount = sources.length;

  return (
    <main className="min-h-screen bg-[#f8f9f5] text-[#142822] selection:bg-[#cbe3cf] selection:text-[#112a23]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-[#142822]/15 bg-[#142822] px-5 py-3 text-xs font-semibold tracking-wide text-white shadow-2xl backdrop-blur-md transition-all animate-bounce">
          <span className="text-sm">❤️</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Glass Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#142822]/10 glass-nav transition-colors">
        <div className="mx-auto flex h-20 max-w-[1540px] items-center justify-between px-5 md:px-12">
          <a href="#top" className="group flex items-center gap-3 text-base font-bold tracking-tight text-[#142822]">
            <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#142822] to-[#25463b] text-base font-black text-[#e8f1df] shadow-md shadow-[#142822]/10 transition group-hover:scale-105">
              R
              <span className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-white bg-[#dc5b38]" />
            </span>
            <div className="flex flex-col">
              <span className="leading-none text-[#142822] font-black tracking-tight text-lg">
                Remote<span className="text-[#dc5b38]">Poslovi</span>
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#637a70]">
                Direktorijum · Srbija & Svet
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#4f675c] md:flex">
            <a href="#categories" className="transition hover:text-[#142822]">Kategorije</a>
            <a href="#directory" className="transition hover:text-[#142822]">Baza izvora</a>
            <a href="#quick-guide" className="transition hover:text-[#142822]">Vodič za Srbiju</a>
            <a href="#propose" className="transition hover:text-[#142822]">Predloži izvor</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setShowSaved((prev) => !prev);
                if (!showSaved) {
                  document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 ${
                showSaved
                  ? "border-[#dc5b38] bg-[#dc5b38] text-white shadow-md shadow-[#dc5b38]/20"
                  : "border-[#142822]/15 bg-white/90 text-[#142822] hover:border-[#142822]/40 hover:bg-white shadow-sm"
              }`}
            >
              <span>{showSaved ? "♥" : "♡"}</span>
              <span>Sačuvano</span>
              {saved.length > 0 && (
                <span
                  className={`grid size-5 place-items-center rounded-full text-[10px] font-extrabold ${
                    showSaved ? "bg-white text-[#dc5b38]" : "bg-[#142822] text-[#e8f1df]"
                  }`}
                >
                  {saved.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden border-b border-[#142822]/10 bg-gradient-to-b from-[#eaf3e5] via-[#f1f6ed] to-[#f8f9f5] pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Subtle Decorative Ambient Shapes */}
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[650px] -translate-x-1/2 rounded-full border-[60px] border-[#e2eee0]/60 blur-2xl" />
        <div className="pointer-events-none absolute top-1/3 -right-20 size-80 rounded-full bg-[#dc5b38]/5 blur-3xl" />
        
        <div className="relative mx-auto flex max-w-[1540px] flex-col items-center px-5 text-center md:px-12">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#142822]/10 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-md mb-8">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide uppercase text-[#39564b]">
              Baza ažurirana za avgust 2026. · {totalSourcesCount}+ proverenih izvora
            </span>
          </div>

          {/* Editorial Headline */}
          <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[1.04] tracking-[-0.035em] text-[#142822] md:text-7xl lg:text-[5rem]">
            Direktna vrata do posla <br className="hidden sm:inline" />
            koji radi <span className="italic text-[#dc5b38] underline decoration-[#dc5b38]/30 decoration-2 underline-offset-8">za tvoj život</span>.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#4f675c] md:text-xl font-normal">
            Čist, kuriran katalog remote platformi, AI poslova, predavanja engleskog, legalnih poreskih kalkulatora za Srbiju i alata za prolazak ATS selekcije.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl w-full">
            <div className="rounded-2xl border border-[#142822]/10 bg-white/85 p-4 text-center shadow-sm backdrop-blur-sm">
              <strong className="block text-2xl font-black text-[#142822] md:text-3xl">{totalSourcesCount}+</strong>
              <span className="mt-0.5 text-xs font-semibold text-[#637a70]">Proverenih izvora</span>
            </div>
            <div className="rounded-2xl border border-[#142822]/10 bg-white/85 p-4 text-center shadow-sm backdrop-blur-sm">
              <strong className="block text-2xl font-black text-[#dc5b38] md:text-3xl">100%</strong>
              <span className="mt-0.5 text-xs font-semibold text-[#637a70]">Dostupno iz Srbije</span>
            </div>
            <div className="rounded-2xl border border-[#142822]/10 bg-white/85 p-4 text-center shadow-sm backdrop-blur-sm">
              <strong className="block text-2xl font-black text-[#142822] md:text-3xl">0 RSD</strong>
              <span className="mt-0.5 text-xs font-semibold text-[#637a70]">Besplatno za kandidate</span>
            </div>
            <div className="rounded-2xl border border-[#142822]/10 bg-white/85 p-4 text-center shadow-sm backdrop-blur-sm">
              <strong className="block text-2xl font-black text-emerald-700 md:text-3xl">2026</strong>
              <span className="mt-0.5 text-xs font-semibold text-[#637a70]">Sveže ažurirano</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#directory"
              className="inline-flex items-center gap-2 rounded-full bg-[#142822] px-7 py-3.5 text-sm font-bold text-[#f2f7ec] shadow-lg shadow-[#142822]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e3b33] hover:shadow-xl"
            >
              <span>Istraži sve platforme</span>
              <span>↓</span>
            </a>
            <a
              href="#quick-guide"
              className="inline-flex items-center gap-2 rounded-full border border-[#142822]/20 bg-white/90 px-7 py-3.5 text-sm font-bold text-[#142822] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:border-[#142822]/40"
            >
              <span>Vodič za frilensere u Srbiji</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
        {/* Categories Section */}
        <section id="categories" className="scroll-mt-24">
          <div className="mb-10 flex flex-col items-center text-center">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#dc5b38]">Brza navigacija</p>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight md:text-5xl">Izaberi odakle krećeš</h2>
            <p className="mt-3 max-w-lg text-sm text-[#637a70]">Klikni na kategoriju da odmah filtriraš bazu ili istraži sve resurse ispod.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat, index) => {
              const isActive = filter === cat.value;
              const count = sources.filter(([, , , region, kind]) => region === cat.value || kind === cat.value).length;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    setFilter(cat.value);
                    setShowSaved(false);
                    document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group relative flex min-h-[260px] flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#142822] bg-[#142822] text-[#f2f7ec] shadow-xl shadow-[#142822]/15 scale-[1.02]"
                      : "border-[#142822]/10 bg-white hover:-translate-y-1.5 hover:border-[#142822]/30 hover:shadow-xl hover:shadow-[#142822]/5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{cat.icon}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isActive ? "bg-[#dc5b38] text-white" : "bg-[#edf4eb] text-[#3b594c]"
                        }`}
                      >
                        {count} izvora
                      </span>
                    </div>

                    <strong className="mt-5 block text-lg font-bold tracking-tight">{cat.title}</strong>
                    <p className={`mt-2 text-xs leading-relaxed ${isActive ? "text-[#b8cdc1]" : "text-[#637a70]"}`}>
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-current/10 flex items-center justify-between">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? "text-[#e8f1df]" : "text-[#dc5b38]"}`}>
                      Filtriraj bazu
                    </span>
                    <span className="text-sm font-bold transition group-hover:translate-x-1">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Directory Section */}
        <section id="directory" className="mt-24 scroll-mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#dc5b38]">Pretraga i filteri</p>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight md:text-5xl">
              {showSaved ? "Tvoji sačuvani izvori" : filter === "Sve" ? "Katalog svih platformi" : filter}
            </h2>

            {/* Smart Search Bar */}
            <div className="relative mx-auto mt-8 max-w-2xl">
              <label htmlFor={searchInputId} className="sr-only">
                Pretraži bazu poslova i alata
              </label>
              <div className="flex h-14 items-center gap-3 rounded-full border border-[#142822]/15 bg-white px-5 shadow-sm shadow-[#142822]/5 transition focus-within:border-[#dc5b38] focus-within:ring-2 focus-within:ring-[#dc5b38]/20">
                <span className="text-lg text-[#637a70]">🔍</span>
                <input
                  id={searchInputId}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pretraži po nazivu, veštini (npr. Outlier, AI, časovi, porezi, CV, YC)..."
                  className="w-full bg-transparent text-sm font-medium text-[#142822] placeholder:text-[#8ea299] outline-none md:text-base"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Obriši pretragu"
                    className="grid size-6 place-items-center rounded-full bg-[#edf4eb] text-xs font-bold text-[#4f675c] hover:bg-[#dc5b38] hover:text-white"
                  >
                    ✕
                  </button>
                )}
                <kbd className="hidden sm:inline-block rounded border border-[#142822]/10 bg-[#f4f7f1] px-2 py-0.5 text-[11px] font-mono text-[#637a70]">
                  /
                </kbd>
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {filterButtons.map((item) => {
                const isActive = !showSaved && filter === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setFilter(item.value);
                      setShowSaved(false);
                    }}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-[#142822] text-[#f2f7ec] shadow-md shadow-[#142822]/15"
                        : "border border-[#142822]/10 bg-white text-[#4f675c] hover:border-[#142822]/30 hover:bg-[#f3f7f0]"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setShowSaved((prev) => !prev)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                  showSaved
                    ? "bg-[#dc5b38] text-white shadow-md shadow-[#dc5b38]/20"
                    : "border border-[#142822]/10 bg-white text-[#4f675c] hover:border-[#dc5b38] hover:text-[#dc5b38]"
                }`}
              >
                <span>{showSaved ? "♥" : "♡"}</span>
                <span>Samo sačuvano ({saved.length})</span>
              </button>
            </div>

            <p className="mt-5 text-xs font-semibold text-[#637a70]">
              Prikazano <strong className="text-[#142822] font-black">{matches.length}</strong> od ukupno {totalSourcesCount} izvora
              {query && ` za upit "${query}"`}
            </p>
          </div>

          {/* Grouped Resource Listings */}
          <div className="mt-14 space-y-20">
            {groupedMatches.map((group) => (
              <section key={group.kind} aria-labelledby={`group-title-${group.kind}`}>
                {/* Group Header Card */}
                <div className="mb-7 grid overflow-hidden rounded-2xl border border-[#142822]/10 bg-white shadow-sm md:grid-cols-3">
                  <div className="flex min-h-28 flex-col items-center justify-center border-b border-[#142822]/10 p-6 text-center md:border-b-0 md:border-r">
                    <span className={`grid size-12 place-items-center rounded-2xl text-sm font-black border ${group.color}`}>
                      {group.items.length}
                    </span>
                    <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#637a70]">
                      Dostupnih izvora
                    </span>
                  </div>

                  <div className="flex min-h-28 flex-col items-center justify-center border-b border-[#142822]/10 p-6 text-center md:border-b-0 md:border-r">
                    <div className="flex items-center gap-1.5">
                      <span className={`size-2 rounded-full ${group.dot}`} />
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#dc5b38]">{group.badge}</p>
                    </div>
                    <h3 id={`group-title-${group.kind}`} className="mt-1.5 font-serif text-2xl font-bold tracking-tight text-[#142822]">
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex min-h-28 items-center justify-center p-6 text-center">
                    <p className="max-w-xs text-xs leading-relaxed text-[#637a70]">{group.description}</p>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map(([name, description, url, region, kind, label]) => {
                    const isSaved = saved.includes(name);

                    // Region badge details
                    const regionBadge =
                      region === "Srbija"
                        ? { bg: "bg-emerald-50 text-emerald-800 border-emerald-200", icon: "🇷🇸" }
                        : region === "Evropa / EMEA"
                        ? { bg: "bg-blue-50 text-blue-800 border-blue-200", icon: "🇪🇺" }
                        : { bg: "bg-amber-50 text-amber-900 border-amber-200", icon: "🌍" };

                    return (
                      <article
                        key={name}
                        role="link"
                        tabIndex={0}
                        onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            window.open(url, "_blank", "noopener,noreferrer");
                          }
                        }}
                        className="premium-card group relative flex min-h-[270px] cursor-pointer flex-col justify-between rounded-2xl border border-[#142822]/10 bg-white p-6 shadow-sm hover:border-[#142822]/30 focus:outline-none focus:ring-2 focus:ring-[#dc5b38]"
                      >
                        {/* Top row: tags & bookmark */}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${regionBadge.bg}`}
                              >
                                <span>{regionBadge.icon}</span>
                                <span>{region}</span>
                              </span>
                              <span className="rounded-full bg-[#f3f6f0] border border-[#142822]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#4f675c]">
                                {label}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaved(name);
                              }}
                              aria-label={isSaved ? `Ukloni ${name} iz sačuvanih` : `Sačuvaj ${name}`}
                              className={`grid size-9 shrink-0 place-items-center rounded-full border text-sm transition-all duration-150 ${
                                isSaved
                                  ? "border-[#dc5b38] bg-[#fff0eb] text-[#dc5b38] scale-110 shadow-sm"
                                  : "border-[#142822]/15 text-[#8ea299] hover:border-[#dc5b38] hover:text-[#dc5b38] hover:bg-[#fff7f5]"
                              }`}
                            >
                              {isSaved ? "♥" : "♡"}
                            </button>
                          </div>

                          {/* Card Title & Description */}
                          <div className="mt-5">
                            <h4 className="font-serif text-2xl font-bold tracking-tight text-[#142822] group-hover:text-[#dc5b38] transition-colors flex items-center gap-1.5">
                              <span>{name}</span>
                            </h4>
                            <p className="mt-2 text-xs leading-relaxed text-[#5c756a] font-normal">
                              {description}
                            </p>
                          </div>
                        </div>

                        {/* Bottom row: Direct Action */}
                        <div className="mt-6 flex items-center justify-between border-t border-[#142822]/10 pt-4 text-xs font-bold">
                          <span className="text-[#8ea299] font-medium tracking-wide">Zvanični sajt</span>
                          <span className="inline-flex items-center gap-1 text-[#dc5b38] transition group-hover:translate-x-1">
                            <span>Poseti platformu</span>
                            <span>↗</span>
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}

            {matches.length === 0 && (
              <div className="rounded-2xl border border-dashed border-[#142822]/20 bg-white/70 py-16 text-center">
                <p className="text-3xl">🔍</p>
                <p className="mt-3 font-serif text-xl font-bold text-[#142822]">Nema rezultata za ovu pretragu</p>
                <p className="mt-1 text-xs text-[#637a70]">Pokušaj sa drugim pojmom ili resetuj aktivne filtere.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("Sve");
                    setQuery("");
                    setShowSaved(false);
                  }}
                  className="mt-5 rounded-full bg-[#142822] px-5 py-2.5 text-xs font-bold text-[#e8f1df] transition hover:bg-[#23453a]"
                >
                  Prikaži sve izvore
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Guide / Knowledge Section for Serbia */}
        <section id="quick-guide" className="mt-28 scroll-mt-24">
          <div className="rounded-3xl border border-[#142822]/10 bg-gradient-to-br from-[#142822] to-[#1d3d33] p-8 text-[#e8f1df] md:p-14 shadow-2xl">
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#dc5b38]">Kratki vodič za Srbiju</p>
              <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-white md:text-5xl">
                Kako legalno i efikasno raditi sa inostranstvom?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#b5cbbf] md:text-base">
                Rad na daljinu iz Srbije je potpuno legalan i jednostavniji nego ikada uz dva glavna modela poslovanja:
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="grid size-10 place-items-center rounded-xl bg-[#dc5b38] text-sm font-black text-white">
                  01
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Portal Frilenseri (UJP)</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#b5cbbf]">
                  Idealan model za početnike, povremene projekte, časove jezika i AI trening. Poreska prijava se podnosi kvartalno (u roku od 30 dana nakon isteka tromesečja) uz izbor Modela A ili Modela B.
                </p>
                <a
                  href="https://frilenseri.ujp.gov.rs/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#dc5b38] hover:underline"
                >
                  Otvori portal UJP ↗
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="grid size-10 place-items-center rounded-xl bg-emerald-700 text-sm font-black text-white">
                  02
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">Paušalna Agencija (PR)</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#b5cbbf]">
                  Najisplativija opcija za stabilne mesečne prihode i dugoročne ugovore (do 6 miliona RSD godišnje). Fiksni mesečni porezi i doprinosi, uz prolazak Testa samostalnosti.
                </p>
                <a
                  href="https://digitalnazajednica.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#dc5b38] hover:underline"
                >
                  Digitalna Zajednica vodič ↗
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-sm font-black text-white">
                  03
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">ATS CV i Priprema</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#b5cbbf]">
                  Strane kompanije koriste Applicant Tracking Systems. Formatiraj CV u jednoj koloni kroz Reactive Resume i testiraj poklapanje ključnih reči na Jobscan-u pre slanja.
                </p>
                <a
                  href="https://rxresu.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#dc5b38] hover:underline"
                >
                  Besplatan CV alat ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Suggest a Resource Section */}
        <section id="propose" className="mt-20 scroll-mt-24">
          <div className="rounded-3xl border border-[#142822]/10 bg-[#e8f1df] p-8 md:p-12">
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1.2fr_.8fr] md:items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#dc5b38]">Zajednica & Doprinos</span>
                <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#142822] md:text-4xl">
                  Znaš platformu ili alat koji nedostaje?
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-[#4f675c] md:text-sm">
                  Cilj ovog projekta je da ostane najkompletniji besplatan vodič za sve ljude iz Srbije i regiona koji žele slobodu rada na daljinu.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
                <a
                  href="https://x.com/KoronVirus"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#142822] px-6 py-3.5 text-xs font-bold text-white shadow-md transition hover:bg-[#23453a]"
                >
                  <span>Piši na X / Twitter</span>
                  <span>↗</span>
                </a>
                <a
                  href="mailto:zoxknez@hotmail.com?subject=Predlog%20resursa%20za%20Remote%20poslove"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#142822]/20 bg-white px-6 py-3.5 text-xs font-bold text-[#142822] shadow-sm transition hover:bg-[#f3f7f0]"
                >
                  <span>Pošalji predlog mejlom</span>
                  <span>✉</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#142822]/10 bg-white py-10 text-xs text-[#637a70]">
        <div className="mx-auto flex max-w-[1540px] flex-col items-center justify-between gap-4 px-5 md:flex-row md:px-12">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="font-bold text-[#142822]">RemotePoslovi.rs</span>
            <span>·</span>
            <span>Baza poslova na daljinu, freelance platformi i alata</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#top" className="font-semibold text-[#142822] hover:text-[#dc5b38] transition">
              Nazad na vrh ↑
            </a>
            <span>Ažurirano: avgust 2026.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

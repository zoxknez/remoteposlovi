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
  ["Poslovi u Srbiji", "Srbija", "Platforme i kompanije koje provereno zapošljavaju iz Srbije."],
  ["Evropa i EMEA", "Evropa / EMEA", "Remote uloge usklađene sa evropskim vremenskim zonama."],
  ["Globalni oglasi", "Globalno", "Međunarodne kompanije, YC startupi i 4-dnevna radna nedelja."],
  ["Freelance & AI", "Freelance", "Projekti, AI trening (Outlier), online časovi i samostalni rad."],
  ["Alati i porezi", "Alat", "Zvanični UJP portal, paušal, provera plata i ATS priprema CV-ja."],
] as const;

const resourceGroups = [
  ["Oglasi", "Oglasi za posao", "Platforme, kompanije i baze otvorenih remote pozicija.", "bg-[#edf3eb] text-[#426052]"],
  ["Freelance", "Freelance, AI i Podučavanje", "Projekti, platforme bez provizije, AI trening i online časovi.", "bg-[#f8eee9] text-[#98503a]"],
  ["Alat", "Porezi, Alati, Plate i Vodiči", "Zvanični UJP portal, paušalni vodiči, provera zarada i priprema CV-ja.", "bg-[#eeeaf6] text-[#5e4f83]"],
] as const;

const filters = ["Sve", "Srbija", "Evropa / EMEA", "Globalno", "Freelance", "Alat"];

export default function Home() {
  const [filter, setFilter] = useState("Sve");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
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

  const persistSaved = (items: string[]) => {
    setSaved(items);
    try {
      localStorage.setItem("remoteposlovi_saved", JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const toggleSaved = (name: string) => {
    if (saved.includes(name)) {
      persistSaved(saved.filter((item) => item !== name));
    } else {
      persistSaved([...saved, name]);
    }
  };

  const matches = sources.filter(([name, description, , region, kind, label]) => {
    const matchesFilter = filter === "Sve" || region === filter || kind === filter;
    const matchesSaved = !showSaved || saved.includes(name);
    const searchTarget = `${name} ${description} ${label} ${region} ${kind}`.toLowerCase();
    const queryTerm = query.trim().toLowerCase();
    return matchesFilter && matchesSaved && (queryTerm === "" || searchTarget.includes(queryTerm));
  });

  const groupedMatches = resourceGroups
    .map(([kind, title, description, color]) => ({
      kind,
      title,
      description,
      color,
      items: matches.filter(([, , , , sourceKind]) => sourceKind === kind),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen bg-[#f8f9f5] text-[#17312a]">
      {/* Top Header with authentic Logo */}
      <header className="sticky top-0 z-40 border-b border-[#17312a]/10 bg-[#fdfdfb]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1540px] items-center justify-between px-5 md:px-12">
          <a href="#directory" className="flex items-center gap-3 text-sm font-bold text-[#17312a]">
            <span className="grid size-9 place-items-center rounded-full bg-[#17312a] text-[#e7f0df] text-sm font-bold">
              R
            </span>
            <span>Remote poslovi</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-[#60736b] md:flex">
            <a href="#categories" className="hover:text-[#17312a] transition">Kategorije</a>
            <a href="#directory" className="hover:text-[#17312a] transition">Svi izvori</a>
            <a href="#quick-guide" className="hover:text-[#17312a] transition">Vodič za Srbiju</a>
            <a href="#propose" className="hover:text-[#17312a] transition">Predloži resurs</a>
          </nav>

          <button
            type="button"
            onClick={() => setShowSaved((value) => !value)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              showSaved
                ? "border-[#17312a] bg-[#17312a] text-white"
                : "border-[#17312a]/15 bg-white text-[#17312a] hover:border-[#17312a]/40 shadow-sm"
            }`}
          >
            {showSaved ? "♥ Sačuvano" : "♡ Sačuvano"} {saved.length > 0 && `(${saved.length})`}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#17312a]/10 bg-[#e5f0df]">
        <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[70px] border-[#f5f8ee]" />
        
        <div className="relative mx-auto flex min-h-[390px] max-w-[1540px] flex-col items-center justify-center px-5 py-16 text-center md:px-12">
          <p className="mb-5 rounded-full border border-[#17312a]/15 bg-[#f8fbf4]/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#4b6658]">
            REMOTE POSLOVI · SRBIJA · EVROPA · SVET
          </p>

          <h1 className="max-w-4xl font-serif text-5xl font-normal leading-[1.02] tracking-[-0.04em] text-[#17312a] md:text-7xl">
            Direktorijum za remote posao
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#52675f] md:text-lg">
            Platforme, freelance izvori, kompanije, alati za CV i provera plata. Izaberi kategoriju ili odmah pretraži bazu.
          </p>

          <a
            href="#categories"
            className="mt-9 rounded-full bg-[#17312a] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#244239]"
          >
            Pregledaj kategorije
          </a>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
        {/* Categories Grid */}
        <section id="categories" className="scroll-mt-24">
          <div className="mb-10 flex flex-col items-center text-center">
            <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">KATEGORIJE</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] md:text-5xl text-[#17312a]">Izaberi odakle krećeš</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map(([title, value, description], index) => {
              const isActive = filter === value && !showSaved;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setFilter(value);
                    setShowSaved(false);
                    document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group min-h-60 rounded-xl border p-7 text-center transition duration-200 ${
                    isActive
                      ? "border-[#17312a] bg-[#17312a] text-white shadow-lg shadow-[#17312a]/15"
                      : "border-[#17312a]/10 bg-white hover:-translate-y-1 hover:border-[#17312a]/35 hover:shadow-lg hover:shadow-[#17312a]/5"
                  }`}
                >
                  <span
                    className={`mx-auto grid size-11 place-items-center rounded-full text-sm font-bold ${
                      isActive ? "bg-[#dc5b38] text-white" : "bg-[#e3eee0] text-[#325448]"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <strong className="mt-8 block text-lg font-bold">{title}</strong>
                  <span className={`mx-auto mt-3 block max-w-[13rem] text-sm leading-6 ${isActive ? "text-[#c9d8cb]" : "text-[#60736b]"}`}>
                    {description}
                  </span>
                  <span className={`mt-7 inline-block text-xs font-bold ${isActive ? "text-[#e7f0df]" : "text-[#dc5b38]"}`}>
                    Otvori kategoriju →
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Directory & Search */}
        <section id="directory" className="mt-24 scroll-mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PRETRAGA IZVORA</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] md:text-5xl text-[#17312a]">
              {showSaved ? "Sačuvani izvori" : filter === "Sve" ? "Svi izvori" : filter}
            </h2>

            <div className="relative mx-auto mt-8 max-w-2xl">
              <label htmlFor={searchInputId} className="sr-only">
                Pretraži platformu, oblast ili alat
              </label>
              <div className="flex h-14 items-center gap-4 rounded-full border border-[#17312a]/15 bg-white px-6 shadow-sm shadow-[#17312a]/5 focus-within:border-[#17312a]/40">
                <span className="text-xl text-[#60736b]">⌕</span>
                <input
                  id={searchInputId}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Pretraži platformu, oblast ili alat..."
                  className="w-full bg-transparent text-base outline-none placeholder:text-[#8a9891]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Obriši pretragu"
                    className="grid size-6 place-items-center rounded-full bg-[#f1f4ef] text-xs font-bold text-[#60736b] hover:bg-[#dc5b38] hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setFilter(item);
                    setShowSaved(false);
                  }}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                    !showSaved && filter === item
                      ? "bg-[#17312a] text-white shadow-sm"
                      : "border border-[#17312a]/10 bg-white text-[#60736b] hover:border-[#17312a]/30"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowSaved((prev) => !prev)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  showSaved
                    ? "bg-[#dc5b38] text-white shadow-sm"
                    : "border border-[#17312a]/10 bg-white text-[#60736b] hover:border-[#dc5b38] hover:text-[#dc5b38]"
                }`}
              >
                Sačuvano ({saved.length})
              </button>
            </div>

            <p className="mt-5 text-sm font-medium text-[#60736b]">
              {matches.length} rezultata {showSaved && "u sačuvanim izvorima"}
            </p>
          </div>

          {/* Grouped Resource Listings */}
          <div className="mt-14 space-y-20">
            {groupedMatches.map((group) => (
              <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
                <div className="mb-6 grid overflow-hidden rounded-xl border border-[#17312a]/10 bg-white md:grid-cols-3">
                  <div className="flex min-h-32 flex-col items-center justify-center border-b border-[#17312a]/10 p-6 text-center md:border-b-0 md:border-r">
                    <span className={`grid size-14 place-items-center rounded-full text-sm font-bold ${group.color}`}>
                      {group.items.length}
                    </span>
                    <span className="mt-2 text-xs font-medium text-[#60736b]">izvora u kategoriji</span>
                  </div>

                  <div className="flex min-h-32 flex-col items-center justify-center border-b border-[#17312a]/10 p-6 text-center md:border-b-0 md:border-r">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#dc5b38]">{group.kind.toUpperCase()}</p>
                    <h3 id={`group-${group.kind}`} className="mt-2 font-serif text-2xl font-semibold tracking-[-0.02em] text-[#17312a]">
                      {group.title}
                    </h3>
                  </div>

                  <div className="flex min-h-32 items-center justify-center p-6 text-center">
                    <p className="max-w-xs text-sm leading-6 text-[#60736b]">{group.description}</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map(([name, description, url, region, kind, label]) => {
                    const isSaved = saved.includes(name);

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
                        className="group relative flex min-h-[250px] cursor-pointer flex-col justify-between rounded-xl border border-[#17312a]/10 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-[#17312a]/30 hover:shadow-xl hover:shadow-[#17312a]/10 focus:outline-none focus:ring-2 focus:ring-[#dc5b38]"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full bg-[#edf3eb] px-2.5 py-1 text-[10px] font-bold text-[#486256]">
                                {region}
                              </span>
                              <span className="rounded-full bg-[#f8eee9] px-2.5 py-1 text-[10px] font-bold text-[#a54931]">
                                {kind}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaved(name);
                              }}
                              aria-label={`Sačuvaj ${name}`}
                              className={`grid size-9 shrink-0 place-items-center rounded-full border text-base transition ${
                                isSaved
                                  ? "border-[#dc5b38] bg-[#fff1ec] text-[#dc5b38]"
                                  : "border-[#17312a]/15 text-[#60736b] hover:border-[#dc5b38] hover:text-[#dc5b38]"
                              }`}
                            >
                              {isSaved ? "♥" : "♡"}
                            </button>
                          </div>

                          <h4 className="mt-6 font-serif text-2xl font-bold text-[#17312a] group-hover:text-[#dc5b38] transition-colors">
                            {name}
                          </h4>
                          <p className="mt-2.5 text-sm leading-6 text-[#60736b]">{description}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-[#17312a]/10 pt-4">
                          <span className="text-xs font-medium text-[#7c8c84]">{label}</span>
                          <span className="text-sm font-bold text-[#dc5b38] group-hover:translate-x-0.5 transition-transform">
                            Otvori izvor ↗
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}

            {matches.length === 0 && (
              <p className="py-20 text-center text-sm text-[#60736b]">Nema izvora za ovaj filter ili pretragu.</p>
            )}
          </div>
        </section>

        {/* Beautifully balanced Guide Section for Serbia (Slika 2 fix) */}
        <section id="quick-guide" className="mt-24 scroll-mt-24">
          <div className="rounded-2xl border border-[#17312a]/10 bg-[#17312a] p-8 text-[#e8f1df] md:p-12 shadow-lg">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold tracking-[0.16em] uppercase text-[#dc5b38]">KRATKI VODIČ ZA SRBIJU</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl font-normal tracking-tight text-white">
                Kako poslovati sa inostranstvom?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#c7d6ca] md:text-base">
                Rad na daljinu iz Srbije je u potpunosti pravno uređen. U zavisnosti od obima posla i klijenata, na raspolaganju su ti provereni modeli:
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg bg-[#dc5b38] text-xs font-bold text-white">
                    01
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">Portal Frilenseri (UJP)</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#b8cdc1]">
                    Namenjen za honorarne poslove, časove jezika, AI zadatke i povremene projekte. Porez se prijavljuje i plaća kvartalno (Model A ili B).
                  </p>
                </div>
                <a
                  href="https://frilenseri.ujp.gov.rs/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 text-xs font-bold text-[#dc5b38] hover:underline"
                >
                  Zvanični portal UJP ↗
                </a>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg bg-[#2d5849] text-xs font-bold text-white">
                    02
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">Paušalna Agencija (PR)</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#b8cdc1]">
                    Optimalno za stabilne mesečne prihode do 6 miliona dinara godišnje. Fiksni mesečni troškovi uz obavezan prolazak Testa samostalnosti.
                  </p>
                </div>
                <a
                  href="https://digitalnazajednica.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 text-xs font-bold text-[#dc5b38] hover:underline"
                >
                  Digitalna Zajednica vodič ↗
                </a>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <span className="grid size-9 place-items-center rounded-lg bg-[#43527a] text-xs font-bold text-white">
                    03
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">ATS CV i Priprema</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#b8cdc1]">
                    Strane firme filtriraju prijave kroz ATS softvere. Koristi Reactive Resume za čiste formate i proveri ključne reči na Jobscan-u.
                  </p>
                </div>
                <a
                  href="https://rxresu.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 text-xs font-bold text-[#dc5b38] hover:underline"
                >
                  Otvori besplatan CV alat ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Suggest a Resource Section */}
        <section id="propose" className="mt-20 scroll-mt-24">
          <div className="rounded-2xl border border-[#17312a]/10 bg-[#e5f0df] px-6 py-12 md:px-12">
            <div className="mx-auto grid max-w-4xl gap-8 text-center md:grid-cols-[1fr_auto] md:items-center md:text-left">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PREDLOŽI RESURS</p>
                <h2 className="mt-2 font-serif text-3xl tracking-[-0.025em] text-[#17312a]">
                  Znaš koristan izvor koji nedostaje?
                </h2>
                <p className="mt-2 text-sm text-[#52675f]">
                  Pošalji link i kratak opis, pa može biti dodat u direktorijum.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:justify-end">
                <a
                  href="https://x.com/KoronVirus"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#17312a] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#244239]"
                >
                  Piši na X
                </a>
                <a
                  href="mailto:zoxknez@hotmail.com?subject=Predlog%20resursa%20za%20Remote%20poslove"
                  className="rounded-full border border-[#17312a]/20 bg-white px-6 py-3 text-sm font-bold text-[#17312a] shadow-sm transition hover:bg-[#f3f7f0]"
                >
                  Pošalji email
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#17312a]/10 bg-white px-5 py-8 text-xs text-[#60736b] md:px-12">
        <div className="mx-auto flex max-w-[1540px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#17312a]">Remote poslovi</span>
            <span>·</span>
            <span>Direktorijum za kandidate iz Srbije i regiona</span>
          </div>
          <span>Ažurirano: avgust 2026.</span>
        </div>
      </footer>
    </main>
  );
}

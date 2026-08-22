"use client";

import { useState } from "react";

const sources = [
  ["HelloWorld", "Domaći IT, podrška, prodaja, marketing i QA oglasi sa remote filterom.", "https://www.helloworld.rs/oglasi-za-posao/remote", "Srbija", "Oglasi", "Lokalno"],
  ["Himalayas", "Remote pozicije sa jasnim filterima za Srbiju, iskustvo i tehnologije.", "https://himalayas.app/jobs/countries/serbia", "Srbija", "Oglasi", "Za Srbiju"],
  ["Dynamite Jobs", "Kurirani remote oglasi, uključujući kompanije otvorene za kandidate iz Srbije.", "https://dynamitejobs.com/country/remote-jobs-in-serbia", "Srbija", "Oglasi", "Za Srbiju"],
  ["Remote in Europe", "Kurirani poslovi za evropske vremenske zone u više digitalnih disciplina.", "https://remoteineurope.com/", "Evropa / EMEA", "Oglasi", "EU fokus"],
  ["Remotive", "EMEA kategorija za product, tech, marketing i customer support pozicije.", "https://remotive.com/remote-emea-jobs", "Evropa / EMEA", "Oglasi", "EMEA"],
  ["We Work Remotely", "Jedna od najvećih globalnih baza za poslove koji su u potpunosti remote.", "https://weworkremotely.com/100-percent-remote-jobs", "Globalno", "Oglasi", "Kurirano"],
  ["Wellfound", "Pozicije u međunarodnim startupima za product, razvoj, dizajn i operacije.", "https://wellfound.com/jobs", "Globalno", "Oglasi", "Startupi"],
  ["Work at a Startup", "Zvanična Y Combinator baza remote poslova u najperspektivnijim svetskim startupima.", "https://www.workatastartup.com/", "Globalno", "Oglasi", "Startupi"],
  ["4 Day Week", "Kurirana baza remote poslova sa 4-dnevnom radnom nedeljom (32h) i punom platom.", "https://4dayweek.io/", "Globalno", "Oglasi", "Balans"],
  ["DailyRemote", "Dnevno ažurirani remote oglasi za razvoj, dizajn, marketing, prodaju i podršku.", "https://dailyremote.com/", "Globalno", "Oglasi", "Globalno"],
  ["Upwork", "Globalni freelance projekti iz razvoja, dizajna, marketinga i administracije.", "https://www.upwork.com/freelance-jobs/", "Globalno", "Freelance", "Projekti"],
  ["Contra", "Portfolio-first freelance mreža za kreativne i digitalne profesionalce.", "https://contra.com/features/find-freelance-jobs", "Globalno", "Freelance", "Nezavisno"],
  ["Hubstaff Talent", "Besplatna mreža za direktno povezivanje freelancera i kompanija bez posredničkih provizija.", "https://hubstafftalent.com/", "Globalno", "Freelance", "Bez provizije"],
  ["Outlier", "Plaćeni zadaci za treniranje i evaluaciju AI modela, sa nedeljnim isplatama i podrškom za Srbiju.", "https://outlier.ai/", "Globalno", "Freelance", "AI trening"],
  ["NativeCamp", "Online časovi engleskog jezika sa fleksibilnim rasporedom 24/7, popularno među predavačima u Srbiji.", "https://nativecamp.net/tutors", "Srbija", "Freelance", "Podučavanje"],
  ["Engoo", "Globalna platforma za online časove engleskog jezika uz obezbeđene nastavne materijale.", "https://teach.engoo.com/", "Globalno", "Freelance", "Podučavanje"],
  ["Preply", "Kreirajte profil i držite online časove jezika ili drugih predmeta.", "https://preply.com/en/teach", "Globalno", "Freelance", "Podučavanje"],
  ["Cambly", "Online razgovori i časovi engleskog jezika sa fleksibilnim terminima.", "https://www.cambly.com/tutors", "Globalno", "Freelance", "Podučavanje"],
  ["italki", "Postavite cene i termine za online časove jezika uz međunarodnu naplatu i globalnu bazu učenika.", "https://teach.italki.com/", "Globalno", "Freelance", "Podučavanje"],
  ["Twenix", "Online konverzacijski časovi engleskog za odrasle uz materijale i fleksibilne termine.", "https://twenix.com/tweachers-apply/", "Evropa / EMEA", "Freelance", "Podučavanje"],
  ["Lingo Turtle", "Online časovi engleskog za mlade učenike, sa rasporedom koji možete sami da postavite.", "https://lingo-turtle.com/", "Srbija", "Freelance", "Podučavanje"],
  ["Reactive Resume", "Besplatan open-source alat za uređivanje modernog, izvozivog CV-ja.", "https://rxresu.me/", "Globalno", "Alat", "CV"],
  ["Huntr", "Pratite oglase, verzije CV-ja, intervjue, kontakte i sledeće korake.", "https://huntr.co/", "Globalno", "Alat", "Organizacija"],
  ["Jobscan", "Uporedite CV sa konkretnim oglasom, pronađite nedostajuće ATS ključne reči i proverite format.", "https://www.jobscan.co/resume-scanner", "Globalno", "Alat", "ATS CV"],
  ["Interviewing.io", "Anonimne probne tehničke intervjue i AI vežbe za kodiranje, system design i behavior pitanja.", "https://interviewing.io/", "Globalno", "Alat", "Intervju"],
  ["Resume Worded", "Analiza CV-ja i LinkedIn profila sa konkretnim preporukama za jaču prijavu.", "https://resumeworded.com/", "Globalno", "Alat", "CV"],
  ["Frilenseri Poreska", "Zvanični državni portal za samooporezivanje, kalkulator i kvartalnu prijavu prihoda iz inostranstva.", "https://frilenseri.ujp.gov.rs/", "Srbija", "Alat", "Porezi"],
  ["Digitalna Zajednica", "Vodiči, pravni saveti, kalkulatori i podrška za frilensere i preduzetnike u Srbiji.", "https://digitalnazajednica.org/", "Srbija", "Alat", "Zajednica"],
  ["Paušal.rs", "Vodič i platforma za jednostavno vođenje paušalne agencije, fakturisanje i poreske obaveze.", "https://www.pausal.rs/", "Srbija", "Alat", "Paušal"],
  ["Good Air Language", "Sveobuhvatna baza i vodič kroz kompanije za online predavanje engleskog jezika, sa platama, zahtevima i direktnim linkovima za prijavu.", "https://www.goodairlanguage.com/teaching-english-online-2", "Globalno", "Alat", "ESL vodič"],
  ["Levels.fyi", "Poređenje plata i ukupnih kompenzacija, naročito za IT uloge.", "https://www.levels.fyi/", "Globalno", "Alat", "Plate"],
  ["Glassdoor", "Recenzije kompanija, plate, uslovi rada i iskustva sa intervjua.", "https://www.glassdoor.com/Reviews/index.htm", "Globalno", "Alat", "Istraživanje"],
  ["Joberty", "Istražite IT kompanije, iskustva zaposlenih, intervjue i plate u regionu.", "https://joberty.com/IT-companies?page=1&sort=featured", "Srbija", "Alat", "Istraživanje"],
  ["GitLab All-Remote", "Detaljan besplatan priručnik o komunikaciji, dokumentovanju i radu u remote timu.", "https://handbook.gitlab.com/handbook/company/culture/all-remote/", "Globalno", "Alat", "Vodič"],
  ["Remote.co Blog", "Saveti za traženje posla, intervjue, CV i rad od kuće.", "https://remote.co/blog", "Globalno", "Alat", "Vodič"],
  ["Remoters", "Baza remote poslova, digitalnih alata, događaja i vodiča za rad sa bilo koje lokacije.", "https://remoters.net/", "Globalno", "Alat", "Vodič"],
  ["Zapier Remote Guide", "Vodič za produktivnost, alate i organizaciju remote rada.", "https://zapier.com/blog/remote-work/", "Globalno", "Alat", "Vodič"],
  ["Teal", "Prilagođavanje CV-ja, praćenje oglasa i organizovanje procesa zapošljavanja.", "https://www.tealhq.com/", "Globalno", "Alat", "CV"],
  ["Simplify", "Čuvanje oglasa, pomoć pri prijavi i praćenje procesa zapošljavanja.", "https://simplify.jobs/", "Globalno", "Alat", "Organizacija"],
  ["Built In", "Remote tech oglasi i profili kompanija za razvoj, data, product, dizajn, prodaju i operacije.", "https://builtin.com/jobs/remote", "Globalno", "Oglasi", "Tech"],
  ["Authentic Jobs", "Specijalizovan direktorijum za dizajnere, developere, marketare i kreativne profesionalce.", "https://authenticjobs.com/?search_location=remote", "Globalno", "Oglasi", "Kreativno"],
  ["Behance Jobs", "Freelance i full-time poslovi za vizuelni dizajn, motion, ilustraciju, 3D i kreativnu produkciju.", "https://www.behance.net/joblist", "Globalno", "Oglasi", "Dizajn"],
  ["Dribbble Jobs", "Poslovi za UI/UX, product, web, grafičke i brend dizajnere.", "https://dribbble.com/jobs", "Globalno", "Oglasi", "Dizajn"],
  ["UI/UX Jobs Board", "Remote i freelance oglasi za UI/UX i product dizajnere.", "https://uiuxjobsboard.com/design-jobs/remote", "Globalno", "Oglasi", "Dizajn"],
  ["Freelance Writing", "Oglasi za copywritere, urednike, tehničke pisce i content strategiste, sa filtrima po veštinama.", "https://www.freelancewriting.com/writer-jobs/", "Globalno", "Freelance", "Pisanje"],
  ["Content Writing Jobs", "Oglasi za copywritere, tehničke pisce, urednike i autore sadržaja.", "https://contentwritingjobs.com/", "Globalno", "Oglasi", "Pisanje"],
  ["ProBlogger Jobs", "Poslovi za blogere, copywritere, urednike i pisce sadržaja.", "https://problogger.com/jobs/", "Globalno", "Oglasi", "Pisanje"],
  ["JournalismJobs", "Oglasi za reportere, urednike, pisce i dizajnere, uključujući remote i freelance angažmane.", "https://www.journalismjobs.com/job-listings?virtual=3", "Globalno", "Oglasi", "Novinarstvo"],
  ["Support Driven Jobs", "Oglasi za korisničku podršku i customer success stručnjake.", "https://jobs.supportdriven.com/", "Globalno", "Oglasi", "Podrška"],
  ["PowerToFly", "Baza oglasa i karijernih resursa za inkluzivnije zapošljavanje u techu i drugim oblastima.", "https://powertofly.com/jobs", "Globalno", "Oglasi", "Karijera"],
  ["Jobgether", "Velika baza verifikovanih remote oglasa sa filtrima po regionu, senioritetu i ugovoru.", "https://jobgether.com/remote-jobs", "Globalno", "Oglasi", "Verifikovano"],
  ["FlexJobs", "Kurirana platforma za remote i fleksibilne poslove, sa naglaskom na proverene oglase.", "https://www.flexjobs.com/remote-jobs", "Globalno", "Oglasi", "Kurirano"],
  ["Virtual Vocations", "Remote oglasi iz razvoja, obrazovanja, pisanja, zdravstva, podrške i administracije.", "https://www.virtualvocations.com/browse", "Globalno", "Oglasi", "Oblasti"],
  ["NoDesk", "Remote oglasi, direktorijum kompanija i vodiči za rad na daljinu.", "https://nodesk.co/remote-jobs/", "Globalno", "Oglasi", "Kurirano"],
  ["JustRemote", "Globalni remote poslovi iz programiranja, marketinga, pisanja, dizajna i podrške.", "https://justremote.co/remote-jobs/", "Globalno", "Oglasi", "Globalno"],
  ["Jobspresso", "Kurirani oglasi iz IT-a, marketinga, prodaje, dizajna i pisanja.", "https://jobspresso.co/remote-work/", "Globalno", "Oglasi", "Kurirano"],
  ["Remote OK", "Velika globalna baza remote poslova, tehničkih i netehničkih.", "https://remoteok.com/", "Globalno", "Oglasi", "Globalno"],
  ["Remote.com Jobs", "Međunarodni poslovi sa naznačenim dozvoljenim državama i vremenskim zonama.", "https://remote.com/jobs", "Globalno", "Oglasi", "Globalno"],
  ["Startup Jobs", "Otvorene pozicije u startupima širom sveta, uključujući Evropu i EMEA.", "https://startup.jobs/", "Globalno", "Oglasi", "Startupi"],
  ["Welcome to the Jungle", "Oglasi i detaljni profili kompanija za istraživanje tima, kulture i otvorenih pozicija.", "https://www.welcometothejungle.com/en/jobs", "Evropa / EMEA", "Oglasi", "Kompanije"],
  ["Landing.Jobs", "Međunarodne tech pozicije i projekti, uz podršku za remote, hibridni i prekogranični rad.", "https://landing.jobs/jobs", "Evropa / EMEA", "Oglasi", "Tech"],
  ["Remotify Europe", "Evropske kompanije i remote poslovi sa filterom prema državi kandidata.", "https://remotifyeurope.com/remote-jobs?country=Serbia", "Evropa / EMEA", "Oglasi", "EU fokus"],
  ["Working Nomads", "Oglasi razvrstani po oblastima i evropskim vremenskim zonama.", "https://www.workingnomads.com/remote-europe-jobs", "Evropa / EMEA", "Oglasi", "EU fokus"],
  ["Wellfound Europe", "Startup prilike iz IT-a, producta, marketinga, prodaje i operacija u Evropi.", "https://wellfound.com/location/europe", "Evropa / EMEA", "Oglasi", "Startupi"],
  ["EURES", "Zvanični evropski portal za oglase, mobilnost, uslove rada i podršku EURES savetnika.", "https://eures.europa.eu/index_en", "Evropa / EMEA", "Oglasi", "EU zvanično"],
  ["European Job Days", "Online evropski događaji za zapošljavanje, oglasi i direktan kontakt sa poslodavcima.", "https://www.europeanjobdays.eu/en", "Evropa / EMEA", "Oglasi", "Događaji"],
  ["Europass", "Zvanični evropski alat za izradu CV-ja, profila veština i prijava za posao.", "https://europass.europa.eu/en", "Evropa / EMEA", "Alat", "CV"],
  ["Poslovi Infostud", "Remote poslovi u IT-u, administraciji, prodaji, podršci i marketingu.", "https://poslovi.infostud.com/remote", "Srbija", "Oglasi", "Lokalno"],
  ["Startuj", "Prakse i početničke pozicije za studente i kandidate na početku karijere.", "https://startuj.infostud.com/prakse", "Srbija", "Oglasi", "Junior"],
  ["Ovde Jobs", "Poslovi za kandidate iz Srbije i regiona kod domaćih i stranih kompanija.", "https://ovdejobs.com/", "Srbija", "Oglasi", "Region"],
  ["Arc", "Remote poslovi i freelance projekti za programere, dizajnere i digitalne profesionalce.", "https://arc.dev/en-rs/remote-jobs", "Srbija", "Oglasi", "Tech"],
  ["Remote Rocketship", "Remote poslovi za Srbiju, od praksi do senior i part-time uloga.", "https://www.remoterocketship.com/country/serbia/jobs/", "Srbija", "Oglasi", "Za Srbiju"],
  ["EU Remote Jobs", "Oglasi u kojima je Srbija eksplicitno navedena kao podržana lokacija.", "https://euremotejobs.com/job-region/serbia/", "Srbija", "Oglasi", "Za Srbiju"],
  ["NCR Voyix Careers", "Zvanične otvorene pozicije kompanije NCR Voyix u Srbiji i inostranstvu.", "https://www.ncrvoyix.com/about/careers", "Srbija", "Oglasi", "Kompanije"],
  ["Freelancer", "Međunarodni freelance projekti iz širokog spektra oblasti.", "https://www.freelancer.com/jobs/", "Globalno", "Freelance", "Projekti"],
  ["Fiverr", "Platforma na kojoj samostalno nudite digitalne usluge klijentima širom sveta.", "https://www.fiverr.com/", "Globalno", "Freelance", "Usluge"],
  ["PeoplePerHour", "Freelance poslovi iz razvoja, dizajna, pisanja, marketinga i podrške.", "https://www.peopleperhour.com/freelance-jobs", "Globalno", "Freelance", "Projekti"],
  ["Toptal", "Selektivni freelance projekti za iskusne stručnjake u techu, dizajnu i finansijama.", "https://www.toptal.com/talent/apply", "Globalno", "Freelance", "Senior"],
  ["Gun.io", "Ugovorni i freelance angažmani za iskusne programere.", "https://gun.io/", "Globalno", "Freelance", "Tech"],
] as const;

const categories = [
  ["Poslovi u Srbiji", "Srbija", "Platforme i kompanije koje provereno zapošljavaju iz Srbije."],
  ["Evropa i EMEA", "Evropa / EMEA", "Remote uloge usklađene sa evropskim vremenskim zonama."],
  ["Globalni oglasi", "Globalno", "Međunarodne kompanije, YC startupi i fleksibilni poslovi."],
  ["Freelance & AI", "Freelance", "Projekti, AI trening (Outlier), online časovi i samostalni rad."],
  ["Alati i vodiči", "Alat", "Zvanični UJP portal, paušal, provera plata i priprema CV-ja."],
] as const;

const resourceGroups = [
  ["Oglasi", "Oglasi za posao", "Platforme, kompanije i baze otvorenih remote pozicija.", "bg-[#edf3eb] text-[#426052]"],
  ["Freelance", "Freelance i ugovorni rad", "Projekti, platforme bez provizije, AI trening i online časovi.", "bg-[#f8eee9] text-[#98503a]"],
  ["Alat", "Alati, plate i vodiči", "Zvanični UJP portal, paušalni vodiči, provera zarada i priprema CV-ja.", "bg-[#eeeaf6] text-[#5e4f83]"],
] as const;

const filters = ["Sve", "Srbija", "Evropa / EMEA", "Globalno", "Freelance", "Alat"];

export default function Home() {
  const [filter, setFilter] = useState("Sve");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const matches = sources.filter(([name, description, , region, kind, label]) => {
    const matchesFilter = filter === "Sve" || region === filter || kind === filter;
    const matchesSaved = !showSaved || saved.includes(name);
    return matchesFilter && matchesSaved && `${name} ${description} ${label}`.toLowerCase().includes(query.toLowerCase());
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

  function toggleSaved(name: string) {
    setSaved((items) => (items.includes(name) ? items.filter((item) => item !== name) : [...items, name]));
  }

  return (
    <main className="min-h-screen bg-[#f6f7f3] text-[#17312a]">
      {/* Header */}
      <header className="border-b border-[#17312a]/10 bg-[#fdfdfb]">
        <div className="mx-auto flex h-[74px] max-w-[1540px] items-center justify-between px-5 md:px-12">
          <a href="#directory" className="flex items-center gap-3 text-sm font-bold text-[#17312a]">
            <span className="logo-icon grid size-9 place-items-center rounded-full bg-[#17312a] text-[#e7f0df]">R</span>
            Remote poslovi
          </a>
          <div className="hidden gap-7 text-sm text-[#60736b] md:flex">
            <a href="#categories" className="hover:text-[#17312a] transition">Kategorije</a>
            <a href="#directory" className="hover:text-[#17312a] transition">Svi izvori</a>
          </div>
          <button
            type="button"
            onClick={() => setShowSaved((value) => !value)}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
              showSaved ? "border-[#17312a] bg-[#17312a] text-white" : "border-[#17312a]/15 bg-white text-[#17312a] hover:border-[#17312a]/40"
            }`}
          >
            Sačuvano {saved.length > 0 && `(${saved.length})`}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#17312a]/10 bg-[#e5f0df]">
        <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-[70px] border-[#f5f8ee]" />
        <div className="relative mx-auto flex min-h-[390px] max-w-[1540px] flex-col items-center justify-center px-5 py-16 text-center md:px-12">
          <p className="mb-5 rounded-full border border-[#17312a]/15 bg-[#f8fbf4]/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.13em] text-[#4b6658]">
            REMOTE POSLOVI · SRBIJA · EVROPA · SVET
          </p>
          <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] md:text-7xl text-[#17312a]">
            Direktorijum za remote posao
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#52675f] md:text-lg">
            Platforme, freelance izvori, kompanije, alati za CV i provera plata. Izaberite kategoriju ili odmah pretražite bazu.
          </p>
          <a href="#categories" className="mt-9 rounded-full bg-[#17312a] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#244239] transition">
            Pregledajte kategorije
          </a>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-[1540px] px-5 py-14 md:px-12 md:py-20">
        {/* Categories */}
        <section id="categories">
          <div className="mb-8 flex flex-col items-center text-center">
            <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">KATEGORIJE</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] md:text-5xl text-[#17312a]">Izaberite odakle krećete</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map(([title, value, description], index) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setFilter(value);
                  setShowSaved(false);
                  document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group min-h-60 rounded-lg border p-7 text-center transition duration-200 ${
                  !showSaved && filter === value
                    ? "border-[#17312a] bg-[#17312a] text-white shadow-lg shadow-[#17312a]/15"
                    : "border-[#17312a]/10 bg-white hover:-translate-y-1 hover:border-[#17312a]/35 hover:shadow-lg hover:shadow-[#17312a]/5"
                }`}
              >
                <span
                  className={`mx-auto grid size-11 place-items-center rounded-full text-sm font-bold ${
                    !showSaved && filter === value ? "bg-[#dc5b38] text-white" : "bg-[#e3eee0] text-[#325448]"
                  }`}
                >
                  0{index + 1}
                </span>
                <strong className="mt-8 block text-lg font-bold">{title}</strong>
                <span
                  className={`mx-auto mt-3 block max-w-[13rem] text-sm leading-6 ${
                    !showSaved && filter === value ? "text-[#c9d8cb]" : "text-[#60736b]"
                  }`}
                >
                  {description}
                </span>
                <span
                  className={`mt-7 inline-block text-xs font-bold ${
                    !showSaved && filter === value ? "text-[#e7f0df]" : "text-[#dc5b38]"
                  }`}
                >
                  Otvorite kategoriju →
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Directory */}
        <section id="directory" className="mt-20 scroll-mt-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PRETRAGA IZVORA</p>
            <h2 className="mt-2 font-serif text-4xl tracking-[-0.03em] md:text-5xl text-[#17312a]">
              {showSaved ? "Sačuvani izvori" : filter === "Sve" ? "Svi izvori" : filter}
            </h2>
            <label className="mx-auto mt-8 flex h-14 max-w-2xl items-center gap-4 rounded-full border border-[#17312a]/15 bg-white px-6 shadow-sm shadow-[#17312a]/5">
              <span className="text-xl text-[#60736b]">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-base outline-none placeholder:text-[#8a9891]"
                placeholder="Pretražite platformu, oblast ili alat"
              />
            </label>
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
                      ? "bg-[#17312a] text-white"
                      : "border border-[#17312a]/10 bg-white text-[#60736b] hover:border-[#17312a]/30"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowSaved((value) => !value)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  showSaved
                    ? "bg-[#dc5b38] text-white"
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

          <div className="mt-12 space-y-16">
            {groupedMatches.map((group) => (
              <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
                <div className="mb-6 grid overflow-hidden rounded-lg border border-[#17312a]/10 bg-white md:grid-cols-3">
                  <div className="flex min-h-32 flex-col items-center justify-center border-b border-[#17312a]/10 p-6 text-center md:border-b-0 md:border-r">
                    <span className={`grid size-14 place-items-center rounded-full text-sm font-bold ${group.color}`}>
                      {group.items.length}
                    </span>
                    <span className="mt-2 text-xs font-medium text-[#60736b]">izvora u kategoriji</span>
                  </div>
                  <div className="flex min-h-32 flex-col items-center justify-center border-b border-[#17312a]/10 p-6 text-center md:border-b-0 md:border-r">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-[#dc5b38]">{group.kind.toUpperCase()}</p>
                    <h3 id={`group-${group.kind}`} className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#17312a]">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex min-h-32 items-center justify-center p-6 text-center">
                    <p className="max-w-xs text-sm leading-6 text-[#60736b]">{group.description}</p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map(([name, description, url, region, kind, label]) => (
                    <article
                      key={name}
                      role="link"
                      tabIndex={0}
                      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          window.open(url, "_blank", "noopener,noreferrer");
                        }
                      }}
                      className="group relative flex min-h-[250px] cursor-pointer flex-col justify-between rounded-lg border border-[#17312a]/10 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-[#17312a]/30 hover:shadow-xl hover:shadow-[#17312a]/10 focus:outline-none focus:ring-2 focus:ring-[#dc5b38]"
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
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleSaved(name);
                            }}
                            aria-label={`Sačuvajte ${name}`}
                            className={`grid size-9 shrink-0 place-items-center rounded-full border text-base transition ${
                              saved.includes(name)
                                ? "border-[#dc5b38] bg-[#fff1ec] text-[#dc5b38]"
                                : "border-[#17312a]/15 text-[#60736b] hover:border-[#dc5b38] hover:text-[#dc5b38]"
                            }`}
                          >
                            {saved.includes(name) ? "♥" : "♡"}
                          </button>
                        </div>
                        <h4 className="mt-7 text-xl font-bold text-[#17312a] group-hover:text-[#dc5b38] transition-colors">
                          {name}
                        </h4>
                        <p className="mt-3 text-sm leading-6 text-[#60736b]">{description}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-[#17312a]/10 pt-5">
                        <span className="text-xs font-medium text-[#7c8c84]">{label}</span>
                        <span className="text-sm font-bold text-[#dc5b38] group-hover:translate-x-0.5 transition-transform">
                          Otvorite izvor ↗
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            {matches.length === 0 && (
              <p className="py-20 text-center text-sm text-[#60736b]">Nema izvora za ovaj filter ili pretragu.</p>
            )}
          </div>
        </section>
      </div>

      {/* Propose resource */}
      <section className="border-t border-[#17312a]/10 bg-[#e5f0df] px-5 py-14 md:px-12">
        <div className="mx-auto grid max-w-[1540px] gap-7 text-center md:grid-cols-[1fr_auto] md:items-center md:text-left">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-[#dc5b38]">PREDLOŽITE RESURS</p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.025em] text-[#17312a]">
              Znate koristan izvor koji nedostaje?
            </h2>
            <p className="mt-2 text-sm text-[#52675f]">
              Pošaljite link i kratak opis, pa može biti dodat u direktorijum.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:justify-end">
            <a
              href="https://x.com/KoronVirus"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#17312a] px-5 py-3 text-sm font-bold text-white hover:bg-[#244239] transition"
            >
              Pišite na X
            </a>
            <a
              href="mailto:zoxknez@hotmail.com?subject=Predlog%20resursa%20za%20Remote%20poslove"
              className="rounded-full border border-[#17312a]/20 bg-white px-5 py-3 text-sm font-bold text-[#17312a] hover:bg-[#f3f7f0] transition shadow-sm"
            >
              Pošaljite email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#17312a]/10 bg-white px-5 py-7 text-xs text-[#60736b] md:px-12">
        <div className="mx-auto flex max-w-[1540px] justify-between">
          <span>Remote poslovi</span>
          <span>Ažurirano: avgust 2026.</span>
        </div>
      </footer>
    </main>
  );
}

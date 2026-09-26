export interface Guide {
  slug: string;
  title: string;
  summary: string;
  body: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "kako-pronaci-remote-posao",
    title: "Kako pronaći remote posao iz Srbije",
    summary: "Redosled koji štedi vreme: filter za Srbiju, pa EMEA, pa worldwide oglasi sa jasnom listom država.",
    body: [
      "Remote u oglasu ne znači da možete da se prijavite iz Srbije. Prvo tražite oglase koji eksplicitno navode Serbia, Balkans, EMEA ili Worldwide. Ako piše samo Remote, otvorite oglas i potražite listu država, time zone i work authorization.",
      "Počnite od stranice Poslovi na ovom sajtu, zatim od izvora sa Serbia filterom: HelloWorld, Infostud, Himalayas, Arc, Remote Rocketship, LinkedIn remote + Srbija. Za širi zahvat koristite Remotive, Remote OK i We Work Remotely, ali uvek proverite lokaciju.",
      "Prijavljujte se na manje, bolje pogođene oglase. Prilagodite CV svakom oglasu. Čuvajte status u trackeru i postavite follow-up posle 5-7 dana.",
    ],
  },
  {
    slug: "kako-napraviti-cv",
    title: "Kako napraviti CV za remote prijavu",
    summary: "Jedna strana, merljivi rezultati, ATS-čitljiv format, bez fotografije osim ako oglas traži.",
    body: [
      "Za većinu remote prijava dovoljan je CV od jedne strane, u PDF-u, bez tabela i tekstualnih kutija. Koristite standardne naslove: Iskustvo, Veštine, Obrazovanje.",
      "Svaka stavka treba da ima meru: šta ste uradili, za koga, kojim alatom i koji je bio ishod. 'Radio QA' je slabo. 'Pokrio 40 regresionih scenarija u Playwrightu i smanjio escape defecte za 30%' je korisno.",
      "Navedite vremensku zonu (CET/Europe-Belgrade), nivo engleskog i da li možete da fakturišete kao frilenser, preduzetnik ili preko EOR-a. Nemojte stavljati JMBG, sliku ili netačne titule.",
    ],
  },
  {
    slug: "kako-prilagoditi-cv",
    title: "Kako prilagoditi CV oglasu",
    summary: "Preuzmite jezik oglasa, ne izmišljajte veštine.",
    body: [
      "Iz oglasa izvucite 8-12 ključnih reči (alati, domen, nivo). Ako ih stvarno imate, stavite ih u prvih 40% CV-ja. Ako ih nemate, ne dodajite ih.",
      "Promenite summary i redosled bullet-ova, ne celu biografiju. Jedan CV šablon, više verzija. U trackeru zabeležite koju verziju ste poslali.",
      "Na ovom sajtu možete u Alatima generisati prompt za ChatGPT/Claude/Gemini. Prompt ostaje kod vas. Ne šaljemo CV na server.",
    ],
  },
  {
    slug: "cover-letter",
    title: "Cover letter koji se čita",
    summary: "Kratko pismo: zašto baš ova uloga, dva dokaza, jedno pitanje.",
    body: [
      "Ako oglas ne traži pismo, često je dovoljan kratak email. Ako traži, držite se 180-220 reči.",
      "Prvi pasus: koja uloga i zašto kompanija. Drugi: dva konkretna rezultata iz CV-ja povezana sa zahtevom. Treći: dostupnost, zona, način saradnje.",
      "Nemojte prepričavati ceo CV. Nemojte počinjati sa 'My name is'.",
    ],
  },
  {
    slug: "provera-kompanije",
    title: "Kako proveriti kompaniju",
    summary: "Sajt, karijerna strana, LinkedIn, Joberty/Glassdoor, ATS URL.",
    body: [
      "Potražite zvaničan domen, ne landing stranicu sa samo formom. Karijerna strana na Greenhouse, Lever ili sopstvenom sajtu je dobar znak, ali nije dokaz.",
      "Uporedite email recruitera sa domenom kompanije. Gmail za 'HR Acme Corp' zahteva dodatnu proveru. Pogledajte Joberty, Glassdoor, LinkedIn i Crunchbase ako postoje.",
      "Ako vas teraju da platite opremu, pošaljete kripto ili preuzmete ček, stanite. Koristite Proveru oglasa na ovom sajtu.",
    ],
  },
  {
    slug: "prepoznavanje-prevare",
    title: "Kako prepoznati prevaru",
    summary: "Uplata, gift kartice, Telegram-only i nerealna zarada su crvene zastavice.",
    body: [
      "Legitiman poslodavac ne traži uplatu da biste počeli da radite. Ne traži gift kartice, bitcoin ili kupovinu laptopa od njihovog dobavljača.",
      "Česti obrasci: task job, reshipping, 'payment agent', ček sa nalogom da vratite višak, i regrutacija isključivo preko Telegrama.",
      "Provera signala nije dokaz legitimnosti. Prijavite sumnju platformi i pogledajte FTC upozorenja o job scams.",
    ],
  },
  {
    slug: "pregovaranje-plate",
    title: "Kako pregovarati o plati",
    summary: "Pitajte za budžet, razdvojite bruto, net i model saradnje.",
    body: [
      "Remote plata iz EU oglasa često je godišnji bruto za employee. Ako ste contractor iz Srbije, to nije ista cifra. Pitajte da li je iznos za employee, EOR ili contractor.",
      "Koristite javne oglase sa platom, Levels.fyi, Joberty i HelloWorld kao orijentir. Ako nema dovoljno podataka, recite to. Ne izmišljajte prosek.",
      "U pregovoru razdvojite: osnovica, bonus, oprema, praznici, overlap sati, otkazni rok i ko plaća porez.",
    ],
  },
  {
    slug: "employee-vs-contractor",
    title: "Employee vs contractor",
    summary: "Zaposlenje, ugovor o delu, frilenser i preduzetnik nisu iste stvari.",
    body: [
      "Employee znači radni odnos, sa pravima iz Zakona o radu u državi poslodavca ili preko EOR-a. Contractor fakturiše usluge i sam rešava porez.",
      "Za kandidate iz Srbije contractor model najčešće ide kroz samooporezivanje frilensera, paušalnog preduzetnika ili DOO. Izbor zavisi od prihoda, klijenata i rizika, ne od toga šta zvuči modernije.",
      "Ovo nije pravni savet. Za status i ugovor proverite advokata ili knjigovođu, a poreski obračun na portalu Frilenseri ili kod Poreske uprave.",
    ],
  },
  {
    slug: "sta-je-eor",
    title: "Šta je EOR",
    summary: "Employer of Record zapošljava vas u vašoj ili trećoj zemlji, a vi radite za klijenta.",
    body: [
      "EOR (Employer of Record) je firma koja vas formalno zaposli, plaća poreze i doprinose, a vi radite za njihovog klijenta. To nije preporuka konkretnog servisa.",
      "Primeri servisa koji nude EOR, navedeni samo kao informacija: Remote.com, Deel, Oyster. Uslovi, cene i pokrivenost Srbije se menjaju. Proverite direktno kod kompanije.",
      "Ako oglas kaže 'we hire via EOR in selected countries', pitajte da li je Srbija na listi pre nego što uložite vreme u više krugova intervjua.",
    ],
  },
  {
    slug: "kako-primati-novac",
    title: "Kako primati novac iz inostranstva",
    summary: "Banka, Wise i slični servisi, pa evidencija za poresku prijavu.",
    body: [
      "Za frilensera je važno da možete da pokažete priliv: izvod, ugovor ili fakturu, i da iznos u stranoj valuti preračunate po srednjem kursu NBS na dan uplate. To je stav Poreske uprave na portalu Frilenseri.",
      "Poslodavci plaćaju SEPA, SWIFT, Payoneer, Wise ili preko platforme. Svaki kanal ima trošak i drugačiji dokaz uplate. Čuvajte PDF izvode.",
      "Ne šaljite podatke o nalogu preko Telegrama neproverenim 'HR' nalozima.",
    ],
  },
  {
    slug: "poreska-prijava",
    title: "Osnove poreske prijave za frilensere",
    summary: "Kvartalno, PP OPO-K, dve opcije, zvanični portal.",
    body: [
      "Prihod od stranog isplatioca koji ne obustavlja porez u Srbiji prijavljuje se kvartalno preko portala frilenseri.purs.gov.rs, na obrascu PP OPO-K, u roku od 30 dana od isteka kvartala.",
      "Za svaki kvartal birate opciju 1 ili opciju 2. Ako nema prihoda, nema obaveze prijave po tom osnovu. Informativni kalkulator na ovom sajtu koristi parametre sa portala za 2026.",
      "Konačan obračun uvek uradite na zvaničnom portalu. Ovo nije poreski savet.",
    ],
  },
  {
    slug: "fakture-evidencija",
    title: "Fakture i evidencija",
    summary: "Čuvajte ugovor, fakturu, izvod i kurs NBS.",
    body: [
      "Minimum evidencije: ko je platio, kada, koliko, u kojoj valuti, za koji period i po kom ugovoru. To olakšava kvartalnu prijavu.",
      "Ako ste preduzetnik, faktura ide po pravilima za paušalce ili knjige. Ako ste u režimu samooporezivanja, i dalje je korisno imati pisan trag, čak i kada je ugovor usmen, jer portal to predviđa uz izjavu.",
      "Kurs za prijavu je srednji kurs NBS na dan uplate, ne kurs menjačnice.",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

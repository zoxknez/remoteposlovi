# Remote Poslovi

Kurirana baza resursa za remote rad, freelance i digitalnu karijeru sa fokusom na korisnike iz Srbije.

Produkcija: https://remoteposlovi.vercel.app

## Fokus proizvoda

Primarna vrednost projekta više nije agregacija oglasa. Glavni proizvod je proveriva i pretraživa baza korisnih resursa za:

- CV, portfolio, intervju, engleski i plate
- učenje i prekvalifikaciju
- poreze, APR, ePorezi, eFakture i administraciju
- fakturisanje i freelance poslovanje
- sigurnost, proveru domena i zaštitu naloga
- produktivnost, time tracking, vremenske zone i komunikaciju
- AI alate koji imaju široku praktičnu vrednost
- freelance platforme i remote vodiče

Live oglasi i kompanije su zadržani kao **eksperimentalna BETA funkcija** pri dnu korisničkog toka.

## Trenutna baza

Podaci su u `src/data/sources.ts`.

Model resursa podržava:

- sekciju i tagove
- region i podršku za Srbiju
- free / freemium / paid
- zvanični izvor
- open-source oznaku
- ciljnu publiku
- tip resursa i oblasti
- periodični health status

Direktorijum pretražuje naziv, opis, sekciju, tagove i oblasti. Brzi filteri uključuju Srbiju, besplatne, zvanične, open-source, početničke i sačuvane resurse.

## Ugrađeni alati

- CV i application prompt studio
- informativni poreski kalkulator za freelancere 2026.
- poreski kalendar i ICS
- salary pregled po valuti
- lokalna provera rizičnih signala u oglasima
- tracker prijava u IndexedDB
- follow-up ICS
- wizard za preporuku resursa

Nalog nije potreban.

## Eksperimentalni oglasi

`/poslovi` koristi javne izvore:

| Izvor | Endpoint | Napomena |
| --- | --- | --- |
| Remotive | `https://remotive.com/api/remote-jobs` | Javni API, attribution i originalni link |
| Remote OK | `https://remoteok.com/api` | Javni JSON feed |
| Greenhouse Job Board API | `https://boards-api.greenhouse.io/v1/boards/{token}/jobs` | Javni boardovi iz `src/data/ats-boards.ts` |

Eligibility klasifikacija je heuristička. Remote ne znači automatski da je pozicija dostupna iz Srbije. Korisnik mora proveriti originalni oglas.

## Arhitektura

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest

```
src/
  app/            rute i API
  components/     UI i lokalni alati
  data/           kurirana baza, poreski podaci, vodiči, ATS boardovi
  lib/            jobs, eligibility, porez, plate, zone, FX, health, storage
  types/          modeli
```

## Privatnost

CV, tekst oglasa, beleške, kontakt podaci i tracker podaci ostaju u pregledaču tamo gde je to navedeno. Tracker koristi IndexedDB, a lakši preference state localStorage.

## Porez 2026

Parametri su izdvojeni u `src/data/tax-2026.ts` i imaju navedene izvore. Kalkulator je informativan. Zvaničan obračun proverava se na portalu Poreske uprave / Frilenseri.

Kod godišnje promene iznosa ažurirati podatke i `src/lib/tax.test.ts`.

## Komande

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

## Environment

| Varijabla | Obavezno | Opis |
| --- | --- | --- |
| `CRON_SECRET` | ne | Bearer token za `/api/cron/refresh` |
| `NEXT_PUBLIC_PAYPAL_URL` | ne | Lični PayPal support link za floating "Časti kafu" meni |
| `NEXT_PUBLIC_KOFI_URL` | ne | Lični Ko-fi support link za floating "Časti kafu" meni |

## Periodično održavanje

- proveriti poreske parametre i primarne izvore
- proveriti cene i dostupnost resursa
- ukloniti ili zameniti ugašene URL-ove
- proveriti Remotive / Remote OK uslove
- proveriti Greenhouse board tokene
- pregledati health rezultate i redirecte
- nove resurse dodavati samo ako donose novu praktičnu vrednost

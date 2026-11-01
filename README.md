# Remote Poslovi

Kurirana baza servisa za remote rad, freelance i digitalnu karijeru za ljude sa Balkana: Srbija, Hrvatska, BiH, Crna Gora, Severna Makedonija, Slovenija, Kosovo i Albanija. Sajt ne objavljuje oglase, nego vodi do servisa koji ih imaju.

Produkcija: https://remoteposlovi.vercel.app

## Fokus proizvoda

Glavni proizvod je proveriva i pretraživa baza servisa, podeljena po zemljama i oblastima, za:

- portale za posao i zavode za zapošljavanje u svakoj zemlji regiona

- CV, portfolio, intervju, engleski i plate
- učenje i prekvalifikaciju
- poreze, APR, ePorezi, eFakture i administraciju
- fakturisanje i freelance poslovanje
- sigurnost, proveru domena i zaštitu naloga
- produktivnost, time tracking, vremenske zone i komunikaciju
- AI alate koji imaju široku praktičnu vrednost
- freelance platforme i remote vodiče

Svaka zemlja ima svoju stranicu (`/zemlje/[slug]`) sa lokalnim portalima, zavodom, poreskim portalom, platama i savetima. Agregacija oglasa je uklonjena; stari URL-ovi `/poslovi` i `/kompanije` trajno preusmeravaju na `/izvori` (`next.config.ts`).

## Trenutna baza

Podaci su u `src/data/sources.ts` (`SEEDS`, `EXTRA_SEEDS`, `BALKAN_SEEDS`), a zemlje u `src/data/countries.ts`. Testovi u `src/data/sources.test.ts` proveravaju jedinstvene id-jeve i URL-ove, https linkove i da svaka zemlja ima bar jedan oglasnik i jedan zvaničan portal.

Model resursa podržava:

- sekciju i tagove
- zemlju (`country`) i dostupnost za region (`regionSupport`)
- free / freemium / paid
- zvanični izvor
- open-source oznaku
- ciljnu publiku
- tip resursa i oblasti
- periodični health status

Direktorijum pretražuje naziv, opis, sekciju, tagove i oblasti. Direktorijum prvo bira zemlju, pa oblast. Brzi filteri uključuju potvrđeno za region, besplatne, zvanične, open-source, početničke i sačuvane resurse.

## Ugrađeni alati

- CV i application prompt studio
- informativni poreski kalkulator za freelancere 2026.
- poreski kalendar i ICS
- preračun zarade (sat, mesec, godina; EUR/RSD) i izvori plata po zemljama
- lokalna provera rizičnih signala u oglasima
- tracker prijava u IndexedDB, sa ručnim dodavanjem
- follow-up ICS
- wizard za preporuku servisa (zemlja, vrsta rada, iskustvo)

Nalog nije potreban.

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
  data/           kurirana baza, zemlje, poreski podaci, vodiči
  lib/            porez, plate, FX, health, scam, ics, storage
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
- proveriti da li servisi i dalje primaju korisnike iz regiona
- pregledati health rezultate i redirecte
- nove resurse dodavati samo ako donose novu praktičnu vrednost

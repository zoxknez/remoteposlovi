# Remote Poslovi

Alat za traženje remote posla iz Srbije. Direktorijum proverenih izvora ostaje, a uz njega idu aktuelni oglasi, provera dostupnosti iz Srbije, tracker prijava, poreski kalkulator i alati za CV.

Produkcija: https://remoteposlovi.vercel.app

## Šta radi

- Pregled javnih remote oglasa (Remotive, Remote OK, Greenhouse boardovi)
- Klasifikacija da li je oglas realno dostupan iz Srbije
- Filteri, junior režim, netehničke oblasti
- Lokalni tracker prijava, follow-up ICS, sačuvane pretrage
- Informativni poreski obračun za frilensere (2026)
- Provera rizičnih signala u oglasu, bez lažnog "scam score"
- CV toolkit i generator promptova (ostaje u pregledaču)

Nalog nije potreban.

## Arhitektura

- Next.js 16 App Router, TypeScript, Tailwind CSS 4
- Server: agregacija oglasa, NBS kurs, health check izvora
- Klijent: localStorage (izvori, viđeni oglasi, pretrage) i IndexedDB (tracker)

```
src/
  app/            rute i API
  components/     UI
  data/           izvori, poreski parametri, vodiči, ATS boardovi
  lib/            eligibility, plate, zone, porez, jobs, fx, health
```

## Izvori oglasa

| Izvor | Endpoint | Napomena |
| --- | --- | --- |
| Remotive | `https://remotive.com/api/remote-jobs` | Javni API, kasni do 24h, max ~4 poziva dnevno, obavezan link ka originalnom oglasu |
| Remote OK | `https://remoteok.com/api` | Javni JSON, credit i link ka originalnom oglasu |
| Greenhouse Job Board API | `https://boards-api.greenhouse.io/v1/boards/{token}/jobs` | Javni boardovi kompanija iz `src/data/ats-boards.ts` |

Ako jedan izvor padne, ostali se i dalje prikazuju. Rezultati se keširaju 1 sat (`unstable_cache`).

## Serbia eligibility

Oglas se ne proglašava dostupnim iz Srbije samo zato što piše "Remote".

- `CONFIRMED_SERBIA` - eksplicitno navedena Srbija
- `WORLDWIDE` - worldwide / anywhere / global
- `EUROPE` / `EMEA` - regionalna oznaka, treba proveriti uslove
- `TIMEZONE_BASED` - samo vremenska zona
- `UNCLEAR` - nema dovoljno podataka
- `NOT_ELIGIBLE` - lista država bez Srbije, ili US-only uslov

Logika je u `src/lib/eligibility.ts`.

## Deduplikacija

Isti oglas sa više izvora spaja se po ATS URL-u ili normalizovanom paru kompanija + naslov. Prednost ima Greenhouse/Lever career stranica.

## Freshness

Čuvaju se `publishedAt`, `fetchedAt` i `lastCheckedAt`. Javni API-ji vraćaju aktivne oglase. Status `CLOSED` se ne tvrdi bez provere originalnog URL-a.

## Porez 2026

Parametri su sa portala Frilenseri i iz važećih propisa, provereni 26. septembra 2026.

- Opcija 1: normirani troškovi 110.647 RSD, porez 20%
- Opcija 2: 66.733 RSD + 34% bruto, porez 10%, minimalni kvartalni PIO 36.934 RSD
- PIO 24%, zdravstvo 10,3%, minimalno zdravstvo 7.003 RSD po kvartalu ako nije osiguran po drugom osnovu
- Najniža mesečna osnovica doprinosa: 51.297 RSD (Sl. glasnik RS, 112/2025)

Izvori su navedeni u `src/data/tax-2026.ts`. Kalkulator je informativan. Konačan obračun: https://frilenseri.purs.gov.rs/

Kada se menjaju iznosi (obično početkom godine), ažurirati taj fajl i testove u `src/lib/tax.test.ts`.

## Kurs

Primarno: NBS zvanični srednji kurs. Fallback: javni agregator koji koristi NBS servis. Datum liste se prikazuje uz konverziju.

## Environment

| Varijabla | Obavezno | Opis |
| --- | --- | --- |
| `CRON_SECRET` | ne | Bearer token za `/api/cron/refresh` |

Cron (Vercel): svakog dana u 06:00 UTC, `GET /api/cron/refresh`.

## Komande

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

## Privatnost

CV, beleške, email kontakta i tekstovi prijava ostaju u pregledaču. Ne šalju se na server.

## Šta treba periodično proveravati

- Poreske iznose na portalu Frilenseri
- Stope i osnovice u Sl. glasniku
- Remotive i Remote OK uslove korišćenja
- Greenhouse tokene u `ats-boards.ts`
- URL-ove u direktorijumu (health check)

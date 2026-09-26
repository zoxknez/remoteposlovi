/**
 * Poreski parametri za samooporezivanje frilensera u 2026.
 *
 * Primarni izvori (provereno 26. septembar 2026):
 * - Portal Frilenseri, Poreska uprava: https://frilenseri.purs.gov.rs/najcesca-pitanja.html
 *   (opcija 1/2, stope, primeri, kvartalni rokovi)
 * - Zakon o porezu na dohodak građana, član 12b (usklađeni dinarski iznosi za 2026):
 *   110.647 RSD i 66.733 RSD
 * - Zakon o doprinosima za obavezno socijalno osiguranje, član 44:
 *   PIO 24%, zdravstvo 10,3%
 *   https://www.purs.gov.rs/upload/media/2025/12/15/760519/Zakon_o_doprinosima_za_obavezno_socijalno_osiguranje_-_u_primeni_od_01012026.pdf
 * - Iznos najniže mesečne osnovice doprinosa za 2026: 51.297 RSD
 *   "Sl. glasnik RS", br. 112/2025
 *
 * Kalkulator je informativan. Konačan obračun radi se na portalu Frilenseri.
 */

export const TAX_YEAR = 2026;

export const TAX_SOURCES = [
  {
    label: "Portal Frilenseri - najčešća pitanja (Poreska uprava)",
    url: "https://frilenseri.purs.gov.rs/najcesca-pitanja.html",
  },
  {
    label: "Portal Frilenseri - javni kalkulator",
    url: "https://frilenseri.purs.gov.rs/en/tax-calculator.html",
  },
  {
    label: "Zakon o porezu na dohodak građana (Poreska uprava)",
    url: "https://www.purs.gov.rs/sr/pravna-lica/pregled-propisa/zakoni/173/zakon-o-porezu-na-dohodak-gradjana.html",
  },
  {
    label: "Zakon o doprinosima za obavezno socijalno osiguranje (Ministarstvo finansija)",
    url: "https://www.mfin.gov.rs/propisi/zakon-o-doprinosima-za-obavezno-socijalno-osiguranje",
  },
  {
    label: "Najniža mesečna osnovica doprinosa za 2026. (Sl. glasnik RS, 112/2025)",
    url: "https://www.paragraf.rs/propisi/iznos-najnize-mesecne-osnovice-doprinosa-za-obavezno-socijalno-osiguranje.html",
  },
] as const;

export const FREELANCER_TAX_2026 = {
  year: TAX_YEAR,
  verifiedAt: "2026-09-26",
  option1: {
    name: "Opcija 1",
    standardizedCostsRsd: 110_647,
    extraPercentOfGross: 0,
    taxRate: 0.2,
    pioRate: 0.24,
    pioMinimumRsd: 0,
    healthRate: 0.103,
  },
  option2: {
    name: "Opcija 2",
    standardizedCostsRsd: 66_733,
    extraPercentOfGross: 0.34,
    taxRate: 0.1,
    pioRate: 0.24,
    pioMinimumRsd: 36_934,
    healthRate: 0.103,
  },
  healthMinimumQuarterRsd: 7_003,
  pioMinimumMonthlyBaseRsd: 51_297,
  contributionRatesSource: "ZDOSO član 44, u primeni od 1.1.2026.",
} as const;

export const TAX_DEADLINES_2026 = [
  {
    quarter: "Q1",
    period: "1. januar - 31. mart 2026.",
    deadline: "2026-04-30",
    deadlineLabel: "30. april 2026.",
  },
  {
    quarter: "Q2",
    period: "1. april - 30. jun 2026.",
    deadline: "2026-07-30",
    deadlineLabel: "30. jul 2026.",
  },
  {
    quarter: "Q3",
    period: "1. jul - 30. septembar 2026.",
    deadline: "2026-10-30",
    deadlineLabel: "30. oktobar 2026.",
  },
  {
    quarter: "Q4",
    period: "1. oktobar - 31. decembar 2026.",
    deadline: "2027-01-30",
    deadlineLabel: "30. januar 2027.",
  },
] as const;

export const TAX_DISCLAIMER =
  "Informativni obračun prema parametrima sa portala Frilenseri i važećih propisa za 2026. Konačan obračun proverite na zvaničnom portalu Poreske uprave. Ovo nije poreski savet.";

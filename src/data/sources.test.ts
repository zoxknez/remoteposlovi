import { describe, expect, it } from "vitest";
import { ALL_SCOPES, BALKAN_COUNTRIES } from "@/data/countries";
import { RESOURCES, resourcesByCountry } from "@/data/sources";

describe("direktorijum servisa", () => {
  it("ima jedinstvene id-jeve i URL-ove", () => {
    const ids = RESOURCES.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    const urls = RESOURCES.map((item) => item.url.replace(/\/$/, ""));
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("koristi samo https linkove", () => {
    for (const item of RESOURCES) expect(item.url, item.name).toMatch(/^https:\/\//);
  });

  it("svaka zemlja ima oglasnik i zvanični portal", () => {
    for (const country of BALKAN_COUNTRIES) {
      const items = resourcesByCountry(country.code);
      expect(items.some((item) => item.kind === "Oglasi"), country.name).toBe(true);
      expect(items.some((item) => item.sourceType === "official"), country.name).toBe(true);
    }
  });

  it("svaki servis pripada poznatoj zemlji ili opsegu", () => {
    const codes = new Set(ALL_SCOPES.map((scope) => scope.code));
    for (const item of RESOURCES) expect(codes.has(item.country), item.name).toBe(true);
  });

  it("slugovi zemalja su jedinstveni", () => {
    const slugs = ALL_SCOPES.map((scope) => scope.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

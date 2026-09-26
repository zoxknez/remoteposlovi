import { describe, expect, it } from "vitest";
import { convertWindowToSerbia, parseTimezoneWindow } from "@/lib/timezone";

describe("timezone", () => {
  it("parses 9 AM - 5 PM EST", () => {
    const window = parseTimezoneWindow("9 AM - 5 PM EST");
    expect(window?.zone).toBe("America/New_York");
    expect(window?.startHour).toBe(9);
    expect(window?.endHour).toBe(17);
  });

  it("converts EST business hours into Belgrade time with DST", () => {
    const january = convertWindowToSerbia(
      { zone: "America/New_York", startHour: 9, endHour: 17, label: "EST" },
      new Date("2026-01-15T12:00:00Z"),
    );
    const marchGap = convertWindowToSerbia(
      { zone: "America/New_York", startHour: 9, endHour: 17, label: "EDT" },
      new Date("2026-03-15T12:00:00Z"),
    );
    expect(january.startHour).toBe(15);
    expect(marchGap.startHour).toBe(14);
    expect(january.overlapHours).toBeGreaterThan(0);
  });
});

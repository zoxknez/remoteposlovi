import { describe, expect, it } from "vitest";
import { checkScamSignals } from "@/lib/scam";

describe("checkScamSignals", () => {
  it("returns no signals for a plain career page text", () => {
    const result = checkScamSignals({
      url: "https://careers.acme.com/jobs/qa",
      text: "We are hiring a QA engineer. Apply on our career site.",
    });
    expect(result.signals).toHaveLength(0);
  });

  it("flags payment, crypto and telegram-only patterns", () => {
    const result = checkScamSignals({
      text: "Pay a training fee in bitcoin and apply only on telegram to start work.",
    });
    expect(result.signals.length).toBeGreaterThanOrEqual(3);
  });
});

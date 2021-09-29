import { INVALID_DATE_ERROR } from "..";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats an iso date", () => {
    const ISO_DATE = "2000-12-12";
    const expected = "Dec 12, 2000";
    const formatted = formatDate(ISO_DATE);
    expect(formatted).toMatch(expected);
  });

  it("formats a day with a leading zero", () => {
    const ISO_DATE = "2000-12-01";
    const expected = "Dec 1, 2000";
    const formatted = formatDate(ISO_DATE);
    expect(formatted).toMatch(expected);
  });

  it("returns Invalid Date if input value is incorrectly formatted", () => {
    const ISO_DATE = "2000-12-foo";
    const expected = INVALID_DATE_ERROR;
    const formatted = formatDate(ISO_DATE);
    expect(formatted).toMatch(expected);
  });
});

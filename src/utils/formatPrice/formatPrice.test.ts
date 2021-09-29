import { INVALID_PRICE_ERROR } from "..";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats a number as US currency", () => {
    const input = 50;
    const expected = "$50.00";
    const formatted = formatPrice(input);
    expect(formatted).toMatch(expected);
  });

  it("returns Invalid Date if input value is incorrectly formatted", () => {
    const input = "asd";
    const expected = INVALID_PRICE_ERROR;
    const formatted = formatPrice(input as any);
    expect(formatted).toMatch(expected);
  });
});

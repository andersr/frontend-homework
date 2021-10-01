import { hasMissingValues } from "./hasMissingValues";

describe("hasMissingValues", () => {
  it("returns true if one more property attributes are empty", () => {
    const missingOne = {
      foo: "bar",
      baz: "",
    };

    expect(hasMissingValues(missingOne)).toBeTruthy();
  });

  it("considers whitepace empty", () => {
    const missingOne = {
      baz: "    ",
    };

    expect(hasMissingValues(missingOne)).toBeTruthy();
  });

  it("returns false if all values are filled", () => {
    const missingOne = {
      foo: "bar",
      baz: "bla",
    };

    expect(hasMissingValues(missingOne)).toBeFalsy();
  });
});

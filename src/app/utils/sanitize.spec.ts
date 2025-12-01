import { sanitizeStr } from "./sanitize";

describe("Sanitize (unit)", () => {
  it("return a string with trim", () => {
    const str = "  Hello World!  ";

    const expectedStr = "Hello World!";

    expect(sanitizeStr(str)).toBe(expectedStr);
  });

  it("return a empty string when is falsy", () => {
    // @ts-expect-error Testing when don't pass any parameter
    expect(sanitizeStr()).toBe("");
  });

  it("return a empty string when use a wrong type", () => {
    // @ts-expect-error Testing if use a wrong type
    expect(sanitizeStr(123)).toBe("");
  });

  it("should treat normalized strings as equal", () => {
    const str = "e\u0301"
    const expectedStr = "é"

    expect(sanitizeStr(str)).toBe(sanitizeStr(expectedStr));
  })
});

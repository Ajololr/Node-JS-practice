const lib = require("../lib");

describe("absolute", () => {
  it("should return positive number if input is positive", () => {
    const res = lib.absolute(1);
    expect(res).toBe(1);
  });

  it("should return positive number if input is negative", () => {
    const res = lib.absolute(-1);
    expect(res).toBe(1);
  });

  it("should return 0 number if input is 0", () => {
    const res = lib.absolute(0);
    expect(res).toBe(0);
  });
});

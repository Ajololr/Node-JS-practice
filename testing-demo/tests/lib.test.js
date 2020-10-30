const lib = require("../lib");

test("absolute should return positive number if input is positive", () => {
  const res = lib.absolute(1);
  expect(res).toBe(1);
});

test("absolute should return positive number if input is negative", () => {
  const res = lib.absolute(-1);
  expect(res).toBe(1);
});

test("absolute should return 0 number if input is 0", () => {
  const res = lib.absolute(0);
  expect(res).toBe(0);
});

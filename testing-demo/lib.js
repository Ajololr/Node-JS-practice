module.exports.absolute = function (number) {
  if (number > 0) return number;
  if (number < 0) return -number;
  return 0;
};

module.exports.greet = function (name) {
  return "Welcome " + name;
};

module.exports.getCurrencies = function (name) {
  return ["EUR", "USD", "RUB"];
};

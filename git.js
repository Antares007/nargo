const { cbNar, cbAnd, cbOr } = require("./cb");
const fs = require("fs");
const o = {
  value: console.log.bind(console),
  error: console.error.bind(console),
};
function cont1(o, args) {
  o.value(args.toString());
}
function cont2(o, args) {
  o.value(args.slice(0, 99));
}
// prettier-ignore
cbAnd(
  o,
  cbAnd, cont2,
  cbNar, cont1, fs.readFile, __filename
);

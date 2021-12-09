const { mb, o, rg } = require("./mbo");

const n1 = (o) => C(o.v, 3);
const n2 = (o, ...nargs) => (
  C(o.v, ...nargs, "α"),
  C(o.v, ...nargs, "α", "β"),
  C(o.v, ...nargs, "α", "β", "ο")
);
const n3 = (o, ...h) => C(o.v, ...h, 6);
const n4 = (o, a) => C(o.v, a, a + 3);
const ne = (o) => C(o.e, "e");
const lo = (o) => (
  console.log(o.b.name + ">"), C(o.v), console.log("<" + o.b.name)
);

C(mb, o, n1, n2, mb, n3, mb, n4);
console.log("***");
C(rg, o, n1, n2, mb, n3, mb, n4, mb, lo);

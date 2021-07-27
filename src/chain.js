const { mb, o, rg } = require("./mbo");

const n1 = (o) => Go(o.v, 3);
const n2 = (o, ...nargs) => (
  Go(o.v, ...nargs, "α"),
  Go(o.v, ...nargs, "α", "β"),
  Go(o.v, ...nargs, "α", "β", "ο")
);
const n3 = (o, ...h) => Go(o.v, ...h, 6);
const n4 = (o, a) => Go(o.v, a, a + 3);
const ne = (o) => Go(o.e, "e");
const lo = (o) => (
  console.log("b", o.b.name), Go(o.v), console.log("e", o.b.name)
);

Go(mb, o, n1, n2, mb, n3, mb, n4);
console.log("***");
Go(rg, o, n1, n2, mb, n3, mb, n4, mb, lo);

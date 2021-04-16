const { mb, o, rg } = require("./mbo");

const n1 = (o) => Go(o.v, 3)("a");
const n2 = (o, [...nargs], [...bargs]) => (
  Go(o.v, ...nargs, "α")(...bargs),
  Go(o.v, ...nargs, "α", "β")(...bargs),
  Go(o.v, ...nargs, "α", "β", "ο")(...bargs)
);
const n3 = (o, ...h) => Go(o.v, ...h, 6);
const n4 = (o, [a], [b]) => Go(o.v, a, a + 3)(b + b);
const ne = (o) => Go(o.e, "e");
const lo = (o) => (
  console.log("b", o.b.name), Go(o.v), console.log("e", o.b.name)
);

Go(mb, o, n1, n2, mb, n3, mb, n4);
console.log("***");
Go(rg, o, n1, n2, mb, n3, mb, n4, mb, lo);

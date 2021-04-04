const { mb, o, rg } = require("./src/mbo");
function num(o) {
  o.num(1);
}
function float(o) {
  o.float(1.5);
}
function obj(o) {
  o.obj({ a: 0 });
}
function sum(o) {
  num(o);
  float(o);
  obj(o);
}

function pmap(o, p, snar) {
  snar({ ...o, ...p, o });
}
const rez = [];
pmap(
  o,
  {
    num(o, n) {
      o.sum.push(n);
    },
    float(o, f) {
      o.sum.push(f);
    },
    obj(o, ob) {
      o.sum.push(ob);
    },
    sum: rez,
  },
  sum
);
console.log(rez);

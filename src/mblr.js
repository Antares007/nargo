module.exports = { lr_pith, mbr, mbl };
function lr_pith(
  r = (o, ...args) => console.log(...args),
  l = (o, ...args) => console.log(...args)
) {
  return { r, l };
}
function narray({ o, narr }) {
  C(narr, o);
}
function l({ o }) {
  C(o.l);
}
function r({ o }) {
  C(o.r);
}
function mbr(o, narl, narr) {
  C(narl, { r: narray, l, o, narr });
}
function mbl(o, narl, narr) {
  C(narl, { r, l: narray, o, narr });
}
function example(o) {
  const one = (o) => C(o.r, 1);
  const add2 = (o, a) => C(o.r, a + 2);
  const l = (o) => C(o.l);
  C(
    mbr,
    o,
    one,
    add2,
    mbr,
    add2,
    mbr,
    add2,
    mbr,
    (o, ...errors) => C(o.r, errors),
    mbl,
    (o, ...args) => {
      console.log(args);
      C(o.r, "abo");
    }
  );
}
//example(lr_pith(), [], 0, [], 0);

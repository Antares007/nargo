const { sexp, Sexp, Nval, mb } = require("./sexp");
const o = [
  function r0(o, b, a) {
    b.length = a;
    console.log(0, b);
  },
  function r1(o, b, a) {
    b.length = a;
    console.log(1, b);
  },
  function r2(o, b, a) {
    b.length = a;
    console.log(2, b);
  },
];
let count = 0;
example(o, [], 0);
function lt(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  o[(l < r) | 0](o, b, a);
}
function eq(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  o[(l === r) | 0](o, b, a);
}

function gcd(o, b, a) {
  const x = b[--a];
  const y = b[--a];
  sexp(o, b, a, [
    0,
    [1, [8, x, y, lt], [8, x, y - x, gcd]],
    [1, [8, y, x, lt], [8, x - y, y, gcd]],
    [8, x, r1],
  ]);
}
// ( x > y /\ x' = x - y /\ y' = y) \/ ( y > x /\ x' = x /\ y' = y - x)
// 0x6 0x9 lt 0x6 0x3 gcd 0x30 mb
// 0x9 0x6 lt 0x-3 0x9 gcd 0x30 mb 0x8 mb
// 0x6 r1 0x2 mb
function example(o, b, a) {
  sexp(o, b, a, [0, one, two, add, two, add, two, add]);
  const cp = (o, b, a) =>
    sexp(o, b, a - 1, [9, [0, la, [8, b[a - 1], eq]], r1, ppp]);
  const r = (o, b, a) =>
    sexp(o, b, a - 2, [9, [0, la, [8, b[a - 2], b[a - 1], range]], ppp, r1]);
  const ε = r0;

  sexp(o, b, a, [8, 99, 33, gcd]);
  sexp(o, b, a, [9, one, two, [9, [9, one, two, tree], two, tree]]);

  //sexp(o, b, a, [0, [0, one, two, add], tree, add, tree, add]);
  //sexp(o, b, a, [
  //  0, //
  //  [8, "bada", 0, r0], //
  //  [8, 0x62, cp], //
  //  [1, [8, 0x61, cp], [8, 0x62, cp], [8, 0x63, cp]], //
  //  [1, [8, 0x61, cp], [8, 0x62, cp], [8, 0x63, cp], ε], //
  //]);
  //const atom = (o, b, a) => sexp(o, b, a, [8, "atom", r0]);
  //atom(o, b, a);

  const id = (o, b, a) =>
    sexp([
      3,
      [0, [8, 0x62, cp]], //
      [0, S, [8, 0x61, cp]],
    ]);

  const S = (o, b, a) =>
    sexp([
      3,
      [0, [8, 0x62, cp]], //
      [0, S, [8, 0x61, cp]],
    ]);
  const exp = `
  Tb * Ta * Ta * (Tc + Tb + ε)
  `;
}
function range(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  const cp = b[--a];
  o[(cp < l || r < cp) | 0](o, b, a);
}
function tree(o, b, a) {
  sexp(o, b, a, [8, 3, r0]);
}
function two(o, b, a) {
  sexp(o, b, a, [8, 2, r0]);
}
function one(o, b, a) {
  sexp(o, b, a, [8, 1, r0]);
}
function add(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  sexp(o, b, a, [8, l + r, r0]);
}
function r0(o, b, a) {
  o[0](o, b, a);
}
function r1(o, b, a) {
  o[1](o, b, a);
}
function r2(o, b, a) {
  o[2](o, b, a);
}
function Args(b, a, args) {
  for (let v of args) b[a++] = v;
  return a;
}
function ppp(o, b, a) {
  b[a - 1]++;
  o[0](o, b, a);
}
function la(o, b, a) {
  const la = b[a - 2].codePointAt(b[a - 1]) | 0;
  b[a++] = la;
  o[0](o, b, a);
}

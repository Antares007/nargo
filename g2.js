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

const v = vvv(lt, [8, 1, 2, 3, "hey", r0]);
function cp(o, b, a) {
  sexp(o, b, a - 1, [9, [0, la, [8, b[a - 1], eq]], r1, ppp]);
}
function cpr(o, b, a) {
  sexp(o, b, a - 2, [9, [0, la, [8, b[a - 2], b[a - 1], range]], ppp, r1]);
}
v(o, ["lt(1,2)", 0], 2);
example(o, [], 0);
function vvv(f, e) {
  return (o, b, a) => sexp(o, b, a, [8, "and", r2]);
}
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
function fib(o, b, a) {
  const n = b[--a];
  const c = b[--a];
  const p = b[--a];
  sexp(o, b, a, [9, [8, n, 0, eq], [8, c, p + c, n - 1, fib], [8, p, c, r1]]);
}
function N(o, b, a) {
  sexp(o, b, a, [8, 0x30, 0x39, cpr]);
}
//> gcd(99, 33)
//> lt(33, 99)₁(gcd(33, 66))₀(lt(99, 33)₁(gcd(-66, 99)))₀(r1(33))
//> lt(66, 33)₁(gcd(66, -33))₀(lt(33, 66)₁(gcd(33, 33)))₀(r1(66))
//> lt(33, 33)₁(gcd(33, 0))₀(lt(33, 33)₁(gcd(0, 33)))₀(r1(33))
function example(o, b, a) {
  sexp(o, b, a, [8, 0, 1, 10, fib]);
  sexp(o, b, a, [8, 99, 33, gcd]);
  //7 sexp(o, b, a, [0, one, two, add, two, add, two, add]);
  const ε = r0;

  //sexp(o, b, a, [9, one, two, [9, [9, one, two, tree], two, tree]]);

  //sexp(o, b, a, [0, [0, one, two, add], tree, add, tree, add]);
  sexp(o, b, a, [
    0, //
    [8, "abcdef", 0, r0], //
    [8, 6, lan],
    //[8, 0x62, cp], //
    //[1, [8, 0x61, cp], [8, 0x62, cp], [8, 0x63, cp]], //
    //[1, [8, 0x61, cp], [8, 0x62, cp], [8, 0x63, cp], ε], //
  ]);
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
function lan(o, b, a) {
  const n = b[--a];
  const txt = a - 2,
    pc = a - 1;
  b[a] = b[txt].slice(b[pc], b[pc] + n);
  b[pc] += b[a].length;
  o[(b[a].length !== n) | 0](o, b, a + 1);
}
function la(o, b, a) {
  const la = b[a - 2].codePointAt(b[a - 1]) | 0;
  b[a++] = la;
  o[0](o, b, a);
}

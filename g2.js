const { sexp, Sexp, Nval, mb } = require("./sexp");
(function example(o, b, a) {
  E(o, ["a₀b₀c₀d", 0, 0], 3);
  E(o, ["a₀b₂c₄d", 0, 0], 3);
  E(o, ["a₄b₂c₈d", 0, 0], 3);
  E(o, ["a₉b₈c₆d", 0, 0], 3);
  //  Exp(o, ["a₀b₁c₁d", 0], 2)
  //  Exp(o, ["(a₀b₀c₀d)", 0], 2)
  //  sexp(o, b, a, [1, [8, "a₀b₀c₀d", 0, r1], Exp]);
  //  sexp(o, b, a, [8, 0, 1, 10, fib]);
  //  sexp(o, b, a, [8, 18, 12, gcd]);
  //  sexp(o, b, a, [0, one, two, add, two, add, two, add]);
})(logpith(), [], 0);
function E(o, b, a) {
  const p = b[--a];
  sexp(o, b, a, [1, A, [8, p, E_]]);
}
function E_(o, b, a) {
  const p = b[--a];
  sexp(o, b, a, [0, [1, laop, [8, p, E__]], r1]);
}
function E__(o, b, a) {
  const p = b[--a];
  const c = b[--a];
  sexp(o, b, a, [
    9,
    [8, c, p, lt],
    [1, ppp, [8, c, c + 1, E], reduceL, [8, p, E_]],
    r1,
  ]);
}
function A(o, b, a) {
  sexp(o, b, a, [0, Number, PE]);
}
function PE(o, b, a) {
  sexp(o, b, a, [1, OpenParen, [8, 0, E], CloseParen]);
}
function laop(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x2080, 0x2089, range], la, [8, 0x2080, sub]]);
}

// E = E + T / T
//
// E  = T E_
// E_ = + T E_ / ε
// T  = F T_
// T_ = + F T_ / ε
function Atom(o, b, a) {
  sexp(o, b, a, [0, Number, PExp]);
}
function Number(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x61, 0x6f, range], la, mn, ppp]);
}
function mn(o, b, a) {
  sexp(o, b, --a, [8, String.fromCodePoint(b[a]), r1]);
}
function PExp(o, b, a) {
  sexp(o, b, a, [1, OpenParen, Exp, CloseParen]);
}
function Op(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x2080, 0x2089, range], la, mo, ppp]);
}
function mo(o, b, a) {
  sexp(o, b, --a, [8, b[a] - 0x2080, r1]);
}
function Exp(o, b, a) {
  sexp(o, b, a, [8, 0, Exp_init]);
}
function Exp_init(o, b, a) {
  const min_prec = b[--a];
  sexp(o, b, a, [1, Atom, [8, min_prec, Exp_next]]);
}
function Exp_next(o, b, a) {
  const min_prec = b[--a];
  sexp(o, b, a, [9, Op, r1, [8, min_prec, AAA]]);
}
function AAA(o, b, a) {
  const min_prec = b[--a];
  const cur_prec = b[a - 1];
  if (cur_prec < min_prec)
    sexp(o, b, a, [1, Atom, reduceL, [8, cur_prec, Exp_next]]);
  else sexp(o, b, a, [1, Atom, reduceR, [8, cur_prec + 1, Exp_next]]);
}
function reduceL(o, b, a) {
  const r = b[--a];
  const op = b[--a];
  const l = b[--a];
  sexp(o, b, a, [8, [op, l, r], r1]);
}
function reduceR(o, b, a) {
  const r = b[--a];
  const op = b[--a];
  const l = b[--a];
  l.r = { op, l: l.r, r };
  sexp(o, b, a, [8, l, r1]);
}

function OpenParen(o, b, a) {
  sexp(o, b, a, [1, la, [8, 40, eq], ppp]);
}
function CloseParen(o, b, a) {
  sexp(o, b, a, [1, la, [8, 41, eq], ppp]);
}
function cp(o, b, a) {
  sexp(o, b, a - 1, [1, la, [8, b[a - 1], eq], ppp]);
}
function cpr(o, b, a) {
  sexp(o, b, a - 2, [1, la, [8, b[a - 2], b[a - 1], range], ppp]);
}
function ppp(o, b, a) {
  const ray = (b[1] < b[0].length) | 0;
  if (ray) b[1]++, o[ray](o, b, a);
  else o[ray](o, b, a);
}
function lan(o, b, a) {
  const n = b[--a];
  const s = b[0].slice(b[1], b[1] + n);
  b[a++] = s;
  b[1] += s.length;
  o[(s.length !== n) | 0](o, b, a);
}
function la(o, b, a) {
  const ray = (b[1] < b[0].length) | 0;
  if (ray) {
    const la = b[0].codePointAt(b[1]);
    b[a++] = la;
    o[ray](o, b, a);
  } else o[ray](o, b, a);
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
function range(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  const cp = b[--a];
  o[!(cp < l || r < cp) | 0](o, b, a);
}
// fib(p, c, n) = eq(n, 0) { ₀ fib(c, p+c, n-1) ₁ r1(p, c) }
function fib(o, b, a) {
  const n = b[--a];
  const c = b[--a];
  const p = b[--a];
  sexp(o, b, a, [9, [8, n, 0, eq], [8, c, p + c, n - 1, fib], [8, p, c, r1]]);
}
// gcd(x, y) = lt(x,y)₁gcd(x,y-x)₀(lt(y, x)₁gcd(x-y,y))₀r1(x)
// gcd(18, 12)
// lt(18,  12)₁gcd(18, -6)₀(lt(12, 18)₁gcd(6,  12))₀r1(18)
// lt(6,   12)₁gcd(6,   6)₀(lt(12,  6)₁gcd(-6, 12))₀r1(6 )
// lt(6,    6)₁gcd(6,   0)₀(lt(6,   6)₁gcd(0,   6))₀r1(6 )
function gcd(o, b, a) {
  const y = b[--a];
  const x = b[--a];
  sexp(o, b, a, [
    0,
    [1, [8, x, y, lt], [8, x, y - x, gcd]],
    [1, [8, y, x, lt], [8, x - y, y, gcd]],
    [8, x, r1],
  ]);
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
  sexp(o, b, a, [8, l + r, r1]);
}
function sub(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  sexp(o, b, a, [8, l - r, r1]);
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
function logpith() {
  return [
    (o, b, a) => (
      (b.length = a),
      console.log(0, require("util").inspect(b, { colors: true, depth: 7 }))
    ),
    (o, b, a) => (
      (b.length = a),
      console.log(1, require("util").inspect(b, { colors: true, depth: 7 }))
    ),
    (o, b, a) => (
      (b.length = a),
      console.log(2, require("util").inspect(b, { colors: true, depth: 7 }))
    ),
  ];
}

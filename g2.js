const { sexp, Sexp, Nval, mb } = require("./sexp");
let counter = 0;
function n21(o, b, a) {}
function os(o, b, a) {
  const o21 = o[21];
  o[21] = n21;
  b[a++] = 1;
  o[0](o, b, a);
}
function laeq61ppp(o, b, a) {
  sexp(o, b, a, [1, la, [8, 61, eq], ppp]);
}
function e3(o, b, a) {
  sexp(o, b, a, [8, "===", r1]);
}
function e2(o, b, a) {
  sexp(o, b, a, [8, "==", r1]);
}
function e1(o, b, a) {
  sexp(o, b, a, [8, "=", r1]);
}
function teq(o, b, a) {
  sexp(o, b, a, [
    1,
    laeq61ppp,
    [0, [1, laeq61ppp, [0, [1, laeq61ppp, e3], e2]], e1],
  ]);
}
(function example(o, b, a) {
  sexp(o, b, a, [1, [8, "===1", 0, r1], teq]);
  sexp(o, b, a, [1, [8, "1===", 0, r1], teq]);
  sexp(o, b, a, [1, [8, "=1==", 0, r1], teq]);
  sexp(o, b, a, [1, [8, "==1=", 0, r1], teq]);
  //sexp(o, b, a, [1, [8, "baaaaaaaa", 0, r1], cpb, [8, cpa, many]]);
  //sexp(o, b, a, [8, "a₀b₀c₀d", 0, 0, E]);
  // sexp(o, b, a, [8, "a₀b₁c₂d", 0, 0, E]);
  // sexp(o, b, a, [8, "a₂b₁c₀d", 0, 0, E]);
  // sexp(o, b, a, [8, "s₀a₉b₁c₉d₉e₉f", 0, 0, E]);
  // sexp(o, b, a, [8, "a₉b₈c₆d", 0, 0, E]);
  // sexp(o, b, a, [1, [8, "a₀b₀c₀d", 0, r1], Exp]);
  //sexp(o, b, a, [8, 0, 1, 10, fib]);
  //sexp(o, b, a, [8, 18, 12, gcd]);
  // sexp(o, b, a, [0, one, two, add, two, add, two, add]);
})(logpith(), [], 0);
function many(o, b, a) {
  const nar = b[--a];
  sexp(o, b, a, [1, nar, [8, nar, many]]);
}
function cpa(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x61, eq], ppp]);
}
function cpb(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x62, eq], ppp]);
}
//Identifier = la₁range(0x61,0x63)₁la₁ppp.
//
//Number    la ₁ range(0x30, 0x39) ₁ la ₁ sub(0x30) ₁  ppp.
//laop      la ₁ range(0x2080, 0x2089) ₁ la ₁ sub(0x2080).
//azrange   la ₁ range(0x61,0x7a) ₁ la ₁ mn ₁ ppp.
//mn cp     1(String.fromCodePoint(cp)).
//
//E   p     A₁E_(p).
//E_  p     laop₁E__(p)₀r1.
//E__ c p   lt(c, p){ppp₁E(c,c+1)₁reduceL₁E(p) r1}.
//A         Number ₁ azrange ₁ PE.
//PE        OpenParen ₁ E(0) ₁ CloseParen.
function E(o, b, a) {
  const p = b[--a];
  sexp(o, b, a, [1, A, [8, p, E_]]);
}
function E_(o, b, a) {
  const p = b[--a];
  sexp(o, b, a, [
    0, //
    [1, laop, [8, p, E__]],
    r1,
  ]);
}
function E__(o, b, a) {
  const p = b[--a];
  const c = b[--a];
  sexp(o, b, a, [
    0,
    [8, c, p, lt],
    [
      1,
      ppp,
      [
        9, //
        [8, c, 9, eq],
        [8, c, c + 1, E],
        [8, c, c, E],
      ],
      reduceL,
      [8, p, E_],
    ],
  ]);
}
function A(o, b, a) {
  sexp(o, b, a, [0, Number, azrange, PE]);
}
function PE(o, b, a) {
  sexp(o, b, a, [1, OpenParen, [8, 0, E], CloseParen]);
}
function laop(o, b, a) {
  sexp(o, b, a, [
    1, //
    la,
    [8, 0x2080, 0x2089, range],
    la,
    [8, 0x2080, sub],
  ]);
}
function Number(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x30, 0x39, range], la, [8, 0x30, sub], ppp]);
}
function azrange(o, b, a) {
  sexp(o, b, a, [1, la, [8, 0x61, 0x7a, range], la, mn, ppp]);
}
function mn(o, b, a) {
  sexp(o, b, --a, [8, String.fromCodePoint(b[a]), r1]);
}
function dup(o, b, a) {
  const amo = b[a - 1];
  b[a++] = amo;
  o[1](o, b, a);
}
function reduceL(o, b, a) {
  //console.log(b.slice(o, a));
  const r = b[--a];
  const op = b[--a];
  const l = b[--a];
  sexp(o, b, a, [8, [op, l, r], r1]);
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
// ppp b:0 p:1 b p
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
    function l0(o, b, a) {
      b.length = a;
      console.log(0, require("util").inspect(b, { colors: true, depth: 7 }));
    },
    function l1(o, b, a) {
      b.length = a;
      console.log(1, require("util").inspect(b, { colors: true, depth: 7 }));
    },
    function l2(o, b, a) {
      b.length = a;
      console.log(2, require("util").inspect(b, { colors: true, depth: 7 }));
    },
  ];
}

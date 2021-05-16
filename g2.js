function one(o, b, a) {
  o[0](o, b, advance(b, a, 1));
}
function add2(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  o[0](o, b, advance(b, a, l + r));
}
function var1(o, b, a) {
  const in_a = b[--a];
  const in_b = b[--a];
  if (in_b[in_a] === "a") o[0](o, b, advance(b, a, in_b, in_a + 1));
  else o[1](o, b, advance(b, a, in_b, in_a));
}
function S(o, b, a) {
  const sexp = [
    0, //
    [0, Tb, _init],
    [0, S, Ta, _next],
  ];
  b[advance(b, a, sexp) - 1](o, b, a);
}
function Tb(o, b, a) {
  str(o, b, a);
}
function Ta() {}
function _init() {}
function _next() {}
function example(o, b, a) {
  a = advanceSexp(b, a, [0, one, one, add2]);
  b[--a](o, b, a);
}
const o = [
  function ray0(o, b, a) {
    b.length = a;
    console.log(0, b);
  },
  function ray1(o, b, a) {
    b.length = a;
    console.log(1, b);
  },
  function ray2(o, b, a) {
    b.length = a;
    console.log(2, b);
  },
];
example(o, [], 0);
function advance(b, a, ...args) {
  for (let v of args) b[a++] = v;
  return a;
}
function advanceSexp(b, a, sexp) {
  if (Array.isArray(sexp)) {
    const op = sexp.shift();
    a = advanceSexp(b, a, sexp.shift());
    for (let e of sexp) {
      const oa = a;
      a = advanceSexp(b, a, e);
      const n = a - oa;
      b[a++] = n;
      b[a++] = op;
      b[a++] = mbop;
    }
  } else b[a++] = sexp;
  return a;
}
function mbop(o, b, a) {
  const op = b[--a];
  const len = b[--a];
  const oa = a;
  const nexp = b.slice((a = a - len), oa);
  const nar = b[--a];
  const p = [...o, o, nexp];
  p[op] = cbo;
  nar(p, b, a);
}
function cbo(o, b, a) {
  for (let v of o[o.length - 1]) b[a++] = v;
  b[--a](o[o.length - 2], b, a);
}

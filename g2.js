const { Nvalsexp } = require("./sexp");
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
function example(o, b, a) {
  //  Nvalsexp(o, b, a, [0, one, two, add, two, add, two, add]);
  const cp = (o, b, a) =>
    Nvalsexp(o, b, a - 1, [9, [0, la, [8, b[a - 1], eq]], r1id, ppp]);
  const ε = r0id;
  //Nvalsexp(o, b, a, [0, [0, one, two, add], tree, add, tree, add]);
  Nvalsexp(o, b, a, [
    0, //
    [8, "bada", 0, r0id], //
    [8, 0x62, cp], //
    [1, [8, 0x61, cp], [8, 0x62, cp], [8, 0x63, cp]], //
    [1, [8, 0x61, cp], [8, 0x62, cp], [8, 0x63, cp], ε], //
  ]);
  // one one two 0x10 mb tree 0x10 mb 0x7 mb tree 0x1 mb
  const exp = `
  Tb * Ta * Ta * (Tc + Tb + ε)
  `;
}
function tree(o, b, a) {
  (b[a++] = 3), o[0](o, b, a);
}
function two(o, b, a) {
  (b[a++] = 2), o[0](o, b, a);
}
function one(o, b, a) {
  (b[a++] = 1), o[0](o, b, a);
}
function add(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  b[a++] = l + r;
  o[0](o, b, a);
}
function r0id(o, b, a) {
  o[0](o, b, a);
}
function r1id(o, b, a) {
  o[1](o, b, a);
}
function r2id(o, b, a) {
  o[2](o, b, a);
}
function Args(b, a, args) {
  for (let v of args) b[a++] = v;
  return a;
}
function eq(o, b, a) {
  o[(b[--a] === b[--a]) | 0](o, b, a);
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

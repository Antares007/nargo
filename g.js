function C(...args) {}
/*
          E → E + T               E
          E → T                  /|\
          T → T * F             E + T
          T → F                /   /|\
          F → ( E )           id  T * F
          F → id                  |   |
                                  F  id
                                  |
                                 id
  E → T * (plus * E * _add + ε)
  T → F * (star * T * _mul + ε)
  F → ( * E * ) * _31 + ds * _ds
  
*/

function E() {
  const ε = (o) => C(o[0]);
  const _add = (o, l, op, r, p, i) => C(o[0], l + r, p, i);
  const _mul = (o, l, op, r, p, i) => C(o[0], l * r, p, i);
  const _ds = (o, cp, p, i) => C(o[0], cp - 0x30, p, i);
  const _31 = (o, l, v, r, p, i) => C(o[0], v, p, i);

  var E = T * (ws * plus * E * _add + ε);
  var T = F * (ws * star * T * _mul + ε);
  var F = ws * openParen * E * ws * closeParen * _31 + ws * ds * _ds;

  const ds = (o) => C(range, o, 0x30, 0x39);
  const closeParen = (o) => C(cp, o, ")".codePointAt(0));
  const openParen = (o) => C(cp, o, "(".codePointAt(0));
  const star = (o) => C(cp, o, "*".codePointAt(0));
  const plus = (o) => C(cp, o, "+".codePointAt(0));

  return E;
}
function ws(o, p, i) {
  while (i[p] === " " || i[p] === "\t" || i[p] === "\n" || i[p] === "\r") p++;
  C(o[0], p, i);
}
function example(o) {
  const ε = (o) => C(o[0]);
  C(E(), o, 0, ` ( 3 + 6 ) * 9 `);
  var AB = a + b;
  var ABS = AB * ABS + ε;
  C(ABS, o, 0, "baababb");
  var as = a * as;
  var S = b * as + ε;
  C(S, o, 0, "baaaaaa");
}
function b(o) {
  C(cp, o, 98);
}
function a(o) {
  C(cp, o, 97);
}

(example: any)(
  [
    (o, ...args) => console.log(0, args),
    (o, ...args) => console.log(1, args),
    (o, ...args) => console.log(2, args),
  ],
  [],
  0
);
function range(o, p, i, f, t) {
  const cp = i.codePointAt(p);
  if (cp < f || t < cp) C(o[1], p, i);
  else C(o[0], cp, p + 1, i);
}
function cp(o, p, i, cp) {
  if (cp === i.codePointAt(p)) C(o[0], cp, p + 1, i);
  else C(o[1], p, i);
}
function nar(o, nar) {
  C(nar, o);
}
function cao(o) {
  const a = o[3].a;
  C(a, o[3].o);
}
function cbo(o) {
  const b = o[3].b;
  C(b, o[3].o);
}
function cco(o) {
  const c = o[3].c;
  C(c, o[3].o);
}
function co3o0(o) {
  C(o[3].o[0]);
}
function co3o1(o) {
  C(o[3].o[1]);
}
function co3o2(o) {
  C(o[3].o[2]);
}
function ma(o, m, a) {
  C(m, [cao, co3o1, co3o2, { o, a }]);
}
function mb(o, m, b) {
  C(m, [co3o0, cbo, co3o2, { o, b }]);
}
function mab(o, m, a, b) {
  C(m, [cao, cbo, co3o2, { o, b, a }]);
}
///////////////////////////////////////////
function c20(o) {
  C(o[2][0]);
}
function c21(o) {
  C(o[2][1]);
}
function cbo2(o) {
  const b = o[3];
  C(b, o[2], ...o[4]);
}
function mbo(o, b, r, n, ...args) {
  const nargs = args.splice(args.length - n, n);
  const nar = args.pop();
  const pith = [c20, c21, o, b, nargs];
  pith[r] = cbo2;
  C(nar, pith, ...args);
}

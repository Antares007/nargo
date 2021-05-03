// @flow strict
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
*/

// prettier-ignore
function E() {
  const _add  = (o, l, op, r, p, i) => C(o[0], l + r, p, i);
  const _mul  = (o, l, op, r, p, i) => C(o[0], l * r, p, i);
  const _ds   = (o, cp, p, i)       => C(o[0], cp - 0x30, p, i);
  const _31   = (o, l, v, r, p, i)  => C(o[0], v, p, i);

  const E           = (o) => C(ma, o, T, E1);
  const E1          = (o) => C(mb, o, plus, E, ma, _add, ma, ε);
  const T           = (o) => C(ma, o, F, T1);
  const T1          = (o) => C(mb, o, star, T, ma, _mul, ma, ε);
  const F           = (o) => C(mb, o, openParen, E, ma, closeParen, ma, _31, ma, ds);
  const ds          = (o) => C(ma, o, 0x30, 0x39, range, _ds);

  const closeParen  = (o) => C(cp, o, ")".codePointAt(0));
  const openParen   = (o) => C(cp, o, "(".codePointAt(0));
  const star        = (o) => C(cp, o, "*".codePointAt(0));
  const plus        = (o) => C(cp, o, "+".codePointAt(0));
  const ε           = (o) => C(o[0]);

  return E;
}
function example(o) {
  C(S, o, 0, "baaaaaa");
  C(E(), o, 0, "(3+6)*9");
  C(ABS, o, 0, "baababb");
}

function AB(o) {
  C(nar, o, a, b, mb);
}
function ABS(o) {
  C(nar, o, AB, ABS, ma);
}

function b(o) {
  C(cp, o, 98);
}
function as(o) {
  C(ma, o, a, as);
}
function S(o) {
  C(ma, o, b, as);
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
  if (f - 1 < cp && cp < t + 1) C(o[0], cp, p + 1, i);
  else C(o[1], p, i);
}
function cp(o, p, i, cp) {
  if (cp === i.codePointAt(p)) C(o[0], cp, p + 1, i);
  else C(o[1], p, i);
}
function a(o) {
  C(cp, o, 97);
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

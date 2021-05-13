const mbo = require("./mbo");
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

  const _if = (o) => C(str, o, "if");
  const _then = (o) => C(str, o, "if");
  const _else = (o) => C(str, o, "if");
  var S = ws * _if * E;
  return E;
}
function example(o) {
  const ε = (o) => C(o[0]);
  C(E(), o, 0, `(3+6)*9`);
  var AB = a + b;
  var ABS = AB * ABS + ε;
  C(ABS, o, 0, "baababb");
  var as = a * as;
  var S = b * as + ε;
  C(S, o, 0, "baaaaaa");
}
function range(o, p, i, f, t) {
  const cp = i.codePointAt(p) | 0;
  if (cp < f || t < cp) C(o[1], p, i);
  else C(o[0], cp, p + 1, i);
}
function cp(o, p, i, cp) {
  if (cp === (i.codePointAt(p) | 0)) C(o[0], cp, p + 1, i);
  else C(o[1], p, i);
}
function str(o, pos, inp, match) {
  const npos = pos + match.length;
  if (inp.length < npos) return C(o[1], pos, inp);
  for (let i = 0, l = match.length; i < l; i++)
    if (inp[pos + i] !== match[i]) return C(o[1], pos, inp);
  C(o[0], npos, inp);
}
function ws(o, p, i) {
  while (i[p] === " " || i[p] === "\t" || i[p] === "\n" || i[p] === "\r") p++;
  C(o[0], p, i);
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

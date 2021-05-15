//var S = (o, Σ, α) =>
//  c(mbop, o, ws, _init, 0, 0, mbop, S, ws, 0, 0, mbop,_next,
//  0, 0, mbop, 3, 8);
const mbop = require("./mbop");

function Sa(p, b, a) {
  b[a++] = ws;
  b[a++] = _init;
  b[a++] = mb0;

  b[a++] = Sa; //1
  b[a++] = ws; //2
  b[a++] = mb0; //3
  b[a++] = _next; //4
  b[a++] = mb0;

  b[a++] = m34;

  b[--a](p, b, a);
}

const opr = {
  "*": 0,
  "+": 1,
  "&&": 2,
  "||": 3,
  0(p, b, a) {
    const len = b[--a];
    const cnar = b[--a];
    const oa = a;
    const nargs = b.slice((a = a - len), oa);
    const nar = b[--a];
    nar([(p, b, a) => p[3][1](p[3], b, a), [p, b, nargs]], b, a);
  },
  1(o, b, a) {
    C(mbop, o, 1);
  },
  2(o, b, a) {
    C(mbop, o, 2);
  },
  3(o, b, a) {
    C(mbop, o, 3);
  },
};
//var oneo = 1;
//var add2o = (a, b) => Co(a + b);
//var two = oneo * oneo * add2o;
//var threeo = oneo * two * add2o;
//var three_o = () => threeo(Co);
//var fouro = () => Co(4);
//var four_o = () => (threeo * oneo * add2o)(C);
//var fibo = () => Co();
//C(fibo, 40, 0, 1);
function args() {}
var Mα = S * α * S;
var Mξ = S * ξ * S;
var Mγ = S * γ * S;
var Mτ = S * τ * S;
var A = C || A * Mα * C;
var C = G || C * Mξ * G;
var G = T || G * Mγ * T;
var T = P || T * Mτ * T;
var P = openParen * A * closeParen + Qword;
var Qword = Dword * Dword;
var Dword = Word * Word;
var Word = Byte * Byte;
var M = α + ξ + γ + τ + S;
var ws2 = tab + space + newline;
var _init = (o, b, a) => C(o[opr["||"]], a, b, a);
var _next = (o, b, a) => C(o[opr["||"]]);
var S = ws * _init || S * ws * _next;
var Byte = () => 1;

var α = (o, b, a) =>
  b[a] === "α" ? C(o[opr["*"]], b, a + 1) : C(o[opr["+"]], b, a);
var ξ = (o, b, a) =>
  b[a] === "ξ" ? C(o[opr["*"]], b, a + 1) : C(o[opr["+"]], b, a);
var γ = (o, b, a) =>
  b[a] === "γ" ? C(o[opr["*"]], b, a + 1) : C(o[opr["+"]], b, a);
var τ = (o, b, a) =>
  b[a] === "τ" ? C(o[opr["*"]], b, a + 1) : C(o[opr["+"]], b, a);

/*
          α     → (o, p, i) => (i[p] === 'α' ? C(o["*"], p + 1, i) : C(o["+"], p, i))
          ξ     → (o, p, i) => (i[p] === 'ξ' ? C(o["*"], p + 1, i) : C(o["+"], p, i))
          γ     → (o, p, i) => (i[p] === 'γ' ? C(o["*"], p + 1, i) : C(o["+"], p, i))
          τ     → (o, p, i) => (i[p] === 'τ' ? C(o["*"], p + 1, i) : C(o["+"], p, i))

nar α = α 1


          E → E + T               E                      
          E → T                  /|\
          T → T * F             E + T
          T → F                /   /|\
          F → ( E )           id  T * F
          F → id                  |   |
                                  F  id
                                  |
                                 id
            E
           /|\
          E + T
         /|\  |
        E + T F
        |   | |
        T   F id
        |   |
        F   id
        | 
        id
*/
function E() {
  const ε = (o) => C(o[0]);
  // var add = (l,op,r) =>
  const _add = (o, l, op, r, p, i) => C(o[0], { op, l, r }, p, i);
  const _mul = (o, l, op, r, p, i) => C(o[0], { op, l, r }, p, i);
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
function example(o) {
  const ε = (o) => C(o[0]);
  C(E(), o, 0, `3+6+9`);
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

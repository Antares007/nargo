const { Nval, mb, estr, rexp } = require("./mb");
module.exports = { Sexp, sexp: Nvalsexp, mb, Nval };
function Nvalsexp(o, b, a, sexp) {
  const oa = a;
  a = Sexp(b, a, sexp);
  //  console.log(b.slice(0, a).map(estr).join(" "));
  //  console.log(">", rexp(b.slice(oa, a), a - oa));
  Nval(o, b, a);
}
(function () {
  function A() {}
  function B() {}
  function C() {}
  function D() {}
  function E() {}
  function F() {}
  function G() {}
  function H() {}
  function I() {}
  function J() {}
  function K() {}
  function L() {}
  function M() {}
  const rez = [];
  const input = [
    9,
    [8, A, B, K],
    [8, B, M],
    [1, D, [8, E, F, G], H, [8, I, J]],
  ];
  const len = Sexp(rez, rez.length, input);
  if (len == rez.length) console.log(rez.map(estr).join(" "));
  console.log(rexp(rez, rez.length));
});

function Sexp(b, a, sexp) {
  if (Array.isArray(sexp)) {
    if (sexp[0] === 8)
      for (let i = 1, l = sexp.length; i < l; i++) b[a++] = sexp[i];
    else if (sexp[0] === 9) {
      let opcode = 0;
      a = Sexp(b, a, sexp[1]);
      for (let ray = sexp.length - 3; -1 < ray; ray--) {
        const oa = a;
        a = Sexp(b, a, sexp[ray + 2]);
        const n = (a - oa) | 0;
        opcode |= n << (8 * ray);
      }
      b[a++] = opcode;
      b[a++] = mb;
    } else {
      a = Sexp(b, a, sexp[1]);
      for (let i = 2, l = sexp.length; i < l; i++) {
        const oa = a;
        a = Sexp(b, a, sexp[i]);
        const n = (a - oa) | 0;
        b[a++] = n << (8 * sexp[0]);
        b[a++] = mb;
      }
    }
  } else b[a++] = sexp;
  return a;
}

const { Nval, mb } = require("./mb");
module.exports = { Sexp, sexp: Nvalsexp, mb, Nval };
function Nvalsexp(o, b, a, sexp) {
  const oa = a;
  a = Sexp(b, a, sexp);

  //console.log(b.slice(0, a).map(estr).join(" "));
  console.log(">", rexp(b, a));
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
  const input = [0, [1, [2, C, D], A, B], E];
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
function estr(e) {
  return typeof e === "function"
    ? e.name
    : typeof e === "number"
    ? e.toString(16) + "h"
    : JSON.stringify(e);
}
function rexp(b, a) {
  if (mb === b[a - 1]) {
    --a;
    let opcode = b[--a];
    let str = "";
    let ray = 0;
    let count = 0;
    while (opcode) {
      const n = opcode & 0xff;
      if (n) {
        const oa = a;
        const s = b.slice((a = a - n), oa);
        const p = 1 < n;
        str =
          str +
          String.fromCodePoint(ray + "₀".codePointAt(0)) +
          (p ? "(" : "") +
          rexp(s, s.length) +
          (p ? ")" : "");
        count++;
      }
      opcode >>= 8;
      ray++;
    }
    const q = 1 < count;
    return rexp(b, a) + (q ? "{" : "") + str + (q ? "}" : "");
  } else
    return a === 1
      ? estr(b[0])
      : `${estr(b[a - 1])}(${b
          .slice(0, a - 1)
          .map(estr)
          .join(", ")})`;
}

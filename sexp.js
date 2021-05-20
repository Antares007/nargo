const { Nval, mb } = require("./mb");
module.exports = { Sexp, sexp: Nvalsexp, mb, Nval };
function Nvalsexp(o, b, a, sexp) {
  const oa = a;
  a = Sexp(b, a, sexp);
  console.log(">", rexp(o, b, a));
  Nval(o, b, a);
}
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
        opcode |= n << (4 * ray);
      }
      b[a++] = opcode;
      b[a++] = mb;
    } else {
      a = Sexp(b, a, sexp[1]);
      for (let i = 2, l = sexp.length; i < l; i++) {
        const oa = a;
        a = Sexp(b, a, sexp[i]);
        const n = (a - oa) | 0;
        b[a++] = n << (4 * sexp[0]);
        b[a++] = mb;
      }
    }
  } else b[a++] = sexp;
  return a;
}
function estr(e) {
  return (e.name ? e.name : e) + "";
}
function rexp(o, b, a) {
  if (mb === b[a - 1]) {
    --a;
    let opcode = b[--a];
    let str = "";
    let ray = 0;
    let count = 0;
    while (opcode) {
      const n = opcode & 0xf;
      if (n) {
        const oa = a;
        const s = b.slice((a = a - n), oa);
        const p = 1 < n;
        str =
          str +
          String.fromCodePoint(ray + "₀".codePointAt(0)) +
          (p ? "(" : "") +
          rexp(o, s, s.length) +
          (p ? ")" : "");
        count++;
      }
      opcode >>= 4;
      ray++;
    }
    return rexp(o, b, a) + (count > 1 ? "{" + str + "}" : str);
  } else
    return a === 1
      ? estr(b[0])
      : `[${b
          .slice(o, a - 1)
          .map(estr)
          .join(", ")}]${estr(b[a - 1])}`;
}

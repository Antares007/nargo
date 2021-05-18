const { Nval, mb } = require("./mb");
module.exports = { Sexp, Nvalsexp, Nval, mb };
function Nvalsexp(o, b, a, sexp) {
  const oa = a;
  a = Sexp(b, a, sexp);
  // prettier-ignore
  console.log('sexp:',b.slice(oa,a).map(a=>typeof a==="number"?'0x'+a.toString(16):a.name?a.name:a).join(" "));
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

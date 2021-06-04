module.exports = { Nval, mb, estr, rexp };
// prettier-ignore
const mbrays = {
  1(o, b, a) { (b[a++] = 1), mbray(o, b, a); },
  2(o, b, a) { (b[a++] = 2), mbray(o, b, a); },
  3(o, b, a) { (b[a++] = 3), mbray(o, b, a); },
};
function mbray(o, b, a) {
  for (let v of o[3][b[--a]]) b[a++] = v;
  Nval(o[3][0], b, a);
}
function Nval(o, b, a) {
  //  console.log(b.slice(0, a).map(estr).join(" "));
  //  console.log(rexp(b, a));
  //console.log(pp(o));
  b[--a](o, b, a);
}
function f0(o, b, a) {
  o[3][0][0](o[3][0], b, a);
}
function f1(o, b, a) {
  o[3][0][1](o[3][0], b, a);
}
function f2(o, b, a) {
  o[3][0][2](o[3][0], b, a);
}
function mb(o, b, a) {
  let opcode = b[--a] | 0;
  let ray = 0;
  let pos = 0;
  const p = [f0, f1, f2, [o]];
  while (opcode) {
    const len = opcode & 0xff;
    if (len) {
      const oa = a;
      const nexp = b.slice((a = a - len), oa);
      p[3].push(nexp);
      p[ray] = mbrays[++pos];
    }
    (opcode >>= 8), ray++;
  }
  Nval(p, b, a);
}
function pp(o) {
  return Array.isArray(o) ? "[" + o.map(pp).join(" ") + "]" : o.name;
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

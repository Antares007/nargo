module.exports = { Nval, mb };
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
  // prettier-ignore
  //console.log(b.slice(0,a).map(a=>typeof a==="number"?'0x'+a.toString(16):a.name?a.name:a).join(" "));
  b[--a](o, b, a);
}
function r0(o, b, a) {
  o[3][0][0](o[3][0], b, a);
}
function r1(o, b, a) {
  o[3][0][1](o[3][0], b, a);
}
function r2(o, b, a) {
  o[3][0][2](o[3][0], b, a);
}
function mb(o, b, a) {
  let opcode = b[--a] | 0;
  let ray = 0;
  let pos = 0;
  const p = [r0, r1, r2, [o]];
  while (opcode) {
    const len = opcode & 0x0f;
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

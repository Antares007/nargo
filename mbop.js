const rays = [
  (o) => C(o[o.length - 1][0][0]),
  (o) => C(o[o.length - 1][0][1]),
  (o) => C(o[o.length - 1][0][2]),
  (o) => C(o[o.length - 1][0][3]),
  (o) => C(o[o.length - 1][0][4]),
  (o) => C(o[o.length - 1][0][5]),
  (o) => C(o[o.length - 1][0][6]),
  (o) => C(o[o.length - 1][0][7]),
];
module.exports = mbo;
function cbo(o) {
  const s = o[o.length - 1];
  const b = s[1];
  C(b, s[0], ...s[2]);
}
function mbo(o, b, r, n, ...args) {
  const nargs = args.splice(args.length - n, n);
  const nar = args.pop();
  const length = o.length;
  const pith = Array(length);
  const spos = length - 1;
  for (let i = 0; i < spos; i++) pith[i] = rays[i];
  pith[spos] = [o, b, nargs];
  pith[r] = cbo;
  C(nar, pith, ...args);
}

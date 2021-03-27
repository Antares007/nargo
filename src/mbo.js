function v({ o, b }) {
  b(o);
}
function mb(o, a, b) {
  const ob = { ...o, v, o, b };
  a(ob);
}
function rg(o, a, b, c, d) {
  if (a === mb) c(o, a, d, rg, d, mb, b);
  else c(o, d, a, mb, d, mb, b);
}
module.exports = {
  mb,
  o: {
    v(o, ...nargs) {
      console.log("v", nargs);
    },
    e(o, ...nargs) {
      console.log("e", nargs);
    },
  },
  rg,
};
global.Σ = [];
global.α = 0;

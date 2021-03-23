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
    v(o) {
      console.log("v", Σ.slice(0, α));
    },
    e(o) {
      console.log("e", Σ.slice(0, α));
    },
  },
  rg,
};
global.Σ = [];
global.α = 0;

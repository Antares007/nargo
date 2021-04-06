function v({ o, b }) {
  b(o);
}
function mb(o, a, b) {
  const ob = { ...o, v, o, b };
  a(ob);
}
const o = {
  v(o, ...nargs) {
    [C, console.log, "v", nargs];
  },
  e(o, ...nargs) {
    [C, console.log, "e", nargs];
  },
};
function example(o) {
  //Left identity:   return a >>= f ≡ f a
  const ret = (o) => o.v();
  const f = (o, a) => o.v(a * 2);
  mb(o, [B, ret, 3], f);
  // ===
  f(o, 3);

  //Right identity:  m >>= return ≡ m
  const M = [B, ret, 6];
  mb(o, M, ret);
  // ===
  M(o);

  //Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
  const g = (o, b) => o.v(b / 2);
  mb(o, [B, mb, M, f], g);
  // ===
  mb(o, M, [B, mb, f, g]);
}
[C, example, o, [], 0];
// std output:
//
// v [ 6 ]
// v [ 6 ]
// v [ 6 ]
// v [ 6 ]
// v [ 6 ]
// v [ 6 ]
//
// [Process exited 0]

function rg(o, a, b, c, d) {
  if (a === mb) c(o, a, d, rg, d, mb, b);
  else c(o, d, a, mb, d, mb, b);
}

module.exports = { mb, o, rg };

global.Σ = [];
global.α = 0;

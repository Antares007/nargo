function v({ o, b }) {
  [b, o];
}

function mb(o, a, b) {
  const ob = { ...o, v, o, b };
  [a, ob];
}

const o = {
  v(o, ...nargs) {
    console.log("v", nargs);
  },

  e(o, ...nargs) {
    console.log("e", nargs);
  },
};

function example(o) {
  //Left identity:   return a >>= f ≡ f a
  const ret = (o) => [o.v];
  const f = (o, a) => [o.v, a * 2];
  [mb, o, (o) => [ret, o, 3], f];
  // ===
  [f, o, 3];

  //Right identity:  m >>= return ≡ m
  const M = (o) => [ret, o, 6];
  [mb, o, M, ret];
  // ===
  [M, o];

  //Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
  const g = (o, b) => [o.v, b / 2];
  [mb, o, (o) => [mb, o, M, f], g];
  // ===
  [mb, o, M, (o) => [mb, o, f, g]];
}
//example(o, [], 0);

function rg(o, a, b, c, d) {
  if (a === mb) [c, o, a, d, rg, d, mb, b];
  else [c, o, d, a, mb, d, mb, b];
}

module.exports = { mb, o, rg };
global.Σ = [];
global.α = 0;

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
const l = (...a) => console.log(...a);
const n1 = (o) => o.v(3);
const n2 = (o) => (o.v("α"), o.v("α", "β"), o.v("α", "β", "ο"));
const n3 = (o) => o.v(6);
const n4 = (o, a) => o.v(a, a + 3);
const ne = (o) => o.e("e");
global.Σ = [];
const α = 0;
const o = {
  v(o) {
    l("v", Σ.slice(0, α));
  },
  e(o) {
    l("e", Σ.slice(0, α));
  },
};
function lo(o) {
  l("b", o.b.name);
  o.v();
  l("e", o.b.name);
}
function fib(o, p, c, n) {
  if (n) fib(o, c, p + c, n - 1);
  else o.v(p, c, c / p);
}
fib(o, 0, 1, 45);
console.log("***");

mb(o, n1, ne, mb, n3, mb, n4);
console.log("***");

rg(o, n1, n2, mb, n3, mb, n4, mb, lo);
console.log("***");

//Left identity:   return a >>= f ≡ f a
const ret = (o) => o.v();
const f = (o, a) => o.v(a * 2);
mb(o, 3, ret, f);
// ===
f(o, 3);

//Right identity:  m >>= return ≡ m
const M = (o) => ret(o, 6);
mb(o, M, ret);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (o, b) => o.v(b / 2);
mb(o, (o) => mb(o, M, f), g);
// ===
mb(o, M, (o) => mb(o, f, g));

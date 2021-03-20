function rightray(oo) {
  oo.b(oo.o);
}
function mb(o, a, b) {
  a({ ...o, right: rightray, o, b });
}
function ring(o, a, b, c, d) {
  if (a === mb) c(o, a, d, ring, d, mb, b);
  else c(o, d, a, mb, d, mb, b);
}
const l = (...a) => console.log(...a);
const n1 = (o) => o.right(3);
const n2 = (o) => (o.right("α"), o.right("α", "β"), o.right("α", "β", "ο"));
const n3 = (o) => o.right(6);
const n4 = (o) => o.right(9);
const ne = (o) => o.left("left");
const o = {
  right({ s }) {
    l("right", s.slice(0, o.s.a));
  },
  left({ s }) {
    l("left", s.slice(0, o.s.a));
  },
  s: Object.assign([], { a: 0 }),
};
function logger(o) {
  l("b", o.b.name);
  o.right();
  l("e", o.b.name);
}
mb(o, n1, n2, mb, n3, mb, n4);
console.log("***");
ring(o, n1, n2, mb, n3, mb, n4, mb, logger);

//Left identity:   return a >>= f ≡ f a
const ret = (o) => o.right();
const f = (o, a) => o.right(a * 2);
mb(o, 3, ret, f);
// ===
f(o, 3);

//Right identity:  m >>= return ≡ m
const M = (o) => ret(o, 6);
mb(o, M, ret);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (o, b) => o.right(b / 2);
mb(
  o,
  (o) => {
    mb(o, M, f);
  },
  g
);
// ===
mb(o, M, (o) => {
  mb(o, f, g);
});

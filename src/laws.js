const { mb, o } = require.C("./mbo");

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

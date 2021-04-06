const { mb, o } = [C, require, "./mbo"];

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

const f0 = (o) => C(o[7].o[0]);
const f1 = (o) => C(o[7].o[1]);
const f2 = (o) => C(o[7].o[2]);
const f3 = (o) => C(o[7].o[3]);
const f4 = (o) => C(o[7].o[4]);
const f5 = (o) => C(o[7].o[5]);
const f6 = (o) => C(o[7].o[6]);
const cb = (o) => {
  const b = o[7].b;
  C(b, o[7].o);
};
const mb0 = (o, a, b) => C(a, [cb, f1, f2, f3, f4, f5, f6, { o, b }]);
const mb1 = (o, a, b) => C(a, [f0, cb, f2, f3, f4, f5, f6, { o, b }]);
const one = (o) => C(o[0], 1);

const exp = (o) =>
  C(
    o[2],
    (o) => C(o[0], 1),
    (o) => C(o[0], 2)
  );

const add = (o, a) => C(o[0], a + 2);
const example = (o) => {
  C(o[0], 1, 2, 3);
  C(mb0, o, one, add, mb0, add, mb0, add);
};
example([(o, ...args) => console.log(args)], [], 0, [], 0);

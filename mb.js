const C3o0 = (o) => C(o[3].o[0]);
const C3o1 = (o) => C(o[3].o[1]);
const C3o2 = (o) => C(o[3].o[2]);
const cb = (o) => {
  const b = o[3].b;
  C(b, o[3].o);
};
const mb0 = (o, a, b) => C(a, [cb, C3o1, C3o2, { o, b }]);
const mb1 = (o, a, b) => C(a, [C3o0, cb, C3o2, { o, b }]);
const mb2 = (o, a, b) => C(a, [C3o0, C3o2, cb, { o, b }]);
module.exports = { mb0, mb1, mb2, cb, C3o0, C3o1, C3o2 };
const example = (o) => {
  const one = (o) => C(o[0], 1);
  const exp = (o) =>
    C(
      o[2],
      (o) => C(o[0], 1),
      (o) => C(o[0], 2)
    );
  const add = (o, a) => C(o[0], a + 2);
  C(o[0], 1, 2, 3);
  C(mb0, o, one, add, mb0, add, mb0, add);
};
//example([(o, ...args) => console.log(args)], [], 0);

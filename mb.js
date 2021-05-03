const C3o0 = (o) => C(o[3].o[0]);
const C3o1 = (o) => C(o[3].o[1]);
const C3o2 = (o) => C(o[3].o[2]);
const cb = (o) => {
  const b = o[3].b;
  C(b, o[3].o, ...o[3].ba);
};
const cc = (o) => {
  const c = o[3].c;
  C(c, o[3].o, ...o[3].ca);
};
const mb0 = (o, a, b) => C(a, [cb, C3o1, C3o2, { o, b, ba: [] }]);
const mb00 = (o, a, b, c) => C(a, [cb, cc, C3o2, { o, b, c, ba: [], ca: [] }]);
const mb1 = (o, a, b) => C(a, [C3o0, cb, C3o2, { o, b, ba: [] }]);

const mb2 = (o, a, b1, b2, b) => C(a, [C3o0, C3o2, cb, { o, b, ba: [b1, b2] }]);
const mb33 = (o, a, b1, b2, b3, b, c1, c2, c3, c) =>
  C(a, [cb, cc, C3o2, { o, b, c, ba: [b1, b2, b3], ca: [c1, c2, c3] }]);
const mb01 = (o, a, b, c1, c) =>
  C(a, [cb, cc, C3o2, { o, b, c, ba: [], ca: [c1] }]);
const mb11 = (o, a, b1, b, c1, c) =>
  C(a, [cb, cc, C3o2, { o, b, c, ba: [b1], ca: [c1] }]);
const mb23 = (o, a, b1, b2, b, c1, c2, c3, c) =>
  C(a, [cb, cc, C3o2, { o, b, c, ba: [b1, b2], ca: [c1, c2, c3] }]);
const mb32 = (o, a, b1, b2, b3, b, c1, c2, c) =>
  C(a, [cb, cc, C3o2, { o, b, c, ba: [b1, b2, b3], ca: [c1, c2] }]);
module.exports = {
  0: mb0,
  11: mb11,
  mb0,
  mb00,
  mb1,
  mb2,
  mb01,
  mb11,
  mb33,
  mb23,
  mb32,
  cb,
  C3o0,
  C3o1,
  C3o2,
};
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

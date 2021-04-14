const { mb, o } = require("./mbo");

function r(o, s) {
  Go(o.v, s + 1);
}

Go(
  mb,
  o,
  {
    a: 0,
    b: 0,
  },
  (o, s) => Go(o.v, s, s.a),
  r,
  mb,
  (o, s, v) => Go(o.v, { ...s, a: v }),
  mb,
  (o, s) => Go(o.v, s, s.b),
  mb,
  r,
  mb,
  (o, s, v) => Go(o.v, { ...s, b: v })
);

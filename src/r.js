const { mb, o } = require("./mbo");

function r(o, s) {
  [o.v, s + 1];
}

[
  mb,
  o,
  {
    a: 0,
    b: 0,
  },
  (o, s) => [o.v, s, s.a],
  r,
  mb,
  (o, s, v) => [o.v, { ...s, a: v }],
  mb,
  (o, s) => [o.v, s, s.b],
  mb,
  r,
  mb,
  (o, s, v) => [o.v, { ...s, b: v }],
];

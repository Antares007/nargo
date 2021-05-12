const rays = [
  (o) => C(o[o.length - 1][0][0]),
  (o) => C(o[o.length - 1][0][1]),
  (o) => C(o[o.length - 1][0][2]),
  (o) => C(o[o.length - 1][0][3]),
  (o) => C(o[o.length - 1][0][4]),
  (o) => C(o[o.length - 1][0][5]),
  (o) => C(o[o.length - 1][0][6]),
  (o) => C(o[o.length - 1][0][7]),
];
function example(o) {
  function one(o) {
    C(o[0], 1);
  }
  function add(o, a, b) {
    C(o[0], a + b);
  }
  function mul(o, a, b) {
    C(o[0], a * b);
  }
  var two = one * one * add;
  var aha = two * (one * one * add) * add;

  C(aha, o);

  //
  C(
    (o, n) => C(n, o),
    o, //
    one,
    one,
    0,
    0,
    mbo,
    add,
    0,
    0,
    mbo,
    (o) => C(o[3]),
    0,
    0,
    mbo
  );
}
const o = [
  function ray0(o, ...args) {
    console.log(0, args);
  },
  function ray1(o, ...args) {
    console.log(1, args);
  },
  function ray2(o, ...args) {
    console.log(2, args);
  },
  function ray3(o, ...args) {
    console.log(3, args);
  },
  {},
];
example(o, [], 0);

function cbo(o) {
  const s = o[o.length - 1];
  const b = s[1];
  C(b, s[0], ...s[2]);
}
function mbo(o, b, r, n, ...args) {
  const nargs = args.splice(args.length - n, n);
  const nar = args.pop();
  const length = o.length;
  const pith = Array(length);
  const spos = length - 1;
  for (let i = 0; i < spos; i++) pith[i] = rays[i];
  pith[spos] = [o, b, nargs];
  pith[r] = cbo;
  C(nar, pith, ...args);
}

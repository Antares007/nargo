const mbop = require("./mbop");
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
    mbop,
    add,
    0,
    0,
    mbop,
    (o) => C(o[3]),
    0,
    0,
    mbop
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

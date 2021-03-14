const { mb } = require("./cb");
const Val = (a) => (o) => o.val(a);
const Div = (a, b) => (o) => o.div(a, b);

const eval = (o, expr) => {
  expr({
    val(a) {
      o.value(a);
    },
    div(expa, expb) {
      mb(
        o,
        eval,
        (o, a) => {
          mb(
            o,
            eval,
            (o, b) => {
              if (b == 0) o.error("div/0");
              else o.value(a / b);
            },
            expb
          );
        },
        expa
      );
    },
  });
};
const o = {
  value: console.log.bind(console),
  error: console.error.bind(console),
};
const expr1 = Div(Val(9), Val(3));
eval(o, expr1);

console.log("Left identity:   return a >>= f  ≡ f a");
const ret = (o, a) => o.value(a);
const f = (o, a) => o.value(a + a);
mb(o, ret, f, 3);
mb(o, (o) => ret(o, 3), f);
console.log("≡");
f(o, 3);

console.log("Right identity:  m >>= return    ≡ m");
const M = (o) => ret(o, 6);
mb(o, M, ret);
console.log("≡");
M(o);

console.log("Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)");
const g = (o, a) => o.value(a + a + a);
mb(o, (o) => mb(o, M, f), g);
console.log("≡");
mb(o, M, (o, x) => mb(o, f, g, x));
mb(o, M, (o, x) => mb(o, (o) => f(o, x), g));

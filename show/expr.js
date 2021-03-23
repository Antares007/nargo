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
const expr1 = Div(Val(99), Val(3));
eval(o, expr1);

//Left identity:   return a >>= f ≡ f a
const ret = (o, a) => o.value(a);
const f = (o, a) => o.value(a * 2);
mb(o, ret, f, 3);
// ===
f(o, 3);

//Right identity:  m >>= return ≡ m
const M = (o) => ret(o, 6);
mb(o, M, ret);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (o, a) => o.value(a / 2);
mb(o, (o) => mb(o, M, f), g);
// ===
mb(o, M, (o, x) => mb(o, f, g, x));

const { mb } = require("./cb4");
const Val = (a) => (o) => o.val(a);
const Div = (a, b) => (o) => o.div(a, b);
const evl = (o, expr) => {
  expr({
    ...o,
    val(o) {
      o.value();
    },
    div(o, expa, expb) {
      mb(o, expa, evl, (o, a) => {
        mb(o, expb, evl, (o, b) => {
          if (b == 0) o.error("div/0");
          else o.value(a / b);
        });
      });
    },
  });
};
const o = {
  value(o) {
    console.log("v", o.s.slice(o.s.b, o.s.a));
    o.s.a = o.s.b;
  },
  error(o) {
    console.log("e", o.s.slice(o.s.b, o.s.a));
    o.s.a = o.s.b;
  },
  s: Object.assign([], { b: 0, a: 0 }),
};
const expr1 = (o) =>
  o.div(
    (o) => o.val(99),
    (o) => o.val(3)
  );
//const expr1 = Div(Val(99), Val(3));
evl(o, expr1);

//Left identity:   return a >>= f ≡ f a
const ret = (o) => o.value();
const f = (o, a) => o.value(a * 2);
mb(o, 3, ret, f);
// ===
f(o, 3);

//Right identity:  m >>= return ≡ m
const M = (o) => ret(o, 6);
mb(o, M, ret);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (o, b) => o.value(b / 2);
mb(o, (o) => mb(o, M, f), g);
// ===
mb(o, M, (o) => mb(o, f, g));

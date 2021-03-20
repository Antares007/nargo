const { mb, prod } = require("./cb4");
const Val = (a) => (o) => o.val(a);
const Div = (a, b) => (o) => o.div(a, b);
const evl = (o, expr) => {
  expr({
    ...o,
    val(o, a) {
      o.value(a);
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
    console.log("v", o.s.slice(0, o.s.a));
  },
  error(o) {
    console.log("e", o.s.slice(0, o.s.a));
  },
  s: Object.assign([], { a: 0 }),
};
//const expr1 = (o) =>
//  o.div(
//    (o) => o.val(99),
//    (o) => o.val(3)
//  );
const expr1 = Div(Val(99), Val(3));
evl(o, expr1);

const n1 = (o) => o.value(3);
const n2 = (o) => o.value(6);
const n3 = (o) => o.value(9);
const ne = (o) => o.error("error");

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

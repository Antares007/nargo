const { mb, A, S } = require("./cb3");
const Val = (a) => (o) => (A(a), o.val());
const Div = (a, b) => (o) => (A(a, b), o.div());

const eval = (o) => {
  S()({
    val() {
      o.value();
    },
    div() {
      const expa = S();
      const expb = S();
      A(
        (o) => {
          const a = S();
          A(
            (o) => {
              const b = S();
              A(a / b), o.value();
            },
            eval,
            expb
          ),
            mb(o);
        },
        eval,
        expa
      ),
        mb(o);
    },
  });
};
const o = {
  value() {
    console.log(S());
  },
  error() {
    console.log(S());
  },
};

const expr1 = Div(Val(99), Val(3));
// ===
//A((o) => {
//  A(
//    (o) => {
//      A(99), o.val();
//    },
//    (o) => {
//      A(3), o.val();
//    }
//  ),
//    o.div();
//}),
A(expr1), eval(o);

//Left identity:   return a >>= f ≡ f a
const ret = (o) => o.value();
const f = (o) => (A(S() * 2), o.value());
A(f, ret, 3), mb(o);
// ===
A(3), f(o);

//Right identity:  m >>= return ≡ m
const M = (o) => (A(6), ret(o));
A(ret, M), mb(o);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (o) => (A(S() / 2), o.value());
A(g, (o) => (A(f, M), mb(o))), mb(o);
// ===
A((o) => (A(g, f), mb(o)), M), mb(o);

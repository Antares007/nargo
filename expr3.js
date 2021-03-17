const { mb, A, S } = require("./cb3");
const Val = (a) => (o) => (A(a), o.val());
const Div = (a, b) => (o) => (A(a, b), o.div());

const eval = (o) => {
  S()({
    val() {
      o.value();
    },
    div() {
      const expb = S();
      const expa = S();
      A(expa, eval, (o) => {
        const a = S();
        A(expb, eval, (o) => {
          const b = S();
          if (b == 0) A("div/0"), o.error();
          else A(a / b), o.value();
        }),
          mb(o);
      }),
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
A(3, ret, f), mb(o);
// ===
A(3), f(o);

//Right identity:  m >>= return ≡ m
const M = (o) => (A(6), ret(o));
A(M, ret), mb(o);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (o) => (A(S() / 2), o.value());
A((o) => (A(M, f), mb(o)), g), mb(o);
A((o) => (A(M, f), mb(o)), g), mb(o);
// ===
A(M, (o) => (A(f, g), mb(o))), mb(o);

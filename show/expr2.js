const { mb } = require("./cb2");
const Val = (a) => (o) => o.val(a);
const Div = (a, b) => (o) => o.div(a, b);

const eval = (expr) => (o) => {
  expr({
    val(a) {
      o.value(a);
    },
    div(expa, expb) {
      mb(eval(expa), (a) =>
        mb(eval(expb), (b) => (o) => {
          if (b == 0) o.error("div/0");
          else o.value(a / b);
        })
      )(o);
    },
  });
};

const o = {
  value: console.log.bind(console),
  error: console.error.bind(console),
};

eval(Div(Val(99), Val(3)))(o);

//Left identity:   return a >>= f ≡ f a
const ret = (a) => (o) => o.value(a);
const f = (a) => ret(a * 2);
mb(ret(3), f)(o);
// ===
f(3)(o);

//Right identity:  m >>= return ≡ m
const M = ret(6);
mb(M, ret)(o);
// ===
M(o);

//Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)
const g = (a) => ret(a / 2);
mb(mb(M, f), g)(o);
// ===
mb(M, (x) => mb(f(x), g))(o);

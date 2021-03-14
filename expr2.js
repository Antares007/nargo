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

console.log("eval(Div(Val(99), Val(3)))");
eval(Div(Val(99), Val(3)))(o);

console.log("Left identity:   return a >>= f  ≡ f a");
const ret = (a) => (o) => o.value(a);
const f = (a) => ret(a + a);
mb(ret(3), f)(o);
console.log("≡");
f(3)(o);

console.log("Right identity:  m >>= return    ≡ m");
const M = ret(6);
mb(M, ret)(o);
console.log("≡");
M(o);

console.log("Associativity:   (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g)");
const g = (a) => ret(a + a + a);
mb(mb(M, f), g)(o);
console.log("≡");
mb(M, (x) => mb(f(x), g))(o);

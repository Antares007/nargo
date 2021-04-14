const { mb, o } = require("./mbo");

const Val = (a) => (o) => Go(o.val, a);

const Div = (a, b) => (o) => Go(o.div, a, b);

const evl = (o, expr) => {
  Go(expr, {
    ...o,

    val(o, a) {
      Go(o.v, a);
    },

    // prettier-ignore
    div(o, expa, expb) {
      Go(mb, o, expa, evl, (o, a) => Go(mb, o, expb, evl, (o, b) => {
        if (b == 0) Go(o.e, "div/0");else Go(o.v, a / b);
      }));
    },
  });
};

const expr1 = Div(Val(99), Val(3));
Go(evl, o, expr1);

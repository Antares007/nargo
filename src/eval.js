const { mb, o } = require("./mbo");

const Val = (a) => (o) => [o.val, a];
const Div = (a, b) => (o) => [o.div, a, b];

const evl = (o, expr) => {
  [
    expr,
    {
      ...o,
      val(o, a) {
        [o.v, a];
      },
      // prettier-ignore
      div(o, expa, expb) {
        [mb, o, expa, evl, (o, a) =>
          [mb, o, expb, evl, (o, b) => {
            if (b == 0) [o.e, "div/0"];
            else [o.v, a / b];
            },
          ],
        ];
      },
    },
  ];
};
const expr1 = Div(Val(99), Val(3));
[evl, o, expr1];

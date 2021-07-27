function v({ o, b }) {
  C(b, o);
}
function mb(o, a, b) {
  C(a, { e: o.e, v, o, b });
}
function me(o, a, b) {
  C(a, { e: v, v: o.v, o, b });
}

const o = {
  v(o, ...nargs) {
    console.log("v", nargs);
  },
  e(o, ...nargs) {
    console.log("e", nargs);
  },
  run(o, n) {
    C(n, o);
  },
};
// S -> S a / a
function example(o) {
  /*** Left identity *******************************/
  /*** return a >>= f ≡ f a ************************/
  /**/ const ret = (o) => C(o.v); /****************/
  /**/ const f = (o, a) => C(o.v, a * 2); /********/
  /*************************************************/
  /**/ C(mb, o, (o) => C(ret, o, 3), f); /********/
  /*************************************************/
  /**/ C(f, o, 3); /*******************************/
  /*************************************************/

  /*** Right identity: *****************************/
  /*** m >>= return ≡ m ****************************/
  /**/ const M = (o) => C(ret, o, 6); /************/
  /*************************************************/
  /**/ C(mb, o, M, ret); /*************************/
  /*************************************************/
  /**/ C(M, o); /**********************************/
  /*************************************************/

  /*** Associativity *******************************/
  /*** (m >>= f) >>= g ≡ m >>= (\\x -> f x >>= g) **/
  /**/ const g = (o, b) => C(o.v, b / 2); /********/
  /*************************************************/
  /**/ C(mb, o, (o) => C(mb, o, M, f), g); /******/
  /*************************************************/
  /**/ C(mb, o, M, (o) => C(mb, o, f, g)); /******/
  /*************************************************/
}
//example(o, [], 0);

function rg(o, a, b, c, d) {
  if (a === mb) C(c, o, a, d, rg, d, mb, b);
  else C(c, o, d, a, mb, d, mb, b);
}
module.exports = { mb, o, rg };
global.Σ = [];
global.α = 0;
global.Σ1 = [];
global.α1 = 0;

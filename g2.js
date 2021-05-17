function one(o, b, a) {
  o[0](o, b, Args(b, a, [1]));
}
function add2(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  o[0](o, b, Args(b, a, [l + r]));
}
function cp(o, b, a) {
  const cp = b[--a] | 0;
  const buf = a - 1;
  const pos = a - 2;
  if (cp === (b[buf].codePointAt(b[pos]) | 0)) (b[pos] += 1), o[0](o, b, a);
  else o[1](o, b, a);
}
function Nval(o, b, a) {
  b[--a](o, b, a);
}
//prettier-ignore
function S(o, b, a) {Nval(o, b, Sexp(b, a,
    [3, [0, Tb,    _S0],
        [0, S, Ta, _S1]]
));}
function _S0(o, b, a) {
  o[3](o, b, Args(b, a - 3, [b[a - 1], b[a - 3], b[a - 2]]));
}
function _S1(o, b, a) {}
function Ta(o, b, a) {
  Nval(o, b, Sexp(b, a, [8, 0x61, cp]));
}
function Tb(o, b, a) {
  Nval(o, b, Sexp(b, a, [8, 0x62, cp]));
}
function Tc(o, b, a) {
  Nval(o, b, Sexp(b, a, [8, 0x63, cp]));
}
function ε(o, b, a) {
  o[0](o, b, a);
}
//prettier-ignore
function example(o, b, a) {
  const oa = Args(b, a, [0, "baacb"])
  a = Sexp(b, oa,
    [0,
      Tb,
      Ta,
      Ta,
      [1, Tc, Tb, ε],
      [1, Tc, Tb, ε],
    ]
  )
  const nexp = b.slice(oa, a).map(v => v.name ? v.name : v).join(",");
  console.log(nexp)
  Nval(o, b, a)
  const exp = `
  Tb * Ta * Ta * (Tc + Tb + ε)
  `;

  console.log(exp)
}
const o = [
  function ray0(o, b, a) {
    b.length = a;
    console.log(0, b);
  },
  function ray1(o, b, a) {
    b.length = a;
    console.log(1, b);
  },
  function ray2(o, b, a) {
    b.length = a;
    console.log(2, b);
  },
];
example(o, [], 0);
function Args(b, a, args) {
  for (let v of args) b[a++] = v;
  return a;
}
function Sexp(b, a, sexp) {
  if (Array.isArray(sexp)) {
    const op = sexp.shift();
    if (op === 8) {
      for (let e of sexp) b[a++] = e;
    } else {
      a = Sexp(b, a, sexp.shift());
      for (let e of sexp) {
        const oa = a;
        a = Sexp(b, a, e);
        const n = a - oa;
        b[a++] = n;
        b[a++] = op;
        b[a++] = mbop;
      }
    }
  } else b[a++] = sexp;
  return a;
}
function mb0(o, b, a) {
  mbop(o, b, Args(b, a, [1, 0]));
}
function mb1(o, b, a) {
  mbop(o, b, Args(b, a, [1, 1]));
}
function mbop(o, b, a) {
  const op = b[--a];
  const len = b[--a];
  const oa = a;
  const nexp = b.slice((a = a - len), oa);
  const nar = b[--a];
  const p = [...o, o, nexp];
  p[op] = cbo;
  nar(p, b, a);
}
function cbo(o, b, a) {
  for (let v of o[o.length - 1]) b[a++] = v;
  b[--a](o[o.length - 2], b, a);
}

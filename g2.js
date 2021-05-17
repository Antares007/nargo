function one(o, b, a) {
  o[0](o, b, Args(b, a, [1]));
}
function add2(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  o[0](o, b, Args(b, a, [l + r]));
}

function eq(o, b, a) {
  o[((b[--a] === b[--a]) | 0) ^ 1](o, b, a);
}
function ppp(o, b, a) {
  b[a - 2]++;
  o[0](o, b, a);
}
function la(o, b, a) {
  const la = b[a - 1].codePointAt(b[a - 2]) | 0;
  b[a++] = la;
  o[0](o, b, a);
}
function cp(o, b, a) {
  //const cp = b[--a];
  //Nval(o, b, Sexp(b, a, [0, la, [8, cp, eq], ppp]));
  const cp = b[--a];
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
  Nval(o, b, Sexp(b, a, [0, la, [8, 0x61, eq], ppp]));
}
function Tb(o, b, a) {
  Nval(o, b, Sexp(b, a, [0, la, [8, 0x62, eq], ppp]));
}
function Tc(o, b, a) {
  Nval(o, b, Sexp(b, a, [0, la, [8, 0x63, eq], ppp]));
}
function ε(o, b, a) {
  o[0](o, b, a);
}

function example(o, b, a) {
  const args = Args(b, a, [0, "baabc"]);
  a = Sexp(b, args, [0, Tb, Ta, Ta, [1, Tc, Tc]]);
  const nexp = b
    .slice(args, a)
    .map((v) => (v.name ? v.name : v))
    .join(",");
  console.log(nexp);
  Nval(o, b, a);
  //Tb,Ta,1,0,mbop,
  //Ta,1,0,mbop,
  //Tc,Tb,1,1,mbop,ε,1,1,mbop,9,0,mbop,
  //Tc,Tb,1,1,mbop,ε,1,1,mbop,9,0,mbop

  const exp = `
  Tb * Ta * Ta * (Tc + Tb + ε)
  `;

  console.log(exp);
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

const mbrays = {
  0(o, b, a) {
    (b[a++] = 0), mbray(o, b, a);
  },
  1(o, b, a) {
    (b[a++] = 1), mbray(o, b, a);
  },
  2(o, b, a) {
    (b[a++] = 2), mbray(o, b, a);
  },
};
function mbray(o, b, a) {
  const ray = b[--a];
  const nexp = o[o.length - 1][ray];
  for (let v of nexp) b[a++] = v;
  Nval(o[o.length - 2], b, a);
}
function mb(o, b, a) {
  let opcode = b[--a] | 0;
  let ray = 0;
  let pos = 0;
  const p = [...o, o, []];
  while (opcode) {
    const len = opcode & 0x0f;
    if (len) {
      pos++;
      const oa = a;
      const nexp = b.slice((a = a - len), oa);
      p[p.length - 1][ray] = nexp;
      p[ray] = mbrays[ray];
    }
    (opcode >>= 4), ray++;
  }
  Nval(p, b, a);
}
function Sexp(b, a, sexp) {
  if (Array.isArray(sexp)) {
    if (sexp[0] === 8)
      for (let i = 1, l = sexp.length; i < l; i++) b[a++] = sexp[i];
    else if (sexp[0] === 9) {
    } else {
      a = Sexp(b, a, sexp[1]);
      for (let i = 2, l = sexp.length; i < l; i++) {
        const oa = a;
        a = Sexp(b, a, sexp[i]);
        const n = (a - oa) | 0;
        b[a++] = n << (4 * sexp[0]);
        b[a++] = mb;
      }
    }
  } else b[a++] = sexp;
  return a;
}
function example(o, b, a) {
  const nexp = [];
  nexp.length = Sexp(nexp, 0, [9, [0, one, one, eq], r1id, ppp]);
  //Nval(o, nexp, nexp.length);

  const sargs = [one, one, 1, mb, add, 1, mb, one, 1, mb, add, 1, mb];
  Nval(o, sargs, sargs.length);

  const exp = `
  Tb * Ta * Ta * (Tc + Tb + ε)
  `;
}
function one(o, b, a) {
  (b[a++] = 1), o[0](o, b, a);
}
function add(o, b, a) {
  const r = b[--a];
  const l = b[--a];
  b[a++] = l + r;
  o[0](o, b, a);
}
function r1id(o, b, a) {
  o[1](o, b, a);
}
function eq(o, b, a) {
  o[(b[--a] === b[--a]) | 0](o, b, a);
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
  console.log(
    "nval:",
    b
      .slice(0, a)
      .map((a) => (a.name ? a.name : a))
      .join(" ")
  );
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
  Nval(o, b, Sexp(b, a, [0, la, [1, [8, 0x61, eq], ppp]]));
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
function eqa(o, b, a) {
  Nval(o, b, Args(b, a, [0x61, eq]));
}
function eqb(o, b, a) {
  Nval(o, b, Args(b, a, [0x62, eq]));
}
function eqc(o, b, a) {
  Nval(o, b, Args(b, a, [0x63, eq]));
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

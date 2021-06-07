const { sexp, Sexp, Nval, mb } = require("./sexp");
(function exam(o, b, a) {
  sexp(o, b, a, identifier);
})(logpith(), ["aboaboabo", 0], 2);
function shift(o, b, a) {
  const pos = b[--a];
  b[a++] = pos + 1;
  o[1](o, b, a);
}
function lookahead(o, b, a) {
  const pos = b[a - 1];
  const buf = b[a - 2];
  if (pos < buf.length) (b[a++] = buf.codePointAt(pos)), o[1](o, b, a);
  else o[0](o, b, a);
}
function isIdentifierInit(o, b, a) {
  const cp = b[--a];
  o[
    (cp < 65 //
      ? cp === 36
      : cp < 91
      ? true
      : cp < 97
      ? cp === 95
      : cp < 123) | 0
  ](o, b, a);
}
function isIdentifierNext(o, b, a) {
  const cp = b[--a];
  o[
    (cp < 48
      ? cp === 36
      : cp < 58
      ? true
      : cp < 65
      ? false
      : cp < 91
      ? true
      : cp < 97
      ? cp === 95
      : cp < 123) | 0
  ](o, b, a);
}
function identifier_init(o, b, a) {
  sexp(o, b, a, [1, lookahead, isIdentifierInit, shift]);
}
function identifier_next(o, b, a) {
  sexp(o, b, a, [1, lookahead, isIdentifierNext, shift]);
}
function identifier(o, b, a) {
  sexp(o, b, a, [1, identifier_init, [8, identifier_next, many]]);
}
function many(o, b, a) {
  const nar = b[--a];
  sexp(o, b, a, [0, [1, nar, [8, nar, many]], r1]);
}
//////////////////////////////////////////////////////////
function r0(o, b, a) {
  o[0](o, b, a);
}
function r1(o, b, a) {
  o[1](o, b, a);
}
function r2(o, b, a) {
  o[2](o, b, a);
}
function logpith() {
  return [
    function l0(o, b, a) {
      b.length = a;
      console.log(0, require("util").inspect(b, { colors: true, depth: 7 }));
    },
    function l1(o, b, a) {
      b.length = a;
      console.log(1, require("util").inspect(b, { colors: true, depth: 7 }));
    },
    function l2(o, b, a) {
      b.length = a;
      console.log(2, require("util").inspect(b, { colors: true, depth: 7 }));
    },
  ];
}

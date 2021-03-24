const { mb, A, S } = require("../show/cb3");

const button = (oo) => {
  const d = S();
  const l = S();
  A("b" + d + l), oo.log();
  A(l), oo.text();
  if (d) A(d - 1), counter(oo);
};

const counter = (oo) => {
  const d = S();
  A("c" + d), oo.log();
  A("+", d, "button", button), oo.element();
  A("-", d, "button", button), oo.element();
  A("0"), oo.text();
};
const oo = makepith((document.body = document.createElement("body")));
const ring = (oo) => {
  S()({
    ...oo,
    element() {
      A(S(), S(), ring), oo.element();
    },
    log() {
      console.log(S());
    },
  });
};
const run = (oo) => S()(oo);
A(2, counter, ring), run(oo);
function bark(oo) {
  const elm = S();
  const nar = S();
  nar({
    element,
    text,
    s: {
      childs_count: 0,
      elm,
    },
  });
}
function element() {
  const nar = S();
  const tag = S();
  const oo = this;
  const s = oo.s;
  const elm = s.elm;
  const index = s.childs_count++;
  const TAG = tag.toUpperCase();
  let n;
  //for (let i = index, l = elm.childNodes.length; i < l; i++)
  //  if ((n = elm.childNodes[i]) && n.nodeName === TAG) {
  //    if (index < i) elm.insertBefore(n, elm.childNodes[index]);
  //    n.oo.b(nar, ...args);
  //    return;
  //  }
  n = makepith(document.createElement(TAG));
  nar(n);
  elm.insertBefore(n.s.elm, elm.childNodes[index]);
}
function text() {
  const text = S();
  const oo = this;
  const s = oo.s;
  const elm = s.elm;
  const index = s.childs_count++;
  for (let i = index, l = elm.childNodes.length; i < l; i++)
    if (
      elm.childNodes[i].nodeType === 3 &&
      elm.childNodes[i].textContent === text
    ) {
      if (index < i) elm.insertBefore(elm.childNodes[i], elm.childNodes[index]);
      return;
    }
  elm.insertBefore(document.createTextNode(text), elm.childNodes[index]);
}
function mp(o, elm, nar) {
  //
}
function makepith(elm) {
  return (elm.oo = {
    element,
    text,
    s: {
      childs_count: 0,
      elm,
    },
  });
}
function eq(a, b) {
  return a === b
    ? true
    : a == null || b == null
    ? false
    : Array.isArray(a)
    ? Array.isArray(b) &&
      a.length === b.length &&
      a.every((v, i) => eq(v, b[i]))
    : a instanceof Date
    ? b instanceof Date && a.getTime() === b.getTime()
    : typeof a === "object"
    ? typeof b === "object" &&
      a.constructor === b.constructor &&
      Object.keys(a).length === Object.keys(b).length &&
      Object.keys(a).every((k) => eq(a[k], b[k]))
    : false;
}

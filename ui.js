const { mb, A, S } = require("./cb3");

const button = (o) => {
  const d = S();
  const l = S();
  A(l), o.text();
  if (d) A(d - 1), counter(o);
};

const counter = (o) => {
  const d = S();
  A("+", d, "button", button), o.element();
  A("-", d, "button", button), o.element();
  A("0"), o.text();
};
const o = makepith((document.body = document.createElement("body")));

const ring = (o) => {
  console.log("a");
  S()({
    ...o,
    element() {
      A(S(), S(), ring), o.element();
    },
  });
};
const run = (o) => S()(o);

A(2, counter), run(o);

function bark(o) {
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
  const o = this;
  const s = o.s;
  const elm = s.elm;
  const index = s.childs_count++;
  const TAG = tag.toUpperCase();
  let n;
  //for (let i = index, l = elm.childNodes.length; i < l; i++)
  //  if ((n = elm.childNodes[i]) && n.nodeName === TAG) {
  //    if (index < i) elm.insertBefore(n, elm.childNodes[index]);
  //    n.o.b(nar, ...args);
  //    return;
  //  }
  n = makepith(document.createElement(TAG));
  nar(n);
  elm.insertBefore(n.s.elm, elm.childNodes[index]);
}
function text() {
  const text = S();
  const o = this;
  const s = o.s;
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
function makepith(elm) {
  return (elm.o = {
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

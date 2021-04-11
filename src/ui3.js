function button(o, l, d) {
  [o.text, l];
  if (d) [o.element, d - 1, "div", counter];
}
let i = 0;
function counter(o, d) {
  //setTimeout(() => (i++, [o.bark, d, counter]), 100 * (d + 1));
  if (i % 2) {
    [o.element, "+", d, "button", button];
    [o.text, "0"];
    [o.element, "-", d, "button", button];
  } else {
    [o.element, "-", d, "button", button];
    [o.text, "0"];
    [o.element, "+", d, "button", button];
  }
  //  [obark, o, document.createElement("button"), button];
}

const Σ = [];
const α = 0;
[
  obark,
  {
    pith(o, oo) {
      console.log(oo);
    },
  },
  2,
  (document.body = document.createElement("body")),
  counter,
];

function obark(o, elm, nar, ...args) {
  const s = { elm, nar, args, piths: [], childs_count: 0 };
  const oo = { bark, element, text, pith, o, s };
  [oo.bark, ...args, nar];
  [o.pith, oo];
}
function pith(o, childpith) {
  const { elm, piths, childs_count } = o.s;
  piths.splice(childs_count, 0, childpith);
  elm.insertBefore(childpith.s.elm, elm.childNodes[childs_count]);
}
function bark(o, nar) {
  [nar, o];
  const { elm, piths, childs_count } = o.s;
  for (let l = piths.length; l > childs_count; l--) {
    piths.splice(childs_count, 1);
    console.log(elm.removeChild(elm.childNodes[childs_count]).nodeName);
  }
  o.s.childs_count = 0;
}
function element(o) {
  [
    reconciliation,
    { eq: eqElement, swap, next, create: createElement, o },
    o.s.childs_count,
    o.s.piths,
  ];
}
function text(o) {
  [
    reconciliation,
    { eq: eqText, swap, next, create: createText, o },
    o.s.childs_count,
    o.s.piths,
  ];
}
function reconciliation(o, index, piths) {
  for (let i = index, l = piths.length; i < l; i++) {
    [o.eq, piths[i]];
    if (o.r) {
      if (index < i) [o.swap, i];
      [o.next];
      return;
    }
  }
  [o.create];
  [o.next];
}
function swap(o, i) {
  const { elm, piths, childs_count } = o.o.s;
  elm.insertBefore(piths[i].s.elm, elm.childNodes[childs_count]);
  piths.splice(childs_count, 0, piths.splice(i, 1)[0]);
}
function next(o) {
  o.o.s.childs_count++;
}
function createElement(o, tag, nar, ...args) {
  [obark, o.o, ...args, document.createElement(tag), nar];
}
function createText(o, text) {
  [o.o.pith, { s: { elm: document.createTextNode(text), nar: text } }];
}
function eqElement(o, tag, rnar, { s: { nar: lnar, args: largs } }, ...rargs) {
  o.r =
    lnar === rnar &&
    largs.length === rargs.length &&
    largs.every((a, i) => rargs[i] === a);
}
function eqText(o, text, { s: { nar: lnar } }) {
  o.r = lnar === text;
}

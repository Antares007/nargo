function onclick(o, e, d, a) {
  console.log(d);
  //[o.setState, o.state + 1];
  i += d;
  [o.parent, a, counter];
}
function button(o, l, d) {
  [o.text, l];
  [o.on, l === "+" ? 1 : -1, d, "click", onclick];
  if (d) [o.element, d - 1, "div", counter];
}
let i = 0;
function counter(o, d) {
  //setTimeout(() => (i++, [o.bark, d, counter]), 500 * (d + 1));
  if (i % 2) {
    //if (o.state % 2) {
    [o.element, "+", d, "button", button];
    [o.element, "-", d, "button", button];
    //[o.text, o.state + ""];
    [o.text, i + ""];
  } else {
    [o.element, "-", d, "button", button];
    [o.element, "+", d, "button", button];
    //[o.text, o.state + ""];
    [o.text, i + ""];
  }
  //  [obark, o, document.createElement("button"), button];
}
const Σ = [];
const α = 0;
const o = {
  pith(o, oo) {
    console.log("o", oo);
  },
};
const rootelm = (document.body = document.createElement("body"));
//[obark, o, 0, 9, counter, rootelm, ring];
[obark, o, 0, rootelm, counter];

function ring(o, state, nar) {
  [
    nar,
    {
      ...o,
      bark: sbark,
      element: selement,
      on: son,
      state,
      setState,
      os: o,
      t: "S",
    },
  ];
}
function setState(o, ns) {
  o.state = ns;
}
function selement(o, tag, nar) {
  [o.os.element, o.state + 1, nar, tag, ring];
}
function sbark(o, nar) {
  [o.os.bark, o.state + 1, nar, ring];
}
function son(o, type, handler) {
  [o.os.on, o.state + 1, handler, type, ring];
}

function obark(o, elm, nar, ...args) {
  const s = {
    elm,
    nar,
    args,
    piths: [],
    childs_count: 0,
    listeners: [],
    listeners_count: 0,
    op: o,
  };
  const oo = { bark, element, text, on, pith, parent, s, t: "E" };
  [oo.bark, ...args, nar];
  [o.pith, oo];
}
function pith(o, childpith) {
  const { elm, piths, childs_count } = o.s;
  piths.splice(childs_count, 0, childpith);
  elm.insertBefore(childpith.s.elm, elm.childNodes[childs_count]);
}
function parent(o, nar) {
  [o.s.op.bark, nar];
}
function bark(o, nar) {
  [nar, o];
  const { elm, piths, childs_count } = o.s;
  for (let l = piths.length; l > childs_count; l--) {
    piths.splice(childs_count, 1);
    console.log(elm.removeChild(elm.childNodes[childs_count]).nodeName);
  }
  o.s.childs_count = 0;
  const { listeners, listeners_count } = o.s;
  for (let l = listeners.length; l > listeners_count; l--) {
    const li = listeners.splice(listeners_count, 1);
    elm.removeEventListener(li.type, li);
    console.log("rm listener");
  }
  o.s.listeners_count = 0;
}
function element(o) {
  [
    reconciliation,
    { eq: eqElement, swap, next, create: createElement, o },
    o.s.childs_count,
    o.s.piths,
  ];
}
function createElement(o, tag, nar, ...args) {
  [obark, o.o, ...args, document.createElement(tag), nar];
}
function eqElement(o, tag, rnar, { s: { nar: lnar, args: largs } }, ...rargs) {
  o.r =
    lnar === rnar &&
    largs.length === rargs.length &&
    largs.every((a, i) => rargs[i] === a);
}
function swap(o, i) {
  const { elm, piths, childs_count } = o.o.s;
  elm.insertBefore(piths[i].s.elm, elm.childNodes[childs_count]);
  piths.splice(childs_count, 0, piths.splice(i, 1)[0]);
}
function next(o) {
  o.o.s.childs_count++;
}

function text(o) {
  [
    reconciliation,
    { eq: eqText, swap, next, create: createText, o },
    o.s.childs_count,
    o.s.piths,
  ];
}
function createText(o, text) {
  [o.o.pith, { s: { elm: document.createTextNode(text), nar: text } }];
}
function eqText(o, text, { s: { nar: lnar } }) {
  o.r = lnar === text;
}

function on(o) {
  [
    reconciliation,
    { eq: eqL, swap: swapL, next: nextL, create: createL, o },
    o.s.listeners_count,
    o.s.listeners,
  ];
}
function createL(o, type, handler, ...args) {
  const { listeners, listeners_count, elm } = o.o.s;
  const listener = { o: o.o, args, type, handler, handleEvent };
  elm.addEventListener(type, listener);
  listeners.splice(listeners_count, 0, listener);
}
function eqL(o, type, handler, l, ...args) {
  o.r =
    l.type === type &&
    l.handler === handler &&
    l.args.length === args.length &&
    l.args.every((a, i) => args[i] === a);
}
function handleEvent(event) {
  const { o, handler, args } = this;
  [handler, o, event, ...args];
}
function nextL(o) {
  o.o.s.listeners_count++;
}
function swapL(o, i) {
  const { listeners, listeners_count } = o.o.s;
  listeners.splice(listeners_count, 0, listeners.splice(i, 1)[0]);
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

function onclick(o, event, delta, depth) {
  C(o.setState, { n: o.state.n + delta });
  i += delta;
  C(o.parent, depth, counter);
}
function button(o, label, depth) {
  C(o.text, label);
  C(o.on, label === "+" ? 1 : -1, depth, "click", onclick);
  if (depth) C(o.selement, depth - 1, "div", counter, label, initstate);
}
let i = 0;
function counter(o, depth) {
  if (1) {
    C(o.element, "+", depth, "button", button);
    C(o.element, "-", depth, "button", button);
    C(o.text, o.state.n + "");
  } else {
    C(o.element, "-", depth, "button", button);
    C(o.element, "+", depth, "button", button);
    C(o.text, o.state.n + "");
  }
}

const Σ = [];
const α = 0;
const initstate = { n: 0 };
const o = {
  pith(o, oo) {
    console.log("o", oo);
  },
  setState(o, s) {
    o.state = s;
    console.log("S", s);
  },
  state: initstate,
};
const rootelm = (document.body = document.createElement("body"));
C(Sbark, o, 0, rootelm, counter);

function Sbark(o_bs, elm, nar) {
  C(obark, o_bs, o_bs, o_bs.state, void 0, setState, nar, elm, ring);
}
function ring(o_b, o_bs, state, key, setState, nar) {
  C(nar, {
    bark: sbark,
    parent: sparent,
    element: selement,
    selement: sselement,
    text: stext,
    on: son,
    state,
    setState,
    key,
    o_bs,
    o_b,
  });
}
function setState(o_bs, ns) {
  o_bs.state = ns;
  C(o_bs.o_bs.setState, { ...o_bs.o_bs.state, ...ns });
}
function setKeyState(o_bs, ns) {
  o_bs.state = ns;
  C(o_bs.o_bs.setState, { ...o_bs.o_bs.state, [o_bs.key]: ns });
}
function sselement(o_bs, tag, nar, key, init) {
  const state = o_bs.state[key] || init;
  C(o_bs.o_b.element, o_bs, state, key, setKeyState, nar, tag, ring);
}
function selement(o_bs, tag, nar) {
  C(o_bs.o_b.element, o_bs, o_bs.state, void 0, setState, nar, tag, ring);
}
function sbark(o_bs, nar) {
  C(o_bs.o_b.bark, o_bs, o_bs.state, void 0, setState, nar, ring);
}
function sparent(o_bs, nar) {
  C(o_bs.o_b.parent, o_bs.o_bs, o_bs.o_bs.state, void 0, setState, nar, ring);
}
function son(o_bs, type, handler) {
  C(o_bs.o_b.on, o_bs, o_bs.state, void 0, setState, handler, type, ring);
}
function stext(o_bs) {
  C(o_bs.o_b.text);
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
  };
  const oo = { bark, parent, element, text, on, pith, o, s };
  C(oo.bark, ...args, nar);
  C(o.pith, oo);
}

function pith(o, childpith) {
  const { elm, piths, childs_count } = o.s;
  piths.splice(childs_count, 0, childpith);
  elm.insertBefore(childpith.s.elm, elm.childNodes[childs_count]);
}

function parent(o, nar) {
  C(o.o.bark, nar);
}

function empty() {}
function bark(o, nar) {
  C(nar, o);
  const { elm, piths, childs_count } = o.s;

  for (let l = piths.length; l > childs_count; l--) {
    const p = piths.splice(childs_count, 1)[0];
    p.bark && C(p.bark, empty);
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
  C(
    reconciliation,
    {
      eq: eqElement,
      swap,
      next,
      create: createElement,
      o,
    },
    o.s.childs_count,
    o.s.piths
  );
}

function createElement(o, tag, nar, ...args) {
  C(obark, o.o, ...args, document.createElement(tag), nar);
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
  C(
    reconciliation,
    {
      eq: eqText,
      swap,
      next,
      create: createText,
      o,
    },
    o.s.childs_count,
    o.s.piths
  );
}

function createText(o, text) {
  C(o.o.pith, {
    s: {
      elm: document.createTextNode(text),
      nar: text,
    },
  });
}

function eqText(o, text, { s: { nar: lnar } }) {
  o.r = lnar === text;
}

function on(o) {
  C(
    reconciliation,
    {
      eq: eqL,
      swap: swapL,
      next: nextL,
      create: createL,
      o,
    },
    o.s.listeners_count,
    o.s.listeners
  );
}

function createL(o, type, handler, ...args) {
  const { listeners, listeners_count, elm } = o.o.s;
  const listener = {
    o: o.o,
    args,
    type,
    handler,
    handleEvent,
  };
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
  C(handler, o, event, ...args);
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
    C(o.eq, piths[i]);

    if (o.r) {
      if (index < i) C(o.swap, i);
      C(o.next);
      return;
    }
  }

  C(o.create);
  C(o.next);
}

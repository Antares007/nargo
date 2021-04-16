function onclick(o, event, delta, depth) {
  C(o.setState, { n: o.state.n + delta });
  i += delta;
  C(o.parent, depth, counter);
}
function button(o, label, depth) {
  //  console.log(depth);
  C(o.text, label);
  C(o.on, label === "+" ? 1 : -1, depth, "click", onclick);
  if (depth) C(o.skelement, depth - 1, "div", counter, label, initstate);
}
let i = 0;
function counter(o, depth) {
  C(o.selement, "+", depth, "button", button);
  C(o.selement, "-", depth, "button", button);
  C(o.text, o.state.n + "");
}

const Σ = [];
const α = 0;
const Σ1 = [];
const α1 = 0;
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
C(Sbark, o, 1, rootelm, counter);

function Sbark(o, elm, nar) {
  const o_bs = o;
  C(obark, o_bs, void 0, nar, elm, ring)(o_bs, o_bs.state, setState);
}
function ring(o, [key, nar], [o_bs, state, setState]) {
  const o_b = o;
  C(nar, {
    bark: sbark,
    parent: sparent,
    element: selement,
    selement: sselement,
    skelement: skelement,
    text: stext,
    on: son,
    state,
    setState,
    key,
    o_bs,
    o_b,
  });
}
function setState(o, ns) {
  const o_bs = o;
  o_bs.state = ns;
  C(o_bs.o_bs.setState, { ...o_bs.o_bs.state, ...ns });
}
function setKeyState(o, ns) {
  const o_bs = o;
  o_bs.state = ns;
  C(o_bs.o_bs.setState, { ...o_bs.o_bs.state, [o_bs.key]: ns });
}
function skelement(o, tag, nar, key, init) {
  const o_bs = o;
  const state = o_bs.state[key] || init;
  C(o_bs.o_b.element, key, nar, tag, ring)(o_bs, state, setKeyState);
}
function selement(o) {
  const o_bs = o;
  C(o_bs.o_b.element);
}
function sselement(o, tag, nar) {
  const o_bs = o;
  C(o_bs.o_b.element, void 0, nar, tag, ring)(o_bs, o_bs.state, setState);
}
function sbark(o, nar) {
  const o_bs = o;
  C(o_bs.o_b.bark, void 0, nar, ring)(o_bs, o_bs.state, setState);
}
function sparent(o, nar) {
  const o_bs = o;
  C(o_bs.o_b.parent, void 0, nar, ring)(o_bs.o_bs, o_bs.o_bs.state, setState);
}
function son(o, type, handler) {
  const o_bs = o;
  C(o_bs.o_b.on, void 0, handler, type, ring)(o_bs, o_bs.state, setState);
}
function stext(o) {
  const o_bs = o;
  C(o_bs.o_b.text);
}
//*************************
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
    if (p.bark) {
      //console.group(p.s.nar.name);
      //console.log(p.s.args);
      C(p.bark, empty);
      //console.groupEnd(p.s.nar.name);
    }
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
      found: foundE,
      next,
      create: createElement,
      o,
    },
    o.s.childs_count,
    o.s.piths
  );
}
function foundE(o) {
  debugger;
}

function createElement(o, tag, nar, ...args) {
  C(obark, o.o, ...args, document.createElement(tag), nar);
}

function eqElement(o, tag, rnar, { s: { nar: lnar, args: largs } }, ...rargs) {
  o.r = lnar === rnar && eq(largs, rargs);
  //largs.length === rargs.length &&
  //largs.every((a, i) => rargs[i] === a);
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
      found: foundT,
      next,
      create: createText,
      o,
    },
    o.s.childs_count,
    o.s.piths
  );
}
function foundT(o) {
  debugger;
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
      found: foundL,
      next: nextL,
      create: createL,
      o,
    },
    o.s.listeners_count,
    o.s.listeners
  );
}
function foundL(o) {
  debugger;
}

function createL(o, [type, handler, ...args], [...bargs]) {
  const { listeners, listeners_count, elm } = o.o.s;
  const listener = {
    o: o.o,
    args,
    bargs,
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
  const { o, handler, args, bargs } = this;
  C(handler, o, event, ...args)(...bargs);
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
      else C(o.found, i);
      C(o.next);
      return;
    }
  }
  C(o.create);
  C(o.next);
}
function eq(a, b) {
  if (a === b) return true;
  if (Array.isArray(a)) {
    if (Array.isArray(b) && a.length === b.length) {
      for (let i = 0, l = a.length; i < l; i++)
        if (!eq(a[i], b[i])) return false;
      return true;
    }
    return false;
  }
  if (a instanceof Date)
    return b instanceof Date && a.getTime() === b.getTime();
  if (a == null || b == null) return a == b;
  if (typeof a === "object" && typeof b === "object") {
    const akeys = Object.keys(a);
    if (akeys.length === Object.keys(b).length) {
      for (let i = 0, l = akeys.length; i < l; i++)
        if (!eq(a[akeys[i]], b[akeys[i]])) return false;
      return true;
    }
  }
  return false;
}

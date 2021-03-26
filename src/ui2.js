const { mb } = require("./mbo");
const emptyobject = {};
const o = makepith((document.body = document.createElement("body")));
ring(o, 1, counter), end(o);
ring(o, 0, counter), end(o);

function ring(o, s, nar) {
  const args = Σ.slice(0, α);
  nar(o, s);
}
Object.assign(window, { test, o, end });
function test(o, s) {
  for (let i = s; i < s + 5; i++) {
    o.element("i" + i, "button", btn);
  }
}
function btn(o, label) {
  o.text(label);
}
function onclick(o, e) {}
function button(o, label, depth) {
  o.text(label);
  if (depth) counter(o, depth - 1);
}
function counter(o, depth) {
  o.on("click", onclick);
  o.element("+", depth, "button", button);
  o.element("-", depth, "button", button);
  o.text("0");
}

function element(o, tag, nar) {
  const elm = o.s.elm;
  const index = o.s.childs_count++;
  const TAG = tag.toUpperCase();
  const args = global.Σ.slice(0, α);
  let n;
  for (let i = index, l = elm.childNodes.length; i < l; i++)
    if (
      (n = elm.childNodes[i]) &&
      n.nodeName === TAG &&
      (!n.o || (n.o.s.nar === nar && n.o.s.args.every((a, i) => a === args[i])))
    ) {
      if (index < i) elm.insertBefore(n, elm.childNodes[index]);
      return;
    }
  {
    const o = makepith(document.createElement(TAG));
    nar(o), (o.s.nar = nar), (o.s.args = args), end(o);
    elm.insertBefore(o.s.elm, elm.childNodes[index]);
  }
}
function text(o, text) {
  const elm = o.s.elm;
  const index = o.s.childs_count++;
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
function end(o) {
  const elm = o.s.elm;
  for (let l = elm.childNodes.length; l > o.s.childs_count; l--) {
    const cld = elm.childNodes[o.s.childs_count];
    elm.removeChild(cld);
    if (cld.o) end(cld.o);
  }
  o.s.childs_count = 0;

  const oldlisteners = o.s.listeners.splice(
    o.s.listeners_count,
    o.s.listeners.length - o.s.listeners_count
  );
  o.s.listeners_count = 0;
  for (let ol of oldlisteners)
    elm.removeEventListener(
      ol.args[ol.args.length - 3],
      ol,
      ol.args[ol.args.length - 1]
    ),
      console.log("rm", ol);
}

function handleEvent(event) {
  const listener = this;
  if (α !== 0) console.error("α", α);
  for (let i = 0; i < listener.args - 3; i++) Σ[i] = listener.args[i];
  listener.args[listener.args.length - 2](listener.o, listener.args - 3);
}

function on(o) {
  const args = Σ.slice(0, α);
  if (typeof args[args.length - 1] === "function") args.push(emptyobject);
  const index = o.s.listeners_count++;
  const listeners = o.s.listeners;
  for (let i = index, l = listeners.length; i < l; i++)
    if (eq(listeners[i].args, args)) {
      if (index < i) listeners.splice(index, 0, ...listeners.splice(i, 1));
      return;
    }
  const listener = { o, args, handleEvent };
  o.s.elm.addEventListener(
    args[args.length - 3],
    listener,
    args[args.length - 1]
  );
  listeners.splice(index, 0, listener);
}
function makepith(elm) {
  return (elm.o = {
    element,
    text,
    on,
    s: {
      listeners: [],
      listeners_count: 0,
      childs_count: 0,
      elm,
      nar: null,
      args: [],
    },
  });
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
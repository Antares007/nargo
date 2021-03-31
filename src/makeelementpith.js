console.log("a");
const { mb, o } = require("./mbo");
attach(o, 1, document.body, counter);
attach(o, 0, document.body, counter);
function button(o, label, depth) {
  o.text(label);
  if (depth) o.element(depth - 1, "div", counter);
}
function counter(o, depth) {
  o.element("+", depth, "button", button);
  o.element("-", depth, "button", button);
  o.text("1");
}
function attach(o, elm, nar, ...args) {
  const pith = {
    ...o,
    v,
    element,
    text,
    s: { elm, args, nar, piths: [] },
  };
  nar(pith, ...args);
  pith.element = null;
  pith.text = null;
  for (let l = elm.childNodes.length; l > pith.s.piths.length; l--)
    elm.removeChild(elm.childNodes[pith.s.piths.length]);
  o.v(pith);
}
function v(o, pith) {
  o.s.piths.push(pith);
}
function element(o, tag, nar, ...args) {
  const n = o.s.elm.childNodes[o.s.piths.length];
  const child =
    n == null || n.nodeName !== tag.toUpperCase()
      ? o.s.elm.insertBefore(document.createElement(tag), n)
      : n;
  attach(o, ...args, child, nar);
}
function text(o, text) {
  const n = o.s.elm.childNodes[o.s.piths.length];
  if (n == null || n.nodeType !== 3 || n.textContent !== text)
    o.s.elm.insertBefore(document.createTextNode(text), n);
  o.v();
}

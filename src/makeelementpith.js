console.log("a");
const { mb, o } = require("./mbo");
mb(o, 2, document.body, div_counter, makeElementPith, (o) => o.v());
debugger;
mb(o, 1, document.body, div_counter, makeElementPith, (o) => o.v());
function button(o, label, depth) {
  o.text(label);
  if (depth) o.element(depth - 1, div_counter);
}
function div_counter(o, depth) {
  o.element("+", depth, button);
  o.element("-", depth, button);
  o.text("1");
}
function makeElementPith(o) {
  mb(o, parseselector, makeElementPith_);
}
function makeElementPith_(o, elm, nar, tag, classList, id, ...args) {
  const piths = [];
  const pith = {
    ...o,
    v: vRay,
    element: makeChildElementRay,
    text: makeChildTextRay,
    s: { elm, tag, classList, id, args, nar, piths },
  };
  elm.classList.add(...classList);
  nar(pith, ...args);

  pith.element = element;
  pith.text = text;
  for (let l = elm.childNodes.length; l > piths.length; l--)
    elm.removeChild(elm.childNodes[piths.length]);
  o.v(pith);
}
function vRay(o, pith) {
  o.s.piths.push(pith);
}
function makeChildElementRay(o) {
  mb(o, parseselector, makeChildElementRay_);
}
function makeChildElementRay_(o, nar, tag, classList, id) {
  const n = o.s.elm.childNodes[o.s.piths.length];
  const child =
    n == null || n.nodeName !== tag.toUpperCase()
      ? o.s.elm.insertBefore(document.createElement(tag), n)
      : n;
  makeElementPith_(o, child, nar, tag, classList, id);
}
function makeChildTextRay(o, text) {
  const n = o.s.elm.childNodes[o.s.piths.length];
  if (n == null || n.nodeType !== 3 || n.textContent !== text)
    o.s.elm.insertBefore(document.createTextNode(text), n);
  o.v(text);
}
function element(o, tag, nar, ...args) {
  const elm = o.s.elm;
  const index = o.s.childs_count++;
  const TAG = tag.toUpperCase();
  const l = elm.childNodes.length;
  let n = 0;
  let c = 0;
  for (let i = index; i < l; i++) {
    if (elm.childNodes[i].nodeName !== TAG) continue;
    if (n < 1) (n = 1), (c = i);
    if (elm.childNodes[i].o == null) break;
    if (elm.childNodes[i].o.s.nar !== nar) continue;
    if (n < 2) (n = 2), (c = i);
    if (elm.childNodes[i].o.s.args.some((a, i) => a !== args[i]));
    (n = 3), (c = i);
    break;
  }
  {
    let o;
    if (n) {
      if (index < c) elm.insertBefore(elm.childNodes[c], elm.childNodes[index]);
      if (n === 3) return;
      o = elm.childNodes[index].o;
    } else {
      o = makepith(document.createElement(TAG));
      elm.insertBefore(o.s.elm, elm.childNodes[index]);
    }
    nar(o, ...args), (o.s.nar = nar), (o.s.args = args), end(o);
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
function parseselector(o, nar) {
  const classList = [];
  const sel = nar.name;
  const l = sel.length;
  var tag = "";
  var i = 0;
  var id;
  var tmp;
  while (i < l && sel[i] !== "_" && sel[i] !== "$") tag += sel[i++];
  tag = tag.length ? tag.toUpperCase() : "DIV";
  while (i < l) {
    tmp = "";
    if (sel[i] === "_") {
      while (++i < l && sel[i] !== "_" && sel[i] !== "$") tmp += sel[i];
      if (tmp.length) classList.push(tmp);
    } else if (sel[i] === "$") {
      while (++i < l && sel[i] !== "_" && sel[i] !== "$") tmp += sel[i];
      if (tmp.length) id = tmp;
    }
  }
  o.v(nar, tag, classList, id);
}

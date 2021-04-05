const { mb, o } = require("./mbo");
function endring(o, nar) {
  nar({
    ...o,
    element({ o }, tag, nar) {
      o.element(nar, tag, endring);
    },
    o,
  }),
    o.end();
}
function ring(o, nar) {
  nar({
    ...o,
    element(o, tag, nar) {
      const op = o;
      {
        const o = op.o;
        o.element(nar, tag, ring);
      }
    },
    text({ o }, text) {
      o.text(text);
    },
    end({ o }) {
      o.end();
    },
    o,
  });
}
makeElementPith(o, 1, document.body, div_counter);

function button(o, label, depth) {
  o.text(label);
  if (depth) o.element(depth - 1, "div", div_counter);
}
function div_counter(o, depth) {
  //if (!window.a)
  //  setTimeout(() => {
  //    debugger;
  //    endring(o, 2, div_counter);
  //  }, 2000);
  //window.a = 1;
  o.element("+", depth, "button", button);
  o.element("-", depth, "button", button);
  o.text(depth + "");
}
function makeElementPith(o, elm, nar, ...args) {
  const pith = {
    ...o,
    v: vRay,
    element: makeChildElementRay,
    text: makeChildTextRay,
    end: endray,
    s: { elm, args, nar, piths: [], childs_count: 0 },
  };
  nar(pith, ...args);
  pith.element = element;
  pith.text = text;
  o.v(pith);
}
function endray(o) {
  for (let l = o.s.elm.childNodes.length; l > o.s.childs_count; l--)
    o.s.elm.removeChild(o.s.elm.childNodes[o.s.childs_count]);
  o.s.childs_count = 0;
}
function vRay(o, pith) {
  o.s.piths.splice(o.s.childs_count++, 0, pith);
}
function makeChildElementRay(o, tag, nar) {
  const n = o.s.elm.childNodes[o.s.childs_count];
  const child =
    n == null || n.nodeName !== tag.toUpperCase()
      ? o.s.elm.insertBefore(document.createElement(tag), n)
      : n;
  makeElementPith(o, child, nar);
}
function makeChildTextRay(o, text) {
  const n = o.s.elm.childNodes[o.s.childs_count];
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

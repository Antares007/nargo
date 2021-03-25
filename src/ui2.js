const { mb } = require("./mbo");
const o = makepith((document.body = document.createElement("body")));
element(o, "+", "button", btn);
end(o);
element(o, "-", "button", btn);
end(o);
element(o, "*", "button", btn);
end(o);
function btn(o, label) {
  o.text(label);
}
function button(o, label, depth) {
  o.text(label);
  if (depth) counter(o, depth - 1);
}
function counter(o, depth) {
  o.element("+", depth, "button", button);
  o.element("-", depth, "button", button);
  o.text("0");
}

function element(o, tag, nar) {
  const elm = o.s.elm;
  const index = o.s.childs_count++;
  const TAG = tag.toUpperCase();
  {
    const head = global.Σ.slice(0, α);
    let o;
    //for (let i = index, l = elm.childNodes.length; i < l; i++)
    //  if ((n = elm.childNodes[i]) && n.nodeName === TAG) {
    //    if (index < i) elm.insertBefore(n, elm.childNodes[index]);
    //    n.oo.b(nar, ...args);
    //    return;
    //  }
    o = makepith(document.createElement(TAG));
    nar(o), end(o);
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
  for (let l = elm.childNodes.length; l > o.s.childs_count; l--)
    elm.removeChild(elm.childNodes[o.s.childs_count]);
  o.s.childs_count = 0;
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

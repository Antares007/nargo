function button(o) {
  [o.text, "+"];
}
function counter(o) {
  [o.element, "button", button];
  [o.text, "0"];
}

const Σ = [];
const α = 0;
const o = makeElementPith((document.body = document.createElement("body")));
[o.bark, counter];

function makeElementPith(elm, o) {
  return {
    bark,
    element,
    text,
    o,
    s: {
      elm,
      piths: [],
      childs_count: 0,
    },
  };
}

function bark(o, nar) {
  [nar, o];
  const elm = o.s.elm;
  const piths = o.s.piths;

  for (let l = piths.length; l > o.s.childs_count; l--) {
    piths.splice(o.s.childs_count, 1);
    console.log(elm.removeChild(o.s.elm.childNodes[o.s.childs_count]).nodeName);
  }

  o.s.childs_count = 0;
}

function element(o, tag, nar) {
  const elm = o.s.elm;
  const index = o.s.childs_count++;
  const n = document.createElement(tag);
  const oo = makeElementPith(n, o);
  [oo.bark, nar];
  elm.insertBefore(n, elm.childNodes[index]);
  o.s.piths.splice(index, 0, oo);
}

function text(o, text) {
  const elm = o.s.elm;
  const index = o.s.childs_count++;
  const n = document.createTextNode(text);
  elm.insertBefore(n, elm.childNodes[index]);
  o.s.piths.splice(index, 0, text);
}

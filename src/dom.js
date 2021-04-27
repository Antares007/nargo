const { mb0, mb1 } = require("../mb");
function example0(o) {
  C(o[0], 1, 2, 3);
  C(mb0, o, document.body, npith, (o, np) => {
    console.log("np", np);
    C(mb0, np, document.createTextNode("hello"), npith, (o) => C(o[1]));
    C(np[2]);
  });
}
example0(
  pith({}, (o, ...args) => console.log(args)),
  [],
  0,
  [],
  0
);
function pith(...args) {
  args.length = 8;
  const s = args.shift();
  args[7] = s;
  return args;
}
function npith(o, node) {
  if (node.nodeType === 1) {
    const piths = [];
    const f = (o, p) => piths.push(p);
    const oc = [f];
    for (let n of node.childNodes) C(npith, oc, n);
    C(o[0], pith({ node, piths, childs_count: 0 }, nstart, nnode, nend));
  } else {
    node =
      node.nodeType === 3
        ? node
        : document.createTextNode("NT:" + node.nodeType);
    C(o[0], pith({ node }, nstart, void 0, nend));
  }
}
function nnode(o, np) {
  const i = o[7].piths.indexOf(np);
  if (i < 0);
  else if (i < o[7].childs_count) return;
  else if (i === o[7].childs_count) {
    o[7].childs_count++;
    return;
  } else o[7].piths.splice(i, 1)[0];
  o[7].node.insertBefore(np[7].node, o[7].node.childNodes[o[7].childs_count]);
  o[7].piths.splice(o[7].childs_count, 0, np);
  o[7].childs_count++;
}
function nend(o) {
  if (o[7].piths) {
    for (let l = o[7].piths.length; l > o[7].childs_count; l--) {
      const np = o[7].piths.splice(o[7].childs_count, 1)[0];
      o[7].node.removeChild(np[7].node);
      C(np[2]);
    }
    o[7].childs_count = 0;
  }
}
function mbf(f) {
  return (o, a) => {
    if (typeof a === "function") {
      const p = [(o) => C(o[1], o[2]), f, o];
      C(a, p);
    } else C(f, o, a);
  };
}
function nstart(o) {}

function start(o, oc, type, nar, ...args) {
  const listener = { handleEvent, end, type, nar, args, o };
  o[7].node.addEventListener(type, listener);
  C(oc.start, listener);
}
function handleEvent(e) {
  this.nar(this.o, [...this.args, e], this.args.length + 1, [], 0);
}
function end(o) {
  console.log("removeEventListener", o[7].node.nodeName);
  o[7].node.removeEventListener(o.type, o);
}
function insertBefore(o) {
  console.log("insertBefore", o);
}
function example(o) {
  C(o.r, "hey");
  const on = npith(document.body);
  const oc = {
    ds: new Set(),
    start(o, d) {
      o.ds.add(d);
      console.log("D", d);
    },
    end(o) {
      for (let d of o.ds) C(d.end);
      o.ds.clear();
    },
  };
  C(on.start, oc, "mousemove", (o, e) => {
    console.log(e.x, e.y);
  });
  C(on.start, oc, "click", (o, e) => {
    console.log("click");
    C(oc.end);
  });
}
//example(lr_pith(), [], 0, [], 0);

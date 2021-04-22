const { lr_pith, mbr, mbl } = require("./mblr");

function npith(node) {
  if (node.childNodes && typeof node.childNodes.length === "number") {
    const piths = [];
    for (let n of node.childNodes) piths.push(n);
    return { start, insertBefore, node, piths };
  } else {
    return { node };
  }
}
function handleEvent(e) {
  this.nar(this.o, [...this.args, e], this.args.length + 1, [], 0);
}
function end(o) {
  console.log("removeEventListener", o);
  o.o.node.removeEventListener(o.type, o);
}
function start(o, oc, type, nar, ...args) {
  const listener = { handleEvent, end, type, nar, args, o };
  o.node.addEventListener(type, listener);
  C(oc.start, listener);
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

example(lr_pith(), [], 0, [], 0);

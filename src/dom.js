const { mb0, mb1 } = require("../mb");
const example0 = (o) => {
  C(o[0], 1, 2, 3);
  C(mb0, o, document.body, npith, (o, np) => {
    console.log("np", np);
    C(mb0, np, document.createTextNode("hello"), npith, (o) => C(o[1]));
    C(np[1], document.createTextNode("there"), npith);
    C(np[2]);
  });
};
setTimeout(() => {
  example0(
    pith({}, (o, ...args) => console.log(args)),
    [],
    0,
    [],
    0
  );
}, 0);
const npith = (o, node) => {
  if (node.nodeType === 1) {
    const piths = [];
    const f = (o, p) => piths.push(p);
    const oc = [f];
    for (let n of node.childNodes) C(npith, oc, n);
    C(o[0], pith({ node, piths, pc: 0, fmap: {} }, nstart, mbn(nnode), nend));
  } else {
    node =
      node.nodeType === 3
        ? node
        : document.createTextNode("NT:" + node.nodeType);
    C(o[0], pith({ node }, nstart, void 0, nend));
  }
};
const handleEvent = (e) => {
  for (let i = 0, l = Math.max(this.pc, this.piths.length); i < l; i++)
    this.piths[i][1](
      this.piths[i],
      [...this.args, e],
      this.args.length + 1,
      [],
      0
    );
};
const nstart = (o, oc, type, ...args) => {
  if (type === "listenerlisten") {
  } else {
    if (o[7].fmap[type] == null) {
      const ol = pith(
        { type, handleEvent, piths: [oc], pc: 1, args, ol, o },
        void 0,
        void 0,
        lend
      );
      o[7].fmap[type] = ol;
      o[7].node.addEventListener(type, ol[7]);
      C(oc[0], ol, "listenerlisten");
    } else {
      const ol = o[7].fmap[type];
      const i = ol[7].piths.indexOf(oc);
      if (i < 0);
      else if (i < ol[7].pc) return;
      else if (i === ol[7].pc) {
        ol[7].pc++;
        return;
      } else ol[7].piths.splice(i, 1);
      ol[7].piths.splice(ol[7].pc, 0, oc);
      ol[7].pc++;
      C(oc[0], ol, "listenerlisten");
    }
  }
};
// o: ol
const lend = (o, oc) => {
  const ol = o;
  const i = ol[7].piths.indexOf(oc);
  if (i < -1) return;
  ol[7].piths.splice(i, 1);
  if (ol[7].piths.length === 0 && ol[7].o[7].fmap[ol[7].type])
    ol[7].o[7].node.removeEventListener(ol[7].type, ol[7]),
      delete ol[7].o[7].fmap[ol[7].type];
};
const nend = (o) => {
  if (o[7].piths) {
    for (let l = o[7].piths.length; l > o[7].pc; l--) {
      const np = o[7].piths.splice(o[7].pc, 1)[0];
      o[7].node.removeChild(np[7].node);
      C(np[2]);
    }
    o[7].pc = 0;
  }
  //for (let type of Object.keys(o[7].fmap)) {
  //  const listener = o[7].fmap[type];
  //  for (let oc of listener.piths) C(oc[2], listener);
  //}
};
const nnode = (o, np) => {
  const i = o[7].piths.indexOf(np);
  if (i < 0);
  else if (i < o[7].pc) return;
  else if (i === o[7].pc) {
    o[7].pc++;
    return;
  } else o[7].piths.splice(i, 1);
  o[7].node.insertBefore(np[7].node, o[7].node.childNodes[o[7].pc]);
  o[7].piths.splice(o[7].pc, 0, np);
  o[7].pc++;
};
const pith = (...args) => {
  args.length = 8;
  const s = args.shift();
  args[7] = s;
  return args;
};
const mbn = (nar) => (o, a) => {
  if (typeof a === "function") {
    C(mb0, o, a, nar);
  } else C(nar, o, a);
};

function start(o, oc, type, nar, ...args) {
  const listener = { handleEvent, end, type, nar, args, o };
  o[7].node.addEventListener(type, listener);
  C(oc.start, listener);
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

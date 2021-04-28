const { mb0, mb1 } = require("../mb");
const r0 = (o) => C(o[0]);
const example0 = (o) => {
  C(o[0], 1, 2, 3);
  C(mb0, o, document.body, npith, (o, np) => {
    console.log("np", np);

    C(mb1, np, "argument", np, "click", r0, (np, ...args) => {
      console.log(args);
    });

    C(mb0, np, document.createTextNode("hello"), npith, (o) => C(o[1]));
    C(np[1], document.createTextNode("there"), npith);

    C(np[2]);
  });
};
setTimeout(() => {
  example0([(o, ...args) => console.log(args), , {}], [], 0, [], 0);
}, 0);
const npith = (o, node) => {
  if (node.nodeType === 1) {
    const piths = [];
    const opushpith = [(o, p) => piths.push(p)];
    for (let n of node.childNodes) C(npith, opushpith, n);
    C(o[0], [
      start,
      mbn(next),
      end,
      { node, piths, pc: 0, fmap: {}, olset: new Set() },
    ]);
  } else {
    node =
      node.nodeType === 3
        ? node
        : document.createTextNode("NT:" + node.nodeType);
    C(o[0], [start, void 0, end, { node }]);
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
const start = (o, oc, type, ...args) => {
  console.log(oc, type, args);
  return;
  if (type === null) {
    const ol = oc;
    o[3].olset.add(ol);
  } else {
    if (o[3].fmap[type] == null) {
      const ol = [
        (o) => C(o[3].o[0]),
        (o) => C(o[3].o[1]),
        (o) => C(o[3].o[2]),
        { type, handleEvent, piths: [oc], pc: 1, args, ol, o },
      ];
      o[3].fmap[type] = ol;
      o[3].node.addEventListener(type, ol[3]);
      C(oc[0], ol, null);
    } else {
      const ol = o[3].fmap[type];
      const i = ol[3].piths.indexOf(oc);
      if (i < 0);
      else if (i < ol[3].pc) return;
      else if (i === ol[3].pc) {
        ol[3].pc++;
        return;
      } else ol[3].piths.splice(i, 1);
      ol[3].piths.splice(ol[3].pc, 0, oc);
      ol[3].pc++;
      C(oc[0], ol, null);
    }
  }
};
// o: ol
const lend = (o, oc) => {
  const ol = o;
  const i = ol[3].piths.indexOf(oc);
  if (i < -1) return;
  ol[3].piths.splice(i, 1);
  if (ol[3].piths.length === 0 && ol[3].o[3].fmap[ol[3].type])
    ol[3].o[3].node.removeEventListener(ol[3].type, ol[3]),
      delete ol[3].o[3].fmap[ol[3].type];
};
const end = (o, type) => {
  if (type === null) {
  } else {
  }
  if (o[3].piths == null) return;
  for (let l = o[3].piths.length; l > o[3].pc; l--) {
    const np = o[3].piths.splice(o[3].pc, 1)[0];
    o[3].node.removeChild(np[3].node);
    C(np[2]);
  }
  o[3].pc = 0;
  for (let type of Object.keys(o[3].fmap)) {
    const ol = o[3].fmap[type];
    for (let l = ol[3].piths.length; l > ol[3].pc; l--) {
      const oc = ol[3].piths.splice(ol[3].pc, 1)[0];
      C(oc[2], ol);
    }
    ol[3].pc = 0;
  }
};
const next = (o, np) => {
  const i = o[3].piths.indexOf(np);
  if (i < 0);
  else if (i < o[3].pc) return;
  else if (i === o[3].pc) {
    o[3].pc++;
    return;
  } else o[3].piths.splice(i, 1);
  o[3].node.insertBefore(np[3].node, o[3].node.childNodes[o[3].pc]);
  o[3].piths.splice(o[3].pc, 0, np);
  o[3].pc++;
};
const mbn = (nar) => (o, a) => {
  if (typeof a === "function") {
    C(mb0, o, a, nar);
  } else C(nar, o, a);
};

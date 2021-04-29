const { mb0, mb1 } = require("../mb");
const C30 = (o) => C(o[3][0]);
const C31 = (o) => C(o[3][1]);
const C32 = (o) => C(o[3][2]);
const example0 = (o) => {
  C(o[0], 1, 2, 3);
  C(mb0, o, document.body, npith, (o, np) => {
    C(
      np[0],
      "argument",
      [
        C30,
        C31,
        C32,
        [
          C30,
          (o, ...args) => {
            C(o[3][1], ...args, document.createTextNode("A"), npith);
          },
          C32,
          np,
        ],
      ],
      "click"
    );
    C(mb0, np, document.createTextNode("hello"), npith, (o) => C(o[1]));
    C(np[1], document.createTextNode("there"), npith);

    C(np[2]);
  });
};
setTimeout(() => {
  example0([(o, ...args) => console.log(args), , {}], [], 0, [], 0);
}, 0);
function npith(o, node) {
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
}
function handleEvent(e) {
  for (let i = 0, l = this.piths.length; i < l; i++)
    this.piths[i][1](this.piths[i], [...this.args, e], this.args.length + 1);
}
function start(o, oc, type, ...args) {
  if (type === "listenerlisten") {
    console.log("listen", oc);
  } else {
    if (o[3].fmap[type] == null) {
      const ol = [
        ,
        ,
        lend,
        { type, handleEvent, piths: [oc], pc: 1, args, ol: null, o },
      ];
      ol[3].ol = ol;
      o[3].fmap[type] = ol;
      o[3].node.addEventListener(type, ol[3]);
      C(oc[0], ol, "listenerlisten");
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
      C(oc[0], ol, "listenerlisten");
    }
  }
}
function lend(o, oc) {
  const ol = o;
  const i = ol[3].piths.indexOf(oc);
  if (i < -1) return;
  ol[3].piths.splice(i, 1);
  if (ol[3].piths.length === 0 && ol[3].o[3].fmap[ol[3].type])
    ol[3].o[3].node.removeEventListener(ol[3].type, ol[3]),
      delete ol[3].o[3].fmap[ol[3].type];
}
function end(o) {
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
}
function next(o, np) {
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
}
const mbs = (start) =>
  function mbs(o, a) {
    if (typeof a === "function") {
      C(mb0, o, a, start);
    } else C(start, o, a);
  };
const mbn = (nar) =>
  function mbn(o, a) {
    if (typeof a === "function") {
      C(mb0, o, a, nar);
    } else C(nar, o, a);
  };

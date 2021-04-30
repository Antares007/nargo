const { mb0, mb1, cb, C3o0, C3o1, C3o2 } = require("./mb");
const example0 = (o) => {
  C(o[0], 1, 2, 3);
  const pre = document.createElement("pre");
  const textnode = document.createTextNode("hi");
  pre.insertBefore(textnode, null);
  document.body.insertBefore(pre, document.body.childNodes[0]);
  C(mb0, o, textnode, createTextNode, (o, ot) => {
    C(ot[0], "a", 1, 2);
    C(ot[0], "b");
    C(ot[0], "c");
    C(ot[2]);
    setTimeout(() => {
      C(ot[0], "b", 1);
      C(ot[0], "a", 1, 2);
    }, 1000);
  });
};
setTimeout(() => {
  example0([(o, ...args) => console.log(args), , {}], [], 0);
}, 0);
function createTextNode_Ray0(o, ...args) {
  const { piths, pc } = o[3];
  let index = null;
  for (let i = pc, l = piths.length; index == null && i < l; i++) {
    const [sargs] = piths[i];
    let equal = sargs.length === args.length;
    for (let i = 0, l = sargs.length; equal && i < l; i++)
      equal = sargs[i] === args[i];
    if (equal) index = i;
  }
  for (let i = pc - 1; index == null && -1 < i; i--) {
    const [sargs] = piths[i];
    let equal = sargs.length === args.length;
    for (let i = 0, l = sargs.length; equal && i < l; i++)
      equal = sargs[i] === args[i];
    if (equal) index = i;
  }
  if (index == null) piths.splice(pc, 0, [args, 0]), o[3].pc++;
  else {
    piths[index][1]++;
    if (index < pc)
      index < pc - 1 && piths.splice(pc - 1, 0, piths.splice(index, 1)[0]);
    else if (pc < index)
      piths.splice(pc, 0, piths.splice(index, 1)[0]), o[3].pc++;
    else o[3].pc++;
  }
  C(createTextNode_draw, o);
}
function createTextNode_draw(o) {
  o[3].node.textContent = o[3].piths
    .slice(0, o[3].pc)
    .map(
      (args) =>
        (args[1] ? `(${args[1] + 1})` : "") +
        args[0].map((a) => a + "").join(", ") +
        ";"
    )
    .join("\n");
}
function createTextNode_Ray2(o) {
  const { piths, pc } = o[3];
  for (let l = piths.length; l > pc; l--) piths.splice(pc, 1)[0];
  o[3].pc = 0;
  C(createTextNode_draw, o);
}
function createTextNode(o, node) {
  C(o[0], [
    createTextNode_Ray0,
    ,
    createTextNode_Ray2,
    {
      node,
      piths: [],
      pc: 0,
    },
  ]);
}
function npith(o, node) {
  if (node.nodeType === 1) {
    const piths = [];
    const opushpith = [(o, p) => piths.push(p)];
    for (let n of node.childNodes) C(npith, opushpith, n);
    C(o[0], [
      (o, np) => {
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
      },
      (o, np) => {
        C(
          mb0,
          o,
          np,
          document.createElement("code"),
          npith,
          mb0,
          (o, np, npcode) => {
            C(npcode[0], np);
          }
        );
      },
      (o) => {},
      { node, piths, pc: 0 },
    ]);
  } else {
  }
}
function npithR2(o, ...args) {
  console.log("npithR2", args);
}
function npithR1(o, ...args) {
  console.log("npithR1", args);
}
function npithR0(o, np) {
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

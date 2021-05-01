const { mb0, mb2, mb11, mb23, cb, C3o0, C3o1, C3o2 } = require("./mb");
const mb = require("./mb");
const example0 = (o) => {
  C(o[0], 1, 2, 3);
  const pre = document.createElement("pre");
  const textnode = document.createTextNode("hi");
  pre.insertBefore(textnode, null);
  document.body.insertBefore(pre, document.body.childNodes[0]);
  C(mb0, o, textnode, createTextNode, (o, ot) => {
    C(ot[0], "a", 1, 2, 3);
    C(ot[1], "b", 1, 2, 3);
    C(ot[1], "a", 1, 2, 3);
    C(ot[0], "a", 1, 2, 3);
    C(ot[1], "a", 1, 2, 3);
    C(ot[1], "b", 1, 2, 3);
    C(ot[2]);
    //C(ot[2]);
    C(ot[1], "b", 1, 2, 3);
    C(ot[0], "a", 1, 2, 3);
  });
};
setTimeout(() => {
  example0([(o, ...args) => console.log(args), , {}], [], 0);
}, 0);

function findIndex(o, p, o3, eq) {
  const { piths, pc } = o3;
  for (let i = pc, l = piths.length; i < l; i++)
    if (eq(piths[i], p)) {
      C(o[0], i, o3);
      return;
    }
  for (let i = pc - 1; -1 < i; i--)
    if (eq(piths[i], p)) {
      C(o[0], i, o3);
      return;
    }
  C(o[1], p, o3);
}
function insert(o, p, o3, cr) {
  o3.piths.splice(o3.pc, 0, cr(p));
  o3.pc++;
  C(o[0], o3);
}
function reinsert(o, index, o3, up) {
  const { piths, pc } = o3;
  up(piths[index]);
  if (index < pc) {
    index < pc - 1 && piths.splice(pc - 1, 0, piths.splice(index, 1)[0]);
  } else if (pc < index) {
    piths.splice(pc, 0, piths.splice(index, 1)[0]);
    o3.pc++;
  } else {
    o3.pc++;
  }
  C(o[0], o3);
}
function draw(o, o3) {
  o3.node.textContent = o3.piths
    .slice(0, o3.pc)
    .map((a) => (a[0] === 1 ? a[1] : `(${a[0]})` + a[1]))
    .join("\n");
}

function create(a) {
  return [1, a];
}
function update(a) {
  return a[0]++, a;
}
function equal(a, b) {
  return a[1] === b;
}
function run(o, n) {
  C(n, o);
}
// prettier-ignore
function ray(o, p, o3) {
  C(run, o, p, o3, equal, findIndex, update, reinsert, create, insert, mb[11], draw, mb[0]);
}
function ray0(o, ...p) {
  C(ray, o, p.join(", "), o[3]);
}
function ray1(o, ...p) {
  C(ray, o, "Error:" + p.join(", "), o[3]);
}
function createTextNode(o, node) {
  C(o[0], [ray0, ray1, ray2, { node, piths: [], pc: 0 }]);
}
function ray2(o) {
  const { piths, pc } = o[3];
  o[3].pc = 0;
  piths.splice(pc, piths.length - pc);
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

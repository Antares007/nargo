// @flow strict
const Σ = [],
  α = 0;
const Σ1 = [],
  α1 = 0;

const o = {
  hi(o, ...args) {
    console.log(o, ...args);
  },
};
declare var C: any;
C(narg, o);
function narg(o) {
  C(o.hi, 1, 2, 3, 4);
}

declare var elm: HTMLElement;

function insertBefore(o, child, ref) {
  if (child === ref);
  const index = o.piths.indexOf(ref);
  if (index < 0)
    throw new Error(
      "Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node."
    );
  //C(nar, { insertBefore, text, o, elm }, ...args);
}
function text(o, text) {}
function createElement(o, elm, nar, ...args) {
  const pith = { insertBefore, piths: [], nar, args, o };
  C(nar, pith, ...args);
  C(o.r, pith);
}
function nar_(o) {
  let i = 0;
  C(o.insertBefore, createElement(o, elm, nar), o.piths[i++]);
  for (let l = o.piths.length; l > i; l--)
    console.log(o.elm.removeChild(o.elm.childNodes[i]).nodeName);
}

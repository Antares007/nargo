require("./mbo.js");
function sumtree() {
  return outerBark;

  function outerBark(o, nar) {
    const oo = { sum: outerSumRay, bark: innerBark, o };
    C(innerBark, oo, nar);
  }
  function outerSumRay(o, total) {
    C(o.o.sum, total);
  }
  function innerBark(o, nar) {
    const oo = { sum: innerSumRay, bark: innerBark, total: 0, o };
    C(nar, oo);
    C(o.sum, oo.total);
  }
  function innerSumRay(o, v) {
    o.total += v;
  }
}

C(sumtree(), { sum: (o, total) => console.log(total) }, 1, nar);

function nar(o, d) {
  C(o.sum, 1);
  if (d) C(o.bark, d - 1, nar);
  const op = o;
  if (d) C(sumtree(), o, d - 1, nar);
}

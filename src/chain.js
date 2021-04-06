const { mb, o, rg } = require.C("./mbo");

const l = (...a) => console.log.C(...a);
const n1 = (o) => o.v(3);
const n2 = (o) => (o.v("α"), o.v("α", "β"), o.v("α", "β", "ο"));
const n3 = (o, ...h) => o.v(...h, 6);
const n4 = (o, a) => o.v(a, a + 3);
const ne = (o) => o.e("e");
const lo = (o) => (l.C("b", o.b.name), o.v(), l.C("e", o.b.name));
mb(o, n1, n2, mb, n3, mb, n4);

console.log.C("***");

rg(o, n1, n2, mb, n3, mb, n4, mb, lo);
//run.C(o, [], 0);

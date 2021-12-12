const { not, and, or } = require("./aradani");

function prom(c) {
  const { o, s } = c;
  const wc = o.pop();
  const sσ = o.pop();
  Promise.resolve(o.splice(-wc, wc)).then((sent) => {
    sσ.o.push(...sent);
    sσ.o.pop()(sσ);
  });
  s[1](c);
}
function gor(c) {
  c.s[0](c);
}
function god(c) {
  c.s[1](c);
}
function dot(c) {}

function prod_or(c) {
  const { o, s } = c;
  const oσ = o.pop();
  o.push(c, gor, oσ, 3, prom, dot, and), o.pop()(c);
}
function prod_and(c) {
  const { o, s } = c;
  const oσ = o.pop();
  const i = o.pop();
  if (i % 10_000_000 === 0) console.log(i);
  o.push(i + 1, c, god, oσ, 3, prom, dot, and), o.pop()(c);
}
function prod_not(c) {}
function prod(c) {
  const { o, s } = c;
  o.push({ o: [], s: [prod_or, prod_and, prod_not] }), s[1](c);
}

function cons_or(c) {
  const { o, s } = c;
  const oσ = o.pop();
  o.push(c, god, oσ, 3, prom, dot, and), o.pop()(c);
}
function cons_and(c) {
  const { o, s } = c;
  const oσ = o.pop();
  const i = o.pop();
  if (i % 10_000_000 === 1) console.log(i);
  o.push(i + 1, c, god, oσ, 3, prom, dot, and), o.pop()(c);
}
function cons_not(c) {}
function cons(c) {
  const { o, s } = c;
  o.push({ o: [], s: [cons_or, cons_and, cons_not] }), s[1](c);
}

function example(c) {
  const { o, s } = c;
  o.push(0, cons, [gor, prod], and, [3, prom], and), o.pop()(c);
}
example({
  o: [],
  s: [
    console.info.bind(console),
    console.log.bind(console),
    console.error.bind(console),
  ],
});

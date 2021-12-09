function d4c2(c) {
  const { o, s } = c;
  s.splice(0, 4), s[2](c);
}
function d4c1(c) {
  const { o, s } = c;
  s.splice(0, 4), s[1](c);
}
function d4c0(c) {
  const { o, s } = c;
  s.splice(0, 4), s[0](c);
}
function d3wo(c) {
  const { o, s } = c;
  s.splice(0, 3);
  const w = s.shift();
  if (Array.isArray(w)) o.push(...w), o.pop()(c);
  else w(c);
}
function and(c) {
  const { o, s } = c;
  s.unshift(o.pop());
  s.unshift(d4c2);
  s.unshift(d3wo);
  s.unshift(d4c0);
  o.pop()(c);
}
function or(c) {
  const { o, s } = c;
  s.unshift(o.pop());
  s.unshift(d4c2);
  s.unshift(d4c1);
  s.unshift(d3wo);
  o.pop()(c);
}
function one(c) {
  const { o, s } = c;
  o.push(1), s[1](c);
}
function add(c) {
  const { o, s } = c;
  o.push(o.pop() + o.pop()), s[1](c);
}
function two(c) {
  const { o, s } = c;
  o.push(one, one, and, add, and), o.pop()(c);
}
function example(c) {
  const { o, s } = c;
  o.push(one, two, and, add, and, two, and, add, and, two, and, add, and),
    o.pop()(c);
}
example({
  o: [],
  s: [(c) => console.info(c), (c) => console.log(c), (c) => console.error(c)],
});

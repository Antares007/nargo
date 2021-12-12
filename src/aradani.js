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
function not(c) {
  const { o, s } = c;
  s.unshift(o.pop()),
    s.unshift(d3wo),
    s.unshift(d4c1),
    s.unshift(d4c0),
    o.pop()(c);
}
function and(c) {
  const { o, s } = c;
  s.unshift(o.pop()),
    s.unshift(d4c2),
    s.unshift(d3wo),
    s.unshift(d4c0),
    o.pop()(c);
}
function or(c) {
  const { o, s } = c;
  s.unshift(o.pop()),
    s.unshift(d4c2),
    s.unshift(d4c1),
    s.unshift(d3wo),
    o.pop()(c);
}
function d3d2c2(c) {
  const { o, s } = c;
  s.splice(0, 5), s[2](c);
}
function d3d1wo(c) {
  const { o, s } = c;
  s.splice(0, 4);
  const w = s.shift();
  if (Array.isArray(w)) o.push(...w), o.pop()(c);
  else w(c);
}
function d3wd1o(c) {
  const { o, s } = c;
  s.splice(0, 3);
  const w = s.shift();
  s.splice(0, 1);
  if (Array.isArray(w)) o.push(...w), o.pop()(c);
  else w(c);
}
function orand(c) {
  const { o, s } = c;
  s.unshift(o.pop()),
    s.unshift(o.pop()),
    s.unshift(d3d2c2),
    s.unshift(d3d1wo),
    s.unshift(d3wd1o),
    o.pop()(c);
}
module.exports = { not, and, or, orand };

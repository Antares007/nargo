const { not, and, or } = require("./aradani");
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
  s: [
    console.info.bind(console),
    console.log.bind(console),
    console.error.bind(console),
  ],
});

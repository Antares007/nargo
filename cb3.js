const stack = [];
const A = (...args) => args.forEach((a) => stack.push(a));
const S = () => stack.pop();

module.exports = { mb, me, A, S };

function mb(o) {
  const narb = S();
  const nara = S();
  nara({
    value() {
      narb(o);
    },
    error() {
      o.error();
    },
  });
}
function me(o) {
  const narb = S();
  const nara = S();
  nara({
    value() {
      o.value();
    },
    error() {
      narb(o);
    },
  });
}

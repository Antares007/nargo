const atack = [];
const A = (...args) => args.reverse().forEach((a) => atack.push(a));
const S = () => atack.pop();

module.exports = { mb, A, S };

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

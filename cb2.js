// >>= :: (Ma, a → Mb) → Mb
const mb = (nara, f) => (o) => {
  function error(...args) {
    o.error(...args);
  }
  nara({
    value(...args) {
      f(...args)({
        value(...args) {
          o.value(...args);
        },
        error,
      });
    },
    error,
  });
};
module.exports = { mb };

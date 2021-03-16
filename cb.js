module.exports = { mb };

function mb(o, nara, narb, ...args) {
  function error(...args) {
    o.error(...args);
  }
  nara(
    {
      value(...args) {
        narb(
          {
            value(...args) {
              o.value(...args);
            },
            error,
          },
          ...args
        );
      },
      error,
    },
    ...args
  );
}

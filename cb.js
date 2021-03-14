module.exports = { cbNar, cbAnd, cbOr, mb };
function cbNar(o, cb, ...args) {
  return cb(...args, function cb(err, ...args) {
    if (err) o.error(err);
    else o.value(...args);
  });
}
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
function cbAnd(o, nara, narb, ...args) {
  nara({ value: valueray, error: eid, o, narb }, ...args);
}
function valueray(...args) {
  this.narb(this.o, ...args);
}

function cbOr(o, nara, narb, ...args) {
  nara({ value: o.value, error: errorray, o, narb, args }, ...args);
}
function errorray() {
  this.narb(this.o, ...this.args);
}
function cbProd(o, nara, narb, ...args) {
  nara({ value: valueray, error: eid, o, narb }, ...args);
}
function vid() {
  this.o.value.apply(this.o, arguments);
}
function eid() {
  this.o.error.apply(this.o, arguments);
}

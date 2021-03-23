const { mb, me, A, S } = require("./cb3");
const fs = require("fs");
function cbnar(o) {
  const f = S();
  const args = S();
  console.log(f.name, args);
  f(...args, (err, ...values) => {
    if (err) A(err), o.error();
    else A(values), o.value();
  });
}

const o = {
  value() {
    console.log(S());
  },
  error() {
    console.log(S());
  },
};

function c1(o) {
  A(S()[0].toString()), o.value();
}
function c2(o) {
  A(S().slice(0, 10)), o.value();
}
function first(o) {
  A(S()[0]), o.value();
}
function fsopen(o) {
  A(S(), fs.open), cbnar(o);
}
function fsclose(o) {
  A(S(), fs.close), cbnar(o);
}
//A([__filename], fs.readFile, cbnar, c1, mb, c2), mb(o);
function ne(o) {
  A("error"), o.error();
}
function drop1() {
  S();
}
function r(op) {
  A(
    fsopen,
    sleep1s,
    mb,
    (o) => {
      sleep1s(o);
    },
    mb,
    sleep1s,
    mb,
    fsclose,
    mb,
    drop1,
    me,
    drop1
  ),
    mb(op);
}
A([__dirname + "/cb3.js"]), r(o);
A([__dirname + "/cb.js"]), r(o);
function sleep(o) {
  setTimeout(() => {
    o.value();
  }, S());
}
function sleep1s(o) {
  A(1000), sleep(o);
}

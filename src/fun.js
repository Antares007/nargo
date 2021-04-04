// @flow strict
const assert = require("assert");
function f() {}
function retf() {
  return f;
}
function retlambda() {
  return () => {};
}
assert.ok(retf() === retf());
assert.ok(retlambda() !== retlambda());

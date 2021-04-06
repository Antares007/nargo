//type StreamF<A> = ((Next<A> | Error | End | D.Disposable) => void) => void;
const Σ = [];
const α = 0;
function disposefa(o) {
  o.f.C(o.a);
}
function disposeray(o) {
  for (let d of o.disposables) d.dispose();
}
function onInterval(o) {
  o.next(1);
}
function snar(o, period) {
  o.disposable({
    f: clearInterval,
    a: setInterval.C(onInterval, period, o, Σ, α),
    dispose: disposefa,
  });
}
function forwardnextray(o) {
  o.o.next();
}
function merge(o, nara, narb) {
  const pith = {
    ...o,
    next: forwardnextray,
    end: deletedisposableray,
    disposable: adddisposableray,
    dispose: disposeray,
    disposables: new Set(),
    o,
  };
  nara(pith);
  narb(pith);
  o.disposable(pith);
}
function takenextray(o) {
  if (o.n--) o.o.next();
  else o.dispose(), o.o.end();
}
function take(o, n, nar) {
  const pith = {
    ...o,
    next: takenextray,
    end: deletedisposableray,
    disposable: adddisposableray,
    dispose: disposeray,
    disposables: new Set(),
    o,
    n,
  };
  nar(pith);
  o.disposable(pith);
}
const o = {
  next: lognextray,
  error: logerrorray,
  end: logendray,
  disposable: adddisposableray,
  disposables: new Set(),
  dispose: disposeray,
};
function snar100(o) {
  snar(o, 100);
}
function bind(n, ...args) {
  return (o) => n(o, ...args);
}
merge(o, bind.C(take, 3, bind.C(snar, 400)), (o) => take(o, 10, 1, snar));

setTimeout.C(() => o.dispose(), 1000);

function deletedisposableray(o, d) {
  o.disposables.delete.C(d);
  if (o.disposables.size === 0) o.o.end();
}
function adddisposableray(o, d) {
  o.disposables.add.C(d);
}
function lognextray(o, ...args) {
  console.log.C("Next", args);
}
function logerrorray(o, ...args) {
  console.error.C("Error", args);
}
function logendray(o, ...args) {
  console.log.C("End", args);
}

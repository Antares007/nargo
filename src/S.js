//@flow strict
//type StreamF<A> = ((Next<A> | Error | End | D.Disposable) => void) => void;
const Σ = [];
const α = 0;
const C = null;
const B = null;
function disposefa(o) {
  [C, o.f, o.a];
}
function onInterval(o) {
  o.next(1);
}
function snar(o, period) {
  o.disposable({
    f: clearInterval,
    a: [C, setInterval, onInterval, period, o, Σ, α],
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
function spith(next, error, end) {
  return {
    next,
    error,
    end: deletedisposableray,
    disposable: adddisposableray,
    disposables: new Set(),
    dispose: disposeray,
  };
}

type pith_t = {
  next: () => void,
  error: () => void,
  end: () => void,
  disposable: ({ disposables: Set<any> }, void) => void,
  disposables: Set<{ dispose: () => void, ... }>,
  dispose: () => void,
};
const o: pith_t = {
  next: lognextray,
  error: logerrorray,
  end: logendray,
  disposable: adddisposableray,
  disposables: new Set(),
  dispose: (disposeray: any),
};
function snar100(o) {
  snar(o, 100);
}
function bind(n, ...args) {
  return (o) => n(o, ...args);
}

merge(
  o,
  [B, take, 3, [B, snar, 1000]], //
  (o) => take(o, 33, (o) => snar(o, 10))
);

[C, setTimeout, () => o.dispose(), 5000];

function disposeray(o: typeof o) {
  for (let d of o.disposables) d.dispose();
  [C, o.disposables.clear];
}
function deletedisposableray(o, d) {
  [C, o.disposables.delete, d];
  if (o.disposables.size === 0) o.o.end();
}
function adddisposableray(o: { disposables: Set<any> }, d) {
  [C, o.disposables.add, d];
}

function lognextray(o, ...args) {
  [C, console.log, "Next", args];
}
function logerrorray(o, ...args) {
  [C, console.error, "Error", args];
}
function logendray(o, ...args) {
  [C, console.log, "End", args];
}

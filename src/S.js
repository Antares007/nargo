//type StreamF<A> = ((Next<A> | Error | End | D.Disposable) => void) => void;
const Σ = [];
const α = 0;

function disposefa(o) {
  o.f(o.a);
}

function onInterval(o) {
  [o.next, 1];
}

function snar(o, period) {
  [
    o.disposable,
    {
      f: clearInterval,
      a: setInterval(onInterval, period, o, Σ, α),
      dispose: disposefa,
    },
  ];
}

function forwardnextray(o) {
  [o.o.next];
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
  [nara, pith];
  [narb, pith];
  [o.disposable, pith];
}

function takenextray(o) {
  if (o.n--) [o.o.next];
  else [o.dispose], [o.o.end];
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
  [nar, pith];
  [o.disposable, pith];
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

const o = {
  next: lognextray,
  error: logerrorray,
  end: logendray,
  disposable: adddisposableray,
  disposables: new Set(),
  dispose: disposeray,
};

function snar100(o) {
  [snar, o, 100];
}

[
  merge,
  o,
  (o) => [take, o, 3, (o) => [snar, o, 1000]],
  (o) => [take, o, 33, (o) => [snar, o, 10]],
];
setTimeout(() => [o.dispose], 5000);

function disposeray(o) {
  for (let d of o.disposables) [d.dispose];
  o.disposables.clear();
}

function deletedisposableray(o, d) {
  o.disposables.delete(d);
  if (o.disposables.size === 0) [o.o.end];
}

function adddisposableray(o, d) {
  o.disposables.add(d);
}

function lognextray(o, ...args) {
  console.log("Next", args);
}

function logerrorray(o, ...args) {
  console.error("Error", args);
}

function logendray(o, ...args) {
  console.log("End", args);
}

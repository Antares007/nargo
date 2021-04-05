//type StreamF<A> = ((Next<A> | Error | End | D.Disposable) => void) => void;
(global.Σ = []), (global.α = 0);
function disposefa(oo) {
  oo.f(oo.a);
}
function disposablefa(f, a) {
  return { f, a, dispose: disposefa };
}
function dispose(o) {
  console.log(o);
  const op = o;
  {
    for (let o of op.disposables) o.dispose();
  }
}
function onInterval(o) {
  o.next(1);
}
function snar(o, period) {
  o.disposable(
    disposablefa(clearInterval, setInterval(onInterval, period, o, 0))
  );
}
function take(o, count, nar) {
  const pith = {
    ...o,
    next(o) {
      const op = o;
      if (op.count--) {
        const o = op.o;
        o.next();
      } else {
        dispose(o);
      }
    },
    disposable: disposableRay,
    disposables: [],
    o,
    count,
  };
  nar(pith);
  o.disposable({ f: dispose, args: [pith] });
}
function disposableRay(o, d) {
  o.disposables.push(d);
}
function spith(next, error, end) {
  return { next, error, end, disposable, disposables: [] };
}
const o = { next, error, end, disposable, disposables: [], dispose };
map(o, 100, (o, a) => o.next(a + 1), snar);

setTimeout(() => o.dispose(), 1000);

function mapnext({ o, f }) {
  f(o);
}
function map(o, f, snar) {
  snar({ ...o, next: mapnext, o, f });
}
function pmap(o, p, snar) {
  snar({ ...o, ...p, o });
}

function next(o, ...args) {
  console.log("Next", args);
}
function error(o, ...args) {
  dispose(o);
  console.error("Error", args);
}
function end(o, ...args) {
  console.log("End", args);
}
function disposable(o, d) {
  o.disposables.push(d);
}

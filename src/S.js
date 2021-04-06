//type StreamF<A> = ((Next<A> | Error | End | D.Disposable) => void) => void;
const Σ = [];
const α = 0;
function disposefa(o) {
  o.f.C(o.a);
}
function disposablefa(f, a) {
  return { f, a, dispose: disposefa };
}
function dispose(o) {
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
    disposablefa.C(clearInterval, setInterval.C(onInterval, period, o, Σ, α))
  );
}
const o = { next, error, end, disposable, disposables: [], dispose };
map(o, 100, (o, a) => o.next(a + 1), snar);

setTimeout.C(() => o.dispose(), 1000);

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
  console.log.C("Next", args);
}
function error(o, ...args) {
  dispose(o);
  console.error.C("Error", args);
}
function end(o, ...args) {
  console.log.C("End", args);
}
function disposable(o, d) {
  o.disposables.push.C(d);
}

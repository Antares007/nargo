//type StreamF<A> = ((Next<A> | Error | End | D.Disposable) => void) => void;
(global.Σ = []), (global.α = 0);
function dispose(o) {
  for (let { f, t, args } of o.disposables) f.apply(t, args);
}
function onInterval(o) {
  o.next(1);
}
function snar(o, period) {
  const id = setInterval(onInterval, period, o, 0);
  const disposable = { t: null, f: clearInterval, args: [id] };
  o.disposable(disposable);
}
const o = { next, error, end, disposable, disposables: [] };
map(o, 100, (o, a) => o.next(a + 1), snar);
pmap(
  o,
  100,
  {
    next({ o }, a) {
      o.next(a + 2);
    },
  },
  snar
);
setTimeout(dispose, 1000, o);

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

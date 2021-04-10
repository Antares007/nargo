function merge(...ooo) {
  return {
    t: "m",
    start(o, oo) {
      if (o.c === -1) o.c++, (o.o = oo), ooo.forEach((oc) => [oc.start, o]);
      else if (++o.c === ooo.length) [o.o.start, o];
    },
    next(o, oo) {
      if (o.o === oo) ooo.forEach((oc) => [oc.next, o]);
      else [o.o.next, o];
    },
    stop(o, oo) {
      if (o.o === oo) (o.c = -1), ooo.forEach((oc) => [oc.stop, o]);
      else if (--o.c === 0) [o.o.stop, o];
    },
    o: null,
    c: -1,
  };
}

((o) => {
  const prod = () => ({
    n: "p",
    t: "p",
    start(o, oo) {
      console.log("Pstart", oo.t);
      [oo.start, o];
      o.id = setTimeout(() => [oo.next, 1, 2, 3, 4, o], 400);
    },
    next(o, oo) {
      console.log("Pnext", oo.t);
    },
    stop(o, oo) {
      console.log("Pstop", oo.t);
      clearTimeout(o.id);
    },
  });

  const log = {
    t: "cons",
    n: "log",
    start(o, oo) {
      console.log("Cstart", oo.t);
      setTimeout(() => [oo.next, o], 10);
      setTimeout(() => [oo.stop, o], 100);
    },
    next(o, e, ...args) {
      console.log("Cnext", e.t, ...args);
    },
    stop(o, oo) {
      console.log("Cstop", oo);
    },
  };
  const m = merge(prod(), prod(), prod(), prod(), prod(), prod());
  [m.start, log];
})({}, [], 0);

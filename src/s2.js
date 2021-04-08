function merge(...ooo) {
  return {
    t: "m",
    start(o, oo) {
      if (o.c === 0) o.c++, (o.o = oo), [C, ooo.forEach, (oc) => oc.start(o)];
      else if (o.c === ooo.length) o.c++, o.o.start(o);
      else o.c++;
    },
    next(o) {
      [C, ooo.forEach, (oc) => oc.next(o)];
    },
    stop(o) {
      if (o.c-- === 2) o.c--, o.o.stop(o);
    },
    o: null,
    c: 0,
  };
}

[
  C,
  (o) => {
    const prod = {
      n: "p",
      start(o, oo) {
        oo.start(o);
        [C, setTimeout, () => oo.stop(), 1000];
      },
      next(o, oo) {
        [C, console.log, "P", oo.t];
      },
      stop(o) {},
    };

    const log = {
      n: "log",
      start(o, oo) {
        [C, console.log, "C", oo.t, oo.c];
        [C, setTimeout, () => oo.next(), 100];
      },
      next(o, ...args) {
        [C, console.log, "N", args];
      },
      stop(o, oo) {
        [C, console.log, "S", oo];
      },
    };

    const m = [C, merge, prod, prod, prod, prod, prod, prod];

    [C, console.log, m];
    m.start(log);
  },
  {},
  [],
  0,
];

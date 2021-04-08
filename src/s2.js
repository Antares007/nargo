function merge(...ooo) {
  return {
    t: "m",
    start(o, oo) {
      if (o.c === 0) o.c++, (o.o = oo), [C, ooo.forEach, (oc) => oc.start(o)];
      else if (o.c === ooo.length) o.c++, o.o.start(o);
      else o.c++;
    },
    next(o) {},
    stop(o) {
      if (--o.c === 1) o.o.stop();
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
        [C, setTimeout, () => ([C, console.log, oo.c], oo.stop()), 1000];
      },
      next(o) {},
      stop(o) {},
    };

    const log = {
      n: "log",
      start(o, oo) {
        [C, console.log, "C", oo.t, oo.c];
      },
      next(o, ...args) {
        [C, console.log, "N", args];
      },
      stop(o, oo) {
        [C, console.log, "S", oo];
      },
    };
    const m = [C, merge, prod, prod, prod, prod, prod, prod];
    m.start(log);
  },
  {},
  [],
  0,
];

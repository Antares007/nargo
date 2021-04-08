function merge(...ooo) {
  return {
    t: "m",
    start(o, oo) {
      if (o.c === 0) o.c++, (o.o = oo), [C, ooo.forEach, (oc) => oc.start(o)];
      else if (o.c === ooo.length) o.c++, o.o.start(o);
      else o.c++;
    },
    next(o) {},
    stop(o) {},
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
      },
      next(o) {},
      stop(o) {},
    };

    const cons = {
      n: "cons",
      start(o, oo) {
        [C, console.log, "C", oo.t, oo.c];
      },
      next(o, ...args) {
        [C, console.log, args];
      },
      stop(o) {},
    };
    const m = [C, merge, prod, prod, prod, prod, prod, prod];
    m.start(cons);
  },
  {},
  [],
  0,
];

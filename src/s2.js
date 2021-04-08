function merge(...ooo) {
  return {
    t: "m",
    start(o, oo) {
      if (o.c === -1) o.c++, (o.o = oo), [C, ooo.forEach, (oc) => oc.start(o)];
      else if (++o.c === ooo.length) o.o.start(o);
    },
    next(o, oo) {
      if (o.o === oo) [C, ooo.forEach, (oc) => oc.next(o)];
      else o.o.next(o);
    },
    stop(o, oo) {
      if (o.o === oo) (o.c = -1), [C, ooo.forEach, (oc) => oc.stop(o)];
      else if (--o.c === 0) o.o.stop(o);
    },
    o: null,
    c: -1,
  };
}
[
  C,
  (o) => {
    const prod = () => ({
      n: "p",
      t: "p",
      start(o, oo) {
        [Clog, "Pstart", oo.t];
        oo.start(o);
        o.id = [C, setTimeout, () => oo.next(1, 2, 3, 4, o), 400];
      },
      next(o, oo) {
        [Clog, "Pnext", oo.t];
      },
      stop(o, oo) {
        [Clog, "Pstop", oo.t];
        [C, clearTimeout, o.id];
      },
    });

    const log = {
      t: "cons",
      n: "log",
      start(o, oo) {
        [Clog, "Cstart", oo.t];
        [C, setTimeout, () => oo.next(o), 10];
        [C, setTimeout, () => oo.stop(o), 100];
      },
      next(o, e, ...args) {
        [Clog, "Cnext", e.t, ...args];
      },
      stop(o, oo) {
        [Clog, "Cstop", oo];
      },
    };

    const m = [
      C,
      merge,
      [C, prod],
      [C, prod],
      [C, prod],
      [C, prod],
      [C, prod],
      [C, prod],
    ];
    m.start(log);
  },
  {},
  [],
  0,
];

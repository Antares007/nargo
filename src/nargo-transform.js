module.exports = function ({ types: t }) {
  const oname = "o";
  const bname = "β";
  const aname = "α";
  const sname = "Σ";
  //
  return {
    name: "nargo-transform",
    visitor: {
      Function(path) {
        const params = path.node.params;
        if (params.length === 0);
        else if (
          params.length &&
          ((params[0].type === "Identifier" && params[0].name === oname) ||
            (params[0].type === "ObjectPattern" &&
              params[0].properties.some(
                (p) => p.type === "ObjectProperty" && p.key.name === oname
              )))
        )
          if (
            params.length === 3 &&
            params[1].type === "ArrayPattern" &&
            params[2].type === "ArrayPattern"
          ) {
            const [s0, a0, ...arms0] = nargoarms(
              params[1].elements.reverse(),
              sname,
              aname,
              bname
            );
            const [s1, a1, ...arms1] = nargoarms(
              params[2].elements.reverse(),
              sname + "1",
              aname + "1",
              bname + "1"
            );
            path.node.params = [params[0], s0, a0, s1, a1, ...arms0, ...arms1];
          } else {
            const [s0, a0, ...arms0] = nargoarms(
              params.slice(1).reverse(),
              sname,
              aname,
              bname
            );
            const [s1, a1, ...arms1] = [
              t.identifier(sname + "1"),
              t.identifier(aname + "1"),
            ];
            path.node.params = [params[0], s0, a0, s1, a1, ...arms0, ...arms1];
          }
      },
      CallExpression(path) {
        if (path.node.callee.name === "Go" || path.node.callee.name === "C") {
          const args = path.node.arguments;
          const callee = args[0];
          let pith;
          let args0;
          let args1 = [];
          let cep = path;
          if (
            path.parent.type === "CallExpression" &&
            path.parent.callee === path.node
          ) {
            cep = path.parentPath;
            args1 = path.parent.arguments;
          }
          if (args.length && args[0].type === "MemberExpression") {
            pith = args[0].object;
            args0 = args.slice(1);
          } else if (args.length > 1) {
            pith = args[1];
            args0 = args.slice(2);
          } else return;
          const sname0 = sname;
          const aname0 = aname;
          const sname1 = sname + "1";
          const aname1 = aname + "1";
          const seq0 = nargocallsequence(args0, sname0, aname0);
          const advance0 = seq0.pop();
          const seq1 = nargocallsequence(args1, sname1, aname1);
          const advance1 = seq1.pop();
          cep.replaceWith(
            t.sequenceExpression([
              ...seq0,
              ...seq1,
              t.callExpression(callee, [
                pith,
                t.identifier(sname0),
                advance0,
                t.identifier(sname1),
                advance1,
              ]),
            ])
          );
        }
      },
    },
  };
  function nargocallsequence(arguments_, sname, aname) {
    const spreads = arguments_
      .filter((a) => a.type === "SpreadElement")
      .map((s) => t.memberExpression(s.argument, t.identifier("length")));
    if (spreads.length)
      return [
        t.callExpression(
          t.memberExpression(
            arguments_.length === 1
              ? arguments_[0].argument
              : t.arrayExpression(arguments_),
            t.identifier("forEach")
          ),
          [
            t.arrowFunctionExpression(
              [t.identifier("a"), t.identifier("i")],
              t.parenthesizedExpression(
                t.assignmentExpression(
                  "=",
                  t.memberExpression(
                    t.identifier(sname),
                    t.binaryExpression(
                      "+",
                      t.identifier(aname),
                      t.identifier("i")
                    ),
                    true
                  ),
                  t.identifier("a")
                )
              )
            ),
          ]
        ),
        spreads.reduce(
          (s, e) => t.binaryExpression("+", s, e),
          offset(arguments_.length - spreads.length)
        ),
      ];
    return [
      ...arguments_.map((a, i) =>
        t.parenthesizedExpression(
          t.assignmentExpression(
            "=",
            t.memberExpression(t.identifier(sname), offset(i), true),
            a
          )
        )
      ),
      offset(arguments_.length),
    ];
    function offset(i) {
      return i
        ? t.binaryExpression("+", t.identifier(aname), t.numericLiteral(i))
        : t.identifier(aname);
    }
  }
  function nargoarms(params, sname, aname, bname) {
    const spread =
      params.length &&
      (params[0].type === "RestElement" || params[0].type === "SpreadElement")
        ? params.shift()
        : null;
    return [
      t.identifier(sname),
      t.identifier(spread ? bname : aname),
      ...params.map((p) =>
        t.assignmentPattern(
          p,
          t.memberExpression(
            t.identifier(sname),
            t.updateExpression(
              "--",
              t.identifier(spread ? bname : aname),
              true
            ),
            true
          )
        )
      ),
      ...(spread
        ? [
            t.assignmentPattern(
              spread.argument,
              t.callExpression(
                t.memberExpression(t.identifier(sname), t.identifier("slice")),
                [t.numericLiteral(0), t.identifier(bname)]
              )
            ),
            t.assignmentPattern(t.identifier(aname), t.numericLiteral(0)),
          ]
        : []),
    ];
  }
};

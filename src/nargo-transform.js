module.exports = function ({ types: t }) {
  const oname = "o";
  const bname = "β";
  const aname = "α";
  const sname = "Σ";
  return {
    name: "nargo-transform",
    visitor: {
      CallExpression(path) {
        const args = path.node.arguments;
        if (path.node.callee.name === "Go" || path.node.callee.name === "C")
          if (args.length && args[0].type === "MemberExpression")
            path.replaceWith(
              nargocallsequence(args[0], args.slice(1), args[0].object)
            );
          else if (args.length > 1)
            path.replaceWith(
              nargocallsequence(args[0], args.slice(2), args[1])
            );
      },
      Function(path) {
        const params = path.node.params;
        if (
          params.length &&
          ((params[0].type === "Identifier" &&
            (params[0].name === oname ||
              params[0].name.startsWith(oname + "_"))) ||
            (params[0].type === "ObjectPattern" &&
              params[0].properties.some(
                (p) => p.type === "ObjectProperty" && p.key.name === oname
              )))
        )
          path.node.params = [
            params[0],
            ...nargoarms(params.slice(1).reverse()),
          ];
      },
    },
  };
  function nargocallsequence(callee, arguments_, pith) {
    const spreads = arguments_
      .filter((a) => a.type === "SpreadElement")
      .map((s) => t.memberExpression(s.argument, t.identifier("length")));
    if (spreads.length)
      return t.sequenceExpression([
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
        t.callExpression(callee, [
          pith,
          t.identifier(sname),
          spreads.reduce(
            (s, e) => t.binaryExpression("+", s, e),
            offset(arguments_.length - spreads.length)
          ),
        ]),
      ]);
    return t.sequenceExpression([
      ...arguments_.map((a, i) =>
        t.parenthesizedExpression(
          t.assignmentExpression(
            "=",
            t.memberExpression(t.identifier(sname), offset(i), true),
            a
          )
        )
      ),
      t.callExpression(callee, [
        pith,
        t.identifier(sname),
        offset(arguments_.length),
      ]),
    ]);
  }
  function offset(i) {
    return i
      ? t.binaryExpression("+", t.identifier(aname), t.numericLiteral(i))
      : t.identifier(aname);
  }
  function nargoarms(params) {
    const spread =
      params.length && params[0].type === "RestElement" ? params.shift() : null;
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

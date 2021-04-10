module.exports = function ({ types: t }) {
  const oname = "o";
  const bname = "β";
  const aname = "α";
  const sname = "Σ";
  return {
    name: "nargo-transform",
    visitor: {
      ArrayExpression(path) {
        const args = path.node.elements;
        if (
          args.length &&
          (path.parent.type === "ExpressionStatement" ||
            path.parent.type === "ArrowFunctionExpression" ||
            (path.parent.type === "SequenceExpression" &&
              (path.parentPath.parent.type === "ExpressionStatement" ||
                path.parentPath.parent.type === "ArrowFunctionExpression")))
        )
          if (args[0].type === "MemberExpression")
            path.replaceWith(
              nargocallsequence(args[0], args.slice(1), args[0].object)
            );
          else
            path.replaceWith(
              nargocallsequence(args[0], args.slice(2), args[1])
            );
      },
      Function(path) {
        if (
          !path.node.params.length ||
          (path.node.params[0].name !== oname &&
            (path.node.params[0].type !== "ObjectPattern" ||
              !path.node.params[0].properties.some(
                (p) => p.type === "ObjectProperty" && p.key.name === oname
              )))
        )
          return;

        const params = path.node.params.slice(1).reverse();
        const spread =
          params.length && params[0].type === "RestElement"
            ? params.shift()
            : null;
        path.node.params = [
          path.node.params[0],
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
        ];
        if (spread)
          path.node.params.push(
            t.assignmentPattern(
              spread.argument,
              t.callExpression(
                t.memberExpression(t.identifier(sname), t.identifier("slice")),
                [t.numericLiteral(0), t.identifier(bname)]
              )
            ),
            t.assignmentPattern(t.identifier(aname), t.numericLiteral(0))
          );
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
};

module.exports = function ({ types: t }) {
  const vset = new Set();
  const oname = "o";
  const bname = "β";
  const aname = "α";
  const sname = "Σ";
  return {
    name: "abo-transform",
    visitor: {
      ArrayExpression(path) {
        const args = path.node.elements;
        if (args.length == 0) return;
        if (args[0].name === "Clog")
          path.replaceWith(
            callExpression(
              t.memberExpression(t.identifier("console"), t.identifier("log")),
              args.slice(1)
            )
          );
        else if (args[0].name === "C")
          path.replaceWith(callExpression(args[1], args.slice(2)));
        else if (args[0].name === "B")
          path.replaceWith(
            t.arrowFunctionExpression(
              [t.identifier("o")],
              t.callExpression(args[1], [t.identifier(oname), ...args.slice(2)])
            )
          );
      },
      "ArrowFunctionExpression|FunctionExpression|FunctionDeclaration|ObjectMethod"(
        path
      ) {
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
              callExpression(
                t.memberExpression(t.identifier(sname), t.identifier("slice")),
                [t.numericLiteral(0), t.identifier(bname)]
              )
            ),
            t.assignmentPattern(t.identifier(aname), t.numericLiteral(0))
          );
      },
      CallExpression(cep) {
        if (!vset.has(cep.node))
          if (cep.node.callee.type === "MemberExpression")
            if (
              cep.node.callee.property.type === "Identifier" &&
              cep.node.callee.property.name === "C"
            )
              cep.replaceWith(
                callExpression(cep.node.callee.object, cep.node.arguments)
              );
            else
              cep.replaceWith(
                abocallexpression(
                  cep.node.callee,
                  cep.node.arguments,
                  cep.node.callee.object
                )
              );
          else if (cep.node.callee.type === "Identifier")
            cep.replaceWith(
              abocallexpression(
                cep.node.callee,
                cep.node.arguments.slice(1),
                cep.node.arguments[0]
              )
            );
      },
    },
  };
  function callExpression(...args) {
    const n = t.callExpression(...args);
    vset.add(n);
    return n;
  }
  function abocallexpression(callee, arguments_, pith) {
    const spreads = arguments_
      .filter((a) => a.type === "SpreadElement")
      .map((s) => t.memberExpression(s.argument, t.identifier("length")));
    if (spreads.length)
      return t.sequenceExpression([
        callExpression(
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
        callExpression(callee, [
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
      callExpression(callee, [
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

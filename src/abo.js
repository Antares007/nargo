module.exports = function ({ types: t }) {
  const vmap = {};
  const oname = "o";
  const bname = "β";
  const aname = "α";
  const sname = "Σ";
  return {
    name: "abo-transform",
    visitor: {
      Scopable(path) {
        if (!path.scope.bindings[oname] || vmap[path.scope.uid]) return;
        vmap[path.scope.uid] = 1;
        path.scope.bindings[oname].referencePaths.forEach(
          updatecallexpressions
        );
        if (
          ("ArrowFunctionExpression" === path.node.type ||
            "FunctionExpression" === path.node.type ||
            "FunctionDeclaration" === path.node.type ||
            "ObjectMethod" === path.node.type) &&
          path.node.params.length &&
          (path.node.params[0].name === oname ||
            (path.node.params[0].type === "ObjectPattern" &&
              path.node.params[0].properties.some(
                (p) => p.type === "ObjectProperty" && p.key.name === oname
              )))
        ) {
          const params = path.node.params.slice(1).reverse();
          let spread;
          if (params.length && params[0].type === "RestElement")
            spread = params.shift();
          path.node.params = [
            path.node.params[0],
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
                  t.memberExpression(
                    t.identifier(sname),
                    t.identifier("slice")
                  ),
                  [t.numericLiteral(0), t.identifier(bname)]
                )
              ),
              t.assignmentPattern(t.identifier(aname), t.numericLiteral(0))
            );
        }
      },
    },
  };
  function updatecallexpressions(p) {
    if (
      "CallExpression" === p.parent.type &&
      "Identifier" === p.parent.callee.type &&
      p.node === p.parent.arguments[0]
    ) {
      const cep = p.parentPath;
      cep.replaceWith(
        callexpression(cep.node.callee, cep.node.arguments.slice(1), p.node)
      );
    } else if (
      "MemberExpression" === p.parent.type &&
      p.node === p.parent.object &&
      "CallExpression" === p.parentPath.parent.type &&
      p.parentPath.parent.callee === p.parent
    ) {
      const cep = p.parentPath.parentPath;
      cep.replaceWith(
        callexpression(cep.node.callee, cep.node.arguments, p.node)
      );
    } else if (
      "VariableDeclarator" === p.parent.type &&
      p.node === p.parent.init
    ) {
      p.scope.bindings[p.parent.id.name].referencePaths.forEach(
        updatecallexpressions
      );
    } else if (
      "SpreadElement" === p.parent.type &&
      "ObjectExpression" === p.parentPath.parent.type
    ) {
      const oe = p.parentPath.parentPath;
      if ("VariableDeclarator" === oe.parent.type)
        oe.scope.bindings[oe.parent.id.name].referencePaths.forEach(
          updatecallexpressions
        );
      else if ("CallExpression" === oe.parent.type)
        oe.parentPath.replaceWith(
          callexpression(
            oe.parentPath.node.callee,
            oe.parentPath.node.arguments.slice(1),
            oe.node
          )
        );
    }
  }
  function callexpression(callee, arguments_, pith) {
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
      t.callExpression(callee, [pith, offset(arguments_.length)]),
    ]);
  }
  function offset(i) {
    return i
      ? t.binaryExpression("+", t.identifier(aname), t.numericLiteral(i))
      : t.identifier(aname);
  }
};

module.exports = function ({ types: t }) {
  const vmap = {};
  const oname = "o";
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
          "ArrowFunctionExpression" === path.node.type ||
          "FunctionExpression" === path.node.type ||
          "FunctionDeclaration" === path.node.type ||
          "ObjectMethod" === path.node.type
        )
          path.node.params = [
            path.node.params[0],
            t.identifier(aname),
            ...path.node.params
              .slice(1)
              .reverse()
              .map((p) =>
                t.assignmentPattern(
                  p,
                  t.memberExpression(
                    t.identifier(sname),
                    t.updateExpression("--", t.identifier(aname), true),
                    true
                  )
                )
              ),
          ];
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

module.exports = function (babel) {
  const { types: t } = babel;
  let visitor = {
    CallExpression(cep) {
      if (
        !cep.get("callee").isIdentifier() ||
        cep.node.arguments.length < 2 ||
        cep.node.arguments[0].name != "o"
      )
        return;
      const args = cep.node.arguments.slice(1).map(mapargs);
      cep.node.arguments = cep.node.arguments.slice(0, 1);
      const se = t.sequenceExpression([...args, cep.node]);
      cep.replaceWith(se);
    },
    Function(path) {
      const po = path.get("params.0");
      if (!po || !po.isIdentifier({ name: "o" })) {
        return;
      }
      po.scope.bindings.o.referencePaths.forEach((p) => {
        if (
          !p.parentPath.isMemberExpression() ||
          !p.parentPath.parentPath.isCallExpression()
        )
          return;
        const cep = p.parentPath.parentPath;
        const args = cep.node.arguments.map(mapargs);
        cep.node.arguments = [t.identifier("o")];
        const se = t.sequenceExpression([...args, cep.node]);
        cep.replaceWith(se);
      });
      if (!t.isBlockStatement(path.node.body) && path.node.params.length > 1)
        path.node.body = t.blockStatement([t.returnStatement(path.node.body)]);
      path.node.params
        .slice(1)
        .map(mapparams)
        .forEach((p) => path.node.body.body.unshift(p));
      path.node.params = path.node.params.slice(0, 1);
    },
  };
  return { name: "abo-transform", visitor };

  function mapargs(a) {
    return t.parenthesizedExpression(
      t.assignmentExpression(
        "=",
        t.memberExpression(
          t.memberExpression(t.identifier("o"), t.identifier("s")),
          t.updateExpression(
            "++",
            t.memberExpression(
              t.memberExpression(t.identifier("o"), t.identifier("s")),
              t.identifier("a")
            ),
            false
          ),
          true
        ),
        a
      )
    );
  }
  function mapparams(p) {
    const me = t.memberExpression(
      t.memberExpression(t.identifier("o"), t.identifier("s")),
      t.updateExpression(
        "--",
        t.memberExpression(
          t.memberExpression(t.identifier("o"), t.identifier("s")),
          t.identifier("a")
        ),
        true
      ),
      true
    );
    return t.variableDeclaration("const", [t.variableDeclarator(p, me)]);
  }
};

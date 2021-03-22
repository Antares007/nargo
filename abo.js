module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: "abo-transform",
    visitor: {
      Program(path) {
        path.unshiftContainer(
          "body",
          t.variableDeclaration("var", [
            t.variableDeclarator(t.identifier("α")),
          ])
        );
      },
      CallExpression(cep) {
        if (
          !cep.get("callee").isIdentifier() ||
          cep.node.abo ||
          cep.node.arguments[0].name != "o"
        )
          return;
        const advance = t.memberExpression(
          t.memberExpression(t.identifier("o"), t.identifier("s")),
          t.identifier("a")
        );
        const oldadvance = t.identifier("α");
        const args = cep.node.arguments.slice(1).map(push);
        cep.node.arguments = cep.node.arguments.slice(0, 1);
        cep.node.abo = true;
        if (isLast(cep))
          cep.replaceWith(t.sequenceExpression([...args, cep.node]));
        else
          cep.replaceWith(
            t.sequenceExpression([
              t.parenthesizedExpression(
                t.assignmentExpression("=", oldadvance, advance)
              ),
              ...args,
              cep.node,
              t.parenthesizedExpression(
                t.assignmentExpression("=", advance, oldadvance)
              ),
            ])
          );
      },
      "FunctionDeclaration|FunctionExpression|ObjectMethod"(path) {
        const po = path.get("params.0");
        if (!po || !po.isIdentifier({ name: "o" })) {
          return;
        }
        const advance = t.memberExpression(
          t.memberExpression(t.identifier("o"), t.identifier("s")),
          t.identifier("a")
        );
        const oldadvance = t.identifier("α");
        po.scope.bindings.o.referencePaths.forEach((p) => {
          if (
            !p.parentPath.isMemberExpression() ||
            !p.parentPath.parentPath.isCallExpression()
          )
            return;
          const cep = p.parentPath.parentPath;
          const args = cep.node.arguments.map(push);
          cep.node.arguments = [t.identifier("o")];
          if (isLast(cep))
            cep.replaceWith(t.sequenceExpression([...args, cep.node]));
          else
            cep.replaceWith(
              t.sequenceExpression([
                t.parenthesizedExpression(
                  t.assignmentExpression("=", oldadvance, advance)
                ),
                ...args,
                cep.node,
                t.parenthesizedExpression(
                  t.assignmentExpression("=", advance, oldadvance)
                ),
              ])
            );
        });
        path.node.params
          .slice(1)
          .map((p) =>
            t.variableDeclaration("const", [t.variableDeclarator(p, pop())])
          )
          .forEach((p) => path.node.body.body.unshift(p));
        path.node.body.body.unshift(
          t.variableDeclaration("var", [t.variableDeclarator(oldadvance)])
        );
        path.node.params = path.node.params.slice(0, 1);
      },
      ArrowFunctionExpression(path) {
        if (path.node.params.length && path.node.params[0].name == "o")
          path.replaceWith(
            t.functionExpression(
              path.node.id,
              path.node.params,
              t.isBlockStatement(path.node.body)
                ? path.node.body
                : t.blockStatement([t.returnStatement(path.node.body)])
            )
          );
      },
    },
  };

  function push(a) {
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
  function pop() {
    return t.memberExpression(
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
  }
  function isLast(cep) {
    let last = true;
    cep.find(
      (p) =>
        p.container.type === "ReturnStatement" ||
        "FunctionDeclaration|ArrowFunctionExpression|FunctionExpression|ObjectMethod|Program".includes(
          p.node.type
        ) ||
        !(last =
          last &&
          (typeof p.key !== "number" || p.container.length - 1 === p.key))
    );
    return last;
  }
};

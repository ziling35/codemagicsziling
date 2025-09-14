export default class CodeAnalyzer {
  analyze(rawCode, onlyVariablesInAttack, onlyVariablesInSwitch, language = 'python') {
    const lines = rawCode.split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
      const lineCode = lines[i];

      if (language === 'python') {
        const noParenthesisMatch = lineCode.match(/(hero\.[^\d\W]\w*)$/i);
        if (noParenthesisMatch) {
          return [
            {
              message: `要调用 \`${noParenthesisMatch[0]}\`，需要添加 \`()\`。`,
              line: i + 1,
            }
          ];
        }
      }
  
      const dashMatch = lineCode.match(/(hero.move-down)|(hero.move-up)|(hero.move-left)|(hero.move-right)|(find-nearest-enemy)|(has-enemy-around)|(fireball-up)|(fireball-down)|(fireball-left)|(fireball-right)/);
      if (dashMatch) {
        return [
          {
            message: `方法 \`${dashMatch[0]}\` 中应使用 \`_\` 而不是 \`-\`。`,
            line: i + 1,
          }
        ];
      }

      if (onlyVariablesInAttack) {
        const notVariableInAttackMatch = lineCode.match(/hero.attack\((".*")\)/);
        if (notVariableInAttackMatch) {
          return [
            {
              message: `请使用变量名（如 \`enemy1\`）替代字符串 \`${notVariableInAttackMatch[1]}\`。`,
              line: i + 1,
            }
          ];
        }
      }

      if (onlyVariablesInSwitch) {
        const notVariableInSwitchMatch = lineCode.match(/hero.switch\((".*")\)/);
        if (notVariableInSwitchMatch) {
          return [
            {
              message: `请使用变量名（如 \`桥1\`）替代字符串 \`${notVariableInSwitchMatch[1]}\`。`,
              line: i + 1,
            }
          ];
        }
      }

      const methodWithoutArgumentsMatch = lineCode.match(/hero\.(switch|attack)\(\s*\)/);
      if (methodWithoutArgumentsMatch) {
        const methodName = methodWithoutArgumentsMatch[1];
        return [
          {
            message: `方法 \`hero.${methodName}()\` 需要参数。`,
            line: i + 1,
          }
        ];
      }
    }

    return [];
  }
}
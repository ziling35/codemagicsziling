export default class ErrorMessageMapper {
    static map(esperMessage, language = 'python') {
        if (esperMessage.startsWith("Unmatched `(`") || esperMessage.startsWith("Unclosed `(` in function arguments"))
            return "缺少右括号 `)`。";

        if (esperMessage === "Empty if statement. Put 4 spaces in front of statements inside the if statement.")
            return "空的 `if` 语句。你是否忘了在语句前加上4个空格？"

        if (esperMessage === "Empty while statement. Put 4 spaces in front of statements inside the while statement.")
            return "空的 `while` 语句。你是否忘了在语句前加上4个空格？"

        if (esperMessage === "Unterminated string. Add a matching `\"` at the end of your string.")
            return "字符串缺少结束引号 `\"`。"

        if (esperMessage === "Unexpected token: expected T_NAME but found T_DOT while parsing trailer")
            return "你在一个点 `.` 后面又写了一个点 `.`"

        if (esperMessage === "Unexpected token: expected T_NAME but found T_NAME while parsing trailer")
            return language === 'cpp'
                ? "请检查条件/表达式是否被正确转译（C++ 条件已映射为 Python 表达式）。"
                : "你是在把 Python 关键字（如 while、if）当作 hero 的方法来用吗？"

        if (esperMessage === "Unexpected token: expected T_NAME but found T_NEWLINE while parsing trailer")
            return language === 'cpp'
                ? "语句可能被拆分成多行，请检查行末是否缺少冒号或括号。"
                : "你忘记调用方法了吗？"

        if (esperMessage.startsWith("Unexpected token: expected T_NAME"))
            return "方法调用有问题。"

        if (esperMessage === "Function calls paramaters must be seperated by `,`s")
            return "你忘了在函数参数之间添加逗号。"

        if (esperMessage === "Too much indentation at the beginning of this line.")
            return "本行开头的缩进过多。"

        const needColonMatch = esperMessage.match(/Need a `:` on the end of the line following `(.+)`\./);
        if (needColonMatch) {
            return language === 'cpp'
                ? `需要在 \`${needColonMatch[1]}\` 的下一行末尾添加 \`:\`（C++ 块已转为缩进/冒号）。`
                : `需要在 \`${needColonMatch[1]}\` 后一行的末尾添加 \`:\`。`;
        }

        const noOpeningParantethisMatch = esperMessage.match(/If you want to call (`.*`) as function, you need `\(\)`'s/);
        if (noOpeningParantethisMatch) {
            return language === 'cpp'
                ? `在 C++ 模式下，该表达式被映射为 Python 调用：请为 ${noOpeningParantethisMatch[1]} 添加 \`()\`。`
                : `如果你想调用方法 ${noOpeningParantethisMatch[1]}，需要添加 \`()\`。`;
        }

        const isNotAHeroMethodMatch = esperMessage.match(/(hero\..*) is not a function/)
        if (isNotAHeroMethodMatch) {
            return `方法 \`${isNotAHeroMethodMatch[1]}\` 不存在。请查看可用指令列表。`;
        }

        const isNotDefinedMatch = esperMessage.match(/(.*) is not defined/)
        if (isNotDefinedMatch) {
            return `方法或变量 \`${isNotDefinedMatch[1]}\` 不存在。请检查是否有拼写错误。`;
        }

        if (esperMessage.startsWith("Unterminated"))
            return "你是否忘了在字符串的开头和结尾添加引号？"

        return esperMessage;
    }
}
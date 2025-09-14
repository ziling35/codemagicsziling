// Minimal, constrained C++ to Python transpiler for the game DSL
// Extended support (still limited):
// - Strip headers/macros and namespaces: #include <...>, #define ..., using namespace ...;
// - Main function wrapper: int|void main() { ... } is unwrapped to top-level Python
// - Logical ops: && -> and, || -> or, !expr -> not expr
// - Conditionals: if / else if / else blocks -> if / elif / else:
// - While: while(true|1) { ... } -> while True:
// - Booleans: true/false -> True/False
// - Types: leading auto|int|float|double|string|bool|char|long|short (optional const) are removed
// - // comments removed; { } control indentation; solitary '{' lines are ignored

export function transpileCppToPython(cppSource) {
  if (typeof cppSource !== 'string') throw new Error('Invalid source');

  // Strict C++-like semicolon enforcement for simple statements
  // Allows: control headers (if/else/while/for), preprocessor, using/typedef, braces lines, and lines containing braces
  const rawLines = cppSource.replace(/\r\n?|\n/g, '\n').split('\n');
  for (let idx = 0; idx < rawLines.length; idx++) {
    let check = rawLines[idx].replace(/\/\/.*$/, '').trim();
    if (!check) continue;
    if (/^#\s*(include|define|pragma)\b/.test(check)) continue;
    if (/^using\s+namespace\b/.test(check)) continue;
    if (/^using\b/.test(check)) continue;
    if (/^typedef\b/.test(check)) continue;
    if (check === '{' || check === '}' ) continue;
    if (/^}\s*else(\s+if\s*\(.*\))?\s*\{?\s*$/.test(check)) continue;
    if (/^(if|else\s+if|else|while|for)\b/.test(check)) continue;
    if (/[{}]/.test(check)) continue; // single-line block or mixed braces line
    // Now a simple statement must end with ';'
    if (!/;\s*$/.test(check)) {
      throw new Error(`C++ 模式要求语句以分号结尾（第 ${idx + 1} 行）。`);
    }
  }

  // Preprocess: explode inline blocks/statements into separate lines
  const preprocessed = cppSource
    .replace(/\r\n?|\n/g, '\n')
    // isolate braces on their own lines
    .replace(/\{/g, '\n{\n')
    .replace(/\}/g, '\n}\n');

  const lines = preprocessed.split('\n');
  let indent = 0;
  const IND = '    ';
  const out = [];
  const macros = new Map();
  const aliasTypes = new Set();
  const escapeReg = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const baseTypes = ['auto','int','float','double','string','bool','char','long','short'];
  const getTypesAlt = () => {
    const aliasAlt = Array.from(aliasTypes).map(escapeReg).join('|');
    const baseAlt = baseTypes.join('|');
    return aliasAlt ? `(?:${baseAlt}|${aliasAlt})` : `(?:${baseAlt})`;
  };

  const push = (code) => out.push(IND.repeat(indent) + code);
  const forIncStack = [];

  for (let raw of lines) {
    let line = raw.trim();
    if (!line) { out.push(''); continue; }

    // Remove single-line comments
    line = line.replace(/\/\/.*$/, '');

    // Strip preprocessor and namespace lines; collect simple defines
    if (/^#\s*include\b/.test(line) || /^#\s*pragma\b/.test(line)) {
      continue;
    }
    const defineMatch = line.match(/^#\s*define\s+([A-Za-z_]\w*)\s+(.+)$/);
    if (defineMatch) {
      const name = defineMatch[1];
      let value = defineMatch[2].trim();
      // Ignore function-like macros: NAME(...)
      if (!/^[A-Za-z_]\w*\s*\(/.test(defineMatch[2])) {
        macros.set(name, value);
      }
      continue;
    }
    // Ignore using/typedef statements (aliases)
    if (/^using\s+namespace\b/.test(line)) {
      continue;
    }
    // using Alias = Type;
    const usingAlias = line.match(/^using\s+([A-Za-z_]\w*)\s*=\s*.+;?$/);
    if (usingAlias) {
      aliasTypes.add(usingAlias[1]);
      continue;
    }
    // typedef SomeType Alias;
    const typedefAlias = line.match(/^typedef\b[^{;]*?\b([A-Za-z_]\w*)\s*;?$/);
    if (typedefAlias) {
      aliasTypes.add(typedefAlias[1]);
      continue;
    }
    if (/^using\b/.test(line)) {
      // e.g., using Size = int;
      continue;
    }
    if (/^typedef\b/.test(line)) {
      continue;
    }

    // Unwrap main function header to nothing (do not indent top-level)
    if (/^(?:int|void)\s+main\s*\(\s*(?:void)?\s*\)\s*\{?\s*$/.test(line)) {
      continue;
    }

    // Handle closing brace first
    if (line.startsWith('}')) {
      // emit for-increment if exists for this block level
      if (forIncStack.length > 0 && forIncStack[forIncStack.length - 1].level === indent) {
        const inc = forIncStack.pop().inc;
        if (inc) push(inc);
      }
      indent = Math.max(0, indent - 1);
      line = line.replace(/^\}\s*;?/, '').trim();
      if (!line) { continue; }
    }

    // Replace booleans
    line = line.replace(/\btrue\b/g, 'True').replace(/\bfalse\b/g, 'False');

    // Logical operators
    line = line.replace(/&&/g, ' and ').replace(/\|\|/g, ' or ');
    // Unary not
    line = line.replace(/!\s*\(/g, 'not (');
    line = line.replace(/!\s*([A-Za-z_][A-Za-z0-9_\.\(\)]*)/g, 'not $1');

    // Remove simple type keywords at the start of the statement
    line = line.replace(new RegExp(`^(?:const\\s+)?${getTypesAlt()}\\s+`), '');
    // Also remove inline declarations like: Type name = expr
    line = line.replace(new RegExp(`\\b(?:const\\s+)?${getTypesAlt()}\\s+([A-Za-z_]\\w*)\\s*=`, 'g'), '$1 =');

    // Remove std:: prefix for identifiers commonly used (best-effort)
    line = line.replace(/\bstd::/g, '');

    // Skip basic i/o lines (cout/cin) which are unsupported in DSL
    if (/^(?:std::)?(?:cout|cin)\b/.test(line)) {
      continue;
    }

    // Replace while(true|1) / while ( True ) with Python while True:
    line = line.replace(/^while\s*\(\s*(?:True|1)\s*\)\s*\{?\s*$/, 'while True:');
    // Normalize C-style comparisons (no change for Python-compatible operators, kept for clarity)
    // Ensure conditions like i < 2 remain untouched
    
    // Basic for loop conversion: for (init; cond; inc) { ... } -> init; while cond: ...; inc
    // Only supports simple patterns like: for (int i=0; i<n; i++) or i+=1 / ++i / i = i + 1
    const forMatch = line.match(/^for\s*\(\s*([^;]*?)\s*;\s*([^;]*?)\s*;\s*([^\)]*?)\s*\)\s*\{?\s*$/);
    if (forMatch) {
      let init = forMatch[1].trim();
      let cond = forMatch[2].trim() || 'True';
      let inc  = forMatch[3].trim();
      // strip types from init
      init = init.replace(new RegExp(`^(?:const\\s+)?${getTypesAlt()}\\s+`), '');
      // remove trailing semicolons
      init = init.replace(/;\s*$/, '');
      // If init contains inline semicolons due to preprocessing, keep only first statement
      if (init.includes(';')) {
        init = init.split(';')[0].trim();
      }
      // Normalize common increments
      inc = inc
        .replace(/\+\+\s*$/, '+= 1')
        .replace(/^\+\+/, '+= 1')
        .replace(/--\s*$/, '-= 1')
        .replace(/^--/, '-= 1')
        .replace(/\s*;\s*$/, '');
      if (inc.includes(';')) {
        inc = inc.split(';').filter(Boolean).map(s => s.trim()).join('; ');
      }

      if (init) push(init.replace(/;\s*$/, ''));
      push(`while ${cond}:`);
      indent += 1;
      // Stash increment to inject at block end for this indent level
      forIncStack.push({ level: indent, inc });
      continue;
    }
    // Replace if (cond) { -> if cond:
    line = line.replace(/^if\s*\(\s*(.+?)\s*\)\s*\{?\s*$/, (m, cond) => `if ${cond}:`);

    // else if -> elif
    line = line.replace(/^else\s+if\s*\(\s*(.+?)\s*\)\s*\{?\s*$/, (m, cond) => `elif ${cond}:`);
    // else {
    line = line.replace(/^else\s*\{?\s*$/, 'else:');

    // Remove trailing opening brace and add colon if control structure
    if (line === '{') {
      // ignore solitary opening brace (non-control blocks)
      continue;
    }
    if (/\{$/.test(line)) {
      line = line.replace(/\{\s*$/, ':');
    }

    // Map hero DSL; allow optional semicolons
    line = line.replace(/;\s*$/, '');

    // Skip trivial returns (common in main)
    if (/^return\s*(?:\d+)?\s*$/.test(line)) {
      continue;
    }

    // Apply simple macro substitutions (token-aware)
    if (macros.size > 0) {
      for (const [name, value] of macros.entries()) {
        const re = new RegExp(`\\b${name}\\b`, 'g');
        line = line.replace(re, value);
      }
    }

    // Skip bare type-only lines (e.g., "int" or alias-only) that could appear after preprocessing
    const typeOnlyRe = new RegExp(`^(?:const\\s+)?${getTypesAlt()}\s*$`);
    if (typeOnlyRe.test(line)) {
      continue;
    }

    push(line);

    // Increase indent after control lines ending with ':'
    if (/:\s*$/.test(line)) {
      indent += 1;
    }
  }

  const py = out.join('\n');

  return py;
}



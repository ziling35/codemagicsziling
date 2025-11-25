import { CodeMirrorWrapper } from './styled';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion, snippetCompletion } from '@codemirror/autocomplete';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { indentUnit } from '@codemirror/language';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { AvailableCommands } from '../AvailableCommands/AvailableCommands';
import { Button } from '../Button/Button';
import arrowIcon from '../../assets/bold-arrow.svg';
import React, { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import { CodeError } from '../CodeError/CodeError';

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

const basicSetup = {
  highlightActiveLineGutter: false,
};

const getCompletions = (options) => {
  return (context) => {
    const word = context.matchBefore(/(\w|\.|\(|\))+/);

    if (!word || (word.from == word.to && !context.explicit)) {
      return null;
    }

    return {
      from: word.from,
      options,
    };
  };
};

export const CodeEditor = ({
  isRunning,
  isPaused,
  executingLine,
  code,
  codeErrors,
  instructions,
  language = 'python',
  onCodeChange,
  onErrorsClear,
}) => {
  const [isCommandsOpen, setIsCommandsOpen] = useState(instructions.newCommands && instructions.newCommands.length > 0);
  const { height: innerHeight, width: windowWidth } = useWindowSize();

  const commands = [...instructions.newCommands, ...instructions.prevCommands];
  const options = commands.map((command) =>
    snippetCompletion(command.autocompleteValue ?? command.code, {
      label: command.code,
      detail: command.description,
    }),
  );
  // Extra C++-specific snippets (blocks, declarations, loops)
  const cppExtraOptions = [
    snippetCompletion('if (${cond}) {\n    ${body}\n}', { label: 'if (...) { }', detail: '条件分支', type: 'keyword' }),
    snippetCompletion('else if (${cond}) {\n    ${body}\n}', { label: 'else if (...) { }', detail: '条件分支', type: 'keyword' }),
    snippetCompletion('else {\n    ${body}\n}', { label: 'else { }', detail: '条件分支', type: 'keyword' }),
    snippetCompletion('while (true) {\n    ${body}\n}', { label: 'while (true) { }', detail: '循环', type: 'keyword' }),
    snippetCompletion('for (int i = 0; i < n; i++) {\n    ${body}\n}', { label: 'for (int i = 0; i < n; i++) { }', detail: '计数循环', type: 'keyword' }),
    snippetCompletion('int i = 0;', { label: 'int i = 0;', detail: '变量声明', type: 'variable' }),
    snippetCompletion('auto enemy = hero.find_nearest_enemy();', { label: 'auto enemy = hero.find_nearest_enemy();', detail: '变量赋值', type: 'variable' }),
  ];
  const extensions = [
    (language === 'cpp' ? cpp() : python()),
    autocompletion({
      override: [getCompletions(language === 'cpp' ? [...options, ...cppExtraOptions] : options)],
    }),
    indentUnit.of("    "),
  ];
  const width = 529;

  const [opennedCommandsHeight, closedCommandsHeight] =
    windowWidth <= 1366 ? [200, 0] : [268, 65];
  const height = `${innerHeight - (isCommandsOpen ? opennedCommandsHeight : closedCommandsHeight)}px`;

  const addCommand = (command) => onCodeChange(code + '\n' + command);

  const insertCommand = (rawCode) => {
    const trimmed = rawCode.trim();
    // In C++ mode, append semicolon for single-line statements only.
    // Do NOT append for blocks or multi-line snippets.
    let toInsert = trimmed;
    if (language === 'cpp') {
      const isBlock = /\{$/.test(trimmed) || /\}$/.test(trimmed) || trimmed.includes('\n');
      if (!isBlock && !trimmed.endsWith(';')) {
        toInsert = trimmed + ';';
      }
    }
    addCommand(toInsert);
  };

  const toggleCommands = () => setIsCommandsOpen(!isCommandsOpen);

  return (
    <>
      {/* 隐藏上下左右按钮和命令按钮 */}
      {/* {instructions && (instructions.newCommands || instructions.prevCommands) && (
        <div style={{
          display: 'flex',
          gap: 16,
          marginBottom: 12,
          maxWidth: 529,
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}>
            <Button
              shadowColor="#1B4B82"
              frontColor="#2D7CD4"
              width={73}
              height={73}
              shadowHeight={12}
              icon={arrowIcon}
              alt="up"
              imageRotation={90}
              onClick={() => insertCommand('hero.move_up()')}
            />
            <Button
              shadowColor="#1B4B82"
              frontColor="#2D7CD4"
              width={73}
              height={73}
              shadowHeight={12}
              icon={arrowIcon}
              alt="down"
              imageRotation={-90}
              onClick={() => insertCommand('hero.move_down()')}
            />
            <Button
              shadowColor="#1B4B82"
              frontColor="#2D7CD4"
              width={73}
              height={73}
              shadowHeight={12}
              icon={arrowIcon}
              alt="left"
              onClick={() => insertCommand('hero.move_left()')}
            />
            <Button
              shadowColor="#1B4B82"
              frontColor="#2D7CD4"
              width={73}
              height={73}
              shadowHeight={12}
              icon={arrowIcon}
              alt="right"
              imageRotation={180}
              onClick={() => insertCommand('hero.move_right()')}
            />
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignContent: 'flex-start',
          }}>
            {(() => {
              const movementSet = new Set(['hero.move_up()', 'hero.move_down()', 'hero.move_left()', 'hero.move_right()']);
              const all = [...instructions.newCommands, ...instructions.prevCommands];
              const rest = all.filter(c => !movementSet.has((c.code || '').trim()));
              return rest.map((cmd, idx) => (
                <div key={`${cmd.code}-${idx}`} title={cmd.description}>
                  <Button
                    shadowColor="#1B4B82"
                    frontColor="#2D7CD4"
                    width={150}
                    height={50}
                    shadowHeight={12}
                    onClick={() => insertCommand(cmd.autocompleteValue ?? cmd.code)}
                    fontFamily="Montserrat"
                  >{cmd.code}</Button>
                </div>
              ));
            })()}
          </div>
        </div>
      )} */}
      <CodeMirrorWrapper
        width={width}
        errorLine={codeErrors?.[0].line}
        highlightFocusedLine={!isRunning && !isPaused}
        executingLine={executingLine}
      >
        <CodeMirror
          autoFocus
          value={code}
          width={`${width}px`}
          height={height}
          theme={theme}
          readOnly={isRunning}
          extensions={extensions}
          basicSetup={basicSetup}
          onChange={onCodeChange}
          selection={{ anchor: code.length }}
        />
        {instructions && (
          <AvailableCommands
            isOpen={isCommandsOpen}
            newCommands={instructions.newCommands}
            prevCommands={instructions.prevCommands}
            onAdd={insertCommand}
            onToggle={toggleCommands}
          />
        )}
        {codeErrors && (
          <CodeError codeErrors={codeErrors} onErrorsClear={onErrorsClear} />
        )}
      </CodeMirrorWrapper>
    </>
  );
};

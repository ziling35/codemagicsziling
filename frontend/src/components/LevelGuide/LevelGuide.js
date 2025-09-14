import React, { useState } from 'react';

import arrow2Icon from '../../assets/arrow-2.svg';

import { Button } from '../Button/Button';

import { useNavigate, useParams } from 'react-router-dom';

import {
  Wrapper,
  Modal,
  Top,
  Title,
  CloseButton,
  Block,
  Instructions,
  CodeMirrorWrapper,
  NewCommandsWrapper,
  Subtitle,
  Steps,
  Control,
  CirclesWrapper,
  Circle,
  ButtonsWrapper,
  CodeTag,
} from './styled';
import {
  Top as NewCommandTop,
  Tag,
  Description,
  Example,
  ExampleTitle,
} from '../CommandDescription/styled';
import close2Icon from '../../assets/close-2.svg';
import { extract } from '../../utils/extract';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { tags as t } from '@lezer/highlight';
import { python } from '@codemirror/lang-python';
import { useWindowSize } from '../../hooks/useWindowSize';

const basicSetup = {
  highlightActiveLineGutter: false,
};

const extensions = [python()];

const theme = vscodeDarkInit({
  styles: [{ tag: t.comment, color: 'rgba(255, 255, 255, 0.5)' }],
});

function splitStringOutsideQuotes(inputString) {
  const parts = [];
  const insideQuotes = inputString.match(/`([^`]*)`/g); // Находим все подстроки внутри одинарных кавычек
  const outsideParts = inputString.split(/`[^`]+`/); // Разбиваем строку на части вне одинарных кавычек

  // Добавляем части вне одинарных кавычек в результирующий массив
  for (let i = 0; i < outsideParts.length; i++) {
    if (outsideParts[i].trim() !== '') {
      parts.push(outsideParts[i].trim());
    }

    // Если есть соответствующая подстрока внутри одинарных кавычек, добавляем ее тоже в результирующий массив
    if (insideQuotes && insideQuotes[i]) {
      parts.push(insideQuotes[i]);
    }
  }

  return parts;
}

export const LevelGuide = ({ level, data, onClose }) => {
  const { instructions, example, newCommands } = data;
  const [commandIndex, setCommandIndex] = useState(0);
  const newCommand = newCommands[commandIndex];
  const newCommandCode = extract(newCommand?.code);
  const navigate = useNavigate();
  const { height } = useWindowSize();

  const hasPrev = commandIndex > 0;

  const hasNext = commandIndex < newCommands.length - 1;

  const next = () => {
    if (hasNext) {
      setCommandIndex(commandIndex + 1);
    }
  };

  const prev = () => {
    if (hasPrev) {
      setCommandIndex(commandIndex - 1);
    }
  };

  const openMenu = () => {
    navigate(`/game`);
  };

  return (
    <Wrapper>
      <Modal>
        <Top>
          <Title>关卡 {level}</Title>
          <CloseButton onClick={onClose}>
            <img src={close2Icon} alt="close" />
          </CloseButton>
        </Top>

        {instructions || example ? (
          <Block>
            {instructions
              ? <Instructions>
                {splitStringOutsideQuotes(instructions).map((text, i) => {
                  if (text.includes("`")) {
                    return <CodeTag key={i}>{text.replace(/`/g, '')}</CodeTag>;
                  } else {
                    return <span key={i}>{text}</span>
                  }
                })}
              </Instructions>
              : null
            }
            {example ? (
              <CodeMirrorWrapper>
                <CodeMirror
                  extensions={extensions}
                  basicSetup={basicSetup}
                  theme={theme}
                  value={example}
                  editable={false}
                />
              </CodeMirrorWrapper>
            ) : null}
          </Block>
        ) : null}

        {height >= 709 && newCommand ? (
          <NewCommandsWrapper>
            <Subtitle>新指令</Subtitle>
            <Block>
              <NewCommandTop>
                <Subtitle>
                  {newCommandCode.name}
                  <span>{newCommandCode.brackets}</span>
                </Subtitle>
                <span>-</span>
                <Tag>方法</Tag>
              </NewCommandTop>
              <Description>{newCommand.description}</Description>
              <Example>
                <ExampleTitle>使用示例：</ExampleTitle>
                <CodeMirrorWrapper>
                  <CodeMirror
                    extensions={extensions}
                    basicSetup={basicSetup}
                    theme={theme}
                    value={newCommand?.example}
                    editable={false}
                  />
                </CodeMirrorWrapper>
              </Example>

              {newCommands.length > 1 ? (
                <Steps>
                  <Control type="prev" onClick={prev} disabled={!hasPrev}>
                    <img src={arrow2Icon} alt="上一条" />
                  </Control>

                  <CirclesWrapper>
                    {newCommands.map((_, i) => (
                      <Circle
                        key={i}
                        isActive={i === commandIndex}
                        onClick={() => setCommandIndex(i)}
                      />
                    ))}
                  </CirclesWrapper>

                  <Control type="next" onClick={next} disabled={!hasNext}>
                    <img src={arrow2Icon} alt="下一条" />
                  </Control>
                </Steps>
              ) : null}
            </Block>
          </NewCommandsWrapper>
        ) : null}

        <ButtonsWrapper>
          <Button frontColor="#BD3A0F" shadowColor="#8C2B0B" onClick={openMenu} height="50" width="100">
            <span>菜单</span>
          </Button> 
          <Button frontColor="#40BF4C" shadowColor="#1E9029" onClick={onClose} height="50" width="100">
            <span>继续</span>
          </Button>
        </ButtonsWrapper>
      </Modal>
    </Wrapper>
  );
};

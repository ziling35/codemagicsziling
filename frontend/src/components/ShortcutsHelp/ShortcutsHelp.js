import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyboardManager } from '../../utils/keyboardShortcuts';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
`;

const Panel = styled.div`
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 24px;
  padding: 32px;
  max-width: 700px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    max-height: 90vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ShortcutsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const ShortcutItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const ShortcutIcon = styled.div`
  font-size: 32px;
  min-width: 32px;
  text-align: center;
`;

const ShortcutInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ShortcutDescription = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;

const ShortcutKey = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

const Key = styled.span`
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  font-family: 'Courier New', monospace;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Tip = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  border-left: 4px solid #667eea;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.6;

  strong {
    color: #fff;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  transition: all 0.3s;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 13px;
  }
`;

export const ShortcutsHelp = ({ showToggleButton = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);

  useEffect(() => {
    setShortcuts(keyboardManager.getAllShortcuts());

    // 监听 ? 键打开帮助
    const handleKeyPress = (e) => {
      if (e.key === '?' && !isOpen) {
        setIsOpen(true);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isOpen]);

  const parseShortcut = (shortcut) => {
    return shortcut.split(' + ').map((key, index) => (
      <Key key={index}>{key}</Key>
    ));
  };

  return (
    <>
      {showToggleButton && (
        <ToggleButton onClick={() => setIsOpen(true)}>
          ⌨️ 快捷键 (?)
        </ToggleButton>
      )}

      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <Panel onClick={(e) => e.stopPropagation()}>
            <Header>
              <Title>
                ⌨️ 键盘快捷键
              </Title>
              <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
            </Header>

            <ShortcutsList>
              {shortcuts.map((item) => (
                <ShortcutItem key={item.key}>
                  <ShortcutIcon>{item.icon}</ShortcutIcon>
                  <ShortcutInfo>
                    <ShortcutDescription>{item.description}</ShortcutDescription>
                    <ShortcutKey>{parseShortcut(item.shortcut)}</ShortcutKey>
                  </ShortcutInfo>
                </ShortcutItem>
              ))}
            </ShortcutsList>

            <Tip>
              <strong>💡 小提示：</strong> 按 <Key>?</Key> 键可随时打开此帮助面板。熟练使用快捷键可以大大提升你的编程效率！
            </Tip>
          </Panel>
        </Overlay>
      )}
    </>
  );
};

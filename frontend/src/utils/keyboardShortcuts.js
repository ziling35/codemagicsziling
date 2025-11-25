// 键盘快捷键系统
export const SHORTCUTS = {
  RUN_CODE: {
    key: 'Enter',
    ctrl: true,
    description: '运行代码',
    icon: '▶️'
  },
  STOP_CODE: {
    key: 'Escape',
    description: '停止运行',
    icon: '⏹️'
  },
  TOGGLE_GUIDE: {
    key: 'h',
    ctrl: true,
    description: '打开/关闭提示',
    icon: '💡'
  },
  TOGGLE_GOALS: {
    key: 'g',
    ctrl: true,
    description: '显示/隐藏目标',
    icon: '🎯'
  },
  RESET_LEVEL: {
    key: 'r',
    ctrl: true,
    shift: true,
    description: '重置关卡',
    icon: '🔄'
  },
  NEXT_LEVEL: {
    key: 'n',
    ctrl: true,
    description: '下一关卡',
    icon: '⏭️'
  },
  ZOOM_IN: {
    key: '+',
    ctrl: true,
    description: '放大地图',
    icon: '🔍+'
  },
  ZOOM_OUT: {
    key: '-',
    ctrl: true,
    description: '缩小地图',
    icon: '🔍-'
  },
  TOGGLE_ACHIEVEMENTS: {
    key: 'a',
    ctrl: true,
    description: '打开成就面板',
    icon: '🏆'
  },
  TOGGLE_CHALLENGES: {
    key: 'c',
    ctrl: true,
    description: '打开每日挑战',
    icon: '📅'
  }
};

export class KeyboardShortcutManager {
  constructor() {
    this.shortcuts = {};
    this.enabled = true;
  }

  register(shortcutKey, callback) {
    const shortcut = SHORTCUTS[shortcutKey];
    if (!shortcut) {
      console.warn(`Unknown shortcut: ${shortcutKey}`);
      return;
    }

    this.shortcuts[shortcutKey] = {
      ...shortcut,
      callback
    };
  }

  unregister(shortcutKey) {
    delete this.shortcuts[shortcutKey];
  }

  handleKeyDown = (event) => {
    if (!this.enabled) return;

    Object.values(this.shortcuts).forEach(shortcut => {
      const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

      if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
        event.preventDefault();
        shortcut.callback(event);
      }
    });
  }

  enable() {
    this.enabled = true;
    window.addEventListener('keydown', this.handleKeyDown);
  }

  disable() {
    this.enabled = false;
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getShortcutString(shortcutKey) {
    const shortcut = SHORTCUTS[shortcutKey];
    if (!shortcut) return '';

    const parts = [];
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.shift) parts.push('Shift');
    if (shortcut.alt) parts.push('Alt');
    parts.push(shortcut.key.toUpperCase());

    return parts.join(' + ');
  }

  getAllShortcuts() {
    return Object.entries(SHORTCUTS).map(([key, shortcut]) => ({
      key,
      shortcut: this.getShortcutString(key),
      description: shortcut.description,
      icon: shortcut.icon
    }));
  }
}

export const keyboardManager = new KeyboardShortcutManager();

// React Hook for keyboard shortcuts
export const useKeyboardShortcut = (shortcutKey, callback, deps = []) => {
  const { useEffect } = require('react');

  useEffect(() => {
    keyboardManager.register(shortcutKey, callback);
    keyboardManager.enable();

    return () => {
      keyboardManager.unregister(shortcutKey);
    };
  }, deps);
};

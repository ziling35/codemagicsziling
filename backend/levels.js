export const levels = {
  ['forest']: {
    [1]: {
      height: 3,
      width: 5,
      grid: [
        ["lawn","grass","tree","lawn","lawn",],
        ["sand","sand","sand","tree","tree",],
        ["rock","sand","sand","sand","sand",],
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 2, y: 4 },
      gems: [
        { x: 1, y: 2 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '帮我到达终点', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '路上能拾到宝石就更好了', required: false },
      ],
      levers: [],
      bridges: [],
    },
  
    [2]: {
      height: 4,
      width: 4,
      grid: [
        ["tree","sand","tree","grass",],
        ["lawn","sand","lawn","rock",],
        ["lawn","sand","sand","sand",],
        ["lawn","grass","lawn","sand",],
      ],
      hero: { x: 1, y: 2 },
      finish: { x: 3, y: 3 },
      gems: [
        { x: 1, y: 0 },
        { x: 3, y: 0 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '我需要到达终点', required: true },
        { type: 'gems', name: '收集宝石', heroText: '我们把所有宝石都收集起来吧', required: false },
      ],
      levers: [],
      bridges: [],
    },
  
    [3]: {
      height: 5,
      width: 7,
      grid: [
        ["tree","lawn","sand","lawn","rock","tree","rock",],
        ["lawn","lawn","sand","lawn","lawn","lawn","lawn",],
        ["lawn","lawn","sand","sand","sand","sand","sand",],
        ["watert","lawn","rock","watert","watert","lawn","lawn",],
        ["water","watert","watert","water","water","watert","tree",],
      ],
      hero: { x: 2, y: 0 },
      finish: { x: 2, y: 6 },
      gems: [ { x: 2, y: 3 }],
      enemies: [],
  
      goals: [
        { type: 'finish', name: '到达终点', heroText: '带我到终点', required: true },
        { type: 'lines', name: '仅使用 1 行代码', heroText: '你只能使用 1 行代码', linesCount: 1, required: true },
        { type: 'gems', name: '拾取宝石', heroText: '我们拾起宝石吧', required: false },
      ],
      levers: [],
      bridges: [],
    },
  
    [4]: {
      height: 5,
      width: 8,
      grid: [
        ["lawn","lawn","grass","lawn","rock","tree","sand","tree"],
        ["sand","sand","sand","lawn","rock","lawn","sand","lawn"],
        ["tree","lawn","sand","lawn","rock","sand","sand","grass"],
        ["grass","tree","sand","sand","sand","sand","lawn","lawn"],
        ["lawn","grass","lawn","lawn","lawn","sand","sand","lawn"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 0, y: 6 },
      gems: [
        { x: 0, y: 3 },
        { x: 4, y: 3 },
        { x: 1, y: 7 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '我需要到达终点', required: true },
        { type: 'gems', name: '收集宝石', heroText: '我们把所有宝石都收集起来吧', required: false },
      ],
      levers: [],
      bridges: [],
    },

    [5]: {
      height: 7,
      width: 8,
      grid: [
        ["sand","sand","tree","lawn","watert","watert","tree","tree"],
        ["lawn","sand","sand","lawn","water","water","lawn","lawn"],
        ["lawn","lawn","sand","lawn","water","water","lawn","lawn"],
        ["lawn","lawn","sand","lawn","sand","sand","sand","lawn"],
        ["rock","rock","sand","rock","lawn","lawn","sand","sand"],
        ["lawn","sand","sand","lawn","tree","lawn","sand","rock"],
        ["lawn","sand","lawn","lawn","lawn","tree","sand","lawn"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 6, y: 1 },
      gems: [
        { x: 1, y: 7 },
        { x: 6, y: 6 },
        { x: 3, y: 0 },
        { x: 6, y: 4 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '帮我到达终点', required: true },
        { type: 'lines', name: '不超过 10 行代码', heroText: '你最多只能写 10 行代码', linesCount: 10, required: true },
        { type: 'gems', name: '收集宝石', heroText: '我们把所有宝石都收集起来吧', required: false },
      ],
      levers: [],
      bridges: [],
    },

    [6]: {
      height: 4,
      width: 9,
      grid: [
        ["tree","lawn","tree","watert","watert","watert","rock","tree","lawn",],
        ["sand","sand","grass","water","water","water","lawn","sand","tree",],
        ["lawn","sand","sand","water","water","water","sand","sand","sand",],
        ["lawn","rock","lawn","water","water","water","lawn","sand","lawn",],
      ],
      hero: { x: 2, y: 0 },
      finish: { x: 2, y: 8 },
      gems: [
        { x: 1, y: 6 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达对岸的终点', heroText: '我得想办法过河。\n也许这个拉杆能帮上忙？', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '路上能拾到宝石就更好了', required: false },
      ],
      levers: [
        { x: 3, y: 2, name: "桥", activatesId: "bridge", enabled: false }
      ],
      bridges: [
        {
          id: "bridge",
          vertical: false,
          start: { x: 2, y: 3 },
          end: { x: 2, y: 5 },
          activated: false,
        },
      ],
    },

    [7]: {
      height: 6,
      width: 9,
      grid: [
        ["tree","tree","lawn","watert","watert","watert","lawn","lawn","rock",],
        ["lawn","sand","sand","water","water","water","sand","sand","sand",],
        ["watert","watert","watert","water","water","water","watert","watert","watert",],
        ["water","water","water","water","water","water","water","water","water",],
        ["lawn","sand","sand","water","water","water","sand","sand","sand",],
        ["lawn","rock","lawn","water","water","water","lawn","rock","lawn",],
      ],
      hero: { x: 4, y: 8 },
      finish: { x: 1, y: 8 },
      gems: [
        { x: 1, y: 7 }, { x: 1, y: 0 }
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '带我走过桥', required: true },
        { type: 'lines', name: '不超过 8 行代码', heroText: '你需要控制在 8 行代码内', linesCount: 8, required: true },
        { type: 'gems', name: '拾取宝石', heroText: '我们能把所有宝石都收集吗？', required: false },
      ],
      levers: [
        { x: 5, y: 6, name: "桥1", activatesId: "bridge1", enabled: false },
        { x: 4, y: 0, name: "桥2", activatesId: "bridge2", enabled: true },
        { x: 0, y: 2, name: "桥3", activatesId: "bridge3", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 4, y: 3 },
          end: { x: 4, y: 5 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 2, y: 1 },
          end: { x: 3, y: 1 },
          activated: true,
        },
        {
          id: "bridge3",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 5 },
          activated: false,
        },
      ],
    },
  
    [8]: {
      height: 7,
      width: 9,
      grid: [
        ["lawn","lawn","rock","watert","watert","watert","tree","sand","tree",],
        ["sand","sand","sand","water","water","water","sand","sand","lawn",],
        ["lawn","sand","lawn","water","water","water","rock","lawn","lawn",],
        ["watert","watert","watert","water","water","water","watert","watert","watert",],
        ["water","water","water","water","water","water","water","water","water",],
        ["sand","grass","sand","sand","lawn","sand","sand","rock","grass",],
        ["tree","grass","lawn","sand","sand","sand","lawn","lawn","sand",],
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 6, y: 8 },
      gems: [
        { x: 1, y: 7 },
        { x: 5, y: 4 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达对岸的终点', heroText: '我得想办法过河。\n也许这个拉杆能帮上忙？', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '路上能拾到宝石就更好了', required: false },
      ],
      levers: [
        { x: 2, y: 2, name: "桥1", activatesId: "bridge1", enabled: false },
        { x: 1, y: 8, name: "桥2", activatesId: "bridge2", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 5 },
          activated: false,
          hidden: true
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 3, y: 1 },
          end: { x: 4, y: 1 },
          activated: false,
          hidden: true
        },
      ],
    },

    [9]: {
      height: 9,
      width: 5,
      grid: [
        ["rock","tree","sand","tree","rock"],
        ["lawn","lawn","sand","sand","lawn"],
        ["watert","watert","watert","watert","watert"],
        ["water","water","water","water","water"],
        ["water","water","water","water","water"],
        ["water","water","water","water","water"],
        ["rock","sand","sand","lawn","lawn"],
        ["sand","sand","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn","tree"],
      ],
      hero: { x: 0, y: 2 },
      finish: { x: 8, y: 2 },
      gems: [
        { x: 6, y: 2 },
        { x: 7, y: 2 },
      ],
      enemies: [],
      goals: [
        { type: 'finish', name: '到达对岸的终点', heroText: '对岸有很多宝石，我们过去吧', required: true },
        { type: 'lever', leverName: "秘密", name: '找到拉杆的名称并切换它', heroText: '为此需要找出能为我打开桥的拉杆名称', required: true },
        { type: 'gems', name: '收集所有宝石', required: true },
      ],
      levers: [
        { x: 1, y: 1, name: "秘密", activatesId: "bridge1", enabled: false, hidden: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 2, y: 2 },
          end: { x: 5, y: 2 },
          activated: false,
        },
      ],
    },
  
    [10]: {
      height: 5,
      width: 8,
      grid: [
        ["tree","lawn","lawn","lawn","lawn","lawn","lawn","lawn",],
        ["sand","sand","rock","lawn","lawn","lawn","watert","watert",],
        ["lawn","sand","lawn","tree","watert","watert","water","water",],
        ["tree","sand","sand","lawn","rock","water","water","lawn",],
        ["lawn","lawn","sand","sand","sand","sand","sand","sand",],
      ],
      hero: { x: 0, y: 7 },
      finish: { x: 4, y: 7 },
      gems: [
        { x: 4, y: 0 },
      ],
      enemies: [
        { x: 0, y: 1, alive: true, name: "John" },
        { x: 4, y: 5, alive: true, name: "Greg" },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '带我到终点', required: true },
        { type: 'enemies', name: '击败所有敌人', heroText: '敌人挡住了道路，必须消灭他们', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '路上能拾到宝石就更好了', required: false },
      ],
      levers: [],
      bridges: [],
    },

    [11]: {
      height: 6,
      width: 13,
      grid: [
        ["tree","tree","tree","watert","watert","watert","watert","watert","watert","watert","tree","tree","tree",],
        ["lawn","sand","sand","water","water","water","water","water","water","water","sand","sand","lawn",],
        ["lawn","sand","lawn","water","water","water","sand","water","water","water","lawn","sand","lawn",],
        ["lawn","sand","lawn","water","water","rock","sand","rock","water","water","lawn","sand","lawn",],
        ["grass","sand","lawn","water","water","lawn","sand","lawn","water","water","lawn","sand","lawn",],
        ["rock","sand","rock","water","water","tree","sand","lawn","water","water","rock","sand","rock",],
      ],
      hero: { x: 1, y: 11 },
      finish: { x: 5, y: 1 },
      gems: [
        { x: 1, y: 1 },
        { x: 5, y: 6 },
      ],
      enemies: [
        { x: 1, y: 3, alive: true, name: "Alog" },
        { x: 1, y: 5, alive: true, name: "Bran" },
        { x: 1, y: 7, alive: true, name: "Cerk" },
        { x: 1, y: 9, alive: true, name: "Dunrum" },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: null, required: true },
        { type: 'enemies', name: '击败所有敌人', heroText: '必须消灭所有敌人。\n我们能更快完成吗？', required: true },
        { type: 'lines', linesCount: 9, name: '不超过 9 行代码', heroText: null, required: true },
        { type: 'gems', name: '收集所有宝石', heroText: '试试把所有宝石都拿到？', required: false },
      ],  
      levers: [
        { x: 5, y: 11, activatesId: 'bridge1', name: "桥1", enabled: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 1, y: 3 },
          end: { x: 1, y: 9 },
          activated: true,
        },
      ],
    },
  
    [12]: {
      height: 5,
      width: 13,
      grid: [
        ["rock","rock","rock","watert","watert","sand","grass","tree","watert","watert","rock","rock","rock",],
        ["lawn","sand","grass","water","water","sand","lawn","grass","water","water","lawn","grass","lawn",],
        ["tree","sand","lawn","water","water","sand","lawn","lawn","water","water","tree","lawn","lawn",],
        ["lawn","sand","sand","water","water","sand","sand","sand","water","water","sand","sand","sand",],
        ["grass","lawn","lawn","water","water","lawn","lawn","lawn","water","water","lawn","lawn","grass",],
      ],
      hero: { x: 0, y: 5 },
      finish: { x: 3, y: 12 },
      gems: [
        { x: 1, y: 1 },
        { x: 3, y: 11 },
      ],
      enemies: [
        { x: 3, y: 2, alive: true, name: "Brad" },
        { x: 3, y: 10, alive: true, name: "Bobby" },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '帮我到达对岸', required: true },
        { type: 'gems', name: '收集所有宝石', heroText: '试试把所有宝石都拿到？', required: false },
      ],  
      levers: [
        { x: 4, y: 5, activatesId: 'bridge1', name: "桥1", enabled: false },
        { x: 2, y: 7, activatesId: 'bridge2', name: "桥2", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 3, y: 3 },
          end: { x: 3, y: 4 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 3, y: 8 },
          end: { x: 3, y: 9 },
          activated: false,
        },
      ],
    },

    [13]: {
      height: 7,
      width: 9,
      grid: [
        ["tree","tree","tree","lawn","rock","sand","lawn","watert","tree",],
        ["rock","lawn","sand","sand","sand","sand","lawn","water","watert",],
        ["watert","watert","watert","watert","watert","watert","watert","water","water",],
        ["water","water","water","water","water","water","water","water","water",],
        ["rock","lawn","sand","lawn","lawn","lawn","lawn","sand","water",],
        ["watert","lawn","sand","lawn","lawn","rock","lawn","sand","lawn",],
        ["water","watert","sand","sand","sand","sand","sand","sand","tree",],
      ],
      hero: { x: 4, y: 7 },
      finish: { x: 1, y: 6 },
      gems: [
        { x: 6, y: 7 }, { x: 1, y: 1 },
      ],
      enemies: [
        { x: 1, y: 5, alive: true, name: "BigBoy", big: true, moveFinish: { x: 4, y: 2 } },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: null, required: true },
        { type: 'big_enemy_bridge', bridgeName: "bridge1", enemyName: "BigBoy", name: '阻止巨型骑士过桥', heroText: '我们对付不了这个巨型骑士，\n绝不能让他到我们这边！', required: true },
        { type: 'gems', name: '收集宝石', heroText: null, required: false },
      ],
      levers: [
        { x: 4, y: 1, name: "桥1", activatesId: "bridge1", enabled: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 2, y: 2 },
          end: { x: 3, y: 2 },
          activated: true,
        },
      ],
    },

    [14]: {
      height: 8,
      width: 3,
      grid: [
        ["rock","sand","rock",],
        ["lawn","sand","lawn",],
        ["sand","sand","lawn",],
        ["lawn","sand","lawn",],
        ["grass","sand","sand",],
        ["lawn","sand","rock",],
        ["sand","sand","lawn",],
        ["grass","sand","lawn",],
      ],
      hero: { x: 0, y: 1 },
      finish: { x: 7, y: 1 },
      gems: [
        { x: 2, y: 1 }, { x: 4, y: 1 }, { x: 6, y: 1 },
      ],
      enemies: [
        { x: 2, y: 0, alive: true, name: "Brad" },
        { x: 4, y: 2, alive: true, name: "Bobby" },
        { x: 6, y: 0, alive: true, name: "Greg" },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '我需要到达终点', required: true },
        { type: 'enemies', name: '使用变量击败所有敌人', heroText: '并在途中用变量击败所有敌人', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '宝石摆放得真方便，收集它们吧', required: false },
      ],  
      levers: [],
      bridges: [],
      onlyVariablesInAttack: true,
    },

    [15]: {
      height: 8,
      width: 8,
      grid: [
        ["rock","sand","rock","watert","watert","tree","sand","tree",],
        ["sand","sand","lawn","water","water","lawn","sand","sand",],
        ["lawn","lawn","lawn","water","water","lawn","sand","lawn",],
        ["watert","watert","watert","water","water","watert","watert","watert",],
        ["water","water","water","water","water","water","water","water",],
        ["lawn","sand","lawn","water","water","lawn","sand","sand",],
        ["lawn","sand","sand","tree","tree","lawn","lawn","sand",],
        ["rock","lawn","sand","sand","lawn","lawn","lawn","rock",],
      ],
      hero: { x: 0, y: 6 },
      finish: { x: 0, y: 1 },
      gems: [
        { x: 7, y: 4 },
      ],
      enemies: [
        { x: 7, y: 5, alive: true, name: "Tav" },
        { x: 2, y: 1, alive: true, name: "Liam" },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: null, required: true },
        { type: 'var bridges', name: '使用变量打开桥', heroText: '', required: true },
        { type: 'enemies', name: '使用变量击败所有敌人', heroText: '帮我击败所有敌人并通过桥到达终点', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '宝石摆放得真方便，收集它们吧', required: false },
      ],  
      levers: [
        { x: 2, y: 7, name: "桥1", activatesId: "bridge1", enabled: false },
        { x: 5, y: 0, name: "桥2", activatesId: "bridge2", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 3, y: 6 },
          end: { x: 4, y: 6 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: true,
          start: { x: 3, y: 1 },
          end: { x: 4, y: 1 },
          activated: false,
        },
      ],
      onlyVariablesInAttack: true,
      onlyVariablesInSwitch: true,
    },
  
    [16]: {
      height: 7,
      width: 8,
      grid: [
        ["tree","sand","tree","lawn","lawn","grass","sand","lawn",],
        ["watert","sand","sand","sand","sand","sand","sand","lawn",],
        ["water","watert","lawn","sand","lawn","lawn","sand","lawn",],
        ["water","water","watert","watert","watert","rock","sand","lawn",],
        ["water","water","water","water","water","lawn","sand","rock",],
        ["water","water","water","water","water","tree","sand","lawn",],
        ["water","lawn","lawn","lawn","lawn","lawn","sand","sand",],
      ],
      hero: { x: 1, y: 2 },
      finish: { x: 6, y: 1 },
      gems: [
        { x: 1, y: 6 }, { x: 6, y: 7 },
      ],
      enemies: [
        { x: 1, y: 7, alive: true, name: "Hidden1", hidden: true },
        { x: 6, y: 5, alive: true, name: "Hidden2", hidden: true },
        { x: 6, y: 2, alive: true, name: "Hidden3", hidden: true },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '需要穿过这些无名敌人到达终点', required: true },
        { type: 'enemies', name: '击败所有敌人', heroText: '我们先打听出他们的名字并把他们赶走', required: true },
        { type: 'gems', name: '收集所有宝石', heroText: '宝石总是有用的，我们收集它们吧', required: false },
      ],  
      levers: [],
      bridges: [],
      onlyVariablesInAttack: true,
    },

    [17]: {
      height: 7,
      width: 8,
      grid: [
        ["lawn","sand","lawn","lawn","watert","watert","lawn","lawn",],
        ["sand","sand","lawn","watert","water","tree","lawn","lawn",],
        ["rock","watert","watert","water","water","lawn","lawn","lawn",],
        ["watert","water","water","water","water","lawn","sand","sand",],
        ["water","lawn","lawn","tree","water","lawn","sand","rock",],
        ["lawn","sand","sand","lawn","lawn","sand","sand","watert",],
        ["tree","sand","rock","lawn","lawn","sand","watert","water",],
      ],
      hero: { x: 5, y: 6 },
      finish: { x: 0, y: 6 },
      gems: [
      ],
      enemies: [
        { x: 1, y: 1, alive: true, name: "wizard1", hidden: true, isWizard: true, zone: { x: 1, y: 5, width: 3, height: 3 } },
        { x: 1, y: 6, alive: true, name: "hidden1", hidden: true },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '把那个巫师烤了，\n为自己清出一条路', required: true },
      ],  
      levers: [
      ],
      bridges: [
      ],
      onlyVariablesInAttack: true,
      fireballCount: 1,
    },

    [18]: {
      height: 8,
      width: 9,
      grid: [
        ["rock","sand","rock","lawn","watert","watert","lawn","lawn","lawn",],
        ["lawn","sand","lawn","watert","water","water","watert","lawn","watert",],
        ["lawn","sand","watert","water","water","water","water","watert","water",],
        ["tree","sand","tree","water","water","water","water","water","water",],
        ["lawn","sand","sand","water","water","water","sand","sand","lawn",],
        ["rock","lawn","rock","water","water","water","watert","rock","lawn",],
        ["watert","lawn","watert","water","water","water","water","watert","tree",],
        ["water","lawn","water","water","water","water","water","water","lawn",],
      ],
      hero: { x: 4, y: 7 },
      finish: { x: 0, y: 1 },
      gems: [
        { x: 6, y: 1 }, { x: 0, y: 7 }
      ],
      enemies: [
        { x: 1, y: 7, alive: true, name: "Hidden1", hidden: true },
        { x: 5, y: 1, alive: true, name: "Hidden2", hidden: true },
        { x: 3, y: 1, alive: true, name: "Hidden3", hidden: true },
        { x: 1, y: 1, alive: true, name: "wizard1", hidden: true, isWizard: true, zone: { x: 3, y: 3, width: 3, height: 3 } },
        { x: 7, y: 8, alive: true, name: "wizard2", hidden: true, isWizard: true, zone: { x: 1, y: 0, width: 2, height: 3 } },
      ],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '得先知道这些骑士的名字，\n才能把他们赶走', required: true },
        { type: 'enemies', name: '击败所有敌人', heroText: '还要摆脱这些巫师', required: true },
        { type: 'gems', name: '收集所有宝石', heroText: null, required: false },
      ],  
      levers: [
        { x: 4, y: 8, name: "桥1", activatesId: "bridge1", enabled: false },
        { x: 0, y: 6, name: "请明智地使用我", activatesId: "bridge2", enabled: false, hidden: true },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: true,
          start: { x: 2, y: 7 },
          end: { x: 3, y: 7 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 4, y: 3 },
          end: { x: 4, y: 5 },
          activated: false,
        },
      ],
      onlyVariablesInAttack: true,
      fireballCount: 2,
    },

    [19]: {
      height: 5,
      width: 9,
      grid: [
        ["lawn","watert","watert","watert","watert","watert","watert","watert","watert"],
        ["sand","sand","sand","water","water","rock","lawn","tree","lawn"],
        ["lawn","lawn","sand","sand","sand","lawn","lawn","lawn","tree"],
        ["tree","lawn","lawn","lawn","sand","sand","sand","lawn","lawn"],
        ["rock","lawn","rock","lawn","lawn","lawn","sand","sand","sand"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 4, y: 8 },
      gems: [
        { x: 3, y: 5 },
        { x: 1, y: 2 },
      ],
      enemies: [],
      levers: [],
      bridges: [],
      goals: [
        { type: 'finish', name: '到达终点', heroText: '使用循环带我到终点', required: true },
        { type: 'gems', name: '收集所有宝石', required: true },
        { type: 'lines', name: '不超过 3 行代码', heroText: '控制在 3 行代码内！', linesCount: 3, required: true },
      ],
      isWhileTrue: true,
    },

    [20]: {
      height: 9,
      width: 5,
      grid: [
        ["sand","sand","sand","sand","sand"],
        ["sand","watert","watert","watert","watert"],
        ["sand","lawn","lawn","lawn","lawn"],
        ["sand","rock","watert","watert","lawn"],
        ["sand","lawn","lawn","lawn","lawn"],
        ["sand","lawn","tree","lawn","lawn"],
        ["sand","lawn","lawn","lawn","lawn"],
        ["sand","tree","lawn","watert","watert"],
        ["sand","sand","sand","sand","lawn"],
      ],
      hero: { x: 8, y: 4 },
      finish: { x: 0, y: 4 },
      gems: [
        { x: 6, y: 4 },
        { x: 2, y: 4 },
        { x: 4, y: 4 },
      ],
      enemies: [],
      levers: [],
      bridges: [],
      goals: [
        { type: 'finish', name: '到达终点', required: true },
        { type: 'gems', name: '收集所有宝石', heroText: '宝石总是有用的，我们收集它们吧', required: true },
        { type: 'lines', name: '不超过 4 行代码', heroText: '再次使用循环并控制在 4 行代码内', linesCount: 4, required: true },
      ],
      isWhileTrue: true,
    },

    [21]: {
      height: 9,
      width: 9,
      grid: [
        ["watert","watert","lawn","lawn","rock","watert","watert","watert","watert"],
        ["water","lawn","lawn","lawn","lawn","water","water","water","water"],
        ["water","watert","watert","lawn","lawn","water","water","water","water"],
        ["water","water","tree","lawn","lawn","water","water","water","water"],
        ["water","lawn","lawn","lawn","lawn","water","water","sand","lawn"],
        ["water","watert","watert","watert","watert","water","water","sand","lawn"],
        ["tree","lawn","lawn","water","water","water","lawn","sand","lawn"],
        ["lawn","sand","sand","water","water","water","sand","sand","lawn"],
        ["lawn","lawn","lawn","water","water","water","lawn","lawn","tree"],
      ],
      hero: { x: 7, y: 7 },
      finish: { x: 1, y: 1 },
      gems: [
        { x: 7, y: 1 },
      ],
      enemies: [
        { x: 4, y: 6, alive: true, name: "Hidden1", hidden: true },
        { x: 1, y: 3, alive: true, name: "Hidden2", hidden: true },
        { x: 4, y: 1, alive: true, name: "wizard1", hidden: true, isWizard: true, zone: { x: 0, y: 2, width: 6, height: 6 } },
      ],
      levers: [
        { x: 8, y: 7, activatesId: 'bridge1', name: "桥1", enabled: false },
      ],
      bridges: [
        {
          id: "bridge1",
          vertical: false,
          start: { x: 7, y: 3 },
          end: { x: 7, y: 5 },
          activated: false,
        },
        {
          id: "bridge2",
          vertical: false,
          start: { x: 4, y: 5 },
          end: { x: 4, y: 6 },
          activated: true,
        }
      ],
      goals: [
        { type: 'finish', name: '到达终点', required: true },
        { type: 'gems', name: '拾取宝石', heroText: '我们先把路清出来', required: false },
        { type: 'lines', name: '不超过 9 行代码', heroText: '然后用循环到达终点', linesCount: 9, required: true },
      ],
      isWhileTrue: true,
      fireballCount: 1,
    },

    [22]: {
      height: 9,
      width: 9,
      grid: [
        ["lawn","lawn","tree","lawn","watert","watert","watert","watert","watert"],
        ["sand","lawn","lawn","lawn","lawn","water","water","water","water"],
        ["sand","sand","sand","lawn","lawn","rock","water","water","water"],
        ["watert","lawn","sand","tree","lawn","lawn","lawn","water","water"],
        ["water","watert","sand","sand","sand","lawn","lawn","tree","water"],
        ["water","water","watert","lawn","sand","lawn","lawn","lawn","rock"],
        ["water","water","water","lawn","sand","sand","sand","lawn","lawn"],
        ["water","water","lawn","lawn","lawn","lawn","sand","lawn","lawn"],
        ["water","lawn","lawn","tree","lawn","lawn","sand","sand","sand"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 8, y: 8 },
      gems: [
      ],
      enemies: [
        { x: 2, y: 1, alive: true, name: "Hidden1", hidden: true },
        { x: 6, y: 5, alive: true, name: "Hidden2", hidden: true },
      ],
      levers: [
      ],
      bridges: [
      ],
      goals: [
        { type: 'finish', name: '到达终点', required: true },
        { type: 'lines', name: '不超过 7 行代码', linesCount: 7, required: true },
      ],
      isWhileTrue: true,
    },

    [23]: {
      height: 6,
      width: 13,
      grid: [
        ["lawn","watert","tree","watert","watert","lawn","rock","sand","tree","sand","watert","watert","watert"],
        ["sand","water","sand","sand","lawn","lawn","lawn","sand","lawn","sand","sand","sand","sand"],
        ["sand","water","sand","lawn","lawn","lawn","lawn","sand","lawn","lawn","lawn","lawn","lawn"],
        ["sand","sand","sand","lawn","lawn","lawn","lawn","sand","sand","sand","lawn","lawn","lawn"],
        ["sand","watert","rock","lawn","tree","watert","lawn","lawn","lawn","sand","lawn","rock","lawn"],
        ["sand","water","watert","lawn","watert","water","lawn","rock","tree","sand","watert","watert","lawn"]
      ],
      hero: { x: 1, y: 0 },
      finish: { x: 1, y: 12 },
      gems: [
        { x: 5, y: 0 },
        { x: 5, y: 3 },
        { x: 5, y: 6 },
        { x: 5, y: 9 },
      ],
      enemies: [
        { x: 2, y: 2, alive: true, name: "Hidden1", hidden: true },
        { x: 2, y: 5, alive: true, name: "Hidden2", hidden: true },
        { x: 2, y: 11, alive: true, name: "Hidden3", hidden: true },
      ],
      levers: [
      ],
      bridges: [
      ],
      goals: [
        { type: 'finish', name: '到达终点', required: true },
        { type: 'lines', name: '不超过 9 行代码', linesCount: 9, required: true },
        { type: 'gems', name: '收集所有宝石', heroText: '我们能把所有宝石都带上吗？', required: false },
      ],
      isWhileTrue: true,
    },
  },
  ['demo']: {
    [0]: {
      height: 4,
      width: 4,
      grid: [
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
      ],
      hero: { x: 0, y: 0 },
      finish: { x: 0, y: 0 },
      gems: [
        { x: 3, y: 3 },
      ],
      enemies: [],
      goals: [],
      levers: [],
      bridges: [],
      startCode: 'hero.move_right()',
    },
    [1]: {
      height: 4,
      width: 4,
      grid: [
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
      ],
      hero: { x: 3, y: 3 },
      finish: { x: 0, y: 0 },
      gems: [
        { x: 2, y: 0 },
      ],
      enemies: [],
      goals: [],
      levers: [],
      bridges: [],
      startCode: 'hero.move_left()',
    },
    [2]: {
      height: 4,
      width: 4,
      grid: [
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
      ],
      hero: { x: 2, y: 0 },
      finish: { x: 0, y: 0 },
      gems: [
        { x: 0, y: 3 },
      ],
      enemies: [],
      goals: [],
      levers: [],
      bridges: [],
      startCode: 'hero.move_up()',
    },
    [3]: {
      height: 4,
      width: 4,
      grid: [
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
      ],
      hero: { x: 0, y: 3 },
      finish: { x: 0, y: 0 },
      gems: [
        { x: 3, y: 1 },
      ],
      enemies: [],
      goals: [],
      levers: [],
      bridges: [],
      startCode: 'hero.move_down()',
    },
    [4]: {
      height: 4,
      width: 4,
      grid: [
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
        ["lawn","lawn","lawn","lawn"],
      ],
      hero: { x: 3, y: 1 },
      finish: { x: 0, y: 0 },
      gems: [
        { x: 0, y: 0 },
      ],
      enemies: [],
      goals: [],
      levers: [],
      bridges: [],
      startCode: 'hero.move_left()',
    },
  }
}
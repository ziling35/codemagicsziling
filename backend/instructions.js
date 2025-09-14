import { shortMovingCommands, longMovingCommands, switchCommand, attackCommand, findNearestEnemy, hasEnemyAround, fireballCommands } from "./commands.js"

export const instructions = {
  ['forest']: {
    [1]: {
      instructions: `通过代码操控你的角色。在右侧编辑器书写代码，完成后运行。\n\n` +
      `要让英雄 \`hero\` 移动或执行动作，你需要调用它的方法。方法就像一条指令，告诉英雄该做什么，比如攻击敌人或移动。` +
      `\n\n使用移动方法来收集所有宝石。`,
      example: `hero.move_down()\nhero.move_right()`,
      newCommands: shortMovingCommands,
      prevCommands: [],
    },
  
    [2]: {
      instructions: `做得好！继续保持。\n\n顺便说下，你随时可以在编辑器下方找到可用方法列表。`,
      example: `hero.move_down()\nhero.move_right()`,
      newCommands: [],
      prevCommands: shortMovingCommands,
    },
  
    [3]: {
      instructions: `方法可以在括号中接收参数。参数是你提供给方法的额外信息，用来告诉它具体如何执行任务。\n\n` +
      `例如，移动方法可以接收一个数字，表示英雄需要走多少步。这就是参数。\n\n` +
      `使用带参数的移动方法，用一行代码通过本关。别忘了参数必须写在括号中！`,
      example: `hero.move_down(3)\nhero.move_right(2)`,
      newCommands: longMovingCommands,
      prevCommands: [],
    },
    [4]: {
      instructions: `很好！现在请组合使用多个带参数的方法，收集宝石并到达终点。`,
      example: `hero.move_down(3)\nhero.move_right(2)`,
      newCommands: [],
      prevCommands: longMovingCommands,
    },
    [5]: {
      instructions: `你做得很棒！但你能否在仅用 10 行代码的情况下收集所有宝石？`,
      newCommands: [],
      prevCommands: longMovingCommands,
    },
    [6]: {
      instructions: '引号中的文本（例如“桥”）称为字符串。字符串就是计算机理解的文本。字符串也可以作为参数在括号中传给方法。\n\n' +
      '把拉杆名称这个字符串传给 `switch` 方法来切换它，看看会发生什么。\n\n注意：要够到拉杆，英雄需要站在与其相邻的格子上。',
      example: `hero.switch("桥")`,
      newCommands: [ switchCommand ],
      prevCommands: longMovingCommands,
    },
    [7]: {
      instructions: '如果对已打开的桥调用 `switch`，它会关闭。它就像一个开关：每次都会改变桥的状态——打开或关闭。\n\n' +
      '本关需要你在起始代码中找出并修复一个错误，帮助英雄通关。',
      example: `hero.switch("桥") # 打开桥\nhero.switch("桥") # 关闭桥\nhero.switch("桥") # 再次打开\n# 以此类推..`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [8]: {
      instructions: '干得漂亮，你已经走得很远了！\n\n顺便说下，你可以滚动鼠标滚轮来缩放关卡。',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [9]: {
      instructions: '程序员常在代码里写注释，让自己和他人更容易理解。\n\n' +
      '你已经在右侧编辑器见过它们了——以 `#` 开头的文本不会被执行，而是为代码提供提示。\n\n' +
      '要通过本关，你需要阅读代码中的注释。',
      example: `# 在 Python 中，注释以 # 开头，它们用于说明与提示\n\nhero.move_right() # 注释也可以和代码写在同一行\n\n# 这是注释\n# 连续两行`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [10]: {
      instructions: '凶恶的骑士挡住了去路！得好好教训他们。\n\n' +
      '为此，使用 `attack` 方法。把敌人的名字（字符串）传给它，让英雄进行攻击。\n\n' +
      '和拉杆一样，想要攻击，英雄必须靠近目标敌人。',
      example: `hero.attack("John")`,
      newCommands: [ attackCommand ],
      prevCommands: longMovingCommands.concat([ switchCommand ]),
    },
    [11]: {
      instructions: '又是这些骑士！他们太多了，逐个击破很费时。想想如何一次性清除所有敌人。',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [12]: {
      instructions: '使用你学到的全部方法来通过本关！\n\n如果忘了怎么做，看看编辑器下方的方法列表——那里有你学过的所有指令。',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [13]: {
      instructions: '敌人召来了援军！这个骑士体型巨大且过于强大——英雄暂时还无法击败他。\n\n但他已经朝我们走来了！如果他跨过桥，当地居民将陷入危险。我们该如何在为时已晚之前阻止他？',
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [14]: {
      instructions: '程序里用于保存数据的是变量。变量就像一个盒子，可以装下任意信息，例如敌人的名字。\n\n'
      + '变量有名称（用于引用）和值（所保存的数据）。每个变量名都应唯一——不能创建两个同名变量。\n\n'
      + '要让变量拥有一个值，需要进行赋值。在 Python 中使用 `=`：',
      example: `# 创建变量并为其赋值：\n# 变量名 = 值\nenemy = "Proggy"\n\n# 此后，我们在任何地方使用该变量，都会替换成它的值：\nhero.attack(enemy) # 英雄攻击名为 Proggy 的敌人\n\n# 注意我们使用变量时不加引号——它不是字符串`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [15]: {
      instructions: '你做得很棒！现在你知道如何在代码里使用变量——这是很重要的技能！\n\n' +
      '在本关中，不仅需要用变量来攻击敌人，还要用变量来切换拉杆。\n\n' +
      '所有关于桥与敌人的变量都已在起始代码中创建，但有人把它们的值弄错了！请检查并修正，使英雄能通过前半段道路。然后补全代码到达终点。',
      example: `enemy = "Proggy"\nhero.attack(enemy)\n\nlever = "桥"\nhero.switch(lever)`,
      newCommands: [],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [16]: {
      instructions: '有些方法不仅执行动作，还会返回结果。`find_nearest_enemy` 就是这样的方法——它会返回离你最近的敌人的名字。借助它，你可以打败隐藏名字的敌人。\n\n'
      + '重要提示：变量里不仅可以保存现成的值，也可以保存方法的返回结果。这样可以在其他指令中复用这些结果。\n\n'
      + '试着把 `find_nearest_enemy` 返回的敌人名字保存到变量中，然后攻击他：',
      example: `enemy1 = hero.find_nearest_enemy()\nhero.attack(enemy1)\n\nenemy2 = hero.find_nearest_enemy()\nhero.attack(enemy2)`,
      newCommands: [ findNearestEnemy ],
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand ]),
    },
    [17]: {
      instructions: '敌人召唤了黑暗巫师！他们能把格子施加魔法，使英雄无法通过。要破解巫师的魔法，必须将其消灭。\n\n' +
      '但有个问题：这些巫师喜欢呆在英雄到不了的地方。这时你需要使用新的远程攻击法术——火球术。\n\n' +
      '注意：该法术消耗很大，只应在必要时使用，因此火球的次数有限——你可以在左下角看到剩余次数。',
      newCommands: fireballCommands,
      prevCommands: longMovingCommands.concat([ switchCommand, attackCommand, findNearestEnemy ]),
    },
    [18]: {
      instructions: '你已经掌握了很多！运用全部所学来通过本关。',
      newCommands: [],
      prevCommands: fireballCommands.concat(longMovingCommands.concat([ switchCommand, attackCommand, findNearestEnemy ])),
    },
    [19]: {
      instructions: '有时程序需要重复执行相同的动作。为了避免多次编写相同代码，程序员会使用循环。\n\n' +
      '在这一关，你将学习使用无限循环 `while True`，让英雄不断执行动作直到到达终点。\n\n' +
      '注意：在 `while True` 后需要加上冒号 `:`，并且循环体内的代码行需要以 4 个空格缩进，表示它们属于该循环并会被重复执行。',
      example: `hero.move_right() # 向右移动一次\n\nwhile True: # 无限重复\n    hero.move_left() # 向左移动\n    hero.move_up()   # 向上移动`,
      newCommands: [],
      prevCommands: longMovingCommands,
    },
    [20]: {
      instructions: '很棒，对吧？试试只用循环通过这一关？',
      newCommands: [],
      prevCommands: longMovingCommands,
    },
    [21]: {
      instructions: '本关不仅需要在循环中移动，还要在前往终点的路上攻击敌人。\n\n' +
      '但首先我们要解决巫师清理道路——请在循环之前写好相关代码。\n\n' +
      '别忘了在 `while True` 后加冒号 `:`，并让循环体内代码以 4 个空格缩进。',
      example: `while True:\n    hero.move_right(3)\n    hero.move_down(2)`,
      newCommands: [],
      prevCommands: fireballCommands.concat([ switchCommand, findNearestEnemy, attackCommand ]).concat(longMovingCommands),
    },
    [22]: {
      instructions: '本关仍需使用 `while True` 循环，但并不是每次循环都会遇到敌人！你需要用新方法 `has_enemy_around()` 进行判断。\n\n' +
      '`has_enemy_around()` 会检查英雄周围所有格子，并告诉你是否存在敌人。\n\n' +
      '若只在特定条件下执行动作，需要使用关键字 `if`（英文意为“如果”）。\n\n' +
      '注意：在 `if` 条件后需要加冒号 `:`，且其后的代码需要以 4 个空格缩进——和 `while True` 一样——这表明当条件满足时要执行哪些指令。\n\n',
      example: `while True: # 无限重复\n    hero.move_right(3) # 总是向右移动\n\n    if hero.has_enemy_around(): # 如果附近有敌人\n        # 再次缩进 4 个空格\n        enemy = hero.find_nearest_enemy() # 找到敌人\n        hero.attack(enemy)                # 并攻击\n        
    hero.move_down(2) # 总是向下移动`,
      newCommands: [ hasEnemyAround ],
      prevCommands: [ findNearestEnemy, attackCommand ].concat(longMovingCommands),
    },
    [23]: {
      instructions: '太棒了！继续保持。结合使用 `while True` 循环和 `if` 结构以及 `has_enemy_around()` 方法来通过这一关。\n\n'
      + '如果你能收集所有宝石，将获得额外分数！',
      newCommands: [],
      prevCommands: [ hasEnemyAround, findNearestEnemy, attackCommand ].concat(longMovingCommands),
    },
  }
}
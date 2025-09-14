const movingConstants = [['up', '向上'], ['down', '向下'], ['right', '向右'], ['left', '向左']];

export const shortMovingCommands = movingConstants.map(constants => ({
    code: `hero.move_${constants[0]}()`,
    description: `让英雄${constants[1]}移动 1 步`,
    example: `hero.move_${constants[0]}()`,
}));

export const longMovingCommands = movingConstants.map(constants => ({
    code: `hero.move_${constants[0]}(steps)`,
    description: `让英雄${constants[1]}移动 \`steps\` 步`,
    example: `hero.move_${constants[0]}(3)`,
    autocompleteValue: `hero.move_${constants[0]}(#{1})`,
}));

export const attackCommand = {
    code: 'hero.attack(enemy)',
    description: '如果敌人靠近，则攻击名为 `enemy` 的敌人',
    example: 'hero.attack("John")',
    autocompleteValue: 'hero.attack(${1})',
};

export const switchCommand = {
    code: 'hero.switch(lever)',
    description: '如果靠近，则切换名为 `lever` 的拉杆',
    example: 'hero.switch("桥")',
    autocompleteValue: 'hero.switch(${1})',
}

export const findNearestEnemy = {
    code: 'hero.find_nearest_enemy()',
    description: '返回最近的存活敌人',
    example: 'enemy = hero.find_nearest_enemy()\nhero.attack(enemy)',
}

export const hasEnemyAround = {
    code: 'hero.has_enemy_around()',
    description: '告知角色相邻格子是否存在存活敌人',
    example: 'if hero.has_enemy_around():\n    enemy = hero.find_nearest_enemy()\n    hero.attack(enemy)',
}

export const isDisabled = {
    code: 'hero.is_disabled(lever)',
    description: '检查名为 `lever` 的拉杆是否关闭',
    example: 'if hero.is_disabled("桥"):\n    hero.switch("桥")',
    autocompleteValue: 'hero.is_disabled(${1})',
}

export const fireballCommands = movingConstants.map(constants => ({
    code: `hero.fireball_${constants[0]}()`,
    description: `向${constants[1]}投掷能消灭敌人的火球`,
    example: `hero.fireball_${constants[0]}()`,
}));
const defaultStartingComment = `# 在下方编写代码来操控角色
# 完成后点击运行

`;

export const startingCode = {
  ['forest']: {
    [1]: defaultStartingComment + "# 继续编写代码以到达终点\nhero.move_right()\n",
    [2]: defaultStartingComment + "# 编写代码以到达终点\n# 尽量收集所有宝石\n",
    [3]: "# 使用带参数的方法,\n# 用一行代码通过本关\n",
    [4]: defaultStartingComment,
    [5]: defaultStartingComment,
    [6]: `# 使用 switch 方法来切换桥

hero.move_right(2)
hero.switch("请输入拉杆名称")

# 继续写代码以到达终点
`,
    [7]: `# 这段代码里有错误
# 找到并修复它

hero.move_left(2)
hero.switch("桥1")
hero.move_left(5)
hero.switch("桥2")
hero.move_up(3)

# 继续完善下面的代码
`,
    [8]: defaultStartingComment,
    [9]: `# 注释包含说明与提示

# 英雄前方的这个拉杆名叫“秘密”

`,
    [10]: `# 使用 attack 方法来攻击敌人

# 走到敌人 John 旁边
hero.move_left(5)

# 修改方法参数,
# 以攻击敌人 John
hero.attack("敌人名")

# 继续写代码到达终点
`,
    [11]: `# 你需要控制在 9 行代码内
# 能更快击败骑士吗?
`,
    [12]: `# 要通过本关,
# 需要使用到所有方法

`,
    [13]: `# 别让巨型骑士
# 过到我们这边来
`,
    [14]: `hero.move_down(2)

# 这是变量 enemy1, 它的值为 "Brad"
enemy1 = "Brad"
hero.attack(enemy1)

hero.move_down(2)

# 把变量值改成正确的名字
enemy2 = "第二个敌人"
hero.attack(enemy2)

hero.move_down(2)

# 创建一个第三个敌人的变量
# 并把它传给 attack 方法
`,
    [15]: `# 修正变量的值
lever1 = "Tav"
lever2 = "桥1"
enemy1 = "Liam"
enemy2 = "桥2"

hero.move_down(2)
hero.switch(lever1)

hero.move_down(5)
hero.attack(enemy1)

# 继续写代码以到达终点
# 使用上面创建的变量
`,
    [16]: `hero.move_right(4)

enemy1 = hero.find_nearest_enemy()
hero.attack(enemy1)

# 走到其他敌人旁边, 获取他们的名字
# 使用 hero.find_nearest_enemy()
# 并攻击他们
`,
    [17]: `# 与敌人处于同一行
hero.move_left(5)

# 向上发射火球

# 然后继续通过本关
`,
    [18]: `# 有人在这里留下了一个变量
# 它是干什么用的呢?
secret = "请明智地使用我"

`,
    [19]: `# 修正循环中的代码, 以到达终点
# 并收集所有宝石

while True:
    hero.move_down()
    hero.move_right()
    `,
    [20]: `# 修正循环中的代码, 以到达终点
# 并收集所有宝石

while True:
    hero.move_left()
    `,
    [21]: `# 拾取宝石并解决巫师

# 再返回来

# 使用循环到达终点
# 并击败一路上的所有敌人
`,
    [22]: `# 并不是每次循环都会有敌人
# 用 has_enemy_around() 来检查

while True:
    hero.move_down(2) # 总是向下移动

    # 如果附近有敌人
    if hero.has_enemy_around():
        # 找到他并攻击
        
        # pass 不执行任何操作, 等你写好代码后删掉它
        pass

    # 完成本次循环步骤
    `,
    [23]: `while True:
    # 自己为每一步循环编写代码
    `,
  }
}
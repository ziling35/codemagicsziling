import ErrorMessageMapper from './ErrorMessageMapper.js';
import GameplayErrorTypes from './GameplayErrorTypes.js';
import { getDistance, arePointsEqual, calculateCodeLines, Direction } from './utils.js';
import esper from 'esper.js';

export default class LevelRunner {
  hero = {
    move_up: (steps = 1) => this.hero.move(Direction.UP, steps, 'move_up'),
    move_down: (steps = 1) => this.hero.move(Direction.DOWN, steps, 'move_down'),
    move_right: (steps = 1) => this.hero.move(Direction.RIGHT, steps, 'move_right'),
    move_left: (steps = 1) => this.hero.move(Direction.LEFT, steps, 'move_left'),

    fireball_up: () => this.hero.fireball(Direction.UP, 'fireball_up'),
    fireball_down: () => this.hero.fireball(Direction.DOWN, 'fireball_down'),
    fireball_right: () => this.hero.fireball(Direction.RIGHT, 'fireball_right'),
    fireball_left: () => this.hero.fireball(Direction.LEFT, 'fireball_left'),

    attack: (targetName) => {
      if (!this.level.enemies || this.level.enemies.filter(e => e.alive).length === 0) {
        this.gameplayError = { type: GameplayErrorTypes.NO_ENEMIES_TO_ATTACK };
        return;
      }
      
      let target = this.level.enemies.filter(e => e.alive).find(e => e.name === targetName);
      if (!target) {
        this.gameplayError = { type: GameplayErrorTypes.NO_ENEMY_WITH_GIVEN_NAME, name: targetName };
        return;
      }

      if (Math.abs(target.x - this.level.hero.x) > 1 || Math.abs(target.y - this.level.hero.y) > 1) {
        this.gameplayError = { type: GameplayErrorTypes.ENEMY_TOO_FAR, name: target.hidden ? "Имя скрыто" : targetName };
        return;
      }

      if (target.big) {
        this.gameplayError = { type: GameplayErrorTypes.ENEMY_IS_BIG, name: targetName };
        return;
      }

      target.alive = false;
      this.pushNewCommand(`attack`, { target: targetName, isDead: !target.alive });
    },

    switch: (leverName) => {
      if (!this.level.levers || this.level.levers.length === 0) {
        this.gameplayError = { type: GameplayErrorTypes.NO_LEVERS };
        return;
      }

      const lever = this.level.levers.find(l => l.name === leverName);
      if (!lever) {
        this.gameplayError = { type: GameplayErrorTypes.NO_LEVER_WITH_GIVEN_NAME, name: leverName };
        return;
      }

      if (Math.abs(lever.x - this.level.hero.x) > 1 || Math.abs(lever.y - this.level.hero.y) > 1) {
        this.gameplayError = { type: GameplayErrorTypes.LEVER_TOO_FAR, name: leverName };
        return;
      }

      lever.enabled = !lever.enabled;
      const bridge = this.level.bridges.find(bridge => bridge.id === lever.activatesId);
      bridge.activated = lever.enabled;

      const enemiesOnBridge = this.level.enemies.filter(enemy => {
        if (!enemy.alive)
          return false;

        if (bridge.vertical) {
          return bridge.start.y === enemy.y && bridge.start.x <= enemy.x && enemy.x <= bridge.end.x;
        } else {
          return bridge.start.x === enemy.x && bridge.start.y <= enemy.y && enemy.y <= bridge.end.y;
        }
      });
      
      enemiesOnBridge.forEach(enemy => {
        enemy.alive = bridge.activated;
      });

      this.pushNewCommand("switch", { activatableId: lever.activatesId, enemiesOnBridge: enemiesOnBridge.map(e => e.name) });
    },

    is_disabled: (leverName) => {
      if (!this.level.levers || this.level.levers.length === 0) {
        this.gameplayError = { type: GameplayErrorTypes.NO_LEVERS };
        return;
      }

      const lever = this.level.levers.find(l => l.name === leverName);
      if (!lever) {
        this.gameplayError = { type: GameplayErrorTypes.NO_LEVER_WITH_GIVEN_NAME, name: leverName };
        return;
      }

      return !lever.enabled;
    },

    find_nearest_enemy: () => {
      if (!this.level.enemies || this.level.enemies.length === 0)
      {
        this.pushNewCommand("find_nearest_enemy", { hasEnemy: false });
        return;
      }

      let sortedAliveEnemies = this.level.enemies
        .filter(e => e.alive)
        .toSorted((a, b) => getDistance(this.level.hero, a) - getDistance(this.level.hero, b));
      
      if (sortedAliveEnemies.length > 0) {
        this.pushNewCommand("find_nearest_enemy", { hasEnemy: true });
        return sortedAliveEnemies[0].name;
      }

      this.pushNewCommand("find_nearest_enemy", { hasEnemy: false });
    },

    has_enemy_around: () => {
      if (!this.level.enemies || this.level.enemies.length === 0)
        return false;

      const aroundPoints =[
        { x: this.level.hero.x + 1, y: this.level.hero.y },
        { x: this.level.hero.x - 1, y: this.level.hero.y },
        { x: this.level.hero.x, y: this.level.hero.y + 1 },
        { x: this.level.hero.x, y: this.level.hero.y - 1 },
        { x: this.level.hero.x + 1, y: this.level.hero.y + 1 },
        { x: this.level.hero.x + 1, y: this.level.hero.y - 1 },
        { x: this.level.hero.x - 1, y: this.level.hero.y + 1 },
        { x: this.level.hero.x - 1, y: this.level.hero.y - 1 },
      ];

      for (const point of aroundPoints) {
        if (this.getAliveEnemyAtPoint(point)) {
          this.pushNewCommand("has_enemy_around", { hasEnemy: true });
          return true;
        }
      }

      this.pushNewCommand("has_enemy_around", { hasEnemy: false });
      return false;
    },

    move: (direction, steps, methodName) => {
      let newHeroPos = structuredClone(this.level.hero);
      newHeroPos.x += direction.x * steps;
      newHeroPos.y += direction.y * steps;
      this.updateHeroPos(newHeroPos, methodName);
    },

    fireball: (direction, commandName) => {
      if (this.level.fireballCount === undefined || this.level.fireballCount === 0) {
        this.gameplayError = { type: GameplayErrorTypes.NO_FIREBALLS };
        return;
      }

      let hitTarget = null;
      let finalPosition = null;

      const projectilePoint = structuredClone(this.level.hero);

      while (true) {
        projectilePoint.x += direction.x * 1;
        projectilePoint.y += direction.y * 1;

        if (this.isPointOutOfMap(projectilePoint) || this.isPointHitWallForFireball(projectilePoint)) {
          finalPosition = { 
            x: projectilePoint.x - direction.x, 
            y: projectilePoint.y - direction.y 
          };
          hitTarget = 'wall';
          break;
        }

        let hitEnemy = this.getAliveEnemyAtPoint(projectilePoint);
        if (hitEnemy) {
          hitEnemy.alive = false;
          finalPosition = projectilePoint;
          hitTarget = { type: 'enemy', name: hitEnemy.name };
          break;
        }
      }

      const range = getDistance(this.level.hero, finalPosition);
      this.level.fireballCount -= 1;
      this.pushNewCommand(commandName, {
        direction,
        startPosition: { x: this.level.hero.x, y: this.level.hero.y },
        finalPosition,
        hitTarget,
        range,
      });
    },
  };

  gameplayError = null;

  commands = [];
  
  constructor(level, language = 'python') {
    this.initialLevel = structuredClone(level);
    this.level = structuredClone(level);
    this.language = language;
    this.engine = esper({
      language: 'python'
    });

    this.engine.addGlobal('hero', this.hero);
  }



  run(code) {
    this.gemsCollected = 0;
    this.level = structuredClone(this.initialLevel);

    // Filter gems based on guardedBy property
    this.level.gems = this.level.gems.filter(gem => !gem.guardedBy || this.level.enemies.find(e => e.name === gem.guardedBy).alive);

    // только для уровня с охраняемыми гемами
    if (this.level.id === 'if-guarded-gems') {
      this.ifGuardedGemsInfo = {
        canBeOnTopIsland: this.level.enemies.find(e => e.name === 'Hidden1').alive,
        canBeOnBottomIsland: this.level.enemies.find(e => e.name === 'Hidden2').alive,
        topIslandEnter: { x: 1, y: 6 },
        bottomIslandEnter: { x: 5, y: 6 },
      };
    }

    try {
      this.engine.load(code);
      let steps = 0;
      let value = this.engine.evloop.next();
      while (!value.done && !this.gameplayError) {
        value = this.engine.evloop.next();
        if ( value.value && value.value.then ) throw new Error('Can\'t deal with futures when running in sync mode');
        if ( ++steps > this.engine.options.executionLimit ) throw new Error('Execution Limit Reached');

        if (this.level.isWhileTrue && arePointsEqual(this.level.hero, this.level.finish))
          break;

        if (steps > 300) { // TODO: Move to constants
          this.gameplayError = { type: GameplayErrorTypes.INFINITE_LOOP };
          break;
        }
      }
    } catch (e) {

      let message = ErrorMessageMapper.map(e.message, this.language);
      let line = e.loc.line ?? e.loc.start.line;
      return {
        errors: [
          {
            message,
            line,
          }
        ]
      }
    }

    const goals = this.level.goals.map(goal => { return { type: goal.type, required: goal.required, completed: this.isGoalCompleted(goal, code) } });
    
    return {
      goals,
      commands: this.commands,
      gameplayError: this.gameplayError,
      score: this.calculateScore(goals)
    };
  }

  calculateScore(goals) {
    const optionalGoals = goals.filter(g => !g.required);
    const hasOptionalGoals = optionalGoals.length != 0;

    const allRequiredGoalsCompleted = goals.filter(g => g.required).every(g => g.completed);
    const anyOptionalGoalCompleted = !hasOptionalGoals || goals.filter(g => !g.required).some(g => g.completed);
    const allOptionalGoalsCompleted = !hasOptionalGoals || goals.filter(g => !g.required).every(g => g.completed);

    const variantScore = allRequiredGoalsCompleted
      ? allOptionalGoalsCompleted
        ? 3
        : anyOptionalGoalCompleted
          ? 2
          : 1
      : 0;

    return variantScore;
  }

  isGoalCompleted(goal, code) {
    switch (goal.type) {
      case 'finish':
      case 'var bridges':
        return arePointsEqual(this.level.finish, this.level.hero);
      case 'lines':
        console.log(calculateCodeLines(code));
        return calculateCodeLines(code) <= goal.linesCount;
      case 'gems':
        return this.gemsCollected === this.level.gems.length;
      case 'enemies':
        return this.level.enemies.every(enemy => !enemy.alive)
      case 'lever':
        return this.level.levers.find(l => l.name === goal.leverName).enabled;
      case 'big_enemy_bridge':
        const bigEnemy = this.level.enemies.find(e => e.name === goal.enemyName);
        if (!bigEnemy.alive)
          return true;

        const bridge = this.level.bridges.find(b => b.id === goal.bridgeName);
        return !bridge.activated;
      default:
        return false;
    }
  }

  updateHeroPos(newHeroPosition, moveCommandName) {
    while (!arePointsEqual(newHeroPosition, this.level.hero)) {
      const adjustedEnemy = this.level.enemies.find(e => 
        e.alive && 
        ((Math.abs(e.x - this.level.hero.x) <= 1 && e.y - this.level.hero.y === 0) || (Math.abs(e.y - this.level.hero.y) <= 1 && e.x - this.level.hero.x === 0)) // толко по прямым линиям
      );

      this.level.hero.x += Math.sign(newHeroPosition.x - this.level.hero.x);
      this.level.hero.y += Math.sign(newHeroPosition.y - this.level.hero.y);

      if (this.isPointOutOfMap(this.level.hero) || this.isPointHitWall(this.level.hero)) {
        this.gameplayError = { type: GameplayErrorTypes.HERO_RAN_IN_WALL, wallPosition: this.level.hero };
        return;
      }

      if (adjustedEnemy) {
        this.pushNewCommand("enemy_attack", { isEnemyToTheLeft: adjustedEnemy.y < this.level.hero.y });
        this.gameplayError = { type: GameplayErrorTypes.HERO_KILLED_BY_ENEMY };
        return;
      }

      this.pushNewCommand(moveCommandName);
      this.incrementAction();

      if (this.isHeroInWizardZone(this.level.hero)) {
        this.pushNewCommand("hero_entered_wizard_zone");
        this.gameplayError = { type: GameplayErrorTypes.HERO_ENTERED_WIZARD_ZONE };
        return;
      }

      if (this.gameplayError)
        return;

      if (this.level.gems) {
        let takenGem = this.level.gems.find(g => arePointsEqual(g, this.level.hero) && !g.taken)
        if (takenGem) {
          takenGem.taken = true;
          this.gemsCollected += 1;
        }
      }

      if (this.level.isWhileTrue && arePointsEqual(this.level.hero, this.level.finish))
        return;
    }
  }

  pushNewCommand(commandName, additionalInfo = {}) {
    let callExpression = this.engine.evaluator.lastASTNodeProcessed.parent.parent;
    let start = callExpression.loc.start;
    let end = callExpression.loc.end;
    let command = {
      name: commandName,
      start: { line: start.line, column: start.column },
      end: { line: end.line, column: end.column },
      ...additionalInfo
    };
    this.commands.push(command);
  }

  incrementAction() {
    this.level.enemies = this.level.enemies.map(enemy => {
      if (!enemy.moveFinish)
        return enemy;

      if (!enemy.alive)
        return enemy;

      if (enemy.y > enemy.moveFinish.y) {
        enemy.y -= 1;
        this.pushNewCommand("enemy_move", { enemy: enemy.name, direction: 'left' });
        if (arePointsEqual(enemy, enemy.moveFinish)) {
          this.gameplayError = { type: GameplayErrorTypes.ENEMY_SHOULD_NOT_BE_HERE };
        }

        return enemy;
      }

      if (enemy.x < enemy.moveFinish.x) {
        enemy.x += 1;
        this.pushNewCommand("enemy_move", { enemy: enemy.name, direction: 'down' });
        if (arePointsEqual(enemy, enemy.moveFinish)) {
          this.gameplayError = { type: GameplayErrorTypes.ENEMY_SHOULD_NOT_BE_HERE };
        }

        return enemy;
      }

      return enemy;
    });
  }

  isPointOutOfMap(point) {
    return point.x >= this.level.height || point.y >= this.level.width || point.x < 0 || point.y < 0;
  }

  isPointHitWall(point) {
    const wallTypes = ['tree', 'rock', 'watert', 'water']; // TODO: Move to constants
    return wallTypes.includes(this.level.grid[point.x][point.y]) && !this.isActiveBridgePoint(point);
  }

  isPointHitWallForFireball(point) {
    // Фаерболлы останавливаются только при попадании в твердые препятствия
    const solidWallTypes = ['tree', 'rock']; // TODO: Move to constants
    return solidWallTypes.includes(this.level.grid[point.x][point.y]) && !this.isActiveBridgePoint(point);
  }

  isActiveBridgePoint(point) {
    return this.level.bridges.filter(bridge => bridge.activated).some(bridge => {
      if (bridge.vertical) {
        return bridge.start.y === point.y && bridge.start.x <= point.x && point.x <= bridge.end.x;
      } else {
        return bridge.start.x === point.x && bridge.start.y <= point.y && point.y <= bridge.end.y;
      }
    })
  }

  getAliveEnemyAtPoint(point) {
    if (!this.level.enemies || this.level.enemies.length === 0)
      return;

    return this.level.enemies.find(e => e.alive && arePointsEqual(e, point));
  }

  isHeroInWizardZone(heroPosition) {
    if (!this.level.enemies || this.level.enemies.length === 0)
      return false;

    const wizardsWithZones = this.level.enemies.filter(enemy => 
      enemy.alive && enemy.isWizard && enemy.zone
    );

    for (const wizard of wizardsWithZones) {
      const zone = wizard.zone;
      if (heroPosition.x >= zone.x && 
          heroPosition.x < zone.x + zone.width &&
          heroPosition.y >= zone.y && 
          heroPosition.y < zone.y + zone.height) {
        return true;
      }
    }

    return false;
  }
}
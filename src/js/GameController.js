/* eslint-disable no-param-reassign */
import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';

import Team from './Team';
import GamePlay from './GamePlay';
import GameState from './GameState';
import PositionedCharacter from './PositionedCharacter';
import { addMoveAttackPositions } from './utils';
import {
  generateTeam,
  playerPositionGenerator,
  enemyPositionGenerator,
} from './generators';
import themes from './themes';
import cursors from './cursors';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
    this.playerTypes = [Bowman, Swordsman, Magician];
    this.enemyTypes = [Vampire, Undead, Daemon];
    this.activeCharacter = null;
  }

  init() {
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    this.gamePlay.addSaveGameListener(this.onSaveGameClick.bind(this));
    this.gamePlay.addLoadGameListener(this.onLoadGameClick.bind(this));

    const data = this.stateService.load();

    if (data) {
      this.gameState.from(data);
    } else {
      this.createTeams();
    }

    this.drawUi();
    this.redrawPositions();
  }

  createTeams() {
    const {
      gameLevel, characterCount, playerTeam, enemyTeam,
    } = this.gameState;

    const playerPosGen = playerPositionGenerator(this.gamePlay.boardSize);
    const enemyPosGen = enemyPositionGenerator(this.gamePlay.boardSize);
    const maxLevel = gameLevel === 1 ? gameLevel : gameLevel - 1;
    let playerAddTeam = new Team();

    // Формируем неспозиционированные на поле доборные составы команд
    if (playerTeam.length === 0) {
      playerAddTeam = generateTeam(this.playerTypes, maxLevel, characterCount);
    } else if (playerTeam.length < characterCount) {
      // Позиционируем уже существующие персонажи в команде игрока
      playerTeam.forEach((character) => {
        character.position = playerPosGen.next().value;
      });

      // Определяем недостающее количество персонажей в команде игрока
      const missingCount = characterCount - playerTeam.length;
      playerAddTeam = generateTeam(this.playerTypes, maxLevel, missingCount);
    }

    const enemyAddTeam = generateTeam(this.enemyTypes, maxLevel, characterCount);

    // Позиционируем на поле полученные доборные составы команд и
    // добавляем их в основные составы команд
    playerAddTeam.characters.forEach((character) => {
      playerTeam.push(new PositionedCharacter(character, playerPosGen.next().value));
    });

    enemyAddTeam.characters.forEach((character) => {
      enemyTeam.push(new PositionedCharacter(character, enemyPosGen.next().value));
    });

    // Добавляем информацию о movePositions и attackPositions
    // в спозиционированные персонажи готовых команд
    for (let i = 0; i < playerTeam.length; i += 1) {
      playerTeam[i] = addMoveAttackPositions(playerTeam[i], this.gamePlay.boardSize);
    }

    for (let i = 0; i < enemyTeam.length; i += 1) {
      enemyTeam[i] = addMoveAttackPositions(enemyTeam[i], this.gamePlay.boardSize);
    }
  }

  drawUi() {
    const { gameLevel, totalScore, maxScore } = this.gameState;

    this.gamePlay.drawUi(themes[this.gameState.gameLevel]);
    this.gamePlay.updateStatisticPanels(gameLevel, totalScore, maxScore);
  }

  redrawPositions() {
    const positions = [
      ...this.gameState.playerTeam,
      ...this.gameState.enemyTeam,
    ];

    this.gamePlay.redrawPositions(positions);
  }

  onNewGameClick() {
    this.gameState.gameLevel = 1;
    this.gameState.characterCount = 2;
    this.gameState.playerTeam = [];
    this.gameState.enemyTeam = [];
    this.gameState.totalScore = 0;
    this.activeCharacter = null;

    this.blockBoard();
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    this.createTeams();
    this.drawUi();
    this.redrawPositions();

    setTimeout(() => {
      GamePlay.showMessage('Запущена новая игра');
    }, 1000);
  }

  onSaveGameClick() {
    if (this.gameState.gameLevel > 4 || this.gameState.playerTeam.length === 0) {
      GamePlay.showError('Игра окончена, сохранение недоступно');
      return;
    }

    this.stateService.save(this.gameState);
    GamePlay.showMessage('Игра сохранена');
  }

  onLoadGameClick() {
    const data = this.stateService.load();

    if (data) {
      this.gameState.from(data);
      this.activeCharacter = null;

      this.blockBoard();
      this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
      this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
      this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

      this.drawUi();
      this.redrawPositions();

      setTimeout(() => {
        GamePlay.showMessage('Сохранённая игра загружена');
      }, 1000);
    } else {
      GamePlay.showError('Отсутствует сохранённая игра');
    }
  }

  static calculateDamage(attacker, target) {
    const attackerAttack = attacker.character.attack;
    const targetDefence = target.character.defence;

    return Math.floor(Math.max(attackerAttack - targetDefence, attackerAttack * 0.1));
  }

  async attack(attacker, target, index) {
    const damage = GameController.calculateDamage(attacker, target);
    await this.gamePlay.showDamage(index, damage);
    target.character.health -= damage;
  }

  checkCharacterDeath(character) {
    if (character.character.health <= 0) {
      const { playerTeam, enemyTeam } = this.gameState;
      const playerIndex = playerTeam.indexOf(character);
      const enemyIndex = enemyTeam.indexOf(character);

      if (playerIndex !== -1) {
        if (character === this.activeCharacter) {
          this.gamePlay.deselectAllCells();
          this.activeCharacter = null;
        }

        playerTeam.splice(playerIndex, 1);
      } else {
        enemyTeam.splice(enemyIndex, 1);
      }
    }
  }

  gameLevelUp() {
    this.gameState.gameLevel += 1;

    if (this.gameState.gameLevel > 4) {
      if (this.gameState.totalScore > this.gameState.maxScore) {
        this.gameState.maxScore = this.gameState.totalScore;
      }

      this.gamePlay.deselectAllCells();
      this.blockBoard();

      const { gameLevel, totalScore, maxScore } = this.gameState;
      this.gamePlay.updateStatisticPanels(gameLevel - 1, totalScore, maxScore);

      setTimeout(() => {
        GamePlay.showMessage('Вы победили!');
      }, 1000);

      return;
    }

    this.gameState.playerTeam
      .forEach((character) => GameController.characterLevelUp(character.character));
    this.gameState.characterCount += 1;
    this.activeCharacter = null;

    this.createTeams();
    this.drawUi();
    this.redrawPositions();
  }

  static characterLevelUp(character) {
    character.level += 1;
    character.attack = Math.floor(Math
      .max(character.attack, character.attack * ((80 + character.health) / 100)));
    character.defence = Math.floor(Math
      .max(character.defence, character.defence * ((80 + character.health) / 100)));
    character.health = character.health + 80 > 100 ? 100 : character.health + 80;
  }

  gameOver() {
    this.blockBoard();

    setTimeout(() => {
      GamePlay.showMessage('Вы проиграли!');
    }, 1000);
  }

  calculateScore() {
    const score = this.gameState.playerTeam
      .reduce((sum, character) => sum + character.character.health, 0);

    return score;
  }

  blockBoard() {
    this.gamePlay.cellClickListeners = [];
    this.gamePlay.cellEnterListeners = [];
    this.gamePlay.cellLeaveListeners = [];
    this.gamePlay.setCursor(cursors.auto);
  }

  async onCellClick(index) {
    const { playerTeam, enemyTeam } = this.gameState;
    const playerCharacter = playerTeam.find((character) => character.position === index);
    const enemyCharacter = enemyTeam.find((character) => character.position === index);

    if (playerCharacter) {
      if (this.activeCharacter === playerCharacter) {
        this.gamePlay.deselectCell(index);
        this.activeCharacter = null;
      } else {
        this.gamePlay.deselectAllCells();
        this.gamePlay.selectCell(index);
        this.activeCharacter = playerCharacter;
      }
    } else if (enemyCharacter) {
      if (this.activeCharacter && this.activeCharacter.attackPositions.includes(index)) {
        await this.attack(this.activeCharacter, enemyCharacter, index);
        this.checkCharacterDeath(enemyCharacter);
        this.redrawPositions();

        if (enemyTeam.length === 0) {
          this.gameState.totalScore += this.calculateScore();
          this.gameLevelUp();

          return;
        }

        await this.enemyMove();
      } else if (this.activeCharacter) {
        GamePlay.showError('Персонаж противника недоступен для атаки');
      } else {
        GamePlay.showError('Невозможно выбрать персонаж противника');
      }
    } else if (this.activeCharacter && this.activeCharacter.movePositions.includes(index)) {
      this.gamePlay.deselectCell(this.activeCharacter.position);
      const idx = playerTeam.indexOf(this.activeCharacter);
      this.activeCharacter.position = index;
      this.activeCharacter = addMoveAttackPositions(this.activeCharacter, this.gamePlay.boardSize);
      playerTeam[idx] = this.activeCharacter;
      this.gamePlay.selectCell(index);
      this.redrawPositions();

      await this.enemyMove();
    } else if (this.activeCharacter) {
      GamePlay.showError('Перемещение персонажа в данную позицию недоступно');
    }
  }

  onCellEnter(index) {
    const { playerTeam, enemyTeam } = this.gameState;
    const playerCharacter = playerTeam.find((character) => character.position === index);
    const enemyCharacter = enemyTeam.find((character) => character.position === index);
    const character = playerCharacter || enemyCharacter;

    if (character) {
      const {
        level, attack, defence, health,
      } = character.character;

      const message = `\u{1F396}${level} \u{2694}${attack} \u{1F6E1}${defence} \u{2764}${health}`;
      this.gamePlay.showCellTooltip(message, index);

      if (enemyCharacter) {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }

    if (this.activeCharacter) {
      this.gamePlay.deselectAllCells();
      this.gamePlay.selectCell(this.activeCharacter.position);

      if (playerCharacter) {
        this.gamePlay.setCursor(cursors.pointer);
      } else if (!enemyCharacter && this.activeCharacter.movePositions.includes(index)) {
        this.gamePlay.setCursor(cursors.pointer);
        this.gamePlay.selectCell(index, 'green');
      } else if (enemyCharacter && this.activeCharacter.attackPositions.includes(index)) {
        this.gamePlay.setCursor(cursors.crosshair);
        this.gamePlay.selectCell(index, 'red');
      } else {
        this.gamePlay.setCursor(cursors.notallowed);
      }
    }
  }

  onCellLeave(index) {
    this.gamePlay.setCursor(cursors.auto);
    this.gamePlay.hideCellTooltip(index);
  }

  async enemyMove() {
    const { playerTeam, enemyTeam } = this.gameState;

    const damageInfo = [];

    enemyTeam.forEach((enemy) => {
      playerTeam.forEach((player) => {
        const damage = GameController.calculateDamage(enemy, player);
        damageInfo.push([enemy, player, damage]);
      });
    });

    const attackInfo = damageInfo
      .filter((character) => character[0].attackPositions.includes(character[1].position))
      .sort((damageA, damageB) => damageB[2] - damageA[2]);

    if (attackInfo.length > 0) {
      const attacker = attackInfo[0][0];
      const target = attackInfo[0][1];
      const index = target.position;

      await this.attack(attacker, target, index);
      this.checkCharacterDeath(target);
      this.redrawPositions();

      if (playerTeam.length === 0) {
        this.gameOver();
      }
    } else {
      const playerPositions = playerTeam.map((player) => player.position);
      const enemyPositions = enemyTeam.map((enemy) => enemy.position);
      const allCharactersPositions = [...playerPositions, ...enemyPositions];

      const moveInfo = [];

      enemyTeam.forEach((enemy) => {
        const positions = enemy.movePositions
          .filter((position) => !allCharactersPositions.includes(position));

        moveInfo.push([enemy, positions]);
      });

      const randomEnemyIndex = Math.floor(Math.random() * moveInfo.length);
      let enemy = moveInfo[randomEnemyIndex][0];
      const enemyMovePositions = moveInfo[randomEnemyIndex][1];
      const randomPositionIndex = Math.floor(Math.random() * enemyMovePositions.length);
      const randomMovePosition = enemyMovePositions[randomPositionIndex];

      const index = enemyTeam.indexOf(enemy);
      enemy.position = randomMovePosition;
      enemy = addMoveAttackPositions(enemy, this.gamePlay.boardSize);
      enemyTeam[index] = enemy;

      this.redrawPositions();
    }
  }
}

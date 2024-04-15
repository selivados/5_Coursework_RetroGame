import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';
import {
  characterGenerator,
  generateTeam,
  playerPositionGenerator,
  enemyPositionGenerator,
} from '../generators';

const allowedTypes = [Bowman, Swordsman, Magician];
const maxLevel = 3;
const characterCount = 5;

describe('characterGenerator function', () => {
  it('should generate characters infinitely', () => {
    const generator = characterGenerator(allowedTypes, maxLevel);

    for (let i = 0; i < 5; i += 1) {
      expect(generator.next().done).toBeFalsy();
    }
  });

  it('should generate character allowed types', () => {
    const typesList = allowedTypes.map((Character) => new Character(1).type);
    const generator = characterGenerator(allowedTypes, maxLevel);

    for (let i = 0; i < 5; i += 1) {
      const character = generator.next().value;
      const isAllowedType = typesList.includes(character.type);

      expect(isAllowedType).toBeTruthy();
    }
  });

  it('should generate character allowed levels', () => {
    const generator = characterGenerator(allowedTypes, maxLevel);

    for (let i = 0; i < 5; i += 1) {
      const character = generator.next().value;

      expect(character.level).toBeGreaterThanOrEqual(1);
      expect(character.level).toBeLessThanOrEqual(maxLevel);
    }
  });
});

describe('generateTeam function', () => {
  it('should generate team consisting of characters with allowed levels', () => {
    const team = generateTeam(allowedTypes, maxLevel, characterCount);

    for (let i = 0; i < characterCount; i += 1) {
      expect(team.characters[i].level).toBeGreaterThanOrEqual(1);
      expect(team.characters[i].level).toBeLessThanOrEqual(maxLevel);
    }
  });

  it('should generate team with needed count of characters', () => {
    const team = generateTeam(allowedTypes, maxLevel, characterCount);

    expect(team.characters.length).toBe(characterCount);
  });
});

describe('playerPositionGenerator function', () => {
  it('should generate correct positions to player characters', () => {
    const boardSize = 8;
    const generator = playerPositionGenerator(boardSize);
    const validPlayerPositions = [
      0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57,
    ];
    const usedPlayerPositions = [];

    for (let i = 0; i < validPlayerPositions.length; i += 1) {
      const position = generator.next().value;

      expect(validPlayerPositions.includes(position)).toBeTruthy();
      expect(usedPlayerPositions.includes(position)).toBeFalsy();

      usedPlayerPositions.push(position);
    }
  });
});

describe('enemyPositionGenerator function', () => {
  it('should generate correct positions to enemy characters', () => {
    const boardSize = 8;
    const generator = enemyPositionGenerator(boardSize);
    const validEnemyPositions = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
    ];
    const usedEnemyPositions = [];

    for (let i = 0; i < validEnemyPositions.length; i += 1) {
      const position = generator.next().value;

      expect(validEnemyPositions.includes(position)).toBeTruthy();
      expect(usedEnemyPositions.includes(position)).toBeFalsy();

      usedEnemyPositions.push(position);
    }
  });
});

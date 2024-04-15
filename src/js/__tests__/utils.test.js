import { calcTileType, calcHealthLevel, addMoveAttackPositions } from '../utils';
import PositionedCharacter from '../PositionedCharacter';
import Bowman from '../characters/Bowman';
import Swordsman from '../characters/Swordsman';
import Magician from '../characters/Magician';

describe('calcTileType function', () => {
  test.each([
    [0, 8, 'top-left'],
    [7, 8, 'top-right'],
    [56, 8, 'bottom-left'],
    [63, 8, 'bottom-right'],
    [3, 8, 'top'],
    [24, 8, 'left'],
    [47, 8, 'right'],
    [58, 8, 'bottom'],
    [35, 8, 'center'],
    [0, 7, 'top-left'],
    [6, 7, 'top-right'],
    [42, 7, 'bottom-left'],
    [48, 7, 'bottom-right'],
    [1, 7, 'top'],
    [7, 7, 'left'],
    [20, 7, 'right'],
    [44, 7, 'bottom'],
    [8, 7, 'center'],
  ])("(%s, %s) should return '%s'", (index, boardSize, expected) => {
    const result = calcTileType(index, boardSize);

    expect(result).toBe(expected);
  });
});

describe('calcHealthLevel function', () => {
  test.each([
    [0, 'critical'],
    [7, 'critical'],
    [14, 'critical'],
    [15, 'normal'],
    [32, 'normal'],
    [49, 'normal'],
    [50, 'high'],
    [75, 'high'],
    [100, 'high'],
  ])("(%s) should return '%s'", (health, expected) => {
    const result = calcHealthLevel(health);

    expect(result).toBe(expected);
  });
});

describe('addMoveAttackPositions function', () => {
  it('should add correct move and attack positions to Bowman character in 18 position', () => {
    const character = new Bowman(1);
    const position = 18;
    const positionedCharacter = new PositionedCharacter(character, position);
    const boardSize = 8;
    const fullCharacterInfo = addMoveAttackPositions(positionedCharacter, boardSize);

    const expectedMovePositions = [
      0, 2, 4, 9, 10, 11, 16, 17, 19, 20, 25, 26, 27, 32, 34, 36,
    ];
    const expectedAttackPositions = [
      0, 1, 2, 3, 4, 8, 9, 10, 11, 12, 16, 17, 19, 20, 24, 25, 26, 27, 28, 32, 33, 34, 35, 36,
    ];

    expect(fullCharacterInfo.movePositions).toEqual(expectedMovePositions);
    expect(fullCharacterInfo.attackPositions).toEqual(expectedAttackPositions);
  });

  it('should add correct move and attack positions to Bowman character in 46 position', () => {
    const character = new Bowman(1);
    const position = 46;
    const positionedCharacter = new PositionedCharacter(character, position);
    const boardSize = 8;
    const fullCharacterInfo = addMoveAttackPositions(positionedCharacter, boardSize);

    const expectedMovePositions = [
      28, 30, 37, 38, 39, 44, 45, 47, 53, 54, 55, 60, 62,
    ];
    const expectedAttackPositions = [
      28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 47, 52, 53, 54, 55, 60, 61, 62, 63,
    ];

    expect(fullCharacterInfo.movePositions).toEqual(expectedMovePositions);
    expect(fullCharacterInfo.attackPositions).toEqual(expectedAttackPositions);
  });

  it('should add correct move and attack positions to Swordsman character in 60 position', () => {
    const character = new Swordsman(1);
    const position = 60;
    const positionedCharacter = new PositionedCharacter(character, position);
    const boardSize = 8;
    const fullCharacterInfo = addMoveAttackPositions(positionedCharacter, boardSize);

    const expectedMovePositions = [
      24, 28, 33, 36, 39, 42, 44, 46, 51, 52, 53, 56, 57, 58, 59, 61, 62, 63,
    ];
    const expectedAttackPositions = [
      51, 52, 53, 59, 61,
    ];

    expect(fullCharacterInfo.movePositions).toEqual(expectedMovePositions);
    expect(fullCharacterInfo.attackPositions).toEqual(expectedAttackPositions);
  });

  it('should add correct move and attack positions to Swordsman character in 21 position', () => {
    const character = new Swordsman(1);
    const position = 21;
    const positionedCharacter = new PositionedCharacter(character, position);
    const boardSize = 8;
    const fullCharacterInfo = addMoveAttackPositions(positionedCharacter, boardSize);

    const expectedMovePositions = [
      3, 5, 7, 12, 13, 14, 17, 18, 19, 20, 22, 23, 28, 29, 30, 35, 37, 39, 42, 45, 49, 53,
    ];
    const expectedAttackPositions = [
      12, 13, 14, 20, 22, 28, 29, 30,
    ];

    expect(fullCharacterInfo.movePositions).toEqual(expectedMovePositions);
    expect(fullCharacterInfo.attackPositions).toEqual(expectedAttackPositions);
  });

  it('should add correct move and attack positions to Magician character in 25 position', () => {
    const character = new Magician(1);
    const position = 25;
    const positionedCharacter = new PositionedCharacter(character, position);
    const boardSize = 8;
    const fullCharacterInfo = addMoveAttackPositions(positionedCharacter, boardSize);

    const expectedMovePositions = [
      16, 17, 18, 24, 26, 32, 33, 34,
    ];
    const expectedAttackPositions = [
      0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21, 24, 26, 27, 28, 29, 32, 33,
      34, 35, 36, 37, 40, 41, 42, 43, 44, 45, 48, 49, 50, 51, 52, 53, 56, 57, 58, 59, 60, 61,
    ];

    expect(fullCharacterInfo.movePositions).toEqual(expectedMovePositions);
    expect(fullCharacterInfo.attackPositions).toEqual(expectedAttackPositions);
  });

  it('should add correct move and attack positions to Magician character in 56 position', () => {
    const character = new Magician(1);
    const position = 56;
    const positionedCharacter = new PositionedCharacter(character, position);
    const boardSize = 8;
    const fullCharacterInfo = addMoveAttackPositions(positionedCharacter, boardSize);

    const expectedMovePositions = [
      48, 49, 57,
    ];
    const expectedAttackPositions = [
      24, 25, 26, 27, 28, 32, 33, 34, 35, 36, 40, 41,
      42, 43, 44, 48, 49, 50, 51, 52, 57, 58, 59, 60,
    ];

    expect(fullCharacterInfo.movePositions).toEqual(expectedMovePositions);
    expect(fullCharacterInfo.attackPositions).toEqual(expectedAttackPositions);
  });
});

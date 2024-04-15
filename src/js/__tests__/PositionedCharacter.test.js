import PositionedCharacter from '../PositionedCharacter';
import Bowman from '../characters/Bowman';

describe('PositionedCharacter class', () => {
  it('should create correct positioned Bowman character', () => {
    const character = new Bowman(1);
    const position = 1;
    const expected = {
      character: {
        type: 'bowman',
        level: 1,
        attack: 25,
        defence: 25,
        health: 50,
        moveDistance: 2,
        attackDistance: 2,
      },
      position: 1,
    };

    expect(new PositionedCharacter(character, position)).toMatchObject(expected);
  });

  it('should try create positioned Bowman character with wrong character object and throw error', () => {
    expect(() => new PositionedCharacter('Bowman', 1))
      .toThrow('character must be instance of Character or its children');
  });

  it('should try create positioned Bowman character with wrong type of position and throw error', () => {
    const character = new Bowman(1);

    expect(() => new PositionedCharacter(character, 'position'))
      .toThrow('position must be a number');
  });
});

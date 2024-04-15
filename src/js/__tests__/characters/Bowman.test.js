import Bowman from '../../characters/Bowman';

describe('Bowman class', () => {
  it('should create level 1 character with correct properties', () => {
    const character = new Bowman(1);

    expect(character).toMatchObject({
      type: 'bowman',
      level: 1,
      attack: 25,
      defence: 25,
      health: 50,
      moveDistance: 2,
      attackDistance: 2,
    });
  });

  it('should create level 2 character with correct properties', () => {
    const character = new Bowman(2);

    expect(character).toMatchObject({
      type: 'bowman',
      level: 2,
      attack: 32,
      defence: 32,
      health: 100,
      moveDistance: 2,
      attackDistance: 2,
    });
  });

  it('should create level 3 character with correct properties', () => {
    const character = new Bowman(3);

    expect(character).toMatchObject({
      type: 'bowman',
      level: 3,
      attack: 57,
      defence: 57,
      health: 100,
      moveDistance: 2,
      attackDistance: 2,
    });
  });

  it('should create level 4 character with correct properties', () => {
    const character = new Bowman(4);

    expect(character).toMatchObject({
      type: 'bowman',
      level: 4,
      attack: 102,
      defence: 102,
      health: 100,
      moveDistance: 2,
      attackDistance: 2,
    });
  });
});

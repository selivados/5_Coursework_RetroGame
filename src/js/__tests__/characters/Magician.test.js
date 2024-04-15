import Magician from '../../characters/Magician';

describe('Magician class', () => {
  it('should create level 1 character with correct properties', () => {
    const character = new Magician(1);

    expect(character).toMatchObject({
      type: 'magician',
      level: 1,
      attack: 10,
      defence: 40,
      health: 50,
      moveDistance: 1,
      attackDistance: 4,
    });
  });

  it('should create level 2 character with correct properties', () => {
    const character = new Magician(2);

    expect(character).toMatchObject({
      type: 'magician',
      level: 2,
      attack: 13,
      defence: 52,
      health: 100,
      moveDistance: 1,
      attackDistance: 4,
    });
  });

  it('should create level 3 character with correct properties', () => {
    const character = new Magician(3);

    expect(character).toMatchObject({
      type: 'magician',
      level: 3,
      attack: 23,
      defence: 93,
      health: 100,
      moveDistance: 1,
      attackDistance: 4,
    });
  });

  it('should create level 4 character with correct properties', () => {
    const character = new Magician(4);

    expect(character).toMatchObject({
      type: 'magician',
      level: 4,
      attack: 41,
      defence: 167,
      health: 100,
      moveDistance: 1,
      attackDistance: 4,
    });
  });
});

import Swordsman from '../../characters/Swordsman';

describe('Swordsman class', () => {
  it('should create level 1 character with correct properties', () => {
    const character = new Swordsman(1);

    expect(character).toMatchObject({
      type: 'swordsman',
      level: 1,
      attack: 40,
      defence: 10,
      health: 50,
      moveDistance: 4,
      attackDistance: 1,
    });
  });

  it('should create level 2 character with correct properties', () => {
    const character = new Swordsman(2);

    expect(character).toMatchObject({
      type: 'swordsman',
      level: 2,
      attack: 52,
      defence: 13,
      health: 100,
      moveDistance: 4,
      attackDistance: 1,
    });
  });

  it('should create level 3 character with correct properties', () => {
    const character = new Swordsman(3);

    expect(character).toMatchObject({
      type: 'swordsman',
      level: 3,
      attack: 93,
      defence: 23,
      health: 100,
      moveDistance: 4,
      attackDistance: 1,
    });
  });

  it('should create level 4 character with correct properties', () => {
    const character = new Swordsman(4);

    expect(character).toMatchObject({
      type: 'swordsman',
      level: 4,
      attack: 167,
      defence: 41,
      health: 100,
      moveDistance: 4,
      attackDistance: 1,
    });
  });
});

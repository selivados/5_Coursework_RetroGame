import Undead from '../../characters/Undead';

describe('Undead class', () => {
  it('should create level 1 character with correct properties', () => {
    const character = new Undead(1);

    expect(character).toMatchObject({
      type: 'undead',
      level: 1,
      attack: 40,
      defence: 10,
      health: 50,
      moveDistance: 4,
      attackDistance: 1,
    });
  });

  it('should create level 2 character with correct properties', () => {
    const character = new Undead(2);

    expect(character).toMatchObject({
      type: 'undead',
      level: 2,
      attack: 52,
      defence: 13,
      health: 100,
      moveDistance: 4,
      attackDistance: 1,
    });
  });

  it('should create level 3 character with correct properties', () => {
    const character = new Undead(3);

    expect(character).toMatchObject({
      type: 'undead',
      level: 3,
      attack: 93,
      defence: 23,
      health: 100,
      moveDistance: 4,
      attackDistance: 1,
    });
  });

  it('should create level 4 character with correct properties', () => {
    const character = new Undead(4);

    expect(character).toMatchObject({
      type: 'undead',
      level: 4,
      attack: 167,
      defence: 41,
      health: 100,
      moveDistance: 4,
      attackDistance: 1,
    });
  });
});

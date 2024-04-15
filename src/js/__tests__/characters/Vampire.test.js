import Vampire from '../../characters/Vampire';

describe('Vampire class', () => {
  it('should create level 1 character with correct properties', () => {
    const character = new Vampire(1);

    expect(character).toMatchObject({
      type: 'vampire',
      level: 1,
      attack: 25,
      defence: 25,
      health: 50,
      moveDistance: 2,
      attackDistance: 2,
    });
  });

  it('should create level 2 character with correct properties', () => {
    const character = new Vampire(2);

    expect(character).toMatchObject({
      type: 'vampire',
      level: 2,
      attack: 32,
      defence: 32,
      health: 100,
      moveDistance: 2,
      attackDistance: 2,
    });
  });

  it('should create level 3 character with correct properties', () => {
    const character = new Vampire(3);

    expect(character).toMatchObject({
      type: 'vampire',
      level: 3,
      attack: 57,
      defence: 57,
      health: 100,
      moveDistance: 2,
      attackDistance: 2,
    });
  });

  it('should create level 4 character with correct properties', () => {
    const character = new Vampire(4);

    expect(character).toMatchObject({
      type: 'vampire',
      level: 4,
      attack: 102,
      defence: 102,
      health: 100,
      moveDistance: 2,
      attackDistance: 2,
    });
  });
});

import Character from '../Character';

describe('Character class', () => {
  it('should throw an error when trying to create an object via new Character()', () => {
    expect(() => new Character(1)).toThrow('You cannot create objects of this class using new Character()');
  });
});

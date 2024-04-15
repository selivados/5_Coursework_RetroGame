import GameState from '../GameState';

describe('GameState class', () => {
  it('should create new gameState with correct properties', () => {
    const gameState = new GameState();
    const expected = {
      gameLevel: 1,
      characterCount: 2,
      playerTeam: [],
      enemyTeam: [],
      totalScore: 0,
      maxScore: 0,
    };

    expect(gameState).toMatchObject(expected);
  });

  it('should create new gameState from correct object', () => {
    const gameState = new GameState();
    const object = {
      gameLevel: 3,
      characterCount: 4,
      playerTeam: [],
      enemyTeam: [],
      totalScore: 525,
      maxScore: 1050,
    };

    gameState.from(object);
    expect(gameState).toMatchObject(object);
  });

  it('should try create new gameState from empty object and throw error', () => {
    const gameState = new GameState();
    const object = {};

    expect(() => gameState.from(object)).toThrow('The received object must be with correct keys');
  });

  it('should try create new gameState from object with not all keys and throw error', () => {
    const gameState = new GameState();
    const object = {
      gameLevel: 3,
      characterCount: 4,
      playerTeam: [],
      enemyTeam: [],
      totalScore: 525,
    };

    expect(() => gameState.from(object)).toThrow('The received object must be with correct keys');
  });
});

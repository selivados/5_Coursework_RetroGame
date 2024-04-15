import GameStateService from '../GameStateService';

let stateService;
jest.mock('../GameStateService');

beforeEach(() => {
  stateService = new GameStateService();
  jest.resetAllMocks();
});

describe('GameStateService class', () => {
  it('should successful load', () => {
    const expected = {
      gameLevel: 1,
      characterCount: 2,
      playerTeam: [],
      enemyTeam: [],
      totalScore: 0,
      maxScore: 0,
    };

    stateService.load.mockReturnValue(expected);
    expect(stateService.load()).toEqual(expected);
  });

  it('should unsuccessful load', () => {
    stateService.load = jest.fn(() => {
      throw new Error('Invalid state');
    });

    expect(() => stateService.load()).toThrow('Invalid state');
  });
});

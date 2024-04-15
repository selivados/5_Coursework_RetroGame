export default class GameState {
  constructor() {
    this.gameLevel = 1;
    this.characterCount = 2;
    this.playerTeam = [];
    this.enemyTeam = [];
    this.totalScore = 0;
    this.maxScore = 0;
  }

  from(object) {
    const requiredKeys = ['gameLevel', 'characterCount', 'playerTeam', 'enemyTeam', 'totalScore', 'maxScore'];
    const isCorrectObject = requiredKeys.every((key) => Object.keys(object).includes(key));

    if (isCorrectObject) {
      this.gameLevel = object.gameLevel;
      this.characterCount = object.characterCount;
      this.playerTeam = object.playerTeam;
      this.enemyTeam = object.enemyTeam;
      this.totalScore = object.totalScore;
      this.maxScore = object.maxScore;
    } else {
      throw new Error('The received object must be with correct keys');
    }
  }
}

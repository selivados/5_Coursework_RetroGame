import Team from './Team';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  while (true) {
    const randomIndex = Math.floor(Math.random() * allowedTypes.length);
    const randomLevel = Math.floor(Math.random() * maxLevel) + 1;

    yield new allowedTypes[randomIndex](randomLevel);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const characters = [];

  for (let i = 0; i < characterCount; i += 1) {
    characters.push(characterGenerator(allowedTypes, maxLevel).next().value);
  }

  return new Team(characters);
}

export function* playerPositionGenerator(boardSize) {
  const positions = [];

  for (let i = 0, j = 1; positions.length < boardSize * 2; i += boardSize, j += boardSize) {
    positions.push(i, j);
  }

  while (positions.length > 0) {
    const randomIndex = Math.floor(Math.random() * positions.length);
    yield positions[randomIndex];

    positions.splice(randomIndex, 1);
  }
}

export function* enemyPositionGenerator(boardSize) {
  const positions = [];

  for (let i = boardSize - 2, j = boardSize - 1; positions.length < boardSize * 2;
    i += boardSize, j += boardSize) {
    positions.push(i, j);
  }

  while (positions.length > 0) {
    const randomIndex = Math.floor(Math.random() * positions.length);
    yield positions[randomIndex];

    positions.splice(randomIndex, 1);
  }
}

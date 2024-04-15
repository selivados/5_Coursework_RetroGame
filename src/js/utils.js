/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  if (index === 0) {
    return 'top-left';
  }

  if (index === boardSize - 1) {
    return 'top-right';
  }

  if (index === boardSize * (boardSize - 1)) {
    return 'bottom-left';
  }

  if (index === boardSize ** 2 - 1) {
    return 'bottom-right';
  }

  if (index < boardSize - 1) {
    return 'top';
  }

  if (index % boardSize === 0) {
    return 'left';
  }

  if ((index + 1) % boardSize === 0) {
    return 'right';
  }

  if (index > boardSize * (boardSize - 1)) {
    return 'bottom';
  }

  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}

export function addMoveAttackPositions(positionedCharacter, boardSize) {
  const index = positionedCharacter.position;
  const { moveDistance, attackDistance } = positionedCharacter.character;
  const moveIndexes = [];
  const attackIndexes = [];
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  for (let i = -moveDistance; i <= moveDistance; i += 1) {
    for (let j = -moveDistance; j <= moveDistance; j += 1) {
      if (i === 0 || j === 0 || Math.abs(i) === Math.abs(j)) {
        const newRow = row + i;
        const newCol = col + j;

        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
          const newIndex = newRow * boardSize + newCol;
          if (newIndex !== index) {
            moveIndexes.push(newIndex);
          }
        }
      }
    }
  }

  for (let i = -attackDistance; i <= attackDistance; i += 1) {
    for (let j = -attackDistance; j <= attackDistance; j += 1) {
      const newRow = row + i;
      const newCol = col + j;

      if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
        const newIndex = newRow * boardSize + newCol;
        if (newIndex !== index) {
          attackIndexes.push(newIndex);
        }
      }
    }
  }

  return {
    ...positionedCharacter,
    movePositions: moveIndexes,
    attackPositions: attackIndexes,
  };
}

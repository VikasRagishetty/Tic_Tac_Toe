// Tic Tac Toe AI & Win Checker Utility

/**
 * Get required line length to win based on grid size
 */
export function getWinLength(size) {
  if (size === 5) return 4;
  return size;
}

/**
 * Generate all possible winning index combinations for an N x N grid
 */
export function generateWinningLines(size) {
  const lines = [];
  const winLen = getWinLength(size);

  // Horizontal lines
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - winLen; c++) {
      const line = [];
      for (let k = 0; k < winLen; k++) {
        line.push(r * size + (c + k));
      }
      lines.push(line);
    }
  }

  // Vertical lines
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - winLen; r++) {
      const line = [];
      for (let k = 0; k < winLen; k++) {
        line.push((r + k) * size + c);
      }
      lines.push(line);
    }
  }

  // Main Diagonals (\)
  for (let r = 0; r <= size - winLen; r++) {
    for (let c = 0; c <= size - winLen; c++) {
      const line = [];
      for (let k = 0; k < winLen; k++) {
        line.push((r + k) * size + (c + k));
      }
      lines.push(line);
    }
  }

  // Anti Diagonals (/)
  for (let r = 0; r <= size - winLen; r++) {
    for (let c = winLen - 1; c < size; c++) {
      const line = [];
      for (let k = 0; k < winLen; k++) {
        line.push((r + k) * size + (c - k));
      }
      lines.push(line);
    }
  }

  return lines;
}

/**
 * Check board for a winner
 * Returns { winner: 'X'|'O', line: [indices] } or null
 */
export function checkWinner(board, size) {
  const lines = generateWinningLines(size);

  for (const line of lines) {
    const firstSymbol = board[line[0]];
    if (firstSymbol && line.every((index) => board[index] === firstSymbol)) {
      return { winner: firstSymbol, line };
    }
  }

  return null;
}

/**
 * Check if the board is completely filled
 */
export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

/**
 * Get AI move based on difficulty level
 * @param {Array} board - current board state
 * @param {number} size - grid size
 * @param {string} aiPlayer - symbol for AI ('O' or 'X')
 * @param {string} difficulty - 'easy' | 'medium' | 'hard'
 */
export function getAIMove(board, size, aiPlayer = 'O', difficulty = 'medium') {
  const humanPlayer = aiPlayer === 'O' ? 'X' : 'O';
  const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return null;

  if (difficulty === 'easy') {
    // Pick purely random empty spot
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
  }

  const winningLines = generateWinningLines(size);

  // 1. Can AI win right now?
  for (const idx of emptyIndices) {
    const tempBoard = [...board];
    tempBoard[idx] = aiPlayer;
    if (checkWinner(tempBoard, size)) {
      return idx;
    }
  }

  // 2. Can Human win right now? Block them!
  for (const idx of emptyIndices) {
    const tempBoard = [...board];
    tempBoard[idx] = humanPlayer;
    if (checkWinner(tempBoard, size)) {
      return idx;
    }
  }

  if (difficulty === 'medium') {
    // Try center spot if available
    const centerIdx = Math.floor((size * size) / 2);
    if (board[centerIdx] === null && Math.random() > 0.3) {
      return centerIdx;
    }
    // Otherwise pick random
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }

  // HARD LEVEL - Minimax for 3x3, heuristic search for larger grids
  if (size === 3) {
    let bestScore = -Infinity;
    let bestMove = emptyIndices[0];

    for (const idx of emptyIndices) {
      const tempBoard = [...board];
      tempBoard[idx] = aiPlayer;
      const score = minimax(tempBoard, 0, false, aiPlayer, humanPlayer, size, -Infinity, Infinity, 6);
      if (score > bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    }
    return bestMove;
  } else {
    // For 4x4 / 5x5, use depth-limited Minimax + heuristic evaluation
    let bestScore = -Infinity;
    let bestMove = emptyIndices[0];
    const maxDepth = size === 4 ? 4 : 3;

    for (const idx of emptyIndices) {
      const tempBoard = [...board];
      tempBoard[idx] = aiPlayer;
      const score = minimax(tempBoard, 0, false, aiPlayer, humanPlayer, size, -Infinity, Infinity, maxDepth);
      if (score > bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    }
    return bestMove;
  }
}

/**
 * Minimax algorithm with Alpha-Beta pruning & depth cutoff
 */
function minimax(board, depth, isMaximizing, aiPlayer, humanPlayer, size, alpha, beta, maxDepth) {
  const result = checkWinner(board, size);
  if (result) {
    return result.winner === aiPlayer ? 100 - depth : depth - 100;
  }
  if (isBoardFull(board) || depth >= maxDepth) {
    return evaluateBoardHeuristic(board, size, aiPlayer, humanPlayer);
  }

  const emptyIndices = board
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const idx of emptyIndices) {
      board[idx] = aiPlayer;
      const evalScore = minimax(board, depth + 1, false, aiPlayer, humanPlayer, size, alpha, beta, maxDepth);
      board[idx] = null;
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const idx of emptyIndices) {
      board[idx] = humanPlayer;
      const evalScore = minimax(board, depth + 1, true, aiPlayer, humanPlayer, size, alpha, beta, maxDepth);
      board[idx] = null;
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

/**
 * Board evaluation function for depth cutoff
 */
function evaluateBoardHeuristic(board, size, aiPlayer, humanPlayer) {
  const lines = generateWinningLines(size);
  let score = 0;

  for (const line of lines) {
    let aiCount = 0;
    let humanCount = 0;

    for (const idx of line) {
      if (board[idx] === aiPlayer) aiCount++;
      else if (board[idx] === humanPlayer) humanCount++;
    }

    if (aiCount > 0 && humanCount === 0) {
      score += Math.pow(10, aiCount);
    } else if (humanCount > 0 && aiCount === 0) {
      score -= Math.pow(10, humanCount);
    }
  }

  return score;
}

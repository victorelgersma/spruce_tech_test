import { Board, GameResult, XorO } from "./types";

function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== undefined));
}

function getCandidateTriples(i, j, directions) {
  return directions.map(({ delta_r, delta_c }) => [
    [i, j],
    [i + delta_r, j + delta_c],
    [i + 2 * delta_r, j + 2 * delta_c],
  ]);
}

/**
 * Safely get the value of a board cell, returning undefined for any invalid access
 */
function safeGetCell(board: Board, rowIndex: number | undefined, colIndex: number | undefined): XorO | undefined {
  // Check if coordinates are undefined
  if (rowIndex === undefined || colIndex === undefined) {
    return undefined;
  }
  
  // Check if row is out of bounds
  if (rowIndex < 0 || rowIndex >= board.length) {
    return undefined;
  }
  
  // Check if column is out of bounds
  if (colIndex < 0 || colIndex >= board[rowIndex].length) {
    return undefined;
  }
  
  // Now it's safe to access
  return board[rowIndex][colIndex];
}

// For checking if winning coordinates are valid:
function isWinningTriple(triple: [number, number][], board: Board): boolean {
  const [first, second, third] = triple;
  const firstCell = safeGetCell(board, first[0], first[1]);
  
  return (
    firstCell !== undefined &&
    firstCell === safeGetCell(board, second[0], second[1]) &&
    firstCell === safeGetCell(board, third[0], third[1])
  );
}

function findTriple(board: Board) {
  let winningTriple: [number, number][] | null = null;
  let XorO: XorO | null = null;
  const directions = [
    { delta_r: 1, delta_c: 0 }, // Vertical movement --> row number changes
    { delta_r: 0, delta_c: 1 }, // Horizontal
    { delta_r: 1, delta_c: 1 }, // Diagonal \
    { delta_r: 1, delta_c: -1 }, // Diagonal /
  ];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentCell = board[i][j];
      const candidateTriples = getCandidateTriples(i, j, directions);
      const winningTriple = candidateTriples.find((candidateTriple) =>
        isWinningTriple(candidateTriple, board)
      );
      if (winningTriple) {
        return { winningTriple, XorO: currentCell as XorO };
      }
    }
  }
  return { winningTriple: null, XorO: null };
}

export const getGameResult = (board: Board): GameResult => {
  let result: GameResult = { winner: null, isDraw: false, winningTriple: [] };

  const { winningTriple, XorO } = findTriple(board);
  if (winningTriple) {
    result.winner = XorO;
    result.winningTriple = winningTriple;
  } else if (isBoardFull(board)) {
    result.isDraw = true;
  } 
  return result;
};

export const getNewBoard = (oldBoard, rowIndex, columnIndex, currentPlayer) => {
  const newBoard = [...oldBoard];
  newBoard[rowIndex][columnIndex] = currentPlayer;
  return newBoard;
};

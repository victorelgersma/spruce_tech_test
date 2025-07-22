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

function findTriple(board: Board) : { winningTriple: [number, number][] | null; XorO: XorO | null } {
  let winningTriple: [number, number][] | null = null;
  let XorO: XorO | null = null;
  const directions = [
    { delta_r: 1, delta_c: 0 }, // Vertical movement --> row number changes
    { delta_r: 0, delta_c: 1 }, // Horizontal
    { delta_r: 1, delta_c: 1 }, // Diagonal \
    { delta_r: 1, delta_c: -1 }, // Diagonal /
  ];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
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
  console.log("winningTriple", winningTriple);
  if (winningTriple) {
    result.winner = XorO;
    result.winningTriple = winningTriple;
  } else if (isBoardFull(board)) {
    result.isDraw = true;
  } 
  return result;
};

export const getNewBoard = (oldBoard : Board, rowIndex : number, columnIndex: number, currentPlayer: XorO): Board => {
  const newBoard = [...oldBoard];
  newBoard[rowIndex][columnIndex] = currentPlayer;
  return newBoard;
};

export const getCurrentPlayer = (board: Board, startingPlayer: XorO ): XorO => {
  
  let numberOfX: number = 0
  let numberOfO: number = 0

  for (let row of board) {
    for (let tile of row) {
      if (tile === 'X') {
        numberOfX += 1
      } else if (tile === 'O') {
        numberOfO += 1
      }
    }
  }

  if (Math.abs(numberOfO - numberOfX) > 1) {
    throw new Error("Invalid board state")
  } else if (numberOfO > numberOfX) {
    return 'X'
  } else if (numberOfX > numberOfO) {
    return 'O'
  } else {
    return startingPlayer
  }
}
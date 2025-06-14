import { Board, GameResult, XorO } from "./types";

type GameStatus = "X" | "O" | "Draw" | "No Winner";

function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== undefined));
}

function XhasWonInRows(board: Board): boolean {
  return board.some((row) => row.every((cell) => cell === "X"));
}
function OhasWonInRows(board: Board): boolean {
  return board.some((row) => row.every((cell) => cell === "O"));
}
function XhasWonInColumns(board: Board): boolean {
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === "X" &&
      board[1][col] === "X" &&
      board[2][col] === "X"
    ) {
      return true;
    }
  }
  return false;
}
function OhasWonInColumns(board: Board): boolean {
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === "O" &&
      board[1][col] === "O" &&
      board[2][col] === "O"
    ) {
      return true;
    }
  }
  return false;
}
function XhasWonInDiagonals(board: Board): boolean {
  return (
    (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
    (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X")
  );
}
function OhasWonInDiagonals(board: Board): boolean {
  return (
    (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
    (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
  );
}
function OhasWon(board: Board): boolean {
  return (
    OhasWonInRows(board) || OhasWonInColumns(board) || OhasWonInDiagonals(board)
  );
}

function XhasWon(board: Board): boolean {
  return (
    XhasWonInRows(board) || XhasWonInColumns(board) || XhasWonInDiagonals(board)
  );
}

export const getGameResult = (board: Board): GameResult=> {
  let result: GameResult = { winner: null, isDraw: false};
  if (XhasWon(board)) {
    result.winner = "X";
  } else if (OhasWon(board)) {
    result.winner = "O";
  } else if (isBoardFull(board)) {
    result.winner = null;
    result.isDraw = true;
  } 
  return result;
};

export const getNewBoard = (oldBoard, rowIndex, columnIndex, currentPlayer) => {
  const newBoard = [...oldBoard];
  newBoard[rowIndex][columnIndex] = currentPlayer;
  return newBoard;
};

import React, { useEffect, useState } from "react";
import { XorO, Board } from "./types";
import { getNewBoard, getGameResult } from "./utils";

//          Column
//         0   1   2
//       ┌───┬───┬───┐
//     0 │   │   │   │
//   r   ├───┼───┼───┤
//   o 1 │   │   │   │
//   w   ├───┼───┼───┤
//     2 │   │   │   │
//       └───┴───┴───┘

function createBoard({ size }): Board {
  // returns a nested 2D array of size `size x size`
  return Array.from({ length: size }, () => Array.from({ length: size }));
}

export const Main = () => {
  const [preferredSize, setPreferredSize] = useState(3);
  const [board, setBoard] = useState<Board>(
    createBoard({ size: preferredSize })
  );
  const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
  const { winner, isDraw, winningTriple } = getGameResult(board);

  const handleResetBoard = () => {
    if (preferredSize < 3 || preferredSize > 15) {
      alert("Board size must be between 3 and 15");
      return;
    }
    setBoard(createBoard({ size: preferredSize }));
    setCurrentPlayer("X");
  };

  const handlePlay = ({ rowIndex, colIndex }) => {
    if (board[rowIndex][colIndex] || winner) {
      return;
    }
    const oldBoard = board;
    const newBoard = getNewBoard(oldBoard, rowIndex, colIndex, currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  function getIsWinningCellOrNot(winningTriple, rowIndex, colIndex) {
    return winningTriple.some(
      ([row, col]) => row === rowIndex && col === colIndex
    );
  }

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    // Can be an invalid value
      setPreferredSize(newValue);
  };

  return (
    <div className={`flex flex-col mt-10 items-center gap-10`}>
      <div className="font-bold border-black border-2 px-4 py-2 text-2xl">
        Tic Tac Toe
      </div>
      <div className="h-20">
        {/* Fixed height status container */}
        <div className="h-8 flex items-center text-3xl font-bold justify-center mb-6">
          {!winner && !isDraw && <p>{currentPlayer} to play</p>}
          {isDraw && <em className="animate-appear-mark">Draw!</em>}
          {winner && <p>{winner} wins</p>}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <div className="flex gap-1">
            {row.map((cell, colIndex) => {
              const isWinningCell = getIsWinningCellOrNot(
                winningTriple,
                rowIndex,
                colIndex
              );
              return (
                <div
                  className={`flex border-2 bg-white-500 border-gray-900 size-20 cursor-pointer
                  ${
                    ((winner && !isWinningCell) || isDraw) &&
                    "bg-white border-gray-300"
                  }
                  ${isWinningCell && winner && "border-2 bg-green-300"}
                  items-center justify-center text-2xl font-bold`}
                  onClick={() => handlePlay({ rowIndex, colIndex })}
                >
                  {cell && (
                    <span
                      className={`animate-appear-mark ${
                        (winner && !isWinningCell) || isDraw
                          ? "text-gray-300"
                          : "text-black"
                      }`}
                    >
                      {cell}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-start gap-4">
        <div className="mb-4">
          <input
            type="number"
            id="simple-input"
            className="w-full px-3 py-2 border-2 font-bold border-black shadow-sm 
           placeholder-gray-400 
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          "
            placeholder="Board size *"
            onChange={handleBoardSizeChange}
          />
          <label
            htmlFor="simple-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            * must be between 3 and 15
          </label>
        </div>
        <button
          className="cursor-pointer border-black border-2 text-black font-bold py-2 px-4 hover:bg-black hover:text-white duration-300"
          onClick={handleResetBoard}
        >
          {winner || isDraw ? "Play again" : "Reset board"}
        </button>
      </div>
    </div>
  );
};

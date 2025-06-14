import React, { useState } from "react";
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

export const Main = () => {
  const [board, setBoard] = useState<Board>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");
  const { winner, isDraw } = getGameResult(board);

  const handleResetBoard = () => {
    setBoard([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
    setCurrentPlayer("X");
  };

  const handleClick = ({ rowIndex, colIndex }) => {
    if (board[rowIndex][colIndex] || winner) {
      return;
    }
    const oldBoard = board;
    const newBoard = getNewBoard(oldBoard, rowIndex, colIndex, currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold border-black border-2 px-4 py-2 text-2xl">Tic Tac Toe</div>
      <div className="h-20">
        {/* Fixed height status container */}
        <div className="h-8 flex items-center text-3xl font-bold justify-center mb-6">
          {!winner && !isDraw && <p className="animate-appear-mark">{currentPlayer} to play</p>}
          {isDraw && <em className="animate-appear-mark">Draw!</em>}
          {winner && <p>The winner is: {winner} </p>}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <div className="flex gap-1">
            {row.map((cell, colIndex) => (
              <div
                className="flex border-2 border-gray-900 size-20 cursor-pointer items-center justify-center text-2xl font-bold"
                onClick={() => handleClick({ rowIndex, colIndex })}
              >
                {cell && <span className="animate-appear-mark">{cell}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      {(winner || isDraw) && (
        <button
          className="cursor-pointer border-black border-2 text-black font-bold py-2 px-4 hover:bg-black hover:text-white duration-300"
          onClick={handleResetBoard}
        >
          Reset
        </button>
      )}
    </div>
  );
};

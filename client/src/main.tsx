import React, { useState } from "react";
import { XorO, Board } from "./types";
import { getNewBoard, getWinner } from "./utils";

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
  const winner = getWinner(board);


  const handleClick = ({ rowIndex, columnIndex }) => {
    if (board[rowIndex][columnIndex] || winner) {
      return;
    }
    const oldBoard = board;
    const newBoard = getNewBoard(oldBoard, rowIndex, columnIndex, currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <p> {!winner && `${currentPlayer} to play`}</p>
      {winner && (
        <div className="text-2xl font-bold">
          {winner} wins!
        </div>
      )}
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <div className="flex gap-1">
            {row.map((column, columnIndex) => (
              <div
                className="flex border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold"
                onClick={() => handleClick({ rowIndex, columnIndex })}
              >
                {column}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

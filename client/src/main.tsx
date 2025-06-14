import React, { useState } from "react";
import { XorO } from "./types";

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  //          Column
  //         0   1   2
  //       ┌───┬───┬───┐
  //     0 │   │   │   │
  //   r   ├───┼───┼───┤
  //   o 1 │   │   │   │
  //   w   ├───┼───┼───┤
  //     2 │   │   │   │
  //       └───┴───┴───┘

  const [currentPlayer, setCurrentPlayer] = useState<XorO>("X");

  const handleClick = ({ rowIndex, columnIndex }) => {
    console.log({ rowIndex, columnIndex });
    // check if the cell is already occupied
    if (board[rowIndex][columnIndex]) {
      console.log("Cell already occupied");
      return;
    }
    const oldBoard = board;
    const getNewBoard = (oldBoard, rowIndex, columnIndex) => {
      const newBoard = [...oldBoard];
      newBoard[rowIndex][columnIndex] = currentPlayer;
      return newBoard;
    }
    const newBoard = getNewBoard(oldBoard, rowIndex, columnIndex);

    setBoard(newBoard);
    // switch player
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };
  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <p> Current player: {currentPlayer}</p>
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

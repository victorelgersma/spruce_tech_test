import React from "react";
import { XorO } from "../types";

interface InfoBoxProps {
  winner: XorO | null;
  currentPlayer: XorO | undefined;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ winner, currentPlayer }) => {
  return (
    <div className="fixed top-4 right-4 p-4 bg-white shadow-lg rounded-md border-2 border-gray-200 min-w-[150px] text-center z-10">
      {winner ? (
        <div className="font-bold text-xl text-green-600">{winner} wins!</div>
      ) : (
        <div>
          <div className="text-gray-500 text-sm">Current Player</div>
          <div className="font-bold text-xl">{currentPlayer}</div>
        </div>
      )}
    </div>
  );
};
import React from "react";
import { XorO } from "../types";

interface GameStatusProps {
    winner: XorO | null
    isDraw: boolean
    currentPlayer: XorO
}
export default function GameStatus({ winner, isDraw, currentPlayer }: GameStatusProps) {
    return (
        <div className="h-8 flex items-center text-3xl font-bold justify-center mb-6">
            {!winner && !isDraw && (
                <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-lg">
                    {/* X side */}
                    <div className={`w-12 h-12 flex items-center justify-center rounded transition-all duration-300 ${
                        currentPlayer === 'X' 
                            ? 'bg-red-500 text-white scale-110 shadow-lg' 
                            : 'bg-gray-600 text-gray-400'
                    }`}>
                        X
                    </div>
                    {/* Separator dot */}
                    <div className="w-2 h-2 bg-white rounded-full mx-1" />
                    {/* O side */}
                    <div className={`w-12 h-12 flex items-center justify-center rounded transition-all duration-300 ${
                        currentPlayer === 'O' 
                            ? 'bg-blue-500 text-white scale-110 shadow-lg' 
                            : 'bg-gray-600 text-gray-400'
                    }`}>
                        O
                    </div>
                </div>
            )}
            {isDraw && <em className="animate-appear-mark">Draw!</em>}
            {winner && <p>{winner} wins</p>}
        </div>
    )
}
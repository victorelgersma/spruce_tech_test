export type XorO = 'X' | 'O'


export interface GameResult {
  winner: XorO | null;
  isDraw: boolean;
  winningTriple: [number, number][];
}



export type Board = (XorO | undefined)[][];
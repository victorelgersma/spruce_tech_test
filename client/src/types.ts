export type XorO = 'X' | 'O'


export interface GameResult {
  winner: XorO | null;
  isDraw: boolean;
}



export type Board = (XorO | undefined)[][];
import React, { useState } from 'react'
import { XorO } from './types'


export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ])
  const [nextPlayer, setNextPlayer] = useState<XorO>('X')

  const handleClick = ({rowIndex, columnIndex}) => {
    console.log({ rowIndex, columnIndex });
  }
  return <div className='flex flex-col mt-10 items-center gap-10'>
    <div className='font-bold text-2xl'>Tic Tac Toe</div>
    <p> Next player to play: X</p>
    <div className='flex flex-col gap-1'>
      {board.map((row, rowIndex) => <div className='flex gap-1'>
        {row.map((column, columnIndex) => <div className='flex border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold' onClick={() => handleClick({ rowIndex, columnIndex })}>
          {column}
        </div>)}
      </div>)}
    </div>
  </div>
}

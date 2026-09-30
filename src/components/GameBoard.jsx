import React from 'react';
import { Cell } from './Cell';
import { Trophy, Frown, RotateCcw } from 'lucide-react';

export function GameBoard({ 
  board, 
  onCellClick, 
  winningInfo, 
  isDraw, 
  disabled, 
  symbols, 
  currentPlayer, 
  gridSize,
  winnerName,
  onReset
}) {
  const winningIndices = winningInfo?.line || [];

  // Dynamic Grid Tailwind layout based on gridSize (3x3, 4x4, 5x5)
  const gridColsClass = 
    gridSize === 3 
      ? 'grid-cols-3 gap-3 md:gap-4 max-w-[420px]' 
      : gridSize === 4 
      ? 'grid-cols-4 gap-2.5 md:gap-3 max-w-[480px]' 
      : 'grid-cols-5 gap-2 md:gap-2.5 max-w-[540px]';

  return (
    <div className="w-full flex flex-col items-center my-2">
      {/* Game Status Banner */}
      <div className="h-14 flex items-center justify-center mb-3">
        {winningInfo ? (
          <div className="animate-bounce-subtle flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border border-yellow-400/40 text-yellow-300 font-extrabold text-base md:text-lg shadow-lg shadow-yellow-500/20">
            <Trophy className="w-5 h-5 text-yellow-400 animate-spin-slow" />
            <span>🎉 {winnerName} Wins!</span>
          </div>
        ) : isDraw ? (
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 font-bold text-base shadow-md">
            <Frown className="w-5 h-5 text-slate-400" />
            <span>Game Draw! Well played.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-slate-800 text-slate-300 text-sm font-semibold">
            <span>Current Turn:</span>
            <span className={`font-bold px-2 py-0.5 rounded-md ${
              currentPlayer === 'X' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
            }`}>
              {symbols[currentPlayer]} ({currentPlayer})
            </span>
          </div>
        )}
      </div>

      {/* Grid Container */}
      <div className={`relative w-full ${gridColsClass} grid p-4 md:p-6 rounded-3xl glass-panel border border-slate-800 shadow-2xl transition-all duration-300`}>
        {board.map((cellValue, idx) => (
          <Cell
            key={idx}
            value={cellValue}
            onClick={() => onCellClick(idx)}
            isWinningCell={winningIndices.includes(idx)}
            disabled={disabled || winningInfo !== null || isDraw}
            symbols={symbols}
            currentPlayer={currentPlayer}
            gridSize={gridSize}
          />
        ))}
      </div>

      {/* Quick Play Again popup when game ends */}
      {(winningInfo || isDraw) && (
        <button
          onClick={onReset}
          className="mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-black font-extrabold text-sm md:text-base tracking-wide shadow-xl shadow-cyan-500/25 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          PLAY AGAIN
        </button>
      )}
    </div>
  );
}

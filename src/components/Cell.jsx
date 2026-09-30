import React from 'react';

export function Cell({ 
  value, 
  onClick, 
  isWinningCell, 
  disabled, 
  symbols, 
  currentPlayer, 
  gridSize 
}) {
  const isX = value === 'X';
  const isO = value === 'O';

  // Responsive font sizes based on grid size
  const fontSizeClass = 
    gridSize === 3 
      ? 'text-4xl md:text-6xl font-extrabold' 
      : gridSize === 4 
      ? 'text-3xl md:text-4xl font-bold' 
      : 'text-2xl md:text-3xl font-bold';

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={`Grid cell ${value ? value : 'empty'}`}
      className={`relative aspect-square rounded-2xl flex items-center justify-center transition-all duration-200 select-none group border ${
        isWinningCell
          ? isX
            ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.6)] animate-pulse scale-[1.03] z-10'
            : 'bg-pink-500/20 border-pink-400 shadow-[0_0_25px_rgba(255,0,127,0.6)] animate-pulse scale-[1.03] z-10'
          : value !== null
          ? 'bg-slate-900/80 border-slate-800/90'
          : disabled
          ? 'bg-slate-900/30 border-slate-800/40 cursor-not-allowed'
          : currentPlayer === 'X'
          ? 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/20 cell-glow-x cursor-pointer'
          : 'bg-slate-900/50 border-slate-800 hover:border-pink-500/50 hover:bg-pink-950/20 cell-glow-o cursor-pointer'
      }`}
    >
      {/* Played Symbol */}
      {value !== null && (
        <span
          className={`animate-pop-in ${fontSizeClass} ${
            isX ? 'neon-text-x drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]' : 'neon-text-o drop-shadow-[0_0_12px_rgba(255,0,127,0.8)]'
          }`}
        >
          {symbols[value] || value}
        </span>
      )}

      {/* Hover Preview Symbol when cell is empty and game active */}
      {value === null && !disabled && (
        <span
          className={`opacity-0 group-hover:opacity-30 transition-opacity duration-150 ${fontSizeClass} ${
            currentPlayer === 'X' ? 'text-cyan-400' : 'text-pink-400'
          }`}
        >
          {symbols[currentPlayer]}
        </span>
      )}
    </button>
  );
}

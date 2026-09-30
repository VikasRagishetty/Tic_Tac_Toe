import React from 'react';
import { User, Cpu, Award, Zap, MinusCircle } from 'lucide-react';

export function ScoreBoard({ 
  scores, 
  currentPlayer, 
  gameMode, 
  playerNames, 
  symbols, 
  winningLine,
  isDraw
}) {
  const isXTurn = currentPlayer === 'X';
  const isOTurn = currentPlayer === 'O';

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-3 gap-3 md:gap-4 my-3">
      {/* Player 1 (X) Score Card */}
      <div 
        className={`relative overflow-hidden p-3 md:p-4 rounded-2xl transition-all duration-300 border ${
          isXTurn && !winningLine && !isDraw
            ? 'glass-panel glass-panel-glow-x bg-cyan-950/20 translate-y-[-2px]'
            : 'glass-panel border-slate-800/80 bg-slate-900/40 opacity-90'
        }`}
      >
        {isXTurn && !winningLine && !isDraw && (
          <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl-xl bg-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-wider uppercase border-l border-b border-cyan-500/30">
            TURN
          </div>
        )}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl md:text-2xl neon-text-x font-bold">{symbols.X}</span>
          <span className="text-sm font-semibold text-slate-200 truncate">{playerNames.X}</span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-2xl md:text-3xl font-extrabold text-cyan-400">{scores.X}</span>
          <span className="text-[11px] text-slate-400 font-medium">Wins</span>
        </div>
      </div>

      {/* Ties / Draws Score Card */}
      <div className="relative overflow-hidden p-3 md:p-4 rounded-2xl glass-panel border-slate-800/80 bg-slate-900/40 text-center flex flex-col justify-between">
        <div className="flex items-center justify-center gap-1.5 text-slate-400 font-semibold text-xs mb-1">
          <MinusCircle className="w-4 h-4 text-slate-400" />
          <span>DRAWS</span>
        </div>
        <div className="text-2xl md:text-3xl font-extrabold text-slate-300">
          {scores.ties}
        </div>
        <div className="text-[11px] text-slate-500 font-medium mt-1">
          Total: {scores.X + scores.O + scores.ties} matches
        </div>
      </div>

      {/* Player 2 / AI (O) Score Card */}
      <div 
        className={`relative overflow-hidden p-3 md:p-4 rounded-2xl transition-all duration-300 border ${
          isOTurn && !winningLine && !isDraw
            ? 'glass-panel glass-panel-glow-o bg-pink-950/20 translate-y-[-2px]'
            : 'glass-panel border-slate-800/80 bg-slate-900/40 opacity-90'
        }`}
      >
        {isOTurn && !winningLine && !isDraw && (
          <div className="absolute top-0 right-0 px-2 py-0.5 rounded-bl-xl bg-pink-500/20 text-pink-400 text-[10px] font-bold tracking-wider uppercase border-l border-b border-pink-500/30">
            TURN
          </div>
        )}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl md:text-2xl neon-text-o font-bold">{symbols.O}</span>
          <span className="text-sm font-semibold text-slate-200 truncate">
            {gameMode === 'ai' ? playerNames.O || 'AI Bot' : playerNames.O}
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-2xl md:text-3xl font-extrabold text-pink-400">{scores.O}</span>
          <span className="text-[11px] text-slate-400 font-medium">Wins</span>
        </div>
      </div>
    </div>
  );
}

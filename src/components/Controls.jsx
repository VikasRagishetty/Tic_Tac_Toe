import React from 'react';
import { RotateCcw, Undo2, Users, Cpu, Layers, Sparkles } from 'lucide-react';

export function Controls({ 
  onReset, 
  onUndo, 
  canUndo, 
  gameMode, 
  setGameMode, 
  aiDifficulty, 
  setAiDifficulty, 
  gridSize, 
  setGridSize 
}) {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-3 my-3 p-4 rounded-2xl glass-panel border border-slate-800/80 shadow-xl">
      {/* Top row: Main game action buttons (Reset & Undo) */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onReset}
          className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Restart Game</span>
        </button>

        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all duration-200 border ${
            canUndo
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-700 shadow-md active:scale-95 cursor-pointer'
              : 'bg-slate-950 text-slate-600 border-slate-900 cursor-not-allowed'
          }`}
        >
          <Undo2 className={`w-4 h-4 ${canUndo ? 'text-pink-400' : 'text-slate-700'}`} />
          <span>Undo Move</span>
        </button>
      </div>

      {/* Bottom row: Config Toggles (Mode, AI Difficulty, Grid Size) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs font-semibold">
        {/* Mode Selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-bold flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-cyan-400" /> Game Mode
          </span>
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800/80">
            <button
              onClick={() => setGameMode('pvp')}
              className={`flex-1 py-1.5 rounded-lg transition-all duration-150 text-center ${
                gameMode === 'pvp'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2 Players
            </button>
            <button
              onClick={() => setGameMode('ai')}
              className={`flex-1 py-1.5 rounded-lg transition-all duration-150 text-center ${
                gameMode === 'ai'
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              VS AI Bot
            </button>
          </div>
        </div>

        {/* AI Difficulty Selector (Only when VS AI mode active) */}
        <div className={`flex flex-col gap-1.5 transition-opacity duration-200 ${gameMode === 'ai' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-pink-400" /> AI Level
          </span>
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800/80">
            {['easy', 'medium', 'hard'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setAiDifficulty(lvl)}
                className={`flex-1 py-1.5 rounded-lg uppercase text-[10px] tracking-wide transition-all duration-150 text-center ${
                  aiDifficulty === lvl
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/40 shadow-sm font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Size Selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-slate-400 text-[11px] uppercase tracking-wider font-bold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" /> Grid Size
          </span>
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800/80">
            {[3, 4, 5].map((size) => (
              <button
                key={size}
                onClick={() => setGridSize(size)}
                className={`flex-1 py-1.5 rounded-lg transition-all duration-150 text-center ${
                  gridSize === size
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {size}x{size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

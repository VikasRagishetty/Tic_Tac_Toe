import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, FastForward } from 'lucide-react';

export function MoveHistory({ history, stepNumber, jumpToStep, symbols, gridSize }) {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length <= 1) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-2 glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg transition-all duration-200">
      {/* Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-900/60 hover:bg-slate-800/60 flex items-center justify-between text-xs font-semibold text-slate-300 transition-colors"
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span>Move History Timeline ({history.length - 1} moves)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
            Step {stepNumber} / {history.length - 1}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded History Steps List */}
      {isOpen && (
        <div className="p-3 max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 border-t border-slate-800/80 bg-slate-950/40">
          {history.map((step, moveIdx) => {
            const isCurrent = moveIdx === stepNumber;
            let label = moveIdx === 0 ? 'Game Start' : `Move #${moveIdx}`;
            
            if (moveIdx > 0 && step.lastMove !== undefined) {
              const row = Math.floor(step.lastMove / gridSize) + 1;
              const col = (step.lastMove % gridSize) + 1;
              const symbol = step.lastPlayer ? symbols[step.lastPlayer] : '';
              label = `#${moveIdx}: ${symbol} at (${row}, ${col})`;
            }

            return (
              <button
                key={moveIdx}
                onClick={() => jumpToStep(moveIdx)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 flex items-center justify-between border ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md font-bold'
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                <span className="truncate">{label}</span>
                {isCurrent && <FastForward className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

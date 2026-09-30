import React from 'react';
import { X, Save, RotateCcw, Sparkles } from 'lucide-react';

export const SYMBOL_PACKS = [
  { id: 'classic', name: 'Classic X & O', X: '❌', O: '⭕' },
  { id: 'elements', name: 'Fire & Lightning', X: '🔥', O: '⚡' },
  { id: 'space', name: 'Rocket & UFO', X: '🚀', O: '🛸' },
  { id: 'treasures', name: 'Gem & Crown', X: '💎', O: '👑' },
  { id: 'swords', name: 'Crossed Swords & Shield', X: '⚔️', O: '🛡️' },
];

export function SettingsModal({ 
  isOpen, 
  onClose, 
  playerNames, 
  setPlayerNames, 
  selectedPack, 
  setSelectedPack, 
  onResetStats 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md glass-panel bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Game Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-5">
          {/* Custom Player Names */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Player Names
            </label>
            <div className="space-y-2">
              <div>
                <span className="text-xs text-cyan-400 font-semibold mb-1 block">Player 1 (X / Symbol 1)</span>
                <input
                  type="text"
                  value={playerNames.X}
                  onChange={(e) => setPlayerNames({ ...playerNames, X: e.target.value })}
                  maxLength={15}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
                  placeholder="Player 1 Name"
                />
              </div>
              <div>
                <span className="text-xs text-pink-400 font-semibold mb-1 block">Player 2 / AI (O / Symbol 2)</span>
                <input
                  type="text"
                  value={playerNames.O}
                  onChange={(e) => setPlayerNames({ ...playerNames, O: e.target.value })}
                  maxLength={15}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-pink-500 focus:outline-none"
                  placeholder="Player 2 Name"
                />
              </div>
            </div>
          </div>

          {/* Symbol Themes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Symbol Style Theme
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
              {SYMBOL_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                    selectedPack === pack.id
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span>{pack.name}</span>
                  <span className="text-base">{pack.X} vs {pack.O}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reset Score Statistics */}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                onResetStats();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Score Stats
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs tracking-wider transition-colors shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            SAVE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

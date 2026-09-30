import React from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Trophy, Cpu, Users } from 'lucide-react';

export default function Header({ 
  soundEnabled, 
  setSoundEnabled, 
  onOpenSettings, 
  gameMode, 
  aiDifficulty, 
  gridSize 
}) {
  return (
    <header className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 mb-2 glass-panel rounded-2xl border border-slate-800/80 shadow-2xl">
      {/* Brand Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-pink-500 p-[2px] shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-[#0d101d] rounded-[10px] flex items-center justify-center font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
            ❌
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            TIC TAC TOE
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold tracking-wider uppercase">
              PRO
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            {gridSize}x{gridSize} Mode • {gameMode === 'ai' ? `AI (${aiDifficulty.toUpperCase()})` : '2 Players (Local)'}
          </p>
        </div>
      </div>

      {/* Mode Badges & Controls */}
      <div className="flex items-center gap-3">
        {/* Game Mode Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
          {gameMode === 'ai' ? (
            <>
              <Cpu className="w-4 h-4 text-pink-400" />
              <span>VS BOT ({aiDifficulty})</span>
            </>
          ) : (
            <>
              <Users className="w-4 h-4 text-cyan-400" />
              <span>2 PLAYER PVP</span>
            </>
          )}
        </div>

        {/* Mute / Unmute Button */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center ${
            soundEnabled
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 shadow-lg shadow-cyan-500/10'
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300 hover:bg-slate-800'
          }`}
          title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700 transition-all duration-200 shadow-md flex items-center justify-center"
          title="Game Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

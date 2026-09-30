import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { ScoreBoard } from './components/ScoreBoard';
import { GameBoard } from './components/GameBoard';
import { Controls } from './components/Controls';
import { MoveHistory } from './components/MoveHistory';
import { SettingsModal, SYMBOL_PACKS } from './components/SettingsModal';
import { checkWinner, isBoardFull, getAIMove } from './utils/aiLogic';
import { soundFx } from './utils/soundEffects';
import { triggerConfetti } from './utils/confetti';

export default function App() {
  // Config state
  const [gridSize, setGridSize] = useState(3);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' | 'ai'
  const [aiDifficulty, setAiDifficulty] = useState('medium'); // 'easy' | 'medium' | 'hard'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedPack, setSelectedPack] = useState('classic');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Player Names
  const [playerNames, setPlayerNames] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  // Game history state (Time travel rewind support)
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), lastMove: undefined, lastPlayer: undefined }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  // Score persistence in localStorage
  const [scores, setScores] = useState(() => {
    try {
      const saved = localStorage.getItem('tictactoe_scores');
      return saved ? JSON.parse(saved) : { X: 0, O: 0, ties: 0 };
    } catch {
      return { X: 0, O: 0, ties: 0 };
    }
  });

  // Derived current board state
  const currentStep = history[stepNumber];
  const currentBoard = currentStep.board;

  // Active Symbol mapping
  const activePack = SYMBOL_PACKS.find(p => p.id === selectedPack) || SYMBOL_PACKS[0];
  const symbols = { X: activePack.X, O: activePack.O };

  // Sync sound muted state
  useEffect(() => {
    soundFx.muted = !soundEnabled;
  }, [soundEnabled]);

  // Save scores to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tictactoe_scores', JSON.stringify(scores));
    } catch (e) {
      console.error(e);
    }
  }, [scores]);

  // Reset grid when grid size changes
  useEffect(() => {
    const totalCells = gridSize * gridSize;
    setHistory([{ board: Array(totalCells).fill(null), lastMove: undefined, lastPlayer: undefined }]);
    setStepNumber(0);
    setXIsNext(true);
  }, [gridSize]);

  // Check game status
  const winningInfo = checkWinner(currentBoard, gridSize);
  const isDraw = !winningInfo && isBoardFull(currentBoard);
  const currentPlayer = xIsNext ? 'X' : 'O';

  // Handle cell click
  const handleCellClick = (i) => {
    if (currentBoard[i] || winningInfo || isDraw) return;

    // Truncate history if moved back
    const historyUpToStep = history.slice(0, stepNumber + 1);
    const newBoard = [...currentBoard];
    const turnSymbol = xIsNext ? 'X' : 'O';
    newBoard[i] = turnSymbol;

    // Play Sound FX
    if (turnSymbol === 'X') soundFx.playMoveX();
    else soundFx.playMoveO();

    const newWinningInfo = checkWinner(newBoard, gridSize);
    const newIsDraw = !newWinningInfo && isBoardFull(newBoard);

    // Update scores & FX if game concluded
    if (newWinningInfo) {
      soundFx.playWin();
      triggerConfetti();
      setScores(prev => ({ ...prev, [newWinningInfo.winner]: prev[newWinningInfo.winner] + 1 }));
    } else if (newIsDraw) {
      soundFx.playDraw();
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }

    setHistory([...historyUpToStep, { board: newBoard, lastMove: i, lastPlayer: turnSymbol }]);
    setStepNumber(historyUpToStep.length);
    setXIsNext(!xIsNext);
  };

  // AI Opponent Move Effect
  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !winningInfo && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getAIMove(currentBoard, gridSize, 'O', aiDifficulty);
        if (aiMove !== null && aiMove !== undefined) {
          handleCellClick(aiMove);
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [gameMode, xIsNext, currentBoard, winningInfo, isDraw, gridSize, aiDifficulty]);

  // Reset Game Match
  const resetGame = () => {
    soundFx.playClick();
    const totalCells = gridSize * gridSize;
    setHistory([{ board: Array(totalCells).fill(null), lastMove: undefined, lastPlayer: undefined }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  // Undo Last Move
  const undoMove = () => {
    if (stepNumber <= 0) return;
    soundFx.playClick();

    if (gameMode === 'ai' && stepNumber >= 2) {
      // Undo both AI and Player moves in AI mode
      setStepNumber(stepNumber - 2);
    } else {
      setStepNumber(stepNumber - 1);
      setXIsNext(!xIsNext);
    }
  };

  // Time Travel Jump
  const jumpToStep = (step) => {
    soundFx.playClick();
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // Reset Statistics
  const resetStats = () => {
    soundFx.playClick();
    setScores({ X: 0, O: 0, ties: 0 });
  };

  const winnerName = winningInfo ? (winningInfo.winner === 'X' ? playerNames.X : gameMode === 'ai' ? playerNames.O || 'AI Bot' : playerNames.O) : '';

  return (
    <div className="min-h-screen flex flex-col justify-between p-3 sm:p-6 md:p-8">
      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <Header
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onOpenSettings={() => setIsSettingsOpen(true)}
          gameMode={gameMode}
          aiDifficulty={aiDifficulty}
          gridSize={gridSize}
        />

        {/* Score Board */}
        <ScoreBoard
          scores={scores}
          currentPlayer={currentPlayer}
          gameMode={gameMode}
          playerNames={playerNames}
          symbols={symbols}
          winningLine={winningInfo}
          isDraw={isDraw}
        />

        {/* Interactive Game Board */}
        <GameBoard
          board={currentBoard}
          onCellClick={handleCellClick}
          winningInfo={winningInfo}
          isDraw={isDraw}
          disabled={gameMode === 'ai' && !xIsNext}
          symbols={symbols}
          currentPlayer={currentPlayer}
          gridSize={gridSize}
          winnerName={winnerName}
          onReset={resetGame}
        />

        {/* Control Panel */}
        <Controls
          onReset={resetGame}
          onUndo={undoMove}
          canUndo={stepNumber > 0}
          gameMode={gameMode}
          setGameMode={(mode) => {
            setGameMode(mode);
            resetGame();
          }}
          aiDifficulty={aiDifficulty}
          setAiDifficulty={setAiDifficulty}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />

        {/* Move History Drawer */}
        <MoveHistory
          history={history}
          stepNumber={stepNumber}
          jumpToStep={jumpToStep}
          symbols={symbols}
          gridSize={gridSize}
        />
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-slate-500 py-4 mt-6">
        Built with React, Vite & Tailwind CSS • Tic-Tac-Toe Pro Edition
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        selectedPack={selectedPack}
        setSelectedPack={setSelectedPack}
        onResetStats={resetStats}
      />
    </div>
  );
}

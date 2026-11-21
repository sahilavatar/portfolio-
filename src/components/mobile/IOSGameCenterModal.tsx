import React, { useState, useEffect, useRef } from 'react';
import { IOSAppModal } from './IOSAppModal';
import { Trophy, Gamepad2, RotateCcw, Play, Pause, Flame, Sparkles } from 'lucide-react';

interface IOSGameCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSGameCenterModal: React.FC<IOSGameCenterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeGame, setActiveGame] = useState<'snake' | 'tictactoe' | 'hub'>('hub');

  // Snake game state
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ]);
  const [food, setFood] = useState({ x: 8, y: 8 });
  const [dir, setDir] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(12);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Tic-tac-toe state
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Snake loop
  useEffect(() => {
    if (activeGame !== 'snake' || isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        if (dir === 'UP') head.y -= 1;
        if (dir === 'DOWN') head.y += 1;
        if (dir === 'LEFT') head.x -= 1;
        if (dir === 'RIGHT') head.x += 1;

        // Wall collision (12x12 grid)
        if (head.x < 0 || head.x >= 12 || head.y < 0 || head.y >= 12) {
          setIsGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const next = s + 1;
            if (next > highScore) setHighScore(next);
            return next;
          });
          setFood({
            x: Math.floor(Math.random() * 12),
            y: Math.floor(Math.random() * 12),
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 170);
    return () => clearInterval(interval);
  }, [activeGame, dir, food, isGameOver, isPaused, highScore]);

  const resetSnake = () => {
    setSnake([
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]);
    setDir('RIGHT');
    setFood({ x: 8, y: 8 });
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || calculateWinner(board)) return;
    const next = [...board];
    next[idx] = isXNext ? 'X' : 'O';
    setBoard(next);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((c) => c !== null);

  return (
    <IOSAppModal title="Game Center" isOpen={isOpen} onClose={onClose}>
      <div className="max-w-md mx-auto space-y-4 pt-1">
        {/* Game Center Header Banner */}
        <div className="ios-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-amber-400 via-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Gamepad2 size={22} />
            </div>
            <div>
              <h2 className="font-bold text-base ios-text-title">Game Center</h2>
              <p className="text-xs ios-text-subtle">
                Arcade & Mini-Games · Level 42
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-500 font-bold text-xs">
            <Trophy size={14} />
            <span>{highScore * 100} XP</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 ios-card">
          <button
            type="button"
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'hub' ? 'bg-indigo-600 text-white shadow-md' : 'ios-text-subtle hover:text-white'
            }`}
            onClick={() => setActiveGame('hub')}
          >
            Games Hub
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'snake' ? 'bg-indigo-600 text-white shadow-md' : 'ios-text-subtle hover:text-white'
            }`}
            onClick={() => setActiveGame('snake')}
          >
            🐍 Retro Snake
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeGame === 'tictactoe' ? 'bg-indigo-600 text-white shadow-md' : 'ios-text-subtle hover:text-white'
            }`}
            onClick={() => setActiveGame('tictactoe')}
          >
            ⚔️ Tic-Tac-Toe
          </button>
        </div>

        {/* Game 1: Hub */}
        {activeGame === 'hub' && (
          <div className="space-y-3">
            <div
              onClick={() => {
                resetSnake();
                setActiveGame('snake');
              }}
              className="ios-card p-4 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 font-bold text-2xl flex items-center justify-center">
                  🐍
                </div>
                <div>
                  <h3 className="font-bold text-sm ios-text-title">Retro Snake Classic</h3>
                  <p className="text-xs ios-text-subtle">
                    Score: {score} · Best: {highScore}
                  </p>
                </div>
              </div>
              <button type="button" className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                Play
              </button>
            </div>

            <div
              onClick={() => {
                setBoard(Array(9).fill(null));
                setIsXNext(true);
                setActiveGame('tictactoe');
              }}
              className="ios-card p-4 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-500 font-bold text-2xl flex items-center justify-center">
                  ⚔️
                </div>
                <div>
                  <h3 className="font-bold text-sm ios-text-title">Tic-Tac-Toe Arena</h3>
                  <p className="text-xs ios-text-subtle">
                    2-Player Turn Based Duel
                  </p>
                </div>
              </div>
              <button type="button" className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                Play
              </button>
            </div>

            <div className="ios-card p-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Custom Projects & Games Slot</span>
              </div>
              <p className="text-xs ios-text-subtle">
                Tell me to drop any interactive React game, 3D WebGL demo, or custom canvas app right here!
              </p>
            </div>
          </div>
        )}

        {/* Game 2: Snake */}
        {activeGame === 'snake' && (
          <div className="ios-card p-4 space-y-3 flex flex-col items-center">
            <div className="flex items-center justify-between w-full text-xs font-bold px-2">
              <span className="text-emerald-500">Score: {score}</span>
              <span className="ios-text-subtle">High: {highScore}</span>
              <button
                type="button"
                onClick={resetSnake}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 flex items-center gap-1 text-[11px]"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Snake Grid Board */}
            <div className="relative w-64 h-64 bg-black/80 rounded-2xl border border-white/20 grid grid-cols-12 grid-rows-12 p-1 overflow-hidden shadow-inner">
              {Array.from({ length: 144 }).map((_, i) => {
                const x = i % 12;
                const y = Math.floor(i / 12);
                const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
                const isSnakeBody = snake.slice(1).some((s) => s.x === x && s.y === y);
                const isFood = food.x === x && food.y === y;

                return (
                  <div
                    key={i}
                    className={`rounded-[2px] transition-colors ${
                      isSnakeHead
                        ? 'bg-emerald-400 shadow-sm scale-95'
                        : isSnakeBody
                        ? 'bg-emerald-600 scale-90'
                        : isFood
                        ? 'bg-rose-500 animate-pulse rounded-full'
                        : 'bg-transparent'
                    }`}
                  />
                );
              })}

              {isGameOver && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-white space-y-2">
                  <span className="text-lg font-bold text-rose-400">Game Over!</span>
                  <span className="text-xs text-white/70">Final Score: {score}</span>
                  <button
                    type="button"
                    onClick={resetSnake}
                    className="px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-lg active:scale-95"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>

            {/* Direction Controls D-Pad */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <button
                type="button"
                className="w-12 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 font-bold flex items-center justify-center text-sm shadow-md"
                onClick={() => dir !== 'DOWN' && setDir('UP')}
              >
                ▲
              </button>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="w-12 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 font-bold flex items-center justify-center text-sm shadow-md"
                  onClick={() => dir !== 'RIGHT' && setDir('LEFT')}
                >
                  ◀
                </button>
                <button
                  type="button"
                  className="w-12 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 font-bold flex items-center justify-center text-sm shadow-md"
                  onClick={() => dir !== 'UP' && setDir('DOWN')}
                >
                  ▼
                </button>
                <button
                  type="button"
                  className="w-12 h-10 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 font-bold flex items-center justify-center text-sm shadow-md"
                  onClick={() => dir !== 'LEFT' && setDir('RIGHT')}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game 3: Tic Tac Toe */}
        {activeGame === 'tictactoe' && (
          <div className="ios-card p-4 space-y-4 flex flex-col items-center">
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-xs font-bold ios-text-title">
                {winner ? `Winner: ${winner}! 🎉` : isDraw ? 'Draw Game! 🤝' : `Next Turn: ${isXNext ? 'X' : 'O'}`}
              </span>
              <button
                type="button"
                onClick={() => {
                  setBoard(Array(9).fill(null));
                  setIsXNext(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1"
              >
                <RotateCcw size={12} /> New Match
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 w-64 h-64 p-2 bg-black/30 rounded-2xl border border-white/10">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCellClick(idx)}
                  className={`rounded-xl text-3xl font-extrabold flex items-center justify-center border shadow-md active:scale-95 transition-all ${
                    cell === 'X'
                      ? 'bg-blue-600/30 border-blue-500 text-blue-400'
                      : cell === 'O'
                      ? 'bg-rose-600/30 border-rose-500 text-rose-400'
                      : 'bg-white/5 border-white/10 hover:bg-white/15'
                  }`}
                >
                  {cell}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </IOSAppModal>
  );
};

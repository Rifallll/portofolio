import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PremiumNavbar from "@/components/PremiumNavbar";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

const SnakeGame = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const generateFood = () => {
        const newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        setFood(newFood);
    };

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
        generateFood();
    };

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [direction, isPlaying, gameOver]);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = setInterval(() => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y
                };

                // Check wall collision
                if (
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE
                ) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                // Check self collision
                if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food collision
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore((s) => s + 10);
                    generateFood();
                    return newSnake;
                }

                newSnake.pop();
                return newSnake;
            });
        }, GAME_SPEED);

        return () => clearInterval(moveSnake);
    }, [direction, food, isPlaying, gameOver]);

    return (
        <div className="min-h-screen bg-background flex flex-col">

            <div className="flex-1 flex items-center justify-center p-8 pt-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient-ocean">Snake Game</span>
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        🎮 Easter Egg! Use arrow keys to play
                    </p>

                    {/* Score */}
                    <div className="mb-6">
                        <span className="text-2xl font-bold text-cyan-400">Score: {score}</span>
                    </div>

                    {/* Game Board */}
                    <div
                        className="inline-grid gap-0.5 p-4 glass-card rounded-2xl border-2 border-cyan-500/30"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`
                        }}
                    >
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                            const x = index % GRID_SIZE;
                            const y = Math.floor(index / GRID_SIZE);
                            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
                            const isHead = snake[0].x === x && snake[0].y === y;
                            const isFood = food.x === x && food.y === y;

                            return (
                                <div
                                    key={index}
                                    className={`w-5 h-5 md:w-6 md:h-6 rounded-sm transition-colors ${isHead
                                        ? "bg-cyan-400"
                                        : isSnake
                                            ? "bg-cyan-600"
                                            : isFood
                                                ? "bg-yellow-400"
                                                : "bg-slate-800/50"
                                        }`}
                                />
                            );
                        })}
                    </div>

                    {/* Controls */}
                    <div className="mt-8">
                        {!isPlaying && !gameOver && (
                            <button
                                onClick={resetGame}
                                className="px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all"
                            >
                                Start Game
                            </button>
                        )}

                        {gameOver && (
                            <div className="space-y-4">
                                <p className="text-xl text-red-400 font-bold">Game Over!</p>
                                <button
                                    onClick={resetGame}
                                    className="px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all"
                                >
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-6">
                        ⬆️ ⬇️ ⬅️ ➡️ Arrow keys to move
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SnakeGame;

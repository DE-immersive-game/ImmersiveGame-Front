'use client';

import React, { useEffect, useState } from 'react';

interface TimerProps {
  onStart: boolean; // Prop pour démarrer le timer
  onStop: boolean; // Prop pour arrêter le timer
}

const Timer: React.FC<TimerProps> = ({ onStart, onStop }) => {
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes en secondes
  const [isRunning, setIsRunning] = useState(false); // État pour savoir si le timer tourne

  useEffect(() => {
    if (onStart) {
      setIsRunning(true); // Démarre le timer lorsque "onStart" passe à true
    }
  }, [onStart]);

  useEffect(() => {
    if (onStop) {
      setIsRunning(false); // Arrête le timer lorsque "onStop" passe à true
    }
  }, [onStop]);

  useEffect(() => {
    if (!isRunning) return; // Si le timer n'est pas démarré, ne fait rien

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Arrêter le timer quand il atteint 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Nettoyage à la fin du composant ou lorsque isRunning passe à false
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="bg-timer"
      className="text-cyan-50 text-xl bg-[url('/backgrounds/background-timer.png')] bg-contain bg-no-repeat bg-center w-[61vw] h-[38.52vh] flex justify-center items-center"
    >
      <div className="flex items-center justify-center w-[50px]">
        <p
          className={`text-[100px] font-orbitron text-center ${
            timeLeft <= 30
              ? 'text-indicative-incorrect-100 bg-opacity-10 backdrop-blur-xl shadow-inner'
              : ''
          }`}
        >
          {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
};

export default Timer;

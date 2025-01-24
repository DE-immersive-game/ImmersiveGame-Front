'use client'; // Directive pour indiquer un composant client

import React, { useEffect, useState } from 'react';

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(3 * 60); // 3 minutes en secondes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Arrêter le timer quand il atteint 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Nettoyage à la fin du composant
  }, []);

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

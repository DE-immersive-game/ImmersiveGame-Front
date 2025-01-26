import React, { useEffect, useState } from 'react';

interface TimerProps {
  startTimestamp: number; // Timestamp du début du jeu
  duration: number; // Durée totale du timer en secondes
  onStop: boolean; // Prop pour arrêter le timer
}

const Timer: React.FC<TimerProps> = ({ startTimestamp, duration, onStop }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration); // Temps restant
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (startTimestamp) {
      const now = Date.now();
      const elapsed = Math.floor((now - startTimestamp) / 1000); // Temps écoulé en secondes
      const remainingTime = duration - elapsed;

      if (remainingTime > 0) {
        setTimeLeft(remainingTime); // Synchronise le temps restant
        setIsRunning(true); // Lance le timer
      } else {
        setTimeLeft(0); // Le timer est terminé
        setIsRunning(false);
      }
    }
  }, [startTimestamp, duration]);

  useEffect(() => {
    if (onStop) {
      setIsRunning(false); // Arrête le timer si onStop est activé
    }
  }, [onStop]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer); // Arrête le timer lorsqu'il atteint 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Nettoie le timer
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>Temps restant : {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;

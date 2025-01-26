'use client';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { useEffect, useState } from 'react';

interface TimerProps {
  initialDuration?: number; // Durée initiale si pas d'événement
}

const Timer: React.FC<TimerProps> = ({ initialDuration = 180 }) => {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const [startTimestamp, setStartTimestamp] = useState<number | undefined>(undefined);
  const [duration, setDuration] = useState<number>(initialDuration); // Durée totale du timer en secondes
  const [timeLeft, setTimeLeft] = useState<number>(initialDuration); // Temps restant
  const [isRunning, setIsRunning] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);

  // Démarrer le timer lorsque l'événement `timerStarted` est reçu
  useEffect(() => {
    const handleTimerStarted = (message: { startTimestamp?: number; duration?: number }) => {
      console.log('Message reçu :', message); // Logge le message reçu pour débogage

      if (message?.startTimestamp !== undefined && message?.duration !== undefined) {
        console.log('startTimestamp reçu :', message.startTimestamp);
        const { startTimestamp, duration } = message;
        setStartTimestamp(startTimestamp);
        setDuration(duration);
        setTimeLeft(duration); // Initialise le temps restant avec la durée reçue
        setStopTimer(false);
        setIsRunning(true); // Démarre le timer lorsque les données sont reçues
      } else {
        console.error('Données manquantes ou mal formatées dans le message :', message);
      }
    };

    // Enregistre les écouteurs pour les événements WebSocket
    registerEventHandler('timerStarted', handleTimerStarted);

    return () => {
      unregisterEventHandler('timerStarted', handleTimerStarted);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  // Réinitialiser le timer lorsqu'il reçoit l'événement 'resetGame'
  useEffect(() => {
    const handleResetGame = () => {
      console.log('Resetting timer to 3 minutes');
      setDuration(180); // Réinitialise la durée à 180 secondes
      setTimeLeft(180); // Réinitialise le temps restant à 180 secondes
      setIsRunning(false); // Ne redémarre pas le timer, il attend le startTimestamp
    };

    // Enregistre l'événement 'resetGame'
    registerEventHandler('resetGame', handleResetGame);

    return () => {
      unregisterEventHandler('resetGame', handleResetGame);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  // Mise à jour du timer toutes les secondes
  useEffect(() => {
    if (!isRunning || stopTimer || startTimestamp === undefined) return;

    const timer = setInterval(() => {
      if (startTimestamp !== undefined) {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimestamp) / 1000); // Temps écoulé en secondes
        const remainingTime = duration - elapsed;

        if (remainingTime <= 0) {
          setTimeLeft(0);
          setIsRunning(false); // Arrête le timer lorsque le temps est écoulé
        } else {
          setTimeLeft(remainingTime); // Met à jour le temps restant
        }
      }
    }, 1000);

    return () => clearInterval(timer); // Nettoie le timer
  }, [isRunning, stopTimer, startTimestamp, duration]);

  // Formatage du temps restant en minutes:secondes
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
      <p
        className={`text-[100px] font-orbitron ${
          timeLeft <= 30 ? 'text-indicative-incorrect-0' : ''
        }`}
      >
        {formatTime(timeLeft)}
      </p>
    </div>
  );
};

export default Timer;

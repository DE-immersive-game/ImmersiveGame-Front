'use client';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { useEffect, useState } from 'react';

type TimerProps = {};

const Timer = ({}: TimerProps) => {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const [counter, setCounter] = useState<number | null>(null);

  // Démarrer le timer lorsque l'événement `timerStarted` est reçu
  useEffect(() => {
    const handleTimerStarted = (message: { counter?: number }) => {
      if (message?.counter !== undefined) {
        setCounter(message.counter);
        // console.log('Counter reçu :', message.counter);
      } else {
        console.error('Données manquantes ou mal formatées dans le message :', message);
      }
    };

    // Enregistre les écouteurs pour les événements WebSocket
    registerEventHandler('timer', handleTimerStarted);

    return () => {
      unregisterEventHandler('timer', handleTimerStarted);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  if (counter === null) {
    console.error("Le compteur n'a pas été initialisé correctement.");
    return null;
  }

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
          counter <= 30 ? 'text-indicative-incorrect-0' : ''
        }`}
      >
        {formatTime(counter)}
      </p>
    </div>
  );
};

export default Timer;

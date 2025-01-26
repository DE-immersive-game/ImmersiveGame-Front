'use client';

import React, { useEffect, useState } from 'react';
import { useWebSocket } from '@/app/context/WebSocketUsage'; // Adapter selon ton projet
import Timer from '../components/timer/Timer';

const TimerPage = () => {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const [startTimestamp, setStartTimestamp] = useState<number | undefined>(undefined);
  const [duration, setDuration] = useState<number | undefined>(undefined); // Stocke la durée
  const [stopTimer, setStopTimer] = useState(false);

  useEffect(() => {
    const handleTimerStarted = (message: {
      data: { startTimestamp: number; duration: number };
    }) => {
      console.log('timerStarted message reçu :', message);

      // Extrais les valeurs depuis le message reçu
      const { startTimestamp, duration } = message.data;
      setStartTimestamp(startTimestamp); // Stocke le startTimestamp
      setDuration(duration); // Stocke la durée du timer
      setStopTimer(false); // Assure que le timer n'est pas arrêté
    };

    const handleEndGame = () => {
      console.log('endGame message reçu, arrêt du timer');
      setStopTimer(true); // Arrête le timer
    };

    // Enregistre les écouteurs pour les événements timerStarted et endGame
    registerEventHandler('timerStarted', handleTimerStarted);
    registerEventHandler('endGame', handleEndGame);

    // Nettoyage en désenregistrant les écouteurs à la fin du composant
    return () => {
      unregisterEventHandler('timerStarted', handleTimerStarted);
      unregisterEventHandler('endGame', handleEndGame);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  return (
    <div>
      <h1>Page Timer</h1>
      {/* Passe les valeurs au composant Timer */}
      {startTimestamp && duration && (
        <Timer startTimestamp={startTimestamp} duration={duration} onStop={stopTimer} />
      )}
    </div>
  );
};

export default TimerPage;

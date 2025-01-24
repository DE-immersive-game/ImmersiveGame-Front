'use client';

import React, { useEffect, useState } from 'react';
import { useWebSocket } from '@/app/context/WebSocketUsage'; // Adapter selon ton projet // Chemin à vérifier
import Timer from '../components/timer/Timer';

const TimerPage = () => {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const [startTimer, setStartTimer] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);

  useEffect(() => {
    const handleStartGame = () => {
      console.log('startGame message reçu, démarrage du timer');
      setStartTimer(true); // Démarre le timer
      setStopTimer(false); // Assure que le timer n'est pas en état "arrêté"
    };

    const handleEndGame = () => {
      console.log('endGame message reçu, arrêt du timer');
      setStartTimer(false); // Désactive le démarrage du timer
      setStopTimer(true); // Arrête le timer
    };

    // Enregistre les écouteurs pour les événements startGame et endGame
    registerEventHandler('startGame', handleStartGame);

    // Nettoyage en désenregistrant les écouteurs à la fin du composant
    return () => {
      unregisterEventHandler('startGame', handleStartGame);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  return (
    <div>
      <h1>Page Timer</h1>
      {/* Passe les valeurs de startTimer et stopTimer en props */}
      <Timer onStart={startTimer} onStop={stopTimer} />
    </div>
  );
};

export default TimerPage;

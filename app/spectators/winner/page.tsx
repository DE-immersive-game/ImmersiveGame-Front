'use client';

import { useEffect, useState } from 'react';
import ResultComponent from '@/app/components/resultComponent/ResultComponent';
import { Score, Team, ScoreResult } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import ResetGameHandler from '@/app/components/resetGameHandler/ResetGameHandler';

const WinnerPage = () => {
  const [score, setScore] = useState<Score | null>(null);
  const { registerEventHandler, unregisterEventHandler, receivedMessages } = useWebSocket();

  // Fonction utilitaire pour mettre à jour le score
  const updateScore = (data: { team_a: number; team_b: number; result: string }) => {
    const { team_a, team_b, result } = data;
    setScore({
      team_a,
      team_b,
      winner: result as Team | 'draw', // Utilisation directe du résultat
    });
  };

  useEffect(() => {
    // Récupérer le dernier message 'teamScore'
    const lastTeamScoreMessage = receivedMessages
      .map((msg) => JSON.parse(msg.message))
      .reverse()
      .find((msg) => msg.event === 'teamScore');

    if (lastTeamScoreMessage) {
      updateScore(lastTeamScoreMessage.data);
    }

    // Gérer les nouveaux événements WebSocket 'teamScore'
    registerEventHandler('teamScore', updateScore);

    return () => {
      unregisterEventHandler('teamScore', updateScore);
    };
  }, [registerEventHandler, unregisterEventHandler, receivedMessages]);

  if (!score) {
    return <div className="text-center text-white text-3xl">Chargement des scores...</div>;
  }

  // Afficher uniquement les résultats 'win' ou 'draw'
  if (score.winner !== 'draw' && score.winner !== Team.TEAM_A && score.winner !== Team.TEAM_B) {
    return (
      <div className="text-center text-white text-3xl">
        Aucun résultat gagnant ou match nul à afficher.
      </div>
    );
  }

  const result: ScoreResult | 'draw' = score.winner === 'draw' ? 'draw' : 'win';

  return (
    <div>
      <ResultComponent team={score.winner} score={score} result={result} mode="spectators" />
      <ResetGameHandler />
    </div>
  );
};

export default WinnerPage;

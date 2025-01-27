'use client';

import { useEffect, useState } from 'react';
import Result from '@/app/components/result/Result';
import { Score, Team, ScoreResult } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import ResetGameHandler from '@/app/components/resetGameHandler/ResetGameHandler';

const WinnerPage = () => {
  const [score, setScore] = useState<Score | null>(null);
  const { registerEventHandler, unregisterEventHandler, receivedMessages } = useWebSocket();

  useEffect(() => {
    // Récupérer le dernier message 'teamScore'
    const lastTeamScoreMessage = receivedMessages
      .map((msg) => JSON.parse(msg.message))
      .reverse()
      .find((msg) => msg.event === 'teamScore');

    if (lastTeamScoreMessage) {
      const { team_a, team_b, result } = lastTeamScoreMessage.data;
      const winner = result === 'draw' ? 'draw' : team_a > team_b ? Team.TEAM_A : Team.TEAM_B;

      setScore({
        team_a,
        team_b,
        winner,
      });
    }

    // Gérer les nouveaux événements WebSocket 'teamScore'
    const handleTeamScore = (data: { team_a: number; team_b: number; result: string }) => {
      const { team_a, team_b, result } = data;
      const winner = result === 'draw' ? 'draw' : team_a > team_b ? Team.TEAM_A : Team.TEAM_B;

      setScore({
        team_a,
        team_b,
        winner,
      });
    };

    registerEventHandler('teamScore', handleTeamScore);

    return () => {
      unregisterEventHandler('teamScore', handleTeamScore);
    };
  }, [registerEventHandler, unregisterEventHandler, receivedMessages]);

  if (!score) {
    return <div className="text-center text-white text-3xl">Chargement des scores...</div>;
  }

  const resultType: ScoreResult | 'draw' =
    score.winner === 'draw' ? 'draw' : score.winner === Team.TEAM_A ? 'win' : 'lose';

  return (
    <div>
      <Result team={score.winner} score={score} resultType={resultType} mode="tv" />
      <ResetGameHandler />;
    </div>
  );
};

export default WinnerPage;

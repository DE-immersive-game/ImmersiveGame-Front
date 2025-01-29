'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ResultComponent from '@/app/components/resultComponent/ResultComponent';
import { Score, Team } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';

const WinPage = () => {
  const params = useParams();
  const { registerEventHandler, unregisterEventHandler, receivedMessages } = useWebSocket();
  const [score, setScore] = useState<Score | null>(null);

  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide ou non trouvée</div>;
  }

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

  if (score.winner === 'draw' || score.winner !== team) {
    return (
      <div className="text-center text-white text-3xl">
        Cette équipe n'a pas gagné ou le résultat est une égalité
      </div>
    );
  }

  return (
    <div>
      <ResultComponent team={team} score={score} result="win" mode="spectators" />
    </div>
  );
};

export default WinPage;

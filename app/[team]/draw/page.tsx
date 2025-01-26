'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Result from '@/app/components/result/Result';
import { Score, Team } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';

const DrawPage = () => {
  const params = useParams();
  const { registerEventHandler, unregisterEventHandler, receivedMessages } = useWebSocket();
  const [score, setScore] = useState<Score | null>(null);

  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide ou non trouvée</div>;
  }

  useEffect(() => {
    // Récupérer le dernier message 'teamScore' si disponible
    const lastTeamScoreMessage = receivedMessages
      .map((msg) => JSON.parse(msg.message))
      .reverse()
      .find((msg) => msg.event === 'teamScore');

    if (lastTeamScoreMessage) {
      const { team_a, team_b } = lastTeamScoreMessage.data;
      const winner = team_a === team_b ? 'draw' : team_a > team_b ? Team.TEAM_A : Team.TEAM_B;

      setScore({
        team_a,
        team_b,
        winner,
      });
    }

    const handleTeamScore = (data: { team_a: number; team_b: number }) => {
      const { team_a, team_b } = data;
      const winner = team_a === team_b ? 'draw' : team_a > team_b ? Team.TEAM_A : Team.TEAM_B;

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

  if (score.winner !== 'draw') {
    return <div className="text-center text-white text-3xl">Le résultat n'est pas une égalité</div>;
  }

  return (
    <div>
      <Result team="draw" score={score} resultType="draw" mode="tv" />
    </div>
  );
};

export default DrawPage;

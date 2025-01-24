'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Result from '@/app/components/result/Result';
import { Score, Team } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';

const DrawPage = () => {
  const params = useParams();
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const [score, setScore] = useState<Score | null>(null);

  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide ou non trouvée</div>;
  }

  useEffect(() => {
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
  }, [registerEventHandler, unregisterEventHandler]);

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

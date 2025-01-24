'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Result from '@/app/components/result/Result';
import { Score, Team } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';

const LosePage = () => {
  const params = useParams();
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const [score, setScore] = useState<Score | null>(null);

  // Récupération de l'équipe depuis les paramètres de l'URL
  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide ou non trouvée</div>;
  }

  useEffect(() => {
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
  }, [registerEventHandler, unregisterEventHandler]);

  if (!score) {
    return <div className="text-center text-white text-3xl">Chargement des scores...</div>;
  }

  // Vérifier si l'équipe a effectivement perdu
  if (score.winner === 'draw' || score.winner === team) {
    return (
      <div className="text-center text-white text-3xl">
        Cette équipe n'a pas perdu ou le résultat est une égalité
      </div>
    );
  }

  return (
    <div>
      <Result team={team} score={score} resultType="lose" mode="tv" />
    </div>
  );
};

export default LosePage;

'use client';

import { useParams } from 'next/navigation';
import Result from '@/app/components/result/Result';
import { Score, Team } from '@/app/types';

const WinPage = () => {
  const params = useParams();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  const scoreResponse: { event: string; data: Score } = {
    event: 'teamScore',
    data: {
      team_a: 4,
      team_b: 5,
      winner: Team.TEAM_B,
    },
  };

  const score = scoreResponse.data;

  return <Result team={team} score={score} resultType="win" />;
};

export default WinPage;

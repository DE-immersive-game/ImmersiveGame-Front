'use client';

import { useParams } from 'next/navigation';
import Win from '@/app/components/win/Win';

const WinPage = () => {
  const params = useParams();
  const team = typeof params.team === 'string' ? params.team : ''; // Vérifie et force le type string

  // Exemple de données statiques (peut être remplacé par une source dynamique)
  const scores = {
    team_a: { teamScore: 9, opponentScore: 7 },
    team_b: { teamScore: 9, opponentScore: 7 },
  };

  // Récupère les scores en fonction de l'équipe
  const currentScores = scores[team as 'team_a' | 'team_b'] || {
    teamScore: 0,
    opponentScore: 0,
  };

  return (
    <Win
      team={team as 'team_a' | 'team_b'}
      teamScore={currentScores.teamScore}
      opponentScore={currentScores.opponentScore}
    />
  );
};

export default WinPage;

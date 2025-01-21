'use client';

import { useParams } from 'next/navigation';

const LosePage = () => {
  const params = useParams();

  // Validez que "params.team" est défini
  const team = typeof params?.team === 'string' ? params.team : null;

  if (!team) {
    return <div>Error: Team parameter is missing</div>; // Gérer le cas où le paramètre est manquant
  }

  return (
    <div>
      <h1>😢 Team {team} Loses. 😢</h1>
      <p>Better luck next time, {team}!</p>
    </div>
  );
};

export default LosePage;

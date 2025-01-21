'use client';

import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleSelectTeam = (team: string) => {
    router.push(`/${team}`); // Redirige vers la page de l'équipe sélectionnée
  };

  return (
    <div>
      <h1>Select Your Team</h1>
      <button onClick={() => handleSelectTeam('team_a')}>Team A</button>
      <button onClick={() => handleSelectTeam('team_b')}>Team B</button>
    </div>
  );
};

export default HomePage;

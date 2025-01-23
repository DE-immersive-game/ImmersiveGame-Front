'use client';

import { useRouter } from 'next/navigation';
import { Team } from './types';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSelectTeam = (team: string) => {
    router.push(`/${team}`);
  };

  return (
    <div>
      <h1>Select Your Team</h1>
      <button onClick={() => handleSelectTeam(Team.TEAM_A)}>Team A</button>
      <button onClick={() => handleSelectTeam(Team.TEAM_B)}>Team B</button>
      <button onClick={() => handleSelectTeam('admin')}>Admin</button>
    </div>
  );
};

export default HomePage;

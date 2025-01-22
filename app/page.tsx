'use client';

import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSelectTeam = (team: string) => {
    router.push(`/${team}`);
  };

  return (
    <div>
      <h1>Select Your Team</h1>
      <button onClick={() => handleSelectTeam('team_a')}>Team A</button>
      <button onClick={() => handleSelectTeam('team_b')}>Team B</button>
      <button onClick={() => handleSelectTeam('admin')}>Admin</button>
    </div>
  );
};

export default HomePage;

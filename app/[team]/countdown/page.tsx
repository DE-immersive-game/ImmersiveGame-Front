'use client';

import CountdownScreen from '@/app/components/countdown/Countdown';
import { Team } from '@/app/types';
import { useParams } from 'next/navigation';

const CountdownPage = () => {
  const params = useParams();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  if (![Team.TEAM_A, Team.TEAM_B].includes(team)) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  return (
    <main>
      <CountdownScreen team={team} />
    </main>
  );
};

export default CountdownPage;

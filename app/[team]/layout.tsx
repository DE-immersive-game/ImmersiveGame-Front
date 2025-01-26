import { Team } from '@/app/types';
import ResetGameHandler from '@/app/components/resetGameHandler/ResetGameHandler';

export default function TeamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { team: string };
}) {
  const currentTeam = params.team as Team;

  if (!Object.values(Team).includes(currentTeam)) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  return (
    <>
      <ResetGameHandler team={currentTeam} />
      {children}
    </>
  );
}

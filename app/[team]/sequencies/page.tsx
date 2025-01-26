'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { Team } from '@/app/types';
import Sequencies from '@/app/components/sequencies/Sequencies';

export default function SequenciesPage() {
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const router = useRouter();
  const params = useParams();
  const team = params.team as Team;

  const [sequence, setSequence] = useState<{ id: number; pressed: boolean }[]>([]);

  if (!Object.values(Team).includes(team)) {
    return <div className="text-center text-white text-3xl">Équipe invalide !</div>;
  }

  const getSequence = (data: { team: Team; sequence: { id: number; pressed: boolean }[] }) => {
    if (data.team === team) {
      setSequence(data.sequence);
    }
  };

  const getCurrentScore = (data: { team: Team; score: number }) => {
    console.log(data);
  };

  const handleTeamStatus = (data: { buttonInfo: any; status: string }) => {
    const { buttonInfo, status } = data;

    console.log(data);

    if (buttonInfo.team === team && status === 'success') {
      setSequence((prevSequence) =>
        prevSequence.map((button, index) => ({
          ...button,
          success: index + 1 <= buttonInfo.length ? true : false,
        })),
      );
    } else {
      setSequence((prevSequence) =>
        prevSequence.map((button, index) => ({
          ...button,
          success: false,
          error: index + 1 <= buttonInfo.length ? true : false,
        })),
      );

      // Réinitialiser l'état `error` après une seconde
      setTimeout(() => {
        setSequence((prevSequence) =>
          prevSequence.map((button) => ({
            ...button,
            error: false,
          })),
        );
      }, 1000);
    }
  };

  const handleTeamScore = (data: { team_a: number; team_b: number; result: string }) => {
    const { result } = data;

    if (result === 'draw') {
      router.push(`/${team}/draw`);
    } else if (result === team) {
      router.push(`/${team}/win`);
    } else {
      router.push(`/${team === 'team_a' ? 'team_b' : 'team_a'}/win`);
      router.push(`/${team}/lose`);
    }
  };

  useEffect(() => {
    registerEventHandler('sendSequence', getSequence);
    registerEventHandler('teamScore', handleTeamScore);
    registerEventHandler('currentScore', getCurrentScore);
    registerEventHandler('teamStatus', handleTeamStatus);

    return () => {
      unregisterEventHandler('sendSequence', getSequence);
      unregisterEventHandler('teamScore', handleTeamScore);
      unregisterEventHandler('currentScore', getCurrentScore);
      unregisterEventHandler('teamStatus', handleTeamStatus);
    };
  }, [registerEventHandler, unregisterEventHandler, router, team]);

  return (
    <div>
      <Sequencies team={team} sequence={sequence} />
    </div>
  );
}

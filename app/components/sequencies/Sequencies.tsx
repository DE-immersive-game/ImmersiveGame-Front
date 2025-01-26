'use client';

import { useEffect, useState } from 'react';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { Team } from '@/app/types';
import Number from '../number/Number';
import { teamsRessources } from '@/lib/teamsRessources';
import Timer from '../timer/Timer';

type SequenciesProps = {
  team: Team;
};

const Sequencies = ({ team = Team.TEAM_A }: SequenciesProps) => {
  const { registerEventHandler, unregisterEventHandler, lastSequence } = useWebSocket();
  const [sequence, setSequence] = useState<
    { id: number; pressed: boolean; success?: boolean; error?: boolean }[]
  >(lastSequence || []); // Utilise la dernière séquence sauvegardée si disponible
  const [error, setError] = useState(false);

  const currentTeamRessources = teamsRessources[team];

  // Gestion de l'événement "sendSequence"
  const handleSequenceUpdate = (data: {
    team: Team;
    sequence: { id: number; pressed: boolean }[];
  }) => {
    if (data.team === team) {
      setSequence(
        data.sequence.map((item) => ({
          ...item,
          success: false,
          error: false,
        })),
      );
    }
  };

  useEffect(() => {
    // Enregistre l'écouteur d'événements pour "sendSequence"
    registerEventHandler('sendSequence', handleSequenceUpdate);

    return () => {
      // Nettoie l'écouteur d'événements à la destruction du composant
      unregisterEventHandler('sendSequence', handleSequenceUpdate);
    };
  }, [registerEventHandler, unregisterEventHandler, team]);

  return (
    <div
      className="relative z-10 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${currentTeamRessources.background})`,
      }}
    >
      {error && <div className="sequencies-error w-full min-h-screen absolute top-0 left-0"></div>}
      <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-between px-4 pb-4">
        <div>
          <Timer />
        </div>
        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          {sequence.length > 0 ? (
            sequence.map((button, i) => (
              <Number
                key={i}
                id={button.id}
                team={team}
                size={sequence.length > 6 ? 'sm' : sequence.length > 4 ? 'md' : 'lg'}
                pressed={button.pressed}
                success={button.success}
                error={button.error}
              />
            ))
          ) : (
            <div className="text-white text-center text-2xl">
              Aucune séquence disponible pour cette équipe.
            </div>
          )}
        </div>
        <div> </div>
      </div>
    </div>
  );
};

export default Sequencies;

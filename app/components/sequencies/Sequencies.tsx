'use client';

import { useEffect, useState } from 'react';
import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Number from '@/app/components/number/Number';
import Timer from '@/app/components/timer/Timer';

type SequenciesProps = {
  team: Team;
  sequence: { id: number; pressed: boolean; success?: boolean; error?: boolean }[];
};

const Sequencies = ({ team, sequence: initialSequence }: SequenciesProps) => {
  const [sequence, setSequence] = useState(initialSequence);
  const [error, setError] = useState(false);
  const currentTeamResources = teamsRessources[team];

  useEffect(() => {
    setSequence(initialSequence);
  }, [initialSequence]);

  return (
    <div
      className="relative z-10 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${currentTeamResources.background})`,
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

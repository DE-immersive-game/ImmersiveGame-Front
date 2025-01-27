'use client';

import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Image from 'next/image';
import Timer from '@/app/components/timer/Timer';
import LittleScore from '@/app/components/littleScore/LittleScore';

type ValidateSequenceProps = {
  team: Team;
  counter: number | null; // Timer
  score: {
    team_a: number;
    team_b: number;
    winner: string | null;
  };
};

const ValidateSequence = ({ team, counter, score }: ValidateSequenceProps) => {
  const currentTeamResources = teamsRessources[team];

  if (!currentTeamResources) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  return (
    <div
      className="relative z-10 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${currentTeamResources.background})`,
      }}
    >
      <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-between px-4 pb-4">
        {/* Timer */}
        <div>
          <Timer countDown={counter} />
        </div>
        {/* Texte "Série Validée" */}
        <div className="w-full flex justify-center text-center">
          <div className="w-full bg-neutral-text bg-opacity-10 py-8 px-6 border-t-2 border-b-2 border-white/40 shadow-inner backdrop-blur-2xl">
            <h1
              className="text-6xl font-galaxyRegular text-neutral-text uppercase tracking-[.48em] pt-3"
              style={{
                textShadow: '0px 0px 10px rgba(255, 255, 255, 0.75)',
              }}
            >
              Série Validée
            </h1>
          </div>
        </div>
        {/* LittleScore */}
        <div>
          <LittleScore team={team} score={score} resultType="win" />
        </div>
      </div>
    </div>
  );
};

export default ValidateSequence;

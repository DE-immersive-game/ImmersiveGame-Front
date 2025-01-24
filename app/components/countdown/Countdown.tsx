'use client';

import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Image from 'next/image';

type CountdownScreenProps = {
  team: Team;
};

const CountdownScreen = ({ team }: CountdownScreenProps) => {
  const currentTeamResources = teamsRessources[team];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-neutral-text">
      <div
        className="absolute inset-0 z-0 animate-customPulse"
        style={{
          backgroundImage: `url(${currentTeamResources.background})`,
        }}
      ></div>
      <div className="absolute top-10">
        <Image
          src={currentTeamResources.logoLong}
          alt={`${team} Logo`}
          width={300}
          height={300}
          className="drop-shadow-lg"
        />
      </div>
      <div className="w-full flex justify-center text-center">
        <div className="w-80 h-80 bg-neutral-text bg-opacity-10 border-2 border-white/40 shadow-inner backdrop-blur-2xl flex items-center justify-center">
          <h1 className="text-5xl font-bold text-neutral-text">Countdown</h1>
        </div>
      </div>
    </div>
  );
};

export default CountdownScreen;

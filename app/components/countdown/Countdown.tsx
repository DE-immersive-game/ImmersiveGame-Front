'use client';

import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type CountdownScreenProps = {
  team: Team;
};

const CountdownScreen = ({ team }: CountdownScreenProps) => {
  const router = useRouter();
  const currentTeamResources = teamsRessources[team];

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        router.push(`/${team}/sequencies`);
      }, 1000);
    }
  }, [countdown]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-neutral-text">
      <div
        className="absolute inset-0 z-0 animate-background-pulse bg-center bg-cover"
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
        <div className="w-80 h-80 flex items-center justify-center rounded-[32px] bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow ">
          <h1
            key={countdown}
            className="text-9xl font-bold text-neutral-text font-orbitron opacity-0 animate-fadeAndScale"
          >
            {countdown > 0 ? countdown : 'GO'}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CountdownScreen;

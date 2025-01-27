'use client';

import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CountdownScreenProps = {
  team?: Team;
  counter: number | null;
  duration: number | null;
  onComplete: () => void; // Callback à appeler une fois le compte à rebours terminé
};

const CountdownScreen = ({ team, counter, duration, onComplete }: CountdownScreenProps) => {
  const [countDown, setCountDown] = useState<number | null>(null);
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const currentTeamResources = team ? teamsRessources[team] : null;


  // Démarrer le timer lorsque l'événement `timerStarted` est reçu
  useEffect(() => {
    if (counter && duration) {
      const countDownTime = counter - duration;
      if (countDownTime > -1) {
        setCountDown(countDownTime);
        return;
      } else {
        onComplete();
      }
    }
  }, [counter, duration, onComplete]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-neutral-text">
      <div
        className="absolute inset-0 z-0 animate-background-pulse bg-center bg-cover"
        style={{
          backgroundImage: team
            ? `url(${currentTeamResources?.background})`
            : 'url(/backgrounds/background-bicolore.png)',
        }}
      ></div>
      <div className="absolute top-10">
        <Image
          src={
            team
              ? currentTeamResources?.logoLong ?? '/logos/Neutral-long.png'
              : '/logos/Neutral-long.png'
          }
          alt={`${team} Logo`}
          width={300}
          height={300}
          className="drop-shadow-lg"
        />
      </div>
      <div className="w-full flex justify-center text-center">
        {countDown != null && (
          <div className="w-80 h-80 flex items-center justify-center rounded-[32px] bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow ">
            <h1
              key={countDown}
              className="text-9xl font-bold text-neutral-text font-orbitron opacity-0 animate-fadeAndScale"
            >
              {countDown > 0 ? countDown : 'GO'}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownScreen;

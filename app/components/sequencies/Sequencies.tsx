'use client';

import { useEffect, useState } from 'react';
import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Number from '@/app/components/number/Number';
import Timer from '@/app/components/timer/Timer';
import LittleScore from '@/app/components/littleScore/LittleScore';
import { useWebSocket } from '@/app/context/WebSocketUsage';

type SequenciesProps = {
  team: Team;
  sequence: { id: number; pressed: boolean; success?: boolean; error?: boolean }[];
  counter: number | null;
};

const Sequencies = ({ team, sequence: initialSequence, counter }: SequenciesProps) => {
  const [sequence, setSequence] = useState(initialSequence);
  const [error, setError] = useState(false);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);

  const { registerEventHandler, unregisterEventHandler } = useWebSocket();
  const currentTeamResources = teamsRessources[team];

  useEffect(() => {
    setSequence(initialSequence);

    // Détecter si une erreur existe dans la séquence
    const hasError = initialSequence.some((item) => item.error);
    setError(hasError);
  }, [initialSequence]);

  useEffect(() => {
    const handleCurrentScore = (data) => {
      if (data.team === 'team_a') {
        setScoreA(data.score);
      } else if (data.team === 'team_b') {
        setScoreB(data.score);
      }
    };

    registerEventHandler('currentScore', handleCurrentScore);

    return () => {
      unregisterEventHandler('currentScore', handleCurrentScore);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  const score = {
    team_a: scoreA,
    team_b: scoreB,
    winner: scoreA > scoreB ? Team.TEAM_A : scoreB > scoreA ? Team.TEAM_B : null,
  };

  return (
    <div
      className="relative z-10 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${
          error ? currentTeamResources.loseBackground : currentTeamResources.background
        })`,
      }}
    >
      <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-between px-4 pb-4">
        <div>
          <Timer countDown={counter} />
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
        <div>
          <LittleScore
            team={team}
            score={score}
            resultType={error ? 'lose' : score.winner === team ? 'win' : 'draw'}
          />
        </div>
      </div>
    </div>
  );
};

export default Sequencies;

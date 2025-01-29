'use client';

import { CurrentScore, Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Number from '@/app/components/number/Number';
import Timer from '@/app/components/timerComponent/TimerComponent';
import LittleScore from '@/app/components/littleScore/LittleScore';
import Icon from '../icon/Icon';

type SequenciesProps = {
  team: Team;
  sequence: { id: number; pressed: boolean; success?: boolean; error?: boolean }[];
  counter: number | null;
  sequenceSuccess: boolean;
  sequenceError: boolean;
  score: CurrentScore;
};

const Sequencies = ({
  team,
  sequence: sequence,
  counter,
  sequenceSuccess,
  sequenceError,
  score,
}: SequenciesProps) => {
  const currentTeamResources = teamsRessources[team];

  return (
    <div
      className="relative z-10 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${
          sequenceSuccess
            ? currentTeamResources.successBackground
            : sequenceError
            ? currentTeamResources.loseBackground
            : currentTeamResources.background
        })`,
      }}
    >
      <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-between px-4 pb-14">
        <div className="h-[15vh] overflow-hidden flex items-end ">
          <Timer countDown={counter} />
        </div>
        {sequenceSuccess ? (
          <div className="w-full flex justify-center text-center">
            <div className="w-full bg-neutral-text bg-opacity-10 py-8 px-6 border-t-2 border-b-2 border-white/40 shadow-inner backdrop-blur-2xl">
              <h1 className="text-6xl font-galaxyRegular text-neutral-text uppercase tracking-[.48em] pt-3">
                Serie validee
              </h1>
            </div>
          </div>
        ) : (
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
              <Icon team={team} className="w-40 h-40 opacity-20 opac" />
            )}
          </div>
        )}
        <div>
          <LittleScore team={team} score={score} />
        </div>
      </div>
    </div>
  );
};

export default Sequencies;

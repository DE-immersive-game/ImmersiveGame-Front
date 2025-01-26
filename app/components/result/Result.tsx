'use client';

import { Score, ScoreResult, Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Image from 'next/image';
import Icon from '../icon/Icon';

type ResultProps = {
  team: Team;
  resultType: ScoreResult;
  score: Score;
  mode?: 'default' | 'tv';
};

const Result = ({ team, resultType, score, mode = 'default' }: ResultProps) => {
  const currentTeamResources = teamsRessources[team];

  const background =
    resultType === 'lose' ? currentTeamResources.loseBackground : currentTeamResources.background;

  const resultText = resultType === 'win' ? 'Victoire' : 'Defaite';

  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-0 animate-background-pulse bg-center bg-cover"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center gap-10">
        <Image src={currentTeamResources.logo} alt={`${team} Logo`} width={275} height={325} />
        <div className="flex flex-col items-center gap-1">
          <h1
            className="text-white text-7xl font-galaxyRegular tracking-[.25em] uppercase pl-4 pt-3"
            style={{
              textShadow: '0px 0px 20px rgba(255, 255, 255, 0.75)',
            }}
          >
            {resultText}
          </h1>
          {mode === 'tv' && (
            <h2 className="font-orbitron text-4xl text-white tracking-[.25em]">
              de {teamsRessources[score.winner].name}
            </h2>
          )}
        </div>
        <div className="flex items-center justify-between bg-neutral-text bg-opacity-5 rounded-2xl py-8 px-10 border-2 border-white/40 shadow-inner">
          <div className="flex items-center gap-12">
            <Icon team={Team.TEAM_A} isActive={score.winner === Team.TEAM_A} />
            <div className="text-center flex gap-10 font-orbitron font-semibold text-5xl text-neutral-text">
              <p>{score.team_a}</p>
              <p>-</p>
              <p>{score.team_b}</p>
            </div>
            <Icon team={Team.TEAM_B} isActive={score.winner === Team.TEAM_B} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

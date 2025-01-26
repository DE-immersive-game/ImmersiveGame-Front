'use client';

import { Score, ScoreResult, Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';
import Image from 'next/image';
import Icon from '../icon/Icon';
import LittleScore from '../littleScore/LittleScore';

type ResultProps = {
  team: Team | 'draw';
  resultType: ScoreResult | 'draw';
  score: Score;
  mode?: 'default' | 'tv';
};

const Result = ({ team, resultType, score, mode = 'default' }: ResultProps) => {
  let currentTeamResources;
  let background;

  if (resultType === 'lose') {
    currentTeamResources = teamsRessources[team as Team];
    background = currentTeamResources.loseBackground || currentTeamResources.background;
  } else if (team === 'draw') {
    currentTeamResources = {
      name: 'Match Nul',
      background: '/backgrounds/background-draw.png',
      logo: '/logos/Neutral.png',
      logoLong: '/logos/Neutral-long.png',
    };
    background = currentTeamResources.background;
  } else {
    // Cas général
    currentTeamResources = teamsRessources[team as Team];
    background = currentTeamResources.background;
  }

  const resultText =
    resultType === 'win' ? 'Victoire' : resultType === 'lose' ? 'Defaite' : 'egalite';

  const isActiveTeamA = resultType === 'lose' ? team === Team.TEAM_A : score.winner === Team.TEAM_A;
  const isActiveTeamB = resultType === 'lose' ? team === Team.TEAM_B : score.winner === Team.TEAM_B;

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
          {mode === 'tv' && resultType !== 'draw' && (
            <h2 className="font-orbitron text-4xl text-white tracking-[.25em]">
              {resultType === 'lose'
                ? `${currentTeamResources.name}`
                : `${teamsRessources[score.winner as Team].name}`}
            </h2>
          )}
        </div>
        <div>
          <LittleScore team={team} score={score} resultType="lose" mode="default" />
        </div>
      </div>
    </div>
  );
};

export default Result;

'use client';

import { useState } from 'react';
import ButtonList from '../../api/ButtonList.json';
import { Team } from '@/app/types';
import Number from '../number/Number';
import { teamsRessources } from '@/lib/teamsRessources';

type SequenciesProps = {
  team: Team;
  sequence: { id: number; pressed: boolean; success: boolean; error: boolean }[];
};

const Sequencies = ({ team = Team.TEAM_A, sequence }: SequenciesProps) => {
  const error = false;
  const currentTeamRessources = teamsRessources[team];

  return (
    <div
      className="relative z-10 min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url(${currentTeamRessources.background})`,
      }}
    >
      {error && <div className="sequencies-error w-full min-h-screen absolute top-0 left-0"></div>}
      <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-between px-4 pb-4">
        <div></div>
        <div className="w-full flex gap-3 justify-center items-center flex-wrap">
          {sequence &&
            sequence.length > 1 &&
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
            ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Sequencies;

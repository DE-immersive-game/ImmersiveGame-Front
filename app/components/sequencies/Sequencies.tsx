'use client';

import ButtonList from '../../api/ButtonList.json';
import { Team } from '@/app/types';
import Number from '../number/Number';
import { teamsRessources } from '@/lib/teamsRessources';

type SequenciesProps = {
  team: Team;
};

const Sequencies = ({ team = Team.TEAM_A }: SequenciesProps) => {
  const error = false;
  const { TeamAButtons, TeamBButtons } = ButtonList;
  const buttons = team === Team.TEAM_A ? TeamAButtons : TeamBButtons;
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
          {buttons.map((button, i) => (
            <Number
              key={i}
              id={button.id}
              team={team}
              size={buttons.length > 6 ? 'sm' : buttons.length > 4 ? 'md' : 'lg'}
              pressed={button.pressed}
              success={false}
            />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Sequencies;

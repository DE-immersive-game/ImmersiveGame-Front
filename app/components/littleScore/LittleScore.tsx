import { Score, ScoreResult, Team } from '@/app/types';
import Icon from '../icon/Icon';

type ResultProps = {
  team: Team | 'draw';
  resultType: ScoreResult | 'draw';
  score: Score;
  mode?: 'default' | 'tv';
};

const LittleScore = ({ team, resultType, score }: ResultProps) => {
  const isActiveTeamA = team === Team.TEAM_A;
  const isActiveTeamB = team === Team.TEAM_B;

  return (
    <div className="flex items-center justify-between bg-neutral-text bg-opacity-5 rounded-2xl py-8 px-10 border-2 border-white/40 shadow-inner">
      <div className="flex items-center gap-12">
        <Icon team={Team.TEAM_A} isActive={isActiveTeamA} />
        <div className="text-center flex gap-10 font-orbitron font-semibold text-5xl text-neutral-text">
          <p>{score.team_a}</p>
          <p>-</p>
          <p>{score.team_b}</p>
        </div>
        <Icon team={Team.TEAM_B} isActive={isActiveTeamB} />
      </div>
    </div>
  );
};

export default LittleScore;

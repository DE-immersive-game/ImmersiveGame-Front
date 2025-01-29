import { CurrentScore, Team, ScoreResult } from '@/app/types';
import Icon from '../icon/Icon';

type ResultProps = {
  team: Team | 'draw';
  score: CurrentScore;
  mode?: 'default' | 'spectators';
  result?: ScoreResult | 'draw';
};

const LittleScore = ({ team, score, result }: ResultProps) => {
  return (
    <div className="flex items-center justify-between bg-neutral-text bg-opacity-5 rounded-2xl py-8 px-10 border-2 border-white/40 shadow-inner">
      <div className="flex items-center gap-12">
        <Icon team={Team.TEAM_A} isActive={team === Team.TEAM_A} />
        <div className="text-center flex gap-10 font-orbitron font-semibold text-5xl text-neutral-text">
          <p>{score.team_a}</p>
          <p>-</p>
          <p>{score.team_b}</p>
        </div>
        <Icon team={Team.TEAM_B} isActive={team === Team.TEAM_B} />
      </div>
    </div>
  );
};

export default LittleScore;

'use client';

import Result from '@/app/components/result/Result';
import { Score, Team } from '@/app/types';

const ScorePage = () => {
  const scoreResponse: { event: string; data: Score } = {
    event: 'teamScore',
    data: {
      team_a: 6,
      team_b: 5,
      winner: Team.TEAM_A,
    },
  };

  const score = scoreResponse.data;

  return <Result team={score.winner} score={score} resultType="win" mode="tv" />;
};

export default ScorePage;

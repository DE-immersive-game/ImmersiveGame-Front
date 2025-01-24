'use client';

import { useEffect, useState } from 'react';
import Result from '@/app/components/result/Result';
import { Score, Team, ScoreResult } from '@/app/types';
import { useWebSocket } from '@/app/context/WebSocketUsage';

const ScorePage = () => {
  const [score, setScore] = useState<Score | null>(null);
  const { registerEventHandler, unregisterEventHandler } = useWebSocket();

  useEffect(() => {
    const handleTeamScore = (data: any) => {
      const { team_a, team_b, result } = data;
      // Determine the winner or handle draw case
      const winner = result === 'draw' ? 'draw' : team_a > team_b ? Team.TEAM_A : Team.TEAM_B;

      setScore({
        team_a,
        team_b,
        winner,
      });
    };

    registerEventHandler('teamScore', handleTeamScore);

    return () => {
      unregisterEventHandler('teamScore', handleTeamScore);
    };
  }, [registerEventHandler, unregisterEventHandler]);

  if (!score) {
    return <div>Loading...</div>;
  }

  const resultType: ScoreResult | 'draw' =
    score.winner === 'draw'
      ? 'draw'
      : score.winner === Team.TEAM_A
      ? 'win'
      : score.winner === Team.TEAM_B
      ? 'win'
      : 'lose';

  if (resultType === 'win' || resultType === 'draw') {
    return <Result team={score.winner} score={score} resultType={resultType} mode="tv" />;
  }

  return <div>No result to display</div>;
};

export default ScorePage;

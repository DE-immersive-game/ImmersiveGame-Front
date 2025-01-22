'use client';

const Lose = ({ team }: { team: string }) => {

  return (
    <div>
      <h1>😢 Team {team} Loses. 😢</h1>
      <p>Better luck next time, {team}!</p>
    </div>
  );
};

export default Lose;

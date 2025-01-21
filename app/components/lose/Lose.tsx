'use client';

const LosePage = ({ params }: { params: { team: string } }) => {
  const { team } = params;

  return (
    <div>
      <h1>😢 Team {team} Loses. 😢</h1>
      <p>Better luck next time, {team}!</p>
    </div>
  );
};

export default LosePage;

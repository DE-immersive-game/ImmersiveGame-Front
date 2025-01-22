'use client';

const Win = ({ team }: { team: string }) => {
  return (
    <div>
      <h1 className="font-orbitron ">🎉 {team} Wins! 🎉</h1>
      <p>Congratulations to {team} for the victory!</p>
    </div>
  );
};

export default Win;

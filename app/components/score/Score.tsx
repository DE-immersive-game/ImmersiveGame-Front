import LoaderBar from '../loaderbar/LoaderBar';

const Score = () => {
  const scoreA = 5;
  const scoreB = 5;

  return (
    <div>
      <h1>This is the score !! 🏆</h1>
      <p>Team A : {scoreA}</p>
      <p>Team B : {scoreB}</p>
      <LoaderBar scoreA={scoreA} scoreB={scoreB} />
    </div>
  );
};

export default Score;

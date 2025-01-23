import LoaderBar from "../loaderbar/LoaderBar";

const Score = () => {
  const scoreA = 5;
  const scoreB = 5;

  return (
    <div className="bg-[url(/backgrounds/background-bicolore.png)] bg-cover bg-center h-screen px-[4.427vw] pb-[10.104vh] flex flex-col justify-between">
      <h1>This is the score !! 🏆</h1>
      <p>Team A : {scoreA}</p>
      <p>Team B : {scoreB}</p>
      <div>
        <div className="flex justify-between">
          <h2 className="font-orbitron text-white text-[80px]">Edenys</h2>
          <h2 className="font-orbitron text-white">Nexora</h2>
        </div>
        <LoaderBar scoreA={scoreA} scoreB={scoreB} />
      </div>
    </div>
  );
};

export default Score;

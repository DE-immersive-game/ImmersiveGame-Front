import LoaderBar from '../loaderbar/LoaderBar';

const Score = () => {
  const scoreA = 0;
  const scoreB = 3;

  return (
    <div className="bg-[url(/backgrounds/background-bicolore.png)] bg-cover bg-center h-screen px-[4.427vw] pb-[10.104vh] flex flex-col justify-between items-center">
      <div className="w-[30.5469vw] h-[19.2593vh] bg-slate-600  "></div>
      <div className="flex gap-[5.7292vw] justify-center items-center">
        <div
          className="w-[20.3125vw] h-[51.9444vh] px-[3.5156vw] py-[3.4722vh] flex flex-col gap-[3.9063vw] rounded-[0.625vw] border-[0.1563vw] backdrop-blur-[2.0464vw] "
          style={{
            borderColor: "rgba(255, 255, 255, 0.50)",
            backgroundColor: "rgba(255,255,255,0.05)",
            boxShadow:
              "-1.0234vw -1.0234vw 1.7396vw 0px rgba(255, 255, 255, 0.10) inset, 1.0234vw 1.0234vw 1.7396vw 0px rgba(0, 0, 0, 0.16) inset",
          }}
        >
          <div className=" bg-[url(/edenys-score.png)] bg-contain bg-no-repeat bg-center w-[12.0833vw] h-[14.4444vh] px-[2.3438vw] py-[0.9259vh] flex justify-center items-center font-orbitron text-white text-[4.4271vw] font-semibold tracking-[0.625vw]">
            {scoreA}
          </div>
        </div>
        <h1
          className="font-orbitron text-white text-[6.25vw] font-extrabold tracking-[0.625vw]"
          style={{ textShadow: "0px 0px 44px rgba(255, 255, 255, 0.75)" }}
        >
          VS
        </h1>
        <div
          className="w-[20.3125vw] h-[51.9444vh] px-[3.5156vw] py-[3.4722vh] flex flex-col gap-[3.9063vw] rounded-[0.625vw] border-[0.1563vw] backdrop-blur-[2.0464vw] "
          style={{
            borderColor: "rgba(255, 255, 255, 0.50)",
            backgroundColor: "rgba(255,255,255,0.05)",
            boxShadow:
              "-1.0234vw -1.0234vw 1.7396vw 0px rgba(255, 255, 255, 0.10) inset, 1.0234vw 1.0234vw 1.7396vw 0px rgba(0, 0, 0, 0.16) inset",
          }}
        >
          <div className="bg-[url(/nexora-score.png)] bg-contain bg-no-repeat bg-center w-[12.0833vw] h-[14.4444vh] px-[2.3438vw] py-[0.9259vh] flex justify-center items-center font-orbitron text-white text-[4.4271vw] font-semibold tracking-[0.625vw]">
            {scoreB}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-[1.5625vw]">
        <div className="flex justify-between">
          <h2 className="font-orbitron text-white text-[2.083vw] font-semibold tracking-[0.5208vw]">
            Edenys
          </h2>
          <h2 className="font-orbitron text-white text-[2.083vw] font-semibold tracking-[0.5208vw]">
            Nexora
          </h2>
        </div>
        <LoaderBar scoreA={scoreA} scoreB={scoreB} />
      </div>
    </div>
  );
};

export default Score;

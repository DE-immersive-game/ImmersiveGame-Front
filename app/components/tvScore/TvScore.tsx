'use client';

import LoaderBar from '../loaderbar/LoaderBar';
import Timer from '../timer/Timer';
import { CurrentScore } from '@/app/types';

const TvScore = ({ score, counter }: { score: CurrentScore; counter: number | null }) => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-0 animate-background-pulse bg-center bg-cover"
        style={{
          backgroundImage: 'url(/backgrounds/background-bicolore.png)',
        }}
      ></div>
      <div className="relative z-10 min-h-screen">
        <div className="w-full min-h-screen px-[4vw] pb-[10vh] flex flex-col gap-4 items-center justify-between">
          <div className="h-[15vh] overflow-hidden flex items-end ">
            <Timer countDown={counter} />
          </div>
          <div className="flex gap-[6vw] justify-center items-center">
            <div
              className="w-[20vw] h-[52vh] px-[4vw] py-[3vh] flex flex-col gap-[4vw] rounded-[0.6vw] border-[0.2vw] backdrop-blur-[2vw]"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.50)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                boxShadow:
                  '-1vw -1vw 2vw 0px rgba(255, 255, 255, 0.10) inset, 1vw 1vw 2vw 0px rgba(0, 0, 0, 0.16) inset',
              }}
            >
              <div className="bg-[url(/logos/Edenys.png)] bg-contain bg-no-repeat bg-center w-[13vw] h-[28vh]"></div>

              <div className="bg-[url(/edenys-score.png)] bg-contain bg-no-repeat bg-center w-[12vw] h-[14vh] px-[2vw] py-[1vh] flex justify-center items-center font-orbitron text-white text-[4vw] font-semibold">
                {score.team_a}
              </div>
            </div>
            <h1
              className="font-orbitron text-white text-[6vw] font-extrabold tracking-[0.6vw]"
              style={{ textShadow: '0px 0px 44px rgba(255, 255, 255, 0.75)' }}
            >
              VS
            </h1>
            <div
              className="w-[20vw] h-[52vh] px-[4vw] py-[3vh] flex flex-col gap-[4vw] rounded-[0.6vw] border-[0.2vw] backdrop-blur-[2vw]"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.50)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                boxShadow:
                  '-1vw -1vw 2vw 0px rgba(255, 255, 255, 0.10) inset, 1vw 1vw 2vw 0px rgba(0, 0, 0, 0.16) inset',
              }}
            >
              <div className="bg-[url(/logos/Nexora.png)] bg-contain bg-no-repeat bg-center w-[13vw] h-[28vh]"></div>

              <div className="bg-[url(/nexora-score.png)] bg-contain bg-no-repeat bg-center w-[12vw] h-[14vh] px-[2vw] py-[1vh] flex justify-center items-center font-orbitron text-white text-[4vw] font-semibold">
                {score.team_b}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[2vw]">
            <div className="flex justify-between">
              <h2 className="font-orbitron text-white text-[2vw] font-semibold tracking-[0.5vw]">
                Edenys
              </h2>
              <h2 className="font-orbitron text-white text-[2vw] font-semibold tracking-[0.5vw]">
                Nexora
              </h2>
            </div>
            <LoaderBar scoreA={score.team_a} scoreB={score.team_b} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvScore;

'use client';

import Image from 'next/image';

const Win = ({
  team,
  teamScore,
  opponentScore,
}: {
  team: 'team_a' | 'team_b';
  teamScore: number;
  opponentScore: number;
}) => {
  const resources = {
    team_a: {
      background: '/backgrounds/background-edenys.png',
      logo: '/logos/Edenys.png',
      activeIcon: '/icons/edenys-active.png',
      inactiveIcon: '/icons/nexora-inactive.png',
    },
    team_b: {
      background: '/backgrounds/background-nexora.png',
      logo: '/logos/Nexora.png',
      activeIcon: '/icons/nexora-active.png',
      inactiveIcon: '/icons/edenys-inactive.png',
   
    },
  };

  const currentTeamResources = resources[team];

  return (
    <div className="relative ">
      <div
        className="absolute inset-0 z-0 animate-customPulse "
        style={{
          backgroundImage: `url(${currentTeamResources.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-neutral-text ">
        <Image
          src={currentTeamResources.logo}
          alt={`${team} Logo`}
          width={274.5}
          height={326.25}
          className="mb-8"
        />
        <h1
          className="text-7xl font-galaxyRegular tracking-[.25em] uppercase mb-4 pl-4"
          style={{
            textShadow: '0px 0px 20px rgba(255, 255, 255, 0.75)',
          }}
        >
          Victoire
        </h1>
        <div className="flex items-center justify-between w-[443px] h-[118px] bg-neutral-text bg-opacity-5 rounded-[15px] p-[35px] border border-white/40 shadow-inner">
          <div className="flex items-center space-x-[47px]">
            <Image
              src={currentTeamResources.activeIcon}
              alt="Active Icon"
              width={50}
              height={50}
            />
            <div className="text-center flex space-x-[40px] font-orbitron text-5xl text-neutral-text">
              <p className=" ">{teamScore}</p>
              <p>-</p>
              <p className=" ">{opponentScore}</p>
            </div>
            <Image
              src={currentTeamResources.inactiveIcon}
              alt="Inactive Icon"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Win;

'use client';

import Image from 'next/image';

const LoadingScreen = ({
  team,
  state,
}: {
  team: 'team_a' | 'team_b';
  state: string; // État reçu depuis le contexte
}) => {
  const resources = {
    team_a: {
      background: '/backgrounds/background-edenys.png',
      logo: '/logos/Edenys-long.png',
    },
    team_b: {
      background: '/backgrounds/background-nexora.png',
      logo: '/logos/Nexora-long.png',
    },
  };

  const currentTeamResources = resources[team];

  if (!currentTeamResources) {
    return <div>Équipe invalide ou non trouvée</div>;
  }

  // Détermine le texte ou contenu basé sur l'état
  const getContent = () => {
    switch (state) {
      case 'waiting':
        return 'En attente de joueurs';
      case 'starting':
        return 'La partie va commencer...'; // Texte pour "starting"
      default:
        return 'Chargement...';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-neutral-text">
      <div
        className="absolute inset-0 z-0 animate-customPulse"
        style={{
          backgroundImage: `url(${currentTeamResources.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="absolute top-10">
        <Image
          src={currentTeamResources.logo}
          alt={`${team} Logo`}
          width={300}
          height={300}
          className="drop-shadow-lg"
        />
      </div>
      <div className="w-full flex justify-center text-center">
        <div className="w-full bg-neutral-text bg-opacity-10 py-8 px-6 border-t-2 border-b-2 border-white/40 shadow-inner backdrop-blur-2xl">
          <h1
            className="text-6xl font-galaxyRegular text-neutral-text uppercase tracking-[.48em] pt-3"
            style={{
              textShadow: '0px 0px 10px rgba(255, 255, 255, 0.75)',
            }}
          >
            {getContent()}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

'use client';

import React from 'react';
import { useWebSocket } from '@/app/context/WebSocketUsage';
import { WebSocketMessage, WebSocketEvent, Team } from '@/app/types';

const Admin = () => {
  const { isConnected, sendMessage } = useWebSocket();

  const handleSendEvent = (event: WebSocketEvent, data: Record<string, any> = {}) => {
    const message: WebSocketMessage = { event, data };
    sendMessage(message);
  };

  const handleResetSequence = (team: Team) => {
    const message: WebSocketMessage = {
      event: 'resetSequence',
      data: { team },
    };
    sendMessage(message);
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 z-0 animate-background-pulse bg-center bg-cover"
        style={{
          backgroundImage: 'url(/backgrounds/background-bicolore.png)',
        }}
      ></div>
      <div className="relative z-10 min-h-screen">
        <div className="flex flex-col items-center justify-center min-h-screen gap-20">
          <div className="bg-[url(/logos/Neutral-long.png)] bg-contain bg-no-repeat bg-center w-72 h-20"></div>
          <div>
            <div className="mt-6">
              <div className="flex flex-col gap-4">
                <button onClick={() => handleSendEvent('startGame')} disabled={!isConnected}>
                  <div className="relative border-2 rounded-3xl w-[450px] h-24 text-white text-xl tracking-[5px] font-semibold font-orbitron flex items-center gap-5 p-8 bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow after:content-[''] after:absolute after:inset-0 after:bg-natural-1 after:rounded-full after:blur-lg after:w-[200px] after:h-[10px] after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 161 170"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_772_961)">
                        <path
                          d="M53.1719 49.3795V120.768C53.1717 121.562 53.3526 122.341 53.6961 123.026C54.0395 123.711 54.533 124.276 55.1255 124.664C55.7181 125.051 56.3884 125.247 57.0671 125.23C57.7459 125.213 58.4086 124.985 58.9868 124.569L108.589 88.8751C109.145 88.4759 109.604 87.9169 109.922 87.2514C110.24 86.5859 110.407 85.8362 110.407 85.0737C110.407 84.3112 110.24 83.5615 109.922 82.896C109.604 82.2305 109.145 81.6715 108.589 81.2723L58.9868 45.5781C58.4086 45.1621 57.7459 44.9341 57.0671 44.9175C56.3884 44.9009 55.7181 45.0964 55.1255 45.4838C54.533 45.8712 54.0395 46.4364 53.6961 47.1213C53.3526 47.8061 53.1717 48.5856 53.1719 49.3795Z"
                          fill="#0FFA95"
                        />
                        <path
                          d="M53.1719 49.3795V120.768C53.1717 121.562 53.3526 122.341 53.6961 123.026C54.0395 123.711 54.533 124.276 55.1255 124.664C55.7181 125.051 56.3884 125.247 57.0671 125.23C57.7459 125.213 58.4086 124.985 58.9868 124.569L108.589 88.8751C109.145 88.4759 109.604 87.9169 109.922 87.2514C110.24 86.5859 110.407 85.8362 110.407 85.0737C110.407 84.3112 110.24 83.5615 109.922 82.896C109.604 82.2305 109.145 81.6715 108.589 81.2723L58.9868 45.5781C58.4086 45.1621 57.7459 44.9341 57.0671 44.9175C56.3884 44.9009 55.7181 45.0964 55.1255 45.4838C54.533 45.8712 54.0395 46.4364 53.6961 47.1213C53.3526 47.8061 53.1717 48.5856 53.1719 49.3795Z"
                          stroke="white"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_772_961"
                          x="0.936005"
                          y="-7.31937"
                          width="161.706"
                          height="184.786"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="26.1179" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.0588235 0 0 0 0 0.980392 0 0 0 0 0.584314 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_772_961"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_772_961"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                    Lancer la partie
                  </div>
                </button>
                <button onClick={() => handleResetSequence(Team.TEAM_A)} disabled={!isConnected}>
                  <div className="relative border-2 rounded-3xl w-[450px] h-24 text-white text-xl tracking-[5px] font-semibold font-orbitron flex items-center gap-5 p-8 bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow after:content-[''] after:absolute after:inset-0 after:bg-natural-1 after:rounded-full after:blur-lg after:w-[200px] after:h-[10px] after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 overflow-hidden">
                    <div className="bg-[url(/logos/Edenys.png)] bg-contain bg-no-repeat bg-center w-[60px] h-[60px]"></div>
                    Relancer la série
                  </div>
                </button>
                <button onClick={() => handleResetSequence(Team.TEAM_B)} disabled={!isConnected}>
                  <div className="relative border-2 rounded-3xl w-[450px] h-24 text-white text-xl tracking-[5px] font-semibold font-orbitron flex items-center gap-5 p-8 bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow after:content-[''] after:absolute after:inset-0 after:bg-futuristic-1 after:rounded-full after:blur-lg after:w-[200px] after:h-[10px] after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 overflow-hidden">
                    <div className="bg-[url(/logos/Nexora.png)] bg-contain bg-no-repeat bg-center w-[60px] h-[60px]"></div>
                    Relancer la série
                  </div>
                </button>
                <button onClick={() => handleSendEvent('resetGame')} disabled={!isConnected}>
                  <div className="relative border-2 rounded-3xl w-[450px] h-24 text-white text-xl tracking-[5px] font-semibold font-orbitron flex  items-center gap-5 p-8 bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow after:content-[''] after:absolute after:inset-0 after:bg-futuristic-1 after:rounded-full after:blur-lg after:w-[200px] after:h-[10px] after:top-full after:left-1/2 after:transform after:-translate-x-1/2 after:-translate-y-1/2 overflow-hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 170 170"
                      fill="none"
                    >
                      <g filter="url(#filter0_d_772_963)">
                        <path
                          d="M122.275 89.8974C121.388 96.6655 118.674 103.064 114.426 108.408C110.179 113.751 104.556 117.837 98.1627 120.228C91.7691 122.619 84.8452 123.224 78.1336 121.979C71.4221 120.734 65.176 117.685 60.0654 113.16C54.9548 108.635 51.1724 102.804 49.1239 96.2928C47.0753 89.7814 46.8379 82.8351 48.4371 76.199C50.0363 69.5629 53.4117 63.4873 58.2014 58.6238C62.9911 53.7602 69.0144 50.2923 75.6253 48.5918C93.9515 43.8916 112.922 53.3249 119.925 70.9038M122.59 47.4027V70.9039H99.0886"
                          stroke="#E702FF"
                          strokeWidth="12.5366"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          shapeRendering="crispEdges"
                        />
                      </g>
                      <defs>
                        <filter
                          id="filter0_d_772_963"
                          x="-11.1109"
                          y="-11.1136"
                          width="192.206"
                          height="192.228"
                          filterUnits="userSpaceOnUse"
                          colorInterpolationFilters="sRGB"
                        >
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset />
                          <feGaussianBlur stdDeviation="26.1179" />
                          <feComposite in2="hardAlpha" operator="out" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0.905882 0 0 0 0 0.00784314 0 0 0 0 1 0 0 0 1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_772_963"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect1_dropShadow_772_963"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                    Réinitialiser le jeu
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

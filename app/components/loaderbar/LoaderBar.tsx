import { cn } from '@/lib/utils';
import React from 'react';

type ProgressBarProps = {
  scoreA: number;
  scoreB: number;
};

const LoaderBar = ({ scoreA, scoreB }: ProgressBarProps) => {
  const scoreDifference = scoreA - scoreB;

  // Determine bar state based on score difference
  let APercentage = 50; // Default is 50% - 50%
  let BPercentage = 50;

  console.log('scoreDifference', scoreDifference);

  if (scoreDifference >= 3) {
    APercentage = 100;
    BPercentage = 0;
  } else if (scoreDifference === 2) {
    APercentage = 82;
    BPercentage = 18;
  } else if (scoreDifference === 1) {
    APercentage = 66;
    BPercentage = 34;
  } else if (scoreDifference === -1) {
    APercentage = 34;
    BPercentage = 66;
  } else if (scoreDifference === -2) {
    APercentage = 18;
    BPercentage = 82;
  } else if (scoreDifference <= -3) {
    APercentage = 0;
    BPercentage = 100;
  }

  console.log('APercentage', APercentage);
  console.log('BPercentage', BPercentage);

  return (
    <div className="relative h-[2.315vh] bg-gray-800 rounded-full ">
      {/* Barre de l'équipe A */}
      <div
        className={cn(
          'absolute h-full bg-natural-gradient shadow-[0px_0px_43px_1px_#7FFD50] rounded-l-full',
          scoreDifference >= 3 && 'rounded-r-full',
        )}
        style={{ ...styles.bar, width: `${APercentage}%` }}
      >
        <div
          className={cn(
            'h-full w-full overflow-hidden relative  rounded-l-full',
            scoreDifference >= 3 && 'rounded-r-full',
          )}
        >
          <div className="absolute inset-0 animate-green-slide bg-gradient-to-r from-transparent via-transparent to-white opacity-40  "></div>
        </div>
      </div>

      {/* Barre de l'équipe B */}
      <div
        className={cn(
          'absolute h-full bg-futuristic-gradient right-0   shadow-[0px_0px_43px_1px_#7757FF]  rounded-r-full ',
          scoreDifference <= -3 && 'rounded-l-full',
        )}
        style={{ ...styles.bar, width: `${BPercentage}%` }}
      >
        <div
          className={cn(
            'h-full w-full overflow-hidden relative  rounded-r-full ',
            scoreDifference <= -3 && 'rounded-l-full',
          )}
        >
          <div className="absolute inset-0 animate-purple-slide bg-gradient-to-l from-transparent via-transparent to-white opacity-20 "></div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
};

export default LoaderBar;

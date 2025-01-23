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
  } else if (scoreDifference >= -3) {
    APercentage = 0;
    BPercentage = 100;
  }

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.bar,
          ...styles.purpleBar,
          width: `${APercentage}%`,
        }}
      />
      <div
        style={{
          ...styles.bar,
          ...styles.greenBar,
          width: `${BPercentage}%`,
        }}
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    width: '100%',
    height: '30px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
  purpleBar: {
    backgroundColor: 'purple',
  },
  greenBar: {
    backgroundColor: 'green',
  },
};

export default LoaderBar;

import React from "react";

interface ProgressBarProps {
  scoreA: number; // A team
  scoreB: number; // B Team
}

const LoaderBar: React.FC<ProgressBarProps> = ({ scoreA, scoreB }) => {
  const scoreDifference = scoreA - scoreB;

  // Determine bar state based on score difference
  let APercentage = 50; // Default is 50% - 50%
  let BPercentage = 50;

  if (scoreDifference >= 2) {
    APercentage = 100;
    BPercentage = 0;
  } else if (scoreDifference === 1) {
    APercentage = 75;
    BPercentage = 25;
  } else if (scoreDifference === -1) {
    APercentage = 25;
    BPercentage = 75;
  } else if (scoreDifference <= -2) {
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
    display: "flex",
    width: "100%",
    height: "30px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    transition: "width 0.3s ease",
  },
  purpleBar: {
    backgroundColor: "purple",
  },
  greenBar: {
    backgroundColor: "green",
  },
};

export default LoaderBar;

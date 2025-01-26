// pages/TimerPage.tsx

import React from 'react';
import Timer from '../components/timer/Timer';

const TimerPage = () => {
  return (
    <div>
      <h1>Page Timer</h1>
      <Timer initialDuration={180} /> {/* Tu peux aussi passer une durée initiale */}
    </div>
  );
};

export default TimerPage;

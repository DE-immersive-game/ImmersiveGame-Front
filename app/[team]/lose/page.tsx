'use client';

import { useParams } from 'next/navigation';
import Lose from '@/app/components/lose/Lose';

const WinPage = () => {
  const params = useParams();
  const team = typeof params.team === 'string' ? params.team : ''; // Vérifie et force le type string

  return <Lose team={team} />;
};

export default Lose;
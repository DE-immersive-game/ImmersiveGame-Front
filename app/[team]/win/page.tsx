'use client';

import { useParams } from 'next/navigation';
import Win from '@/app/components/win/Win';

const WinPage = () => {
  const params = useParams();
  const team = typeof params.team === 'string' ? params.team : ''; // Vérifie et force le type string

  return <Win team={team} />;
};

export default WinPage;

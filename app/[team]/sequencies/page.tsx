'use client';

import { useParams } from 'next/navigation';
import Sequencies from '../../components/sequencies/Sequencies';
import { Team } from '@/app/types';

export default function SequenciesPage() {
  const params = useParams();
  const team = (typeof params.team === 'string' ? params.team : '') as Team;

  return (
    <div>
      <Sequencies team={team} />
    </div>
  );
}

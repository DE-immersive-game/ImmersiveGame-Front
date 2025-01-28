import { Team } from '@/app/types';
import PressedIcon from './PressedIcon';
import { cn } from '@/lib/utils';

type NumberProps = {
  id: number;
  team: Team;
  size?: 'lg' | 'md' | 'sm';
  pressed?: boolean;
  success?: boolean;
  error?: boolean;
  className?: string;
};

const sizes = {
  pressedIcon: {
    lg: '32px',
    md: '28px',
    sm: '20px',
  },
  button: {
    lg: 'w-52 h-52',
    md: 'w-44 h-44',
    sm: 'w-36 h-36',
  },
  id: {
    lg: 'text-[152px]',
    md: 'text-9xl',
    sm: 'text-8xl',
  },
};

const Number = ({
  id,
  team,
  size = 'sm',
  pressed = false,
  success = false,
  error = false,
  className,
}: NumberProps) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center gap-3 rounded-[32px] bg-black/40 backdrop-blur-[10px] border-t-2 border-l border-white/50 glassmorphism-shadow',
        sizes.button[size],
        success && 'bg-[#48e5e5]/50 border-white/80 glassmorphism-shadow-clicked',
        success && pressed && !error && 'animate-button-pulse',
        error && 'bg-[#e54848]/50 border-white/80 glassmorphism-shadow-error animate-button-shake',
        className,
      )}
    >
      <p className={cn('font-montserrat font-bold text-white uppercase', sizes.id[size])}>{id}</p>
      {pressed && <PressedIcon team={team} width={sizes.pressedIcon[size]} />}
    </div>
  );
};

export default Number;

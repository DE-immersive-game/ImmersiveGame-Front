import { Team } from '@/app/types';
import { teamsRessources } from '@/lib/teamsRessources';

type PressedIconProps = {
  team: Team;
  width: string;
};

const PressedIcon = ({ team, width }: PressedIconProps) => {
  const mainColor = teamsRessources[team].mainColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="auto"
      viewBox="0 0 140 406"
      fill="none"
    >
      <path d="M140 81.5V0.5L70 54.5L0 0.5V81.5L70 135.5L140 81.5Z" fill={mainColor} />
      <path d="M140 216.5V135.5L70 189.5L0 135.5V216.5L70 270.5L140 216.5Z" fill={mainColor} />
      <path d="M140 351.5V270.5L70 324.5L0 270.5V351.5L70 405.5L140 351.5Z" fill={mainColor} />
    </svg>
  );
};

export default PressedIcon;

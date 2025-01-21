"use client";

import { useParams } from "next/navigation";
import ButtonList from "../../api/ButtonList.json";

const Sequencies = () => {
  const { team } = useParams();
  const { TeamAButtons, TeamBButtons } = ButtonList;

  const buttons = team === "team_a" ? TeamAButtons : TeamBButtons;

  return (
    <>
      <h1>Sequencie</h1>
      <h2>{team === "team_a" ? "Team A" : "Team B"}</h2>
      <ul>
        {buttons.map((button) => (
          <li
            key={button.id}
            style={{ color: button.pressed ? "red" : "black" }}
          >
            {button.number}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Sequencies;

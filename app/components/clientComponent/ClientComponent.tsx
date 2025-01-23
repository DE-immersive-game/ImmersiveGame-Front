"use client";

import "./globals.css";
import { WebSocketProvider } from "../../context/WebSocketContext";
import { usePathname } from "next/navigation";
import { Team } from "@/app/types";

type ClientComponentProps = {
  children: React.ReactNode;
};

export default function ClientComponent({ children }: ClientComponentProps) {
  const pathname = usePathname();

  const team = pathname.includes(Team.TEAM_A) ? Team.TEAM_A : Team.TEAM_B;

  return <WebSocketProvider currentTeam={team}>{children}</WebSocketProvider>;
}

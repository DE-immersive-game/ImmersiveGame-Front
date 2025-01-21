'use client'

import { useEffect, useState } from "react";
import socket from "../api/socket";

export default function Admin()  {
  const [connected, setConnected] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = useState<string>("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connecté au WebSocket");
      setConnected(true);
    });

    socket.on("info", (data: { message: string }) => {
      console.log("Message reçu du serveur :", data);
      setInfoMessage(data.message);
    });

    socket.on("connect_error", (err) => {
      console.error("Erreur de connexion :", err);
      setConnected(false);
    });

    socket.on("disconnect", () => {
      console.log("Déconnecté du WebSocket");
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("info");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div>
      <h1>Connexion au WebSocket </h1>
      <p>Statut : {connected ? "Connecté" : "Non connecté"}</p>
      <p>Message reçu : {infoMessage || "Aucun message pour l'instant"}</p>
    </div>
  );
};


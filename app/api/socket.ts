import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  info: (data: { message: string }) => void;
}

interface ClientToServerEvents {
  createAdmin: (data: any) => void;
  findAllAdmin: () => void;
  findOneAdmin: (id: number) => void;
  updateAdmin: (data: any) => void;
  removeAdmin: (id: number) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://10.14.72.238:8000/admin", {
  transports: ["websocket"], 
  reconnection: false,  
});

export default socket;

import Peer from "peerjs";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io as socketIOClient, Socket } from "socket.io-client";
const WS = "http://localhost:8900";

type SocketContextType = {
  ws?: Socket;
  me?: Peer;
};

const RoomContext = createContext<SocketContextType>({
  ws: undefined,
  me: undefined,
});
const ws = socketIOClient(WS);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const enterRoom = ({ roomId }: { roomId: string }) => {
    navigate(`/room/${roomId}`);
  };
  useEffect(() => {

    const meId = crypto.randomUUID();
    const peer = new Peer(meId);
    setMe(peer);

    ws.on("room-created", enterRoom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RoomContext.Provider value={{ ws, me }}>{children}</RoomContext.Provider>
  );
};

import { createContext, useContext } from "react";
import { io as socketIOClient, Socket } from "socket.io-client";
const WS = "http://localhost:8900";

type SocketContextType = {
  ws: Socket | null;
};

const RoomContext = createContext<SocketContextType>({ ws: null });
const ws = socketIOClient(WS);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
  return <RoomContext.Provider value={{ ws }}>{children}</RoomContext.Provider>;
};

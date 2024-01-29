import { Socket } from "socket.io";

const rooms: Record<string, string[]> = {};

interface IRoomParams {
  roomId: string;
  peerId: string;
}

export const roomHandler = (socket: Socket) => {
  const createRoom = () => {
    const roomId = crypto.randomUUID();
    rooms[roomId] = [];
    socket.emit("room-created", { roomId });
    console.log("user created the room");
  };
  const joinRoom = ({ roomId, peerId }: IRoomParams) => {
    console.log("user joined the room", roomId, peerId);
    rooms[roomId].push(peerId);
    socket.join(roomId);
  };

  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

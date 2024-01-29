import { useSocket } from "@/context/RoomContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface RoomProps {}

// eslint-disable-next-line no-empty-pattern
export default function Room({}: RoomProps) {
  const { id } = useParams();
  const { ws, me } = useSocket();

  useEffect(() => {
    if (me) ws?.emit("join-room", { roomId: id, peerId: me?.id });
  }, [id, me, ws]);
  return <div>Room {id}</div>;
}

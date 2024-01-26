import { useSocket } from "@/context/RoomContext";
import { Button } from "./ui/button";

const CreateButton = () => {
   const { ws } = useSocket();
  const joinRoom = () => {
    ws?.emit("create-room")
  }
  return (
    <>
      <Button onClick={joinRoom}>Start new meeting</Button>
    </>
  );
};

export default CreateButton;

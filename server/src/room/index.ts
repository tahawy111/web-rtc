import { Socket } from "socket.io";

export const roomHandler = (socket: Socket) => {
const createRoom = () => {
    console.log("user created the room");
    
}
const joinRoom = () => {
    console.log("user joined the room");
    
}

socket.on("join-room",joinRoom)
socket.on("create-room",createRoom)
}
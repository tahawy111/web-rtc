import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { roomHandler } from "./room";
const app = express();
app.use(cors());

app.get("/", (_req, res) => res.send("Hello from socket server"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  // When connect
  console.log("a user connected.");

  roomHandler(socket);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");

    console.log("a user disconnected.");
  });
});

httpServer.listen(process.env.PORT || 8900, () =>
  console.log("server is working on port 8900!")
);

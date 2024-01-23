import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
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

  // socket.on(
  //   "sendMessage",
  //   ({ message, key }: { message: any; key: string }) => {
  //     // console.log({ message, key });

  //     io.emit("getMessage", { message, key });
  //   }
  // );

  socket.emit("me", socket.id);

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");

    console.log("a user disconnected.");
  });
});

httpServer.listen(process.env.PORT || 8900, () =>
  console.log("server is working on port 8900!")
);

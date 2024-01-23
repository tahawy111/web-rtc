"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/", (req, res) => res.send("Hello from socket server"));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
    allowEIO3: true,
});
io.on("connection", (socket) => {
    // When connect
    console.log("a user connected.");
    socket.on("sendMessage", ({ message, key }) => {
        // console.log({ message, key });
        io.emit("getMessage", { message, key });
    });
    socket.on("disconnect", () => {
        console.log("a user disconnected.");
    });
});
httpServer.listen(process.env.PORT || 8900);

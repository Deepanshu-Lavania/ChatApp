import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

//! The server uses "emit" to send events to the client. The client listens with "on".
const users = {};

//* Real time message code without refresh the page
const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("New Client connected", socket.id);
  const userId = socket.handshake.query.userId; //get from SocketContext.jsx
  if (userId) {
    users[userId] = socket.id;
    console.log("users are by socket.js : ", users);
  }
  console.log("usersId are by socket.js : ", Object.keys(users));

  io.emit("getonline", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete users[userId];
    io.emit("getonline", Object.keys(users));
  });
});

export { app, io, server, getReceiverSocketId };
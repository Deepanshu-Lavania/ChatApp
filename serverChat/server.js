// 
import "dotenv/config";
import express from "express";
import connectDb from "./utils/db.js";
import userRoute from "./router/user-route.js";
import messageRoute from "./router/message-route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app, server } from "./SocketIO/socket.js"; // Import app and server

const __dirname = path.resolve();

// Middleware setup
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT || 8000;

// <------------------ code for deployment -------------> //

app.use(express.static(path.join(__dirname, "/clientChat/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "clientChat", "dist", "index.html"));
});

// Connect to DB and start the server
connectDb().then(() => {
  server.listen(port, () => {
    console.log(`Server running using socket.io server at http://localhost:${port}`);
  });
});
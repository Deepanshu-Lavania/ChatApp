require("dotenv").config();
const express = require("express");
const connectDb = require("./utils/db");
const userRoute = require("./router/user-route");
const messageRoute = require("./router/message-route");
const cookieParser = require("cookie-parser");
// const path = require("path");
const cors = require("cors");
const { app, server } = require("./SocketIO/socket"); // Import app and server
const path = require("path");

const _dirname = path.resolve(); 

// Middleware setup
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

const port = process.env.PORT || 8000;

// <------------------ code for deployment -------------> //

app.use(express.static(path.join(_dirname, "/clientChat/dist")));
app.get("*",(_,res)=>{
  res.sendFile(path.resolve(_dirname, "clientChat","dist","index.html"));
})

// Connect to DB and start the server
connectDb().then(() => {
  server.listen(port, () => {
    console.log(`Server running using socket.io server at http://localhost:${port}`);
  });
});

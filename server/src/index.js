// Main entry point for the sync server

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const handleSocket = require("./socketHandler");

const app = express();
const server = http.createServer(app);

// Allow Electron app to connect
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Basic route (optional, for testing)
app.get("/", (req, res) => {
  res.send("Watch Together Sync Server is running");
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  handleSocket(io, socket);
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sync server running on port ${PORT}`);
});

// Handles all socket events (rooms + sync)

const { createRoom, joinRoom, getRoomUsers } = require("./rooms");

module.exports = function handleSocket(io, socket) {
  // Create room
  socket.on("create-room", (callback) => {
    const roomId = createRoom(socket.id);
    socket.join(roomId);

    console.log(`Room created: ${roomId}`);
    callback(roomId);
  });

  // Join room
  socket.on("join-room", (roomId) => {
    const success = joinRoom(roomId, socket.id);

    if (!success) {
      socket.emit("error", "Room not found");
      return;
    }

    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Sync events
  socket.on("play", ({ roomId, time }) => {
    socket.to(roomId).emit("play", time);
  });

  socket.on("pause", ({ roomId, time }) => {
    socket.to(roomId).emit("pause", time);
  });

  socket.on("seek", ({ roomId, time }) => {
    socket.to(roomId).emit("seek", time);
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};

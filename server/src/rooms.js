// Simple in-memory room management

const rooms = {};

// Generate short random room ID
function generateRoomId() {
  return Math.random().toString(36).substring(2, 8);
}

function createRoom(hostSocketId) {
  const roomId = generateRoomId();

  rooms[roomId] = {
    host: hostSocketId,
    users: [hostSocketId]
  };

  return roomId;
}

function joinRoom(roomId, socketId) {
  if (!rooms[roomId]) return false;

  rooms[roomId].users.push(socketId);
  return true;
}

function getRoomUsers(roomId) {
  if (!rooms[roomId]) return [];
  return rooms[roomId].users;
}

module.exports = {
  createRoom,
  joinRoom,
  getRoomUsers
};

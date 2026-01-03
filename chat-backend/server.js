const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET","POST"],
  },
});

io.on('connection', (socket) => {
  console.log('🔌 Connected:', socket.id);

  socket.on('sendMessage', (msg) => {
    if (!msg?.text) return;
    io.emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));

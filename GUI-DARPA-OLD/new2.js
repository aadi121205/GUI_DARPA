// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Read and send the JSON file when a client requests it
  socket.on('request-json', () => {
    function generateRandomData() {
      const shapes = ['circle', 'square', 'triangle'];
      const colors = ['Red', 'Blue', 'Green', 'Yellow'];
      const alphanumerics = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
      const orientations = ['N', 'S', 'E', 'W'];
      const types = ['Emergent', 'Urgent', 'Routine'];
    
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      const randomShapeColor = colors[Math.floor(Math.random() * colors.length)];
      const randomAlphanumeric = alphanumerics[Math.floor(Math.random() * alphanumerics.length)];
      const randomAlphanumericColor = colors[Math.floor(Math.random() * colors.length)];
      const randomOrientation = orientations[Math.floor(Math.random() * orientations.length)];
      const randomLatitude = Math.random() * 90; // Random latitude between -90 and 90
      const randomLongitude = Math.random() * 180; // Random longitude between -180 and 180
      const randomType = types[Math.floor(Math.random() * types.length)];
    
      return {
        "Shape": randomShape,
        "Shape_Color": randomShapeColor,
        "Alphanumeric": randomAlphanumeric,
        "Alphanumeric_Color": randomAlphanumericColor,
        "Orientation": randomOrientation,
        "Latitude": randomLatitude.toFixed(2), // Limiting to 2 decimal places
        "Longitude": randomLongitude.toFixed(2), // Limiting to 2 decimal places
        "Type": randomType
      };
    }
    data=generateRandomData()
    setInterval(()=>{
      data=generateRandomData()
      socket.emit('json-data',data);

    },5000);
    
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

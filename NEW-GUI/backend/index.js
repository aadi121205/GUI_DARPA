const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
require('dotenv').config()
const defaultParams = {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  pingInterval: 500,
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
    ],
    methods: ["GET", "POST"],
  }
};

const app = express();
const server = http.createServer(app);
const io = socketIo(server, defaultParams);
// Variables 
let telemetryActive = false;
let telemetryroverActive = false;
let telemetryrover2Active = false;
let telemetryrover3Active = false;
let counter = 1;
let flag = false;

const ugvNamespace = io.of('/ugv');
const roverNamespace = io.of('/rover');
const rover2Namespace = io.of('/rover2');
const rover3Namespace = io.of('/rover3');
const reactNamespace = io.of('/react');

// Python namespace
ugvNamespace.on('connection', (socket) => {
    console.log('A Python client connected_UAV');

    socket.on('telemetry', (data) => {
        counter = 0
        if (telemetryActive) {
            // console.log("Telemetry received:", data);
            reactNamespace.emit('telemetryServer', data);
        }
    });
    socket.on("image",(payload)=>{
        reactNamespace.emit('video_image',payload)
    })
    
    socket.on('disconnect', () => {
        console.log('A Python client disconnected');
    });
});

// Rover namespace
roverNamespace.on('connection', (socket) => {
    console.log('A Python client connected');

    socket.on("image_rover",(payload)=>{
        reactNamespace.emit('video_image_rover',payload)
    })
    socket.on('telemetry_rover', (data) => {
        counter = 0

        // console.log("Telemetry received:", data);
        if(telemetryroverActive){
            reactNamespace.emit('telemetryServer_rover', data);
        }
    })

    socket.on('disconnect_rover', () => {
        console.log('A Python client disconnected');
    });
});

// Rover2 namespace
rover2Namespace.on('connection', (socket) => {
    console.log('A Python client connected');

    socket.on("image_rover2",(payload)=>{
        reactNamespace.emit('video_image_rover2',payload)
    })
    socket.on('telemetry_rover2', (data) => {
        counter = 0
        // console.log("Telemetry received:", data);
        if(telemetryrover2Active){
            reactNamespace.emit('telemetryServer_rover2', data);
        }
    })

    socket.on('disconnect_rover2', () => {
        console.log('A Python client disconnected');
    });
});

// Rover3 namespace

rover3Namespace.on('connection', (socket) => {
    console.log('A Python client connected');

    socket.on("image_rover3",(payload)=>{
        reactNamespace.emit('video_image_rover3',payload)
    })
    socket.on('telemetry_rover3', (data) => {
        counter = 0
        // console.log("Telemetry received:", data);
        if(telemetryrover3Active){
            reactNamespace.emit('telemetryServer_rover3', data);
        }
    })

    socket.on('disconnect_rover3', () => {
        console.log('A Python client disconnected');
    });
}
);

// React namespace
reactNamespace.on('connection', (socket) => {
    
    console.log('A React client connected');

});



setInterval(() => {
    if (counter > 5) {
        flag = false;
    }
    else if (counter == 0) {
        flag = true;
    }
    counter++;
}, 2000)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/images', express.static(path.join(__dirname, 'images')));



const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

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
let counter = 1;
let flag = false;
const odlcData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
// console.log(odlcData)
const chartData = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 }
]

// Python namespace
const pythonNamespace = io.of('/python');
const reactNamespace = io.of('/react');
pythonNamespace.on('connection', (socket) => {
    console.log('A Python client connected');

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
    socket.on('telemetry_rover', (data) => {
        counter = 0

        // console.log("Telemetry received:", data);
        if(telemetryActive){

            reactNamespace.emit('telemetryServer_rover', data);
        }
    })

    socket.on('disconnect', () => {
        console.log('A Python client disconnected');
    });
});

// React namespace
reactNamespace.on('connection', (socket) => {
    console.log('A React client connected');

    socket.on('startvideo',()=>{
        console.log("Video Started")
        pythonNamespace.emit('start_video')
    })

    socket.on('stopvideo',()=>{
        console.log("Video stoped")
        pythonNamespace.emit('stop_video')
    })

    socket.on('start_rover_telem',()=>{
        console.log("Telemetry start requested");
        telemetryActive = true;
        console.log("Starting rover telemetry");
    })
    socket.on('stop_rover_telem',()=>{
        console.log('RoverTelemetry stopped')
        telemetryActive= false
    })
    socket.on('armRover',()=>{
        pythonNamespace.emit('arm_rover')
    })
    socket.on('stopRover',()=>{
        console.log('Emergency')
        pythonNamespace.emit('emergency_stop')
    })
    socket.on('startTelem', () => {
        console.log("Telemetry start requested");
        telemetryActive = true;
        console.log("Starting telemetry");
    });

    socket.on('stopTelem', () => {
        console.log("Telemetry stopped");
        telemetryActive = false;
    });
    socket.on('downloadMission', () => {
        console.log("Download Command recived");
        pythonNamespace.emit('download_mission');
    });
    socket.on('readMission', () => {
        console.log("read Mission command recieved");
        pythonNamespace.emit('readmission');
    });
    socket.on('uploadMission', () => {
        console.log("upload Mission command recieved");
        pythonNamespace.emit('upload_mission');
    });
    socket.on('saveMission', () => {
        console.log("save Mission command recieved");
        pythonNamespace.emit('save_mission');
    });
    socket.on('takeoffBackend', () => {
        console.log("Recieved takeoff command");
        pythonNamespace.emit('takeoff');
    });
    socket.on('armingBackend', () => {
        console.log("Recieved arming command");
        pythonNamespace.emit('arm_drone');
    });
    socket.on('disarmingBackend', () => {
        console.log("Recieved disArming command");
        pythonNamespace.emit('disarm_drone');
    });

    socket.on('set_gimbal_point', (data) => {
        console.log("Set the gimbal point to ", data)
        pythonNamespace.emit('gimbal_point', data)
    })
    socket.emit('updateOdlc', odlcData);
    socket.on('setRTL',()=>{
        console.log("rtl")
        pythonNamespace.emit('RTL')
    })
    socket.on('landUAV',()=>{
        pythonNamespace.emit('landUav')
    })
    socket.on("mission_goto",()=>{
        pythonNamespace.emit("goto_drone")
    })

    setInterval(() => {
        socket.emit('chart', chartData);
    }, 1000)

    setInterval(() => {
        socket.emit('mode', flag);
    }, 1000);
    socket.on('disconnect', () => {
        console.log('A React client disconnected');
    });
    // setInterval(()=>{
    //     const frame = wCap.read()
    //     const image = cv.imencode('.jpg',frame).toString('base64')
    //     socket.emit('image',image)
    // },1000)
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

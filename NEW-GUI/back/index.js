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
      "http://127.0.0.1:5173",
      "http://localhost:5173",
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
let counter = 1;
let flag = false;
// console.log(odlcData)
const chartData = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 }
]


const pythonNamespace = io.of('/python');
const roverNamespace = io.of('/rover');
const reactNamespace = io.of('/react');

// Python namespace
pythonNamespace.on('connection', (socket) => {
    console.log('A Python client connected_UAV');

    socket.on('telemetry', (data) => {
        counter = 0
        if (telemetryActive) {
            // console.log("Telemetry received:", data);
            reactNamespace.emit('telemetryServer', data);
            console.log(data)
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

// React namespace
reactNamespace.on('connection', (socket) => {
    console.log('A React client connected_ROVER');

    socket.on('startvideo',()=>{
        console.log("Video Started")
        pythonNamespace.emit('start_video')
    })
    socket.on('startvideo_rover',()=>{
        console.log("Video Started")
        roverNamespace.emit('start_video_rover')
    })

    socket.on('stopvideo',()=>{
        console.log("Video stoped")
        pythonNamespace.emit('stop_video')
    })
    socket.on('stopvideo_rover',()=>{
        console.log("Video stoped")
        roverNamespace.emit('stop_video_rover')
    })

    socket.on('start_Telem_rover',()=>{
        console.log("Telemetry start requested for ROVER");
        telemetryroverActive = true;
        console.log("Starting rover telemetry");
    })
    socket.on('stop_Telem_rover',()=>{
        console.log('Rover Telemetry stopped')
        telemetryroverActive= false
    })
    socket.on('stopRover',()=>{
        console.log('Emergency')
        roverNamespace.emit('emergency_stop')
    })
    socket.on('startTelem', () => {
        console.log("Telemetry start requested for UAV");
        telemetryActive = true;
        console.log("Starting UAV telemetry");
    });

    socket.on('stopTelem', () => {
        console.log("Telemetry UAV stopped");
        telemetryActive = false;
    });
    socket.on('downloadMission', () => {
        console.log("Download Command recived");
        pythonNamespace.emit('download_mission');
    });
    socket.on('downloadMission_rover', () => {
        console.log("Download Command recived");
        roverNamespace.emit('download_mission_rover');
    });
    socket.on('readMission', () => {
        console.log("read Mission command recieved");
        pythonNamespace.emit('readmission');
    });
    socket.on('readMission_rover', () => {
        console.log("read Mission command recieved");
        roverNamespace.emit('readmission_rover');
    });
    socket.on('uploadMission', () => {
        console.log("upload Mission command recieved");
        pythonNamespace.emit('upload_mission');
    });
    socket.on('uploadMission_rover', () => {
        console.log("upload Mission command recieved");
        roverNamespace.emit('upload_mission_rover');
    });
    socket.on('saveMission', () => {
        console.log("save Mission command recieved");
        pythonNamespace.emit('save_mission');
    });
    socket.on('saveMission_rover', () => {
        console.log("save Mission command recieved");
        roverNamespace.emit('save_mission_rover');
    });
    socket.on('circle', () => {
        console.log("Circle Mission command recieved");
        pythonNamespace.emit('circle');
    });
    
    socket.on('flyMission', () => {
        console.log("Fly Mission command recieved");
        pythonNamespace.emit('fly_mission');
    });

    socket.on('takeoffBackend', () => {
        console.log("Recieved takeoff command");
        pythonNamespace.emit('takeoff');
    });
    socket.on('armingBackend', () => {
        console.log("Recieved arming_UAV command");
        pythonNamespace.emit('arm_drone');
    });
    socket.on('armingBackend_rover', () => {
        console.log("Recieved arming_rover command");
        roverNamespace.emit('arm_rover');
    });
    socket.on('disarmingBackend', () => {
        console.log("Recieved disArming_UAV command");
        pythonNamespace.emit('disarm_drone');
    });
    socket.on('disarmingBackend_rover', () => {
        console.log("Recieved disArming_rover command");
        roverNamespace.emit('disarm_rover');
    });

    socket.on('set_gimbal_point', (data) => {
        console.log("Set the gimbal point to ", data)
        pythonNamespace.emit('gimbal_point', data)
    })
    socket.on('set_gimbal_point_rover', (data) => {
        console.log("Set the gimbal point to ", data)
        roverNamespace.emit('gimbal_point_rover', data)
    })
    socket.on('setRTL',()=>{
        console.log("rtl_UAV")
        pythonNamespace.emit('RTL')
    })
    socket.on('setRTL_rover',()=>{
        console.log("rtl_rover")
        roverNamespace.emit('RTL_rover')
    })
    socket.on('setSTOP_rover',()=>{
        console.log("stop_rover")
        roverNamespace.emit('STOP_rover')
    })
    socket.on('landUAV',()=>{
        pythonNamespace.emit('landUav')
    })
    socket.on("mission_goto",()=>{
        pythonNamespace.emit("goto_drone")
    })
    socket.on("mission_goto_rover",()=>{
        roverNamespace.emit("goto_rover")
    })
    socket.on("mission_auto_rover",()=>{
        roverNamespace.emit("auto_rover")
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

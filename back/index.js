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
      origin: "*",  // Allow all origins for testing
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
const roverNamespace2 = io.of('/rover2');
const roverNamespace3 = io.of('/rover3');
const reactNamespace = io.of('/react');

// Python namespace
pythonNamespace.on('connection', (socket) => {
    console.log('A Python client connected_UAV');

    socket.on('telemetry', (data) => {
        counter = 0
        if (telemetryActive) {
            console.log("Telemetry received:", data);
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
roverNamespace2.on('connection', (socket) => {
    console.log('A Python client 2 connected');

    socket.on("image_rover2",(payload)=>{
        reactNamespace.emit('video_image_rover2',payload)
    })
    socket.on('telemetry_rover2', (data) => {
        counter = 0

        // console.log("Telemetry received:", data);
        if(telemetryroverActive){
            reactNamespace.emit('telemetryServer_rover2', data);
        }
    })

    socket.on('disconnect_rover3', () => {
        console.log('A Python client 3 disconnected');
    });
});
roverNamespace3.on('connection', (socket) => {
    console.log('A Python client 3 connected');

    socket.on("image_rover3",(payload)=>{
        reactNamespace.emit('video_image_rover3',payload)
    })
    socket.on('telemetry_rover3', (data) => {
        counter = 0

        // console.log("Telemetry received:", data);
        if(telemetryroverActive){
            reactNamespace.emit('telemetryServer_rover3', data);
        }
    })

    socket.on('disconnect_rover3', () => {
        console.log('A Python client 3 disconnected');
    });
});


// React namespace
reactNamespace.on('connection', (socket) => {
    console.log('A React client connected_ROVER');

    socket.on('startvideo',()=>{
        console.log("Video Started")
        pythonNamespace.emit('start_video')
    })
    socket.on('startvideo_rover2',()=>{
        console.log("Video Started")
        roverNamespace2.emit('start_video_rover2')
    })
    socket.on('startvideo_rover3',()=>{
        console.log("Video Started")
        roverNamespace3.emit('start_video_rover3')
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
    socket.on('stopvideo_rover2',()=>{
        console.log("Video stoped")
        roverNamespace2.emit('stop_video_rover2')
    })
    socket.on('stopvideo_rover3',()=>{
        console.log("Video stoped")
        roverNamespace3.emit('stop_video_rover3')
    })

    socket.on('start_Telem_rover3',()=>{
        console.log("Telemetry start requested for ROVER");
        telemetryroverActive = true;
        console.log("Starting rover telemetry");
    })
    socket.on('start_Telem_rover2',()=>{
        console.log("Telemetry start requested for ROVER");
        telemetryroverActive = true;
        console.log("Starting rover telemetry");
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
    socket.on('stop_Telem_rover2',()=>{
        console.log('Rover Telemetry stopped')
        telemetryroverActive= false
    })
    socket.on('stop_Telem_rover3',()=>{
        console.log('Rover Telemetry stopped')
        telemetryroverActive= false
    })
    socket.on('stopRover',()=>{
        console.log('Emergency')
        roverNamespace.emit('emergency_stop')
    })
    socket.on('stopRover2',()=>{
        console.log('Emergency')
        roverNamespace2.emit('emergency_stop2')
    })
    socket.on('stopRover3',()=>{
        console.log('Emergency')
        roverNamespace3.emit('emergency_stop3')
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
    socket.on('downloadMission_rover2', () => {
        console.log("Download Command recived");
        roverNamespace2.emit('download_mission_rover2');
    });
    socket.on('downloadMission_rover3', () => {
        console.log("Download Command recived");
        roverNamespace3.emit('download_mission_rover3');
    });
    socket.on('readMission', () => {
        console.log("read Mission command recieved");
        pythonNamespace.emit('readmission');
    });
    socket.on('readMission_rover', () => {
        console.log("read Mission command recieved");
        roverNamespace.emit('readmission_rover');
    });
    socket.on('readMission_rover2', () => {
        console.log("read Mission command recieved");
        roverNamespace2.emit('readmission_rover2');
    });
    socket.on('readMission_rover3', () => {
        console.log("read Mission command recieved");
        roverNamespace3.emit('readmission_rover3');
    });
    socket.on('uploadMission', () => {
        console.log("upload Mission command recieved");
        pythonNamespace.emit('upload_mission');
    });
    socket.on('uploadMission_rover', () => {
        console.log("upload Mission command recieved");
        roverNamespace.emit('upload_mission_rover');
    });
    socket.on('uploadMission_rover2', () => {
        console.log("upload Mission command recieved");
        roverNamespace2.emit('upload_mission_rover2');
    });
    socket.on('uploadMission_rover3', () => {
        console.log("upload Mission command recieved");
        roverNamespace3.emit('upload_mission_rover3');
    });
    socket.on('saveMission', () => {
        console.log("save Mission command recieved");
        pythonNamespace.emit('save_mission');
    });
    socket.on('saveMission_rover', () => {
        console.log("save Mission command recieved");
        roverNamespace.emit('save_mission_rover');
    });
    socket.on('saveMission_rover2', () => {
        console.log("save Mission command recieved");
        roverNamespace2.emit('save_mission_rover2');
    });
    socket.on('saveMission_rover3', () => {
        console.log("save Mission command recieved");
        roverNamespace3.emit('save_mission_rover3');
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
    socket.on('armingBackend_rover2', () => {
        console.log("Recieved arming_rover command");
        roverNamespace2.emit('arm_rover2');
    });
    socket.on('armingBackend_rover3', () => {
        console.log("Recieved arming_rover command");
        roverNamespace3.emit('arm_rover3');
    });
    socket.on('disarmingBackend', () => {
        console.log("Recieved disArming_UAV command");
        pythonNamespace.emit('disarm_drone');
    });
    socket.on('disarmingBackend_rover', () => {
        console.log("Recieved disArming_rover command");
        roverNamespace.emit('disarm_rover');
    });
    socket.on('disarmingBackend_rover2', () => {
        console.log("Recieved disArming_rover command");
        roverNamespace2.emit('disarm_rover2');
    });
    socket.on('disarmingBackend_rover3', () => {
        console.log("Recieved disArming_rover command");
        roverNamespace3.emit('disarm_rover3');
    });

    socket.on('set_gimbal_point', (data) => {
        console.log("Set the gimbal point to ", data)
        pythonNamespace.emit('gimbal_point', data)
    })
    socket.on('set_gimbal_point_rover', (data) => {
        console.log("Set the gimbal point to ", data)
        roverNamespace.emit('gimbal_point_rover', data)
    })
    socket.on('set_gimbal_point_rover2', (data) => {
        console.log("Set the gimbal point to ", data)
        roverNamespace2.emit('gimbal_point_rover2', data)
    })
    socket.on('set_gimbal_point_rover3', (data) => {
        console.log("Set the gimbal point to ", data)
        roverNamespace3.emit('gimbal_point_rover3', data)
    })
    socket.on('setRTL',()=>{
        console.log("rtl_UAV")
        pythonNamespace.emit('RTL')
    })
    socket.on('setRTL_rover',()=>{
        console.log("rtl_rover")
        roverNamespace.emit('RTL_rover')
    })
    socket.on('setRTL_rover2',()=>{
        console.log("rtl_rover")
        roverNamespace2.emit('RTL_rover2')
    })
    socket.on('setRTL_rover3',()=>{
        console.log("rtl_rover")
        roverNamespace3.emit('RTL_rover3')
    })
    socket.on('setSTOP_rover',()=>{
        console.log("stop_rover")
        roverNamespace.emit('STOP_rover')
    })
    socket.on('setSTOP_rover2',()=>{
        console.log("stop_rover")
        roverNamespace2.emit('STOP_rover2')
    })
    socket.on('setSTOP_rover3',()=>{
        console.log("stop_rover")
        roverNamespace3.emit('STOP_rover3')
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
    socket.on("mission_goto_rover2",()=>{
        roverNamespace2.emit("goto_rover2")
    })
    socket.on("mission_auto_rover3",()=>{
        roverNamespace3.emit("auto_rover3")
    })
    socket.on("mission_goto_rover3",()=>{
        roverNamespace3.emit("goto_rover3")
    })
    socket.on("mission_auto_rover2",()=>{
        roverNamespace2.emit("auto_rover2")
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

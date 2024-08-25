const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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
let telemetryActive = true;
let telemetryroverActive = true;
let counter = 1;
let flag = false;

const chartData = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 }
];

const pythonNamespace = io.of('/python');
const roverNamespace = io.of('/rover');
const roverNamespace2 = io.of('/rover2');
const roverNamespace3 = io.of('/rover3');
const dataNamespace = io.of('/data');

const reactNamespace = io.of('/react');

// Python namespace
pythonNamespace.on('connection', (socket) => {
    console.log('A Python client connected_UAV');

    socket.on('telemetry', (data) => {
        counter = 0;
        if (telemetryActive) {
            reactNamespace.emit('telemetryServer', data);
        }
    });

    socket.on("image", (payload) => {
        reactNamespace.emit('video_image', payload);
    });

    socket.on('disconnect', () => {
        console.log('A Python client disconnected');
    });
});

// Rover namespace handlers
const handleRoverConnection = (namespace, roverId) => {
    namespace.on('connection', (socket) => {
        console.log(`A Python client ${roverId} connected`);

        socket.on(`image_${roverId}`, (payload) => {
            reactNamespace.emit(`video_image_${roverId}`, payload);
        });

        socket.on(`telemetry_${roverId}`, (data) => {
            counter = 0;
            if (telemetryroverActive) {
                reactNamespace.emit(`telemetryServer_${roverId}`, data);
            }
        });

        socket.on('disconnect', () => {
            console.log(`A Python client ${roverId} disconnected`);
        });
    });
};

// Initialize rover namespaces
handleRoverConnection(roverNamespace, 'rover');
handleRoverConnection(roverNamespace2, 'rover2');
handleRoverConnection(roverNamespace3, 'rover3');

// Data namespace
dataNamespace.on('connection', (socket) => {
    console.log('A Data client connected');

    socket.on('data', (data) => {
        reactNamespace.emit('data', data);
    });

    socket.on('disconnect', () => {
        console.log('A Data client disconnected');
    });
});

// React namespace
reactNamespace.on('connection', (socket) => {
    console.log('A React client connected_ROVER');

    const emitEventToNamespace = (event, namespace, payload) => {
        console.log(`${event} event received`);
        namespace.emit(event, payload);
    };

    socket.on('start_Telem_rover', () => {
        console.log("Telemetry start requested for ROVER");
        telemetryroverActive = true;
    });
    socket.on('start_Telem_rover2', () => {
        console.log("Telemetry start requested for ROVER 2");
        telemetryroverActive = true;
    });
    socket.on('start_Telem_rover3', () => {
        console.log("Telemetry start requested for ROVER 3");
        telemetryroverActive = true;
    });
    socket.on('stop_Telem_rover', () => {
        console.log('Rover Telemetry stopped');
        telemetryroverActive = false;
    });
    socket.on('stop_Telem_rover2', () => {
        console.log('Rover 2 Telemetry stopped');
        telemetryroverActive = false;
    });
    socket.on('stop_Telem_rover3', () => {
        console.log('Rover 3 Telemetry stopped');
        telemetryroverActive = false;
    });

    socket.on('stopRover', () => roverNamespace.emit('emergency_stop'));
    socket.on('stopRover2', () => roverNamespace2.emit('emergency_stop2'));
    socket.on('stopRover3', () => roverNamespace3.emit('emergency_stop3'));

    socket.on('startTelem', () => {
        console.log("Telemetry start requested for UAV");
        telemetryActive = true;
    });

    socket.on('stopTelem', () => {
        console.log("Telemetry UAV stopped");
        telemetryActive = false;
    });

    socket.on('downloadMission', () => emitEventToNamespace('download_mission', pythonNamespace));
    socket.on('downloadMission_rover', () => emitEventToNamespace('download_mission_rover', roverNamespace));
    socket.on('downloadMission_rover2', () => emitEventToNamespace('download_mission_rover2', roverNamespace2));
    socket.on('downloadMission_rover3', () => emitEventToNamespace('download_mission_rover3', roverNamespace3));

    socket.on('readMission', () => emitEventToNamespace('readmission', pythonNamespace));
    socket.on('readMission_rover', () => emitEventToNamespace('readmission_rover', roverNamespace));
    socket.on('readMission_rover2', () => emitEventToNamespace('readmission_rover2', roverNamespace2));
    socket.on('readMission_rover3', () => emitEventToNamespace('readmission_rover3', roverNamespace3));

    socket.on('uploadMission', () => emitEventToNamespace('upload_mission', pythonNamespace));
    socket.on('uploadMission_rover', () => emitEventToNamespace('upload_mission_rover', roverNamespace));
    socket.on('uploadMission_rover2', () => emitEventToNamespace('upload_mission_rover2', roverNamespace2));
    socket.on('uploadMission_rover3', () => emitEventToNamespace('upload_mission_rover3', roverNamespace3));

    socket.on('saveMission', () => emitEventToNamespace('save_mission', pythonNamespace));
    socket.on('saveMission_rover', () => emitEventToNamespace('save_mission_rover', roverNamespace));
    socket.on('saveMission_rover2', () => emitEventToNamespace('save_mission_rover2', roverNamespace2));
    socket.on('saveMission_rover3', () => emitEventToNamespace('save_mission_rover3', roverNamespace3));

    socket.on('flyMission', () => pythonNamespace.emit('fly_mission'));

    socket.on('takeoffBackend', () => pythonNamespace.emit('takeoff'));

    socket.on('armingBackend', () => pythonNamespace.emit('arm_drone'));
    socket.on('armingBackend_rover', () => roverNamespace.emit('arm_rover'));
    socket.on('armingBackend_rover2', () => roverNamespace2.emit('arm_rover2'));
    socket.on('armingBackend_rover3', () => roverNamespace3.emit('arm_rover3'));

    socket.on('disarmingBackend', () => pythonNamespace.emit('disarm_drone'));
    socket.on('disarmingBackend_rover', () => roverNamespace.emit('disarm_rover'));
    socket.on('disarmingBackend_rover2', () => roverNamespace2.emit('disarm_rover2'));
    socket.on('disarmingBackend_rover3', () => roverNamespace3.emit('disarm_rover3'));

    socket.on('write_mission', (data) => pythonNamespace.emit('write_mission', data));
    socket.on('write_mission_rover', (data) => roverNamespace.emit('write_mission', data));
    socket.on('write_mission_rover2', (data) => roverNamespace2.emit('write_mission', data));
    socket.on('write_mission_rover3', (data) => roverNamespace3.emit('write_mission', data));

    socket.on('setRTL', () => pythonNamespace.emit('RTL'));
    socket.on('setRTL_rover', () => roverNamespace.emit('RTL_rover'));
    socket.on('setRTL_rover2', () => roverNamespace2.emit('RTL_rover2'));
    socket.on('setRTL_rover3', () => roverNamespace3.emit('RTL_rover3'));

    socket.on('setSTOP_rover', () => roverNamespace.emit('STOP_rover'));
    socket.on('setSTOP_rover2', () => roverNamespace2.emit('STOP_rover2'));
    socket.on('setSTOP_rover3', () => roverNamespace3.emit('STOP_rover3'));

    socket.on('landUAV', () => pythonNamespace.emit('landUav'));

    socket.on("mission_goto", () => pythonNamespace.emit("goto_drone"));
    socket.on("mission_auto", () => pythonNamespace.emit("auto_mission"));
    socket.on("mission_goto_rover", () => roverNamespace.emit("goto_rover"));
    socket.on("mission_auto_rover", () => roverNamespace.emit("auto_rover"));
    socket.on("mission_goto_rover2", () => roverNamespace2.emit("goto_rover2"));
    socket.on("mission_auto_rover2", () => roverNamespace2.emit("auto_rover2"));
    socket.on("mission_goto_rover3", () => roverNamespace3.emit("goto_rover3"));
    socket.on("mission_auto_rover3", () => roverNamespace3.emit("auto_rover3"));

    setInterval(() => {
        socket.emit('chart', chartData);
    }, 1000);

    setInterval(() => {
        socket.emit('mode', flag);
    }, 1000);

    socket.on('disconnect', () => {
        console.log('A React client disconnected');
    });
});

setInterval(() => {
    if (counter > 5) {
        flag = false;
    } else if (counter == 0) {
        flag = true;
    }
    counter++;
}, 2000);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

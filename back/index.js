const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    maxHttpBufferSize: 1e8,
    pingTimeout: 60000,
    pingInterval: 500,
    cors: {
        origin: "*",  // Allow all origins for testing
        methods: ["GET", "POST"],
    }
});

// Variables 
let telemetryActive = false;
let telemetryRoverActive = false;
let counter = 1;
let flag = false;

const chartData = [
    { name: 1, x: Math.random() * 10, y: Math.random() * 10 },
    { name: 2, x: Math.random() * 10, y: Math.random() * 10 }
];

// Namespaces
const pythonNamespace = io.of('/python');
const roverNamespace = io.of('/rover');
const roverNamespace2 = io.of('/rover2');
const roverNamespace3 = io.of('/rover3');
const reactNamespace = io.of('/react');
const dataRover1 = io.of('/datarover1');
const dataRover2 = io.of('/datarover2');
const dataRover3 = io.of('/datarover3');
const dataNamespace = io.of('/data');

// Python namespace
pythonNamespace.on('connection', (socket) => {
    console.log('A Python client connected (UAV)');

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
        console.log('A Python client disconnected (UAV)');
    });
});

// Rover namespace handler
const handleRoverNamespace = (namespace, name, telemetryEvent) => {
    namespace.on('connection', (socket) => {
        console.log(`A Python client connected (${name})`);

        socket.on(`image_${name.toLowerCase()}`, (payload) => {
            reactNamespace.emit(`video_image_${name.toLowerCase()}`, payload);
        });

        socket.on(telemetryEvent, (data) => {
            counter = 0;
            if (telemetryRoverActive) {
                reactNamespace.emit(`telemetryServer_${name.toLowerCase()}`, data);
            }
        });

        socket.on('disconnect', () => {
            console.log(`A Python client disconnected (${name})`);
        });
    });
};

// Initialize rover namespaces
handleRoverNamespace(roverNamespace, 'Rover', 'telemetry_rover');
handleRoverNamespace(roverNamespace2, 'Rover2', 'telemetry_rover2');
handleRoverNamespace(roverNamespace3, 'Rover3', 'telemetry_rover3');

// Data Rover namespaces
const handleDataRoverNamespace = (namespace, name) => {
    namespace.on('connection', (socket) => {
        console.log(`${name} connected`);
        socket.on(`data${name[name.length - 1]}`, (data) => {
            dataNamespace.emit(`${name}`, data);
        });
        socket.on('disconnect', () => {
            console.log(`${name} disconnected`);
        });
    });
};

handleDataRoverNamespace(dataRover1, 'Data Rover 1');
handleDataRoverNamespace(dataRover2, 'Data Rover 2');
handleDataRoverNamespace(dataRover3, 'Data Rover 3');

// Data namespace
dataNamespace.on('connection', (socket) => {
    console.log('A Data client connected');

    ['dataRover1', 'dataRover2', 'dataRover3'].forEach((event) => {
        socket.on(event, (data) => {
            console.log(`Data received for ${event.replace('data', 'Rover ')}:`, data);
        });
    });

    socket.on('disconnect', () => {
        console.log('A Data client disconnected');
    });
});

// React namespace
reactNamespace.on('connection', (socket) => {
    console.log('A React client connected');

    // Video control
    ['startvideo', 'startvideo_rover', 'startvideo_rover2', 'startvideo_rover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`Video started (${event})`);
            const namespace = event.split('_').pop();
            const targetNamespace = namespace === 'video' ? pythonNamespace : io.of(`/${namespace}`);
            targetNamespace.emit(`start_video_${namespace}`);
        });
    });

    ['stopvideo', 'stopvideo_rover', 'stopvideo_rover2', 'stopvideo_rover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`Video stopped (${event})`);
            const namespace = event.split('_').pop();
            const targetNamespace = namespace === 'video' ? pythonNamespace : io.of(`/${namespace}`);
            targetNamespace.emit(`stop_video_${namespace}`);
        });
    });

    // Telemetry control
    ['start_Telem_rover', 'start_Telem_rover2', 'start_Telem_rover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`Telemetry start requested (${event})`);
            telemetryRoverActive = true;
        });
    });

    ['stop_Telem_rover', 'stop_Telem_rover2', 'stop_Telem_rover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`Telemetry stopped (${event})`);
            telemetryRoverActive = false;
        });
    });

    // Emergency stop
    ['stopRover', 'stopRover2', 'stopRover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`Emergency stop (${event})`);
            const namespace = event.replace('stopRover', 'rover');
            io.of(`/${namespace}`).emit('emergency_stop');
        });
    });

    socket.on('startTelem', () => {
        console.log("Telemetry start requested for UAV");
        telemetryActive = true;
    });

    socket.on('stopTelem', () => {
        console.log("Telemetry UAV stopped");
        telemetryActive = false;
    });

    // Mission control
    const missionEvents = [
        { event: 'downloadMission', namespace: pythonNamespace },
        { event: 'readMission', namespace: pythonNamespace },
        { event: 'uploadMission', namespace: pythonNamespace },
        { event: 'saveMission', namespace: pythonNamespace },
        { event: 'circle', namespace: pythonNamespace },
        { event: 'flyMission', namespace: pythonNamespace },
        { event: 'takeoffBackend', namespace: pythonNamespace },
        { event: 'armingBackend', namespace: pythonNamespace },
        { event: 'disarmingBackend', namespace: pythonNamespace },
        { event: 'set_gimbal_point', namespace: pythonNamespace },
        { event: 'setRTL', namespace: pythonNamespace },
        { event: 'landUAV', namespace: pythonNamespace },
        { event: 'mission_goto', namespace: pythonNamespace },
    ];

    missionEvents.forEach(({ event, namespace }) => {
        socket.on(event, (data) => {
            console.log(`${event} command received`, data ? `with data: ${JSON.stringify(data)}` : '');
            namespace.emit(event, data);
        });
    });

    // Gimbal and stop commands for rovers
    ['set_gimbal_point_rover', 'set_gimbal_point_rover2', 'set_gimbal_point_rover3'].forEach((event) => {
        socket.on(event, (data) => {
            console.log(`Set gimbal point (${event}) to`, data);
            io.of(`/${event.split('_')[2]}`).emit('gimbal_point', data);
        });
    });

    ['setRTL_rover', 'setRTL_rover2', 'setRTL_rover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`RTL command (${event})`);
            io.of(`/${event.split('_')[1]}`).emit('RTL');
        });
    });

    ['setSTOP_rover', 'setSTOP_rover2', 'setSTOP_rover3'].forEach((event) => {
        socket.on(event, () => {
            console.log(`Stop command (${event})`);
            io.of(`/${event.split('_')[1]}`).emit('STOP');
        });
    });

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
    flag = counter <= 5;
    counter++;
}, 2000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

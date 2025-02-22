const express = require("express");
const https = require("https"); // Use https instead of http
const socketIo = require("socket.io");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const defaultParams = {
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
  pingInterval: 500,
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
  },
};

const app = express();

// SSL certificate options
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "server.cert")),
};

// Create an HTTPS server
const server = https.createServer(sslOptions, app);

const io = socketIo(server, { ...defaultParams, cors: defaultParams.cors });

// Variables
let counter = 1;

const UAVNamespace = io.of("/UAV");
const ReactNamespace = io.of("/React");

// Python namespace
UAVNamespace.on("connection", (socket) => {
  console.log("A Python client connected_UAV");

  let telemetryTimeout;

  const resetTimeout = () => {
    if (telemetryTimeout) {
      clearTimeout(telemetryTimeout);
    }

    telemetryTimeout = setTimeout(() => {
      ReactNamespace.emit("telemetryServer", []);
      console.log("No data received for 10 seconds, sending empty list.");
    }, 10000);
  };

  socket.on("Telem", (data) => {
    counter = 1; // Reset counter (if needed)
    ReactNamespace.emit("telemetryServer", data);
    console.log(data);
    resetTimeout(); // Reset timeout when telemetry data is received
  });

  socket.on("disconnect", () => {
    if (telemetryTimeout) {
      clearTimeout(telemetryTimeout);
    }
    console.log("A Python client disconnected");
  });
});

// React namespace
ReactNamespace.on("connection", (socket) => {
  console.log("A React client connected_ROVER");

  socket.on("disconnect", () => {
    console.log("A React client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // Allow access from any IP address

server.listen(PORT, HOST, () => {
  console.log(`Server is running on https://${HOST}:${PORT}`);
});

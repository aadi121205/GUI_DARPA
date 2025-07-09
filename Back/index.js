const express = require("express");
const https = require("https"); // Use HTTPS instead of HTTP
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

// SSL certificate options with error handling
let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(path.join(__dirname, "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "server.cert")),
  };
} catch (error) {
  console.error("Error loading SSL certificates:", error.message);
  process.exit(1); // Exit if SSL files are missing
}

// Create an HTTPS server
const server = https.createServer(sslOptions, app);

const io = socketIo(server, defaultParams);

// Variables
let counter = 1;

const UAVNamespace = io.of("/UAV");
const DataNamespace = io.of("/Data");
const ReactNamespace = io.of("/react");

// Python namespace
UAVNamespace.on("connection", (socket) => {
  console.log("A Python client connected to UAV Namespace");

  socket.on("Telem", (data) => {
    counter = 1; // Reset counter (if needed)
    ReactNamespace.emit("TelemFowarding", data);
    console.log("Telem data received:", data);
  });

  socket.on("disconnect", () => {
    console.log("A Python client disconnected from UAV Namespace");
  });
});

// Data namespace
DataNamespace.on("connection", (socket) => {
  console.log("A Python client connected to Data Namespace");

  socket.on("Data", (data) => {
    counter = 1; // Reset counter (if needed)
    ReactNamespace.emit("DataFowarding", data);
  });

  socket.on("disconnect", () => {
    console.log("A Python client disconnected from Data Namespace");
  });
});

// React namespace
ReactNamespace.on("connection", (socket) => {
  console.log("A React client connected to React Namespace");
  socket.on("disconnect", () => {
    console.log("A React client disconnected from React Namespace");
  });

  // Handle any additional events for React clients here
  const emitEventToNamespace = (event, namespace, payload) => {
    console.log(`${event} event received`);
    namespace.emit(event, payload);
  };

  // Socket Control For UAV
  socket.on("arm", () => {
    emitEventToNamespace("arm", UAVNamespace);
  });
  socket.on("rtl", () => {
    emitEventToNamespace("RTL", UAVNamespace);
  });
  socket.on("takeoff", () => {
    emitEventToNamespace("Takeoff", UAVNamespace);
  });
  socket.on("fly_mission", () => {
    emitEventToNamespace("fly_mission", UAVNamespace);
  });

});

const PORT = process.env.PORT || 7000;
const HOST = "0.0.0.0"; // Allow access from any IP address

server.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on https://${HOST}:${PORT}`);
});

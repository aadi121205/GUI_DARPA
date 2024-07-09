// client.js

const io = require('socket.io-client');
const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose.connect("mongodb+srv://arjun222gupta:9990777143@cluster0.fc6knul.mongodb.net/suas");

const tutschema = new mongoose.Schema(
{
  Shape:String,
  Shape_Color: String,
  Alphanumeric: String,
  Alphanumeric_Color: String,
  Orientation: String,
  Latitude: Number,
  Longitude: Number,
  Type: String
});

const UserModel = mongoose.model('users', tutschema);

const socket = io('http://localhost:3000'); // Change the URL to match your server's URL

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('request-json');
});

socket.on('json-data', (data) => {
  console.log('Received JSON data:', data);

  UserModel.insertMany(data)
    .then(function (users) {
      console.log('Data added to the database:', users);
      // Optionally, emit an event to notify clients or perform any additional actions
    })
    .catch(function (err) {
      console.log('Error adding sample data to the database:', err);
      // Optionally, handle the error or emit an error event
    });
});
  // Handle the JSON data as needed


app.get("/getUsers", (req, res) => {
    UserModel.find({})
        .then(function (users) {
            res.json(users);
        })
        .catch(function (err) {
            console.log(err);
            res.status(500).send("Error fetching users from database");
        });
});


app.listen(3001, () => {
    console.log("Server running on port 3001");
});
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

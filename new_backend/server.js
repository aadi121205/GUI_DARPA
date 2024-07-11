
const fs = require('fs');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
id_map_ugv={};

function pathPlan(data){
  return [{device_id:'ugv_1',data:{'lat_long':[data['lat_long'].slice(0,2)],'map':data['map']}},{device_id:'ugv_2',data:{'lat_long':[data['lat_long'].slice(2,4)],'map':data['map']}},{device_id:'ugv_3',data:{'lat_long':[data['lat_long'].slice(4,6)],'map':data['map']}},{device_id:'ugv_4',data:{'lat_long':[data['lat_long'].slice(4,6)],'map':data['map']}}]

}

function generateGlobalJSON(casualty_data) {
  let ctr = 0;
  let GlobalJSON = [];

  for (let i of casualty_data){
    let json_data = 
        {
            "CasualtyID": ctr,
            "LatLong": i,
            "Data": {
                "severe_hemorrhage": 0,
                "respiratory_distress": 0,
                "hr": {
                    "value": 0,
                    "time": "00:00:00"
                },
                "rr": {
                    "value": 0,
                    "time": "00:00:00"
                },
                "alertness_motor": 0,
                "alertness_verbal": 0,
                "alertness_ocular": 0,
                "trauma_head": 0,
                "trauma_torso": 0,
                "trauma_lower_ext": 0,
                "trauma_upper_ext": 0
            }
        };
    GlobalJSON.push(json_data);
    ctr+=1;
  };

  fs.writeFileSync(`GlobalJSON.json`, JSON.stringify(GlobalJSON, null, 2));
  return JSON.stringify(GlobalJSON, null, 2);
}


io.on('connection', (socket) => {
  // console.log(socket.id)
  
  socket.on('custom_id',(id)=>{
    console.log(id);
    id_map_ugv[socket.id]=id
    console.log(`${id_map_ugv[socket.id]} connected`);
  })
  socket.on('map_nd_casualities',(data)=>{
    console.log(`recieved map and casualities from ${id_map_ugv[socket.id]}`)
    
    let generatedJSON = generateGlobalJSON(data["lat_long"]);
    console.log(generatedJSON)

    io.emit('schedule',pathPlan(data))
    console.log('emitted the schedule')
  })
  
  socket.on('frames',(img)=>{
    const base64Data = img.replace(/^data:image\/png;base64,/, ""); // Adjust the regex if your image is not in PNG format
  
  // Define the file path where you want to save the image
  const filePath = 'image.jpg'; // You can change the file name and path as needed

  // Write the binary data to a file
  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error saving image:', err);
    } else {
      console.log('Image saved successfully to', filePath);
    }
  });


  })
  socket.on('inferance',(data)=>{
    console.log(data)
  })


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`${id_map_ugv[socket.id]} disconnected`);
  });
});

// Start the server
server.listen(8000, () => {
  console.log('listening on *:8000');
});

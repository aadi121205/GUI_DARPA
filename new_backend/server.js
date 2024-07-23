
const fs = require('fs');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{
  origin:'*',
  methods:['GET','POST']}
});

app.use(cors({
  origin: '*'
}));
id_map_ugv={};
count_data={'ugv_1':0,'ugv_2':0,'ugv_3':0,'ugv_4':0,'uav':0}
function pathPlan(data){
  setInterval(()=>{
    fs.writeFileSync(`GlobalJSON.json`, JSON.stringify(GlobalJSON, null, 2));
  },3000)
  return [{device_id:'ugv_1',data:{'lat_long':[data['lat_long'].slice(0,2)],'map':data['map']}},{device_id:'ugv_2',data:{'lat_long':[data['lat_long'].slice(2,4)],'map':data['map']}},{device_id:'ugv_3',data:{'lat_long':[data['lat_long'].slice(4,6)],'map':data['map']}},{device_id:'ugv_4',data:{'lat_long':[data['lat_long'].slice(4,6)],'map':data['map']}}]
  
}

var GlobalJSON = [];
function generateGlobalJSON(casualty_data) {
  let ctr = 0;

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
  return GlobalJSON;
}


io.on('connection', (socket) => {
  console.log(socket.id)
  
  socket.on('custom_id',(id)=>{
    console.log(id);
    id_map_ugv[socket.id]=id
    console.log(`${id_map_ugv[socket.id]} connected`);
  })
  socket.on('map_nd_casualities',(data)=>{
    console.log(`recieved map and casualities from ${id_map_ugv[socket.id]}`)
    io.emit('map_nd_casualities',data)

    let generatedJSON = generateGlobalJSON(data["lat_long"]);
    // console.log(generatedJSON)
    io.emit('global_dict',generatedJSON)

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
    // let data=fs.readFileSync('GlobalJSON.json','utf-8')
    // let jsonData = JSON.parse(data);
    io.emit('inference',data)

    for(let casuality of GlobalJSON){
      // console.log(casuality);
      // console.log(JSON.stringify(data['lat_long'])==JSON.stringify(casuality['LatLong']));
      if(JSON.stringify(data['lat_long'])==JSON.stringify(casuality['LatLong'])){
        casuality['Data'][data['data']['type']]=('time' in data['data'])?{'time':data['data']['time'],'value':data['data']['value']}:data['data']['value'];
        console.log(`updated global database, recieved data from ${data['UXV_id']}`);
        count_data[data['UXV_id']]+=1;
        console.log(count_data)

      }
    }

    // console.log(data)
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

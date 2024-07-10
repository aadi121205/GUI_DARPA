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
io.on('connection', (socket) => {
  // console.log(socket.id)
  
  socket.on('custom_id',(id)=>{
    console.log(id);
    id_map_ugv[socket.id]=id
    console.log(`${id_map_ugv[socket.id]} connected`);
  })
  socket.on('map_nd_casualities',(data)=>{
    console.log(`recieved map and casualities from ${id_map_ugv[socket.id]}`)
    io.emit('schedule',pathPlan(data))
    console.log('emitted the schedule')
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

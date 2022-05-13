const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
 
});

let x = 250;
let y = 250;

users = {};
class Player{
  constructor(id,x,y,it=false){
    this.x = x;
    this.y = y;
    this.id = id;
    this.it = it;
  }
}
//each users has an id and position

let first_connection = true;
io.on('connection', (socket) => {
  if(first_connection == true){
    users[socket.id] = new Player(socket.id,250,250,true);
  }else{
    users[socket.id] = new Player(socket.id,250,250,false);
  }
  first_connection = false;
  //-------------------------------------------------------
  socket.on('direction', (msg) => {
    switch(msg){
      case "u":
        users[socket.id].y -= 10;
        break;
      case "d":
        users[socket.id].y += 10;
        break;
      case "l":
        users[socket.id].x -= 10;
        break;
      case "r":
        users[socket.id].x += 10;
        break;
    }
    socket.emit('event_b',users);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

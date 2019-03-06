var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require ('socket.io')(http);

const PORT = process.env.PORT || 8080; 
const HOST = process.env.host || '0.0.0.0';

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./index.html"));
});

io.on('connection', (socket) => {
  console.log("a user connected");
  socket.on('disconnect', () => {
    console.log("User disconnected");
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});


http.listen(PORT, function () {
	console.log("server running on https://"+HOST+":"+PORT+"/");
});
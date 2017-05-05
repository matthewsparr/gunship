//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
// var http = require('http');
// var path = require('path');

// var async = require('async');
// var socketio = require('socket.io');
// var express = require('express');

// //
// // ## SimpleServer `SimpleServer(obj)`
// //
// // Creates a new instance of SimpleServer with the following options:
// //  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
// //
// var router = express();
// var server = http.createServer(router);
// var io = socketio.listen(server);

// router.use(express.static(path.resolve(__dirname, 'client')));
// var messages = [];
// var sockets = [];

// io.on('connection', function (socket) {
//     messages.forEach(function (data) {
//       socket.emit('message', data);
//     });

//     sockets.push(socket);

//     socket.on('disconnect', function () {
//       sockets.splice(sockets.indexOf(socket), 1);
//       updateRoster();
//     });

//     socket.on('message', function (msg) {
//       var text = String(msg || '');

//       if (!text)
//         return;

//       socket.get('name', function (err, name) {
//         var data = {
//           name: name,
//           text: text
//         };

//         broadcast('message', data);
//         messages.push(data);
//       });
//     });

//     socket.on('identify', function (name) {
//       socket.set('name', String(name || 'Anonymous'), function (err) {
//         updateRoster();
//       });
//     });
//   });

// function updateRoster() {
//   async.map(
//     sockets,
//     function (socket, callback) {
//       socket.get('name', callback);
//     },
//     function (err, names) {
//       broadcast('roster', names);
//     }
//   );
// }

// function broadcast(event, data) {
//   sockets.forEach(function (socket) {
//     socket.emit(event, data);
//   });
// }

// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Chat server listening at", addr.address + ":" + addr.port);
// });

// var express = require('express');
// var app = express.createServer();

// var http = require('http'),
//     fs = require('fs');


// fs.readFile('./client/index.html', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8000);
// });


// // app.use(express.static(__dirname + '/client'));


// app.get('/keys', function (req, res) {
// res.sendFile('keys.html');
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname+'/keys.html'))
// });

// app.get('/keys', function (req, res) {
//   res.sendFile(path.join(__dirname+'/keys.html'))
// });

// app.listen(3000);

// var app = require("express")()
// var path  = require("path");
// var http = require('http');

// var router = app.express();
// var server = http.createServer(router);


// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });

// app.get('/keys',function(req,res){
//   res.sendFile(path.join(__dirname+'/keys.html'));
// });

// app.listen(3000);

// var express = require('express'),
//   app = express(),
//   http = require('http'),
//   httpServer = http.Server(app);

// app.use(express.static(__dirname + '/client'));

// app.get('/', function(req, res) {
//   res.sendfile(__dirname + '/client/index.html');
// });
// app.listen(3000);

// var http=require('http');
// var url=require('url');

// var server=http.createServer(function(req,res){
//     var pathname=url.parse(req.url).pathname;
//     switch(pathname){
//         case '/subpage':
//             res.end('subpage');
//         break;
//         default:
//             res.end('default');
//         break;
//     }

// }).listen(8080);


var express = require("express");
var http = require("https");
var app = express();
var path  = require("path");


app.use(express.static(path.join(__dirname, '../client')));
app.use("/", express.static(__dirname));
app.use('/', express.static(__dirname + '/client'));
app.use(express.static(path.resolve(__dirname, 'client')));

console.log("so dirname is  " + __dirname);
console.log(". = " + path.resolve("."));
console.log("__dirname =  " + path.resolve(__dirname));


app.get("/", function(request, response) {
  response.sendFile('index.html');
});

app.get("/keys", function(request, response) {
  response.sendFile(path.join(__dirname+'/client/keys.html'));
});

app.get("*", function(request, response) {
  response.end("404!");
});

http.createServer(app).listen(process.env.PORT || 8080);

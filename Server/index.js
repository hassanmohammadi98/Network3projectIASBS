
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname + '/../assets')))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

//generate vaild ID
var id=0;
app.get('/getId', function(req, res) {
    id++;
    var d={
        "id":id
    }
    console.log(id);
    res.send(d)
});


app.listen(8080);

var server = require('ws').Server;
var wss = new server({ port: 5001 });
// creating server on port 5001 localhost 

var messages=[]
wss.on('connection', function (ws) {
    for(var i=0;i<messages.length;i++){
        console.log(messages[i]);
        ws.send(messages[i]);
    }
    //console.log(ws);
    //on message event 
    ws.on('message', (data) => {
        messages.push(data);
        console.log(messages);
        console.log(data);
        // var jsonObject = JSON.parse(data);
        // var username = jsonObject.name;
        // var message = jsonObject.message;
        //broadcast data to all clients 
        wss.clients.forEach(function e(client) {
            client.send(data);
        })
    });

    ws.on('close', function () {
        console.log('Connection terminated..Closing Client');
    });
})
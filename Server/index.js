
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname + '/../assets')))

var messages=[];
var clients={};
var id=0;
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});

//generate vaild ID for each client
app.get('/getId', function(req, res) {
    id++;
    var d={
        "id":id
    }
    console.log(id);
    res.send(d)
});

//get all client live connection
app.get('/getusers',function(req, res){
     res.send(clients);
})
app.listen(8080);

var server = require('ws').Server;
var wss = new server({ port: 5001 });
// creating server on port 5001 localhost 



wss.on('connection', function (ws) {
    for(var i=0;i<messages.length;i++){
        console.log(messages[i]);
        ws.send(messages[i]);
    }
    //console.log(ws);
    //on message event 
    ws.on('message', (data) => {
        var msg=JSON.parse(data);
        //for call one client event by other clinet(poke in facebook)
        if(msg["to"]){
            if(clients[msg["to"]]){
                var newMsg = {
                    name:msg["from"] ,
                    message:msg["to"]
                }
                clients[msg["to"]].send(JSON.stringify(newMsg))
            }   
         }
         //for adding client to the clients list for poke
         else if(msg["id"]){
           clients[msg["id"]]=ws;
           console.log(msg);
        }
        //for normal messages
        else
        {
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
        }
    });

    ws.on('close', function () {
        console.log('Connection terminated..Closing Client');
    });
})
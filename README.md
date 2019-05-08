# webChat-collection

Chat with web-socket ('ws') module on nodejs server, 
it just for showing how web-sockets work


## How to start project
step 1 : you should install node.js
step 2 : download application from repository (https://github.com/hassanmohammadi98/Network3projectIASBS)
step 3 : you can run application with node or with nodemon with command "nodemon Server/index.js" (for rn with nodemon you should install nodemon by npm)
step 4 : open some browser and go to http://localhost:8080
now you can chat :)

## Chat with some computer
For chat with some computer you should make a hotspot network and join it and leave server host ip address the instead of local host in browser and assets/main.js and run it.

## To Send mesage to specifice client
For send mesage to specifice client you should go in server console and fetch client id that you are going to send mesage and go to your browser and follow this steps:
step 1:right click in your chat page and choose inspect
step 2:go in console tab
step 3:write var ws=new WebSocket('ws://localhost:5001) and enter
step 4:write ws.send(JSON.stringify({"to": Destination id ,"from" : your id})) and enter
your message sent to specifice client :)

## topology
We use star topology in this project.

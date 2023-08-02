const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server,{
    cors: 'http://localhost:5173'
});
const rooms={};
const users={};

io.on("connection",(socket)=>{
    console.log('connected'+socket.id);
    socket.on('disconnect',()=>{
    Object.keys(rooms).map((roomId)=>{
        rooms[roomId].users = rooms[roomId].users.filter((user)=>user!==socket.id);
    });
    delete users[socket.id];
    })
    socket.on("join",(params)=>{
        const roomId= params.roomId;
        users[socket.id]={
            roomId : roomId
        }
        if(!rooms[roomId]){
            rooms[roomId]={
                roomId,
                users:[]
            }
        }
        rooms[roomId].users.push(socket.id);
    });
    socket.on("localDescription",(params)=>{
        const roomId = users[socket.id].roomId;
        const allUsers = rooms[roomId].users;
        allUsers.forEach(user => {
           if(user!==socket.id)
           {
            io.to(user).emit("localDescription",{
                description : params.description
            });
           } 
        });
    })
    socket.on("remoteDescription",(params)=>{
        const roomId = users[socket.id].roomId;
        const allUsers = rooms[roomId].users;
        allUsers.forEach(user => {
           if(user!==socket.id)
           {
            io.to(user).emit("remoteDescription",{
                description : params.description
            });
           } 
        });
    })
    socket.on("iceCandidate",(params)=>{
        const roomId= users[socket.io].roomId;
        const allUsers= rooms[roomId].users;
        allUsers.forEach((user)=>{
            if(user!==socket.id){
                io.to(user).emit("iceCandidate",{
                    candidate : params.candidate
                });
            }
        });
    });
    socket.on("iceCandidateReply",(params)=>{
        const roomId= users[socket.io].roomId;
        const allUsers= rooms[roomId].users;
        allUsers.forEach((user)=>{
            if(user!==socket.id){
                io.to(user).emit("iceCandidateReply",{
                    candidate : params.candidate
                });
            }
        });
    })
});

server.listen(3000,()=>{console.log('listening on port 3000')})
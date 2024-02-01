// No need to change the pre-written code
// Implement the features in io.on() section
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const app = express();
app.use(cors());

// 1. creating server using HTTP.
export const server = http.createServer(app);

//2. creating socket server.
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

//3. use socket events and here socket is Client 
io.on("connection", (socket) => {
    console.log("Connection made.");

    // Write your code here
    socket.on("join", (data)=>{
        socket.emit("message", {text:`Welcome , ${data.username}`});
        console.log("join", data);
        socket.broadcast.to(data.room).emit("message", {text: `${data.username} has joined the Room`});
        socket.join(data.room);
    });

    socket.on('sendMessage', (data)=>{
        console.log("sendMessage", data);
        io.to(data.room).emit("message", {username : data.username , text: data.message});
    })

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});


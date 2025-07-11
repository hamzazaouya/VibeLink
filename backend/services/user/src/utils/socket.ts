/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-10

 *******************************************************/

import { Server } from "socket.io";
import http from 'http';

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-10
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

let io: Server;
export const connectedUsers = new Map<string, string>();
// Function to initialize Socket.IO
export const initSocket = (server: http.Server) => {
  io = new Server(server);

  // Handle connections
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  if (!io)
    console.log("Socket.IO has not been initialized. Call initSocket first.");
};

export const getSocket = (): Server => {
  return io;
};


export default getSocket;
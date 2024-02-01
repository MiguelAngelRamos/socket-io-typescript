import express from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';

// Crear una instancia de express para configurar el servidor HTTP
const app = express();
const server = http.createServer(app);


// TODO: habilitar el acceso al cliente configurar el objeto {}
const io = new SocketIOServer(server, {});
// Habilitar los CORS para las rutas express
app.use(cors());

// Evento de conexión: se dispara cada vez que un cliente se conecta
io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  // Evento personalizado 'chat message' para recibir mensajes del cliente
  socket.on('chat message', (msg) => {
    // Emitir el mensaje recibido a todos los clientes conectados
    io.emit('chat message', msg);
  });

  // Evento de desconexión: se dispara cuando un cliente se desconecta
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Iniciar el servidor para escuchar en el puerto 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
})
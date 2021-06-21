import * as http from 'http';
import * as websocket from 'ws';

const server: http.Server = http.createServer();

const socket = new websocket.Server({server});

socket.on('connection', (ws) => {
    ws.on('message', (message) => {
      broadcast(message as string);
      console.log(message);
    });
});

const broadcast = (data: string): void => {
    socket.clients.forEach(client => {
      client.send(data);
    });
};

server.listen(8080);
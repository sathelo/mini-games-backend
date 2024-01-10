import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let onlineUsers = 0;

wss.on("connection", function connection(ws) {
  onlineUsers++;
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ onlineUsers: onlineUsers }));
    }
  });

  ws.on("close", function close() {
    onlineUsers--;
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ onlineUsers: onlineUsers }));
      }
    });
  });
});

console.log("The server is running!");

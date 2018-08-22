const express = require('express');
const http = require('http');
const socket = require('socket.io');

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app)
const io = socket.listen(server);

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/assets'));
//app.use(express.static('assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

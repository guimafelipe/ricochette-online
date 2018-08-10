const express = require('express');
const http = require('http');
const socket = require('socket.io');

const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app)
const io = socket.listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/dist/assets'));
// app.use('/dist',express.static(__dirname + '/dist'));
app.use('/lib',express.static(__dirname + '/lib'));
app.use('/',express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

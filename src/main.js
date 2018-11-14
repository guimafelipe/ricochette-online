import Game from "./scenes/game.js";
import Lobby from "./scenes/lobby.js";
import Loading from "./scenes/loading.js";
import socketIOClient from "socket.io-client";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1200,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    backgroundColor: 0xffffff,
    scene: [Lobby, Game, Loading]
};

const game = new Phaser.Game(config);

const SERVER = "127.0.0.1:";
const PORT = "4000";


game.state = {
    response: false,
    endpoint: SERVER+PORT,
    socket: null,
}

const {endpoint} = game.state;

game.socket = socketIOClient(endpoint);

function preload(){
    this.load.image('bullet', '/assets/art/redbullet.png');
}
function create(){
    let bullet = this.physics.add.sprite(100,450,'bullet');
    bullet.setBounce(1);
    bullet.setCollideWorldBounds(true);
    bullet.setVelocity(100, 100);
}

function update(){}

game.scene.start("Lobby", {socket: game.socket})
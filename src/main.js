import Game from "./scenes/game.js";
import Lobby from "./scenes/lobby.js";
import Loading from "./scenes/loading.js";

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

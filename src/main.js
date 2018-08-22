import Game from "./scenes/game.js";
import Lobby from "./scenes/lobby.js";

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 200 }
        }
    },
    scene: [Game, Lobby]
        // preload: preload,
        // create: create,
        // update: update
    // }
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

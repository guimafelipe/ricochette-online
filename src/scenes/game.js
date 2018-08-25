import Bullet from "../gameobjects/bullet.js"
import Paddle from "../gameobjects/paddle"

class Game extends Phaser.Scene {
    constructor(){
        super({key: "Game"});
    }

    preload(){
        this.load.image('bullet', "assets/art/ball.png")
        this.load.image('paddle', "assets/art/paddle.png")
    }

    constructArena(){
        let grossura = 15;
        let altura = 600;
        let comprimento = 1000;
        let wall
        wall = new Phaser.GameObjects.Graphics(this);
        wall.fillStyle(0x000000)
        wall.fillRect(0,0,grossura, altura)
        wall.generateTexture('wall1', grossura, altura)
        wall = this.add.image(0,0,'wall1')
        wall.setOrigin(0,0)
        this.areaBounds.add(wall,true)
        wall = new Phaser.GameObjects.Graphics(this);
        wall.fillStyle(0x000000)
        wall.fillRect(0,0,comprimento, grossura)
        wall.generateTexture('wall2', comprimento, grossura)
        wall = this.add.image(0,0,'wall2')
        wall.setOrigin(0,0)
        this.areaBounds.add(wall ,true)
        wall = new Phaser.GameObjects.Graphics(this);
        wall.fillStyle(0x000000)
        wall.fillRect(0,0,comprimento, grossura)
        wall.generateTexture('wall3', comprimento, grossura)
        wall = this.add.image(0,altura-grossura,'wall3')
        wall.setOrigin(0,0)
        this.areaBounds.add(wall ,true)
        wall = new Phaser.GameObjects.Graphics(this);
        wall.fillStyle(0x000000)
        wall.fillRect(0,0,grossura, altura)
        wall.generateTexture('wall4', grossura, altura)
        wall = this.add.image(comprimento-grossura,0,'wall4')
        wall.setOrigin(0,0)
        this.areaBounds.add(wall ,true)

    }

    create(){
        this.areaBounds = this.add.group()
        this.constructArena()

        this.bulletGroup = this.add.group()
        this.paddleGroup = this.add.group()
        this.paddleGroup.runChildUpdate = true
        this.bulletGroup.runChildUpdate = true

        this.areaBounds.children.iterate(kid => {
            this.physics.world.enable(kid, Phaser.Physics.Arcade.STATIC_BODY)
        })

        let paddle = new Paddle(this, 400, 300, "paddle")
        this.paddleGroup.add(paddle, true)
        // this.physics.world.enable(this.areaBounds, Phaser.Physics.Arcade.STATIC_BODY)
        this.physics.world.enable(this.bulletGroup)
        this.physics.world.enable(this.paddleGroup)
        // this.physics.collide(this.bulletGroup, this.areaBounds)
        // this.physics.collide(this.paddleGroup, this.areaBounds)
        this.physics.add.collider(this.paddleGroup, this.areaBounds)
        this.physics.add.collider(this.bulletGroup, this.areaBounds)
    }

    update(delta){
        this.bulletGroup.preUpdate(this.time, delta)
        this.paddleGroup.preUpdate(this.time, delta)
    }
}

export default Game;
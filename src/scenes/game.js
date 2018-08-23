import Bullet from "../gameobjects/bullet.js"
import Paddle from "../gameobjects/paddle"

class Game extends Phaser.Scene {
    constructor(){
        super({key: "Game"});
    }

    preload(){
        this.load.image('BlueBullet', "assets/art/bluebullet.png");
        this.load.image('RedBullet', "assets/art/redbullet.png");
        this.load.image('BluePaddle', "assets/art/bluepaddle.png");
    }

    create(){
        this.image = this.add.image(400, 300, "BlueBullet");
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.on('pointerdown', (event) =>{
            // this.image.x = event.x;
            // this.image.y = event.y; 
        })

        this.bulletGroup = new Phaser.GameObjects.Group(this)
        this.paddleGroup = new Phaser.GameObjects.Group(this)
        this.paddleGroup.runChildUpdate = true
        this.bulletGroup.runChildUpdate = true

        let paddle = new Paddle(this, 400, 300, "BluePaddle")
        this.paddleGroup.add(paddle, true)

        this.input.keyboard.on('keyup_P', event => {
            // let blueBullet = new Bullet(this, {x: this.image.x, y: this.image.y}, {x: this.input.x, y: this.input.y}, 'RedBullet')
            // this.bulletGroup.add(blueBullet, true)
        })

        this.input.keyboard.on('keyup', e => {
            if(e.key == '2'){
                this.scene.start("Lobby")
            }
        })
    }

    update(delta){
        // if(this.key_A.isDown)
        //     this.image.x--;
        this.bulletGroup.preUpdate(this.time, delta)
        this.paddleGroup.preUpdate(this.time, delta)
    }
}

export default Game;
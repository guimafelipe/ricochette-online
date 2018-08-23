import Bullet from "../gameobjects/bullet.js"

class Game extends Phaser.Scene {
    constructor(){
        super({key: "Game"});
    }

    preload(){
        this.load.image('BlueBullet', "assets/art/bluebullet.png");
        this.load.image('RedBullet', "assets/art/redbullet.png");
    }

    create(){
        this.image = this.add.image(400, 300, "BlueBullet");
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.on('pointerdown', (event) =>{
            this.image.x = event.x;
            this.image.y = event.y; 
        })

        this.bulletGroup = new Phaser.GameObjects.Group(this)
        this.bulletGroup.runChildUpdate = true

        this.input.keyboard.on('keyup_P', event => {
            let blueBullet = new Bullet(this, {x: this.image.x, y: this.image.y}, {x: this.input.x, y: this.input.y}, 'RedBullet')
            this.bulletGroup.add(blueBullet, true)
        })

        this.input.keyboard.on('keyup', e => {
            if(e.key == '2'){
                this.scene.start("Lobby")
            }
        })
    }

    update(delta){
        if(this.key_A.isDown)
            this.image.x--;
        this.bulletGroup.preUpdate(this.time, delta)
    }
}

export default Game;
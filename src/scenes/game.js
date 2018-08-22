class Game extends Phaser.Scene {
    constructor(){
        super({key: "Game"});
    }

    preload(){
        this.load.image('Bullet', "assets/art/bluebullet.png");
    }

    create(){
        this.image = this.add.image(400, 300, "Bullet");
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.input.on('pointerdown', (event) =>{
            this.image.x = event.x;
            this.image.y = event.y; 
        })

        this.input.keyboard.on('keyup_P', event => {
            var physicsImage = this.physics.add.image(this.image.x, this.image.y, 'Bullet')
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
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
    }
}

export default Game;
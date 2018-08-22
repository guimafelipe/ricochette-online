export default class Lobby extends Phaser.Scene {
    constructor () {
        super({key: "Lobby"});
    }

    create(){
        this.text = this.add.text(0,0,"Lobby:", {font:"40px Impact"});
        let tween = this.tweens.add({targets: this.text, x:200, y:250, duration:2000, ease:"Elastic", easeParams:[1.5, 0.5], delay:1000})
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(delta){
        if(this.key_1.isDown){
            this.scene.start("Game")
        }
    }
}
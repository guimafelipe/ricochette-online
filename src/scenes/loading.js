export default class Loading extends Phaser.Scene {
    constructor(){
        super({key:"Loading"})
    }

    preload(){
       this.load.audio('letsrock', ['assets/audio/Let\'sRock.mp3']) 
    }

    create(){
        this.soundFX = this.sound.add('letsrock', {loop: "false"})
        this.input.keyboard.on("keydown_G", e => {
            this.soundFX.play()
        })
    }

}
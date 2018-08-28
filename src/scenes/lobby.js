import LobbyButton from '../gameobjects/lobbyButton'

export default class Lobby extends Phaser.Scene {
    constructor () {
        super({key: "Lobby"});
    }

    create(){
        this.text = this.add.text(0,0,"Lobby:", {font:"40px sans-serif", fill:"#000000"});

        this.buttons = this.add.container(100, 150)
        let text3 = new LobbyButton(this, 300, 300, 'Beyblade', 19)
        this.buttons.add(text3, true)
        text3 = new LobbyButton(this, 300, 400, 'Gugu', 19)
        this.buttons.add(text3, true)
        text3 = new LobbyButton(this, 300, 500, 'Riva', 19)
        this.buttons.add(text3, true)
        text3 = new LobbyButton(this, 300, 600, 'Gru', 19)
        this.buttons.add(text3, true)

        // this.buttons.align(-1, 4, 48, 48)
        // this.buttons.x = 50
        // this.buttons.y = 100

        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(delta){
        if(this.key_1.isDown){
            this.scene.start("Game")
        }
    }
}
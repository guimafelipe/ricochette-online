import LobbyButton from '../gameobjects/lobbyButton'

export default class Lobby extends Phaser.Scene {
    constructor () {
        super({key: "Lobby"});
    }
    
    updateButtons(){
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas", 1));
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas53", 12));
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas4", 11));
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas3", 13));
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas22", 14));
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas2", 15));
        this.buttons.add(new LobbyButton(this, 0, 0, "Douglas1", 16));
        let i = 0, j = 0
        let snapv = 30, snaph = 150
        let maxLines = 5
        this.buttons.iterate(button => {
            button.x = i*snaph;
            button.y = snapv*j++;
            if(j == maxLines){
                j = 0;
                i++;
            }
        })
    }

    create(){
        this.text = this.add.text(0,0,"Lobby:", {font:"40px sans-serif", fill:"#000000"});

        this.buttons = this.add.container(20, 100)
        this.updateButtons()

        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(delta){
        if(this.key_1.isDown){
            this.scene.start("Game")
        }
    }
}
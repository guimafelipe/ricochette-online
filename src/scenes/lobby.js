import LobbyButton from '../gameobjects/lobbyButton'
import MenuButton from '../gameobjects/menuButton'

export default class Lobby extends Phaser.Scene {
    constructor () {
        super({key: "Lobby"});
    }
    
    updateButtons(queueUsers){
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas", 1));
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas53", 12));
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas4", 11));
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas3", 13));
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas22", 14));
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas2", 15));
        // this.buttons.add(new LobbyButton(this, 0, 0, "Douglas1", 16));

        this.buttons.removeAll(true);

        let imInQueue = false;

        for(let id in queueUsers){
            this.buttons.add(new LobbyButton(this, 0, 0, queueUsers[id], id));
            if(id == this.socket.id) imInQueue = true;
        }

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
        });

        if(!imInQueue){
            this.queueButton.text = 'Enter'
            this.queueButton.updateText()
            this.queueButton.action = this.enterQueueHandle;
            console.log('enter')
        } else {
            this.queueButton.text = 'Exit'
            this.queueButton.updateText()
            console.log('exit')
            this.queueButton.action = this.exitQueueHandle;
        }
    }

    setupSocket(){
        this.socket.on("lobbyUpdated", queueUsers => {
            this.updateButtons(queueUsers);
        });

        this.socket.on("enterMatch", data => this.goToMatch(data.isMaster));
    }

    enterQueueHandle(){
        this.socket.emit('enterQueue');
    }

    exitQueueHandle(){
        this.socket.emit('exitQueue');
    }

    changeNameHandle(name){
        this.socket.emit('setName', name);
    }

    startMatchHandle(oponentId){
        this.socket.emit('startMatch', oponentId);
    }

    goToMatch(isMaster){
        this.scene.start('Game', {socket: this.socket, isMaster: isMaster});
    }

    init(data){
        this.socket = data.socket;
        this.enterQueueHandle = this.enterQueueHandle.bind(this)
        this.exitQueueHandle = this.exitQueueHandle.bind(this)
        this.changeNameHandle = this.changeNameHandle.bind(this)
        this.startMatchHandle = this.startMatchHandle.bind(this)
        this.goToMatch = this.goToMatch.bind(this)
    }

    create(){
        this.text = this.add.text(0,0,"Lobby:", {font:"40px sans-serif", fill:"#000000"});

        this.setupSocket();

        this.buttons = this.add.container(20, 100)
        this.queueButton = new MenuButton(this, 180, 180)
        this.add.existing(this.queueButton)

        this.socket.emit('enterLobby');

        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }

    update(delta){
        if(this.key_1.isDown){
            this.scene.start("Game")
        }
    }
}
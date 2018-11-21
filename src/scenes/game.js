import Paddle from "../gameobjects/paddle"
import Bullet from "../gameobjects/bullet"

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

    end_game(loser_paddle){
        console.log("Game Over")
    }

    // Politically correct Slave
    sync_game(data){
        if(this.isMaster) return;

        let bullets = data.bullets
        let paddle_player = data.paddle2
        let paddle_enemy = data.paddle1

        this.myPaddle.setPosition(paddle_player.x, paddle_player.y);
        this.myPaddle.setRotation(paddle_player.angle);

        this.enemyPaddle.setPosition(paddle_enemy.x, paddle_enemy.y);
        this.enemyPaddle.setRotation(paddle_enemy.angle);

        this.bulletGroup.clear(true, true) // better add a pool of objects
        bullets.forEach(bullet => {
            let newBullet = new Bullet(this, bullet.x, bullet.y, bullet.dx, bullet.dy, 'bullet');
            this.bulletGroup.add(newBullet, true);
        });
    }

    // Master
    get_inputs(input){
        let enemy_mouse_pos = input.mouse_pos;
        let ver_dir = input.ver_dir; // -1, 0 ou 1
        let hor_dir = input.hor_dir;
    }

    commit_game(){ //construct data object
        let data = {};

        data.paddle1 = {
            x: this.myPaddle.body.x,
            y: this.myPaddle.body.y,
            angle: this.myPaddle.rotation, //radians
        }
        
        data.paddle2 = {
            x: this.enemyPaddle.body.x,
            y: this.enemyPaddle.body.y,
            angle: this.enemyPaddle.rotation,
        }

        data.bullets = [];

        let gameBullets = this.bulletGroup.getChildren();

        gameBullets.forEach(bullet => {
            let bData = {};
            bData.tint = bullet.tint;
            bData.x = bullet.body.x;
            bData.y = bullet.body.y;            
            bData.velocity = bullet.body.velocity;
            data.bullets.push(bData);
        });

        this.socket.emit('commit_game', data);
    }

    setupSocket(){
        this.socket.on('sync_game', data => this.sync_game(data));
        this.socket.on('get_inputs', input => this.get_inputs(input));
    }

    init(data){
        this.isMaster = data.isMaster; // true or false
        this.socket = data.socket;
        console.log(this.isMaster);
        this.setupSocket();
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
        let paddle_enemy = new Paddle(this, 200, 100, "paddle")

        if(this.isMaster){
            this.myPaddle = paddle;
            this.enemyPaddle = paddle_enemy;
        } else {
            this.myPaddle = paddle_enemy;
            this.enemyPaddle = paddle;
        }
        this.paddleGroup.add(this.myPaddle, true)
        this.paddleGroup.add(this.enemyPaddle, true)

        this.physics.world.enable(this.bulletGroup)
        this.physics.world.enable(this.paddleGroup)
        this.physics.add.collider(this.paddleGroup, this.areaBounds)
        this.physics.add.collider(this.bulletGroup, this.areaBounds)

        this.countdown = 3000
        this.game_state = "countdown" // {countdown, running, ended}
    }

    start_game(){
        this.myPaddle.can_move = true;
        // this.paddleGroup.children.iterate(paddle => paddle.can_move = true)
        this.game_state = 'running'
        console.log('começou')
    }

    end_game(){
        this.paddleGroup.children.iterate(paddle => paddle.can_move = false)
        console.log("Game Over")
    }

    update(time, delta){
        if(this.game_state == 'countdown') //mover isso pro server
            if(this.countdown > 0){
                this.countdown -= delta
                return
            } else this.start_game()
        else if(this.game_state == 'running'){
            this.bulletGroup.preUpdate(this.time, delta)
            this.paddleGroup.preUpdate(this.time, delta)
            if(this.isMaster){
                this.commit_game();
            }
        } else if(this.game_state == 'ended') {
            
        }
    }
}

export default Game;
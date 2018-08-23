export default class Bullet extends Phaser.GameObjects.Image{
    constructor(scene, position, direction, bulletImg){
        super(scene, 0, 0, bulletImg)
        this.setInitialPosition(position)
        this.setInitialDirection(direction)
        // Phaser.GameObjects.Sprite.call(this, scene, position.x, position.y, bulletImg)
        // Phaser.GameObjects.Image.call()
        this.setActive(true)
    }

    setInitialPosition(position){
        this.x = position.x
        this.y = position.y
    }

    setInitialDirection(direction){
        this.velocity = new Phaser.Math.Vector2(direction.x - this.x, direction.y - this.y)
        this.velocity.normalize()
        this.speed = 15
        this.velocity.scale(15)
    }

    goDown(){
        if(this.velocity.y < 0) this.velocity.y *= -1; 
    }

    goUp(){
        if(this.velocity.y > 0) this.velocity.y *= -1; 
    }

    goLeft(){
        if(this.velocity.x < 0) this.velocity.x *= -1; 
    }

    goRight(){
        if(this.velocity.x > 0) this.velocity.x *= -1; 
    }

    update(){
        this.x += this.velocity.x
        this.y += this.velocity.y
    }

    collide(){

    }

    doDamage(){

    }

}
export default class Bullet extends Phaser.GameObjects.Image{
    constructor(scene, x, y, dx, dy, bulletImg){
        super(scene, 0, 0, bulletImg)
        this.setInitialPosition({x ,y})
        this.setInitialDirection({x: dx, y: dy})
        // Phaser.GameObjects.Sprite.call(this, scene, position.x, position.y, bulletImg)
        // Phaser.GameObjects.Image.call()
        this.setScale(0.5)
        this.setActive(true)
    }

    setInitialPosition(position){
        this.x = position.x
        this.y = position.y
    }

    setInitialDirection(direction){
        this.velocity = new Phaser.Math.Vector2(direction.x, direction.y)
        this.velocity.normalize()
        this.speed = 7
        this.velocity.scale(this.speed)
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
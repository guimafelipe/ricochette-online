export default class Bullet extends Phaser.GameObjects.Image{
    constructor(scene, x, y, dx, dy, bulletImg){
        super(scene, 0, 0, bulletImg)
        this.setInitialPosition({x ,y})
        this.scene.physics.world.enable(this)
        this.body.setBounce(1)
        this.body.setCircle(this.width/2)
        this.setActive(true)
        this.setScale(0.5)
        this.tint = 0xff0000
        this.setInitialDirection({x: dx, y: dy})
    }

    setInitialPosition(position){
        this.x = position.x
        this.y = position.y
    }

    setInitialDirection(direction){
        this.velocity = new Phaser.Math.Vector2(direction.x, direction.y)
        this.velocity.normalize()
        this.speed = 350
        this.velocity.scale(this.speed)
        this.body.setVelocityX(this.velocity.x)
        this.body.setVelocityY(this.velocity.y)
    }

    onCollision(self, paddle){
        paddle.takeDamage()
        self.destroy()
    }

    update(){
        this.scene.physics.overlap(this, this.scene.paddleGroup, this.onCollision)
    }

}
export default class Bullet extends Phaser.GameObjects.Image{
    constructor(scene, x, y, dx, dy, bulletImg){
        super(scene, 0, 0, bulletImg)
        this.setInitialPosition({x ,y})
        this.scene.physics.world.enable(this)
        this.scene.physics.collide(this, this.scene.areaBounds)
        this.body.setBounce(1)
        this.setActive(true)
        this.setScale(0.5)
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

}
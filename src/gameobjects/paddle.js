import Bullet from "./bullet"

export default class Paddle extends Phaser.GameObjects.Image{ 
    constructor(scene,x,y,texture){
        super(scene,x,y,texture)
        this.up_act = this.scene.input.keyboard.addKey("W")
        this.down_act = this.scene.input.keyboard.addKey("S")
        this.left_act = this.scene.input.keyboard.addKey("A")
        this.right_act = this.scene.input.keyboard.addKey("D")
        this.direction = new Phaser.Math.Vector2()
        this.speed = 200
        this.max_bullets = 10
        this.curr_bullets = this.max_bullets
        this.scene.input.on("pointerdown", e => this.shoot(e.x, e.y))
        this.color = "red" //change after
        this.setOrigin(0.7, 0.5)
        this.body = new Phaser.Physics.Arcade.Body(this.scene.physics.world, this)
        this.body.setCircle(this.height*0.3, this.width*0.4, this.height*0.2)
        this.setScale(0.4)
        this.setActive(true)
    }

    update(){
        this.direction = new Phaser.Math.Vector2(0,0)
        if(this.up_act.isDown) this.direction.y -= 1
        if(this.down_act.isDown) this.direction.y += 1
        if(this.left_act.isDown) this.direction.x -= 1
        if(this.right_act.isDown) this.direction.x += 1
        this.direction.normalize()
        this.direction.scale(this.speed)
        this.body.setVelocityX(this.direction.x)
        this.body.setVelocityY(this.direction.y)
        this.adjustRotation()
    }

    adjustRotation(){
        let target = this.scene.input.mousePointer.position
        let angle = Math.atan2((target.y - this.y), (target.x-this.x))
        this.setRotation(angle+Math.PI)
    }

    shoot(x,y){
        if(this.curr_bullets <= 0) return
        let shot_direction = new Phaser.Math.Vector2(x - this.x, y - this.y)
        shot_direction.normalize()
        let safe_dist = 34
        let spawn_position = new Phaser.Math.Vector2(this.x + shot_direction.x*safe_dist, this.y + shot_direction.y*safe_dist)
        let new_bullet = new Bullet(this.scene, spawn_position.x, spawn_position.y, shot_direction.x, shot_direction.y, "BlueBullet")
        this.scene.bulletGroup.add(new_bullet, true)
        this.curr_bullets--
    }

    takeDamage(){
        console.log("ai")
    }

    reload(){
        if(this.curr_bullets == this.max_bullets) return
        this.curr_bullets++
    }


}
export default class MenuButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y){
        let style = {font:"25px sans-serif", fill:"#000000"}
        super(scene, x, y, "Olar", style)
        this.normal_tint = 0x000000
        this.selected_tint = 0x550000
        this.hover_tint = 0x3f3f3f
        this.setInteractive({useHandCursor: true})
        this.setActive(true)
        this.tint = this.normal_tint
        this.on('pointerover', () => this.tint = this.hover_tint)
        this.on('pointerout', () => this.tint = this.normal_tint)
        this.on('pointerdown', () => this.tint = this.selected_tint)
        this.on('pointerup', () => this.action())
    }
}
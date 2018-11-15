export default class LobbyButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, player_name, socket_id){
        let style = {font:"15px sans-serif", fill:"#000000"}
        super(scene, x, y, player_name, style)
        this.normal_tint = 0x000000
        this.selected_tint = 0x550000
        this.hover_tint = 0x3f3f3f
        this.setInteractive({useHandCursor: true})
        this.setActive(true)
        this.tint = this.normal_tint
        this.on('pointerover', () => this.tint = this.hover_tint)
        this.on('pointerout', () => this.tint = this.normal_tint)
        this.on('pointerdown', () => this.tint = this.selected_tint)
        this.on('pointerup', () => this.scene.startMatchHandle(socket_id))
    }
}
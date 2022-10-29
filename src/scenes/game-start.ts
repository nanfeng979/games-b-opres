export class GameStart extends Phaser.Scene {

    private play!:Phaser.GameObjects.Image // 开始键--第一场景
    private gamename!:Phaser.GameObjects.Image // gamename图标--第一场景
    private icon_scale:Boolean = false // 控制第一场景的动画

    constructor() {
        super({
          key: 'GameStart'
        });
      }

    preload(): void {
        let images_url = "../src/assets/images/" // 图像资源路径
        this.load.image("play", images_url + "play.png") // 开始键--第一场景
        this.load.image("gamename", images_url + "gamename.png") // gamename图标--第一场景
        this.load.image("tips", images_url + "tips.png") // tips提示--第二场景
    }
    
    create(): void {
        let _this = this
        
        // gamename图标
        this.gamename = this.add.image(375 /2, 667 / 2 - 200, "gamename").setScale(0.5)

        // 开始键
        this.play = this.add.image(375 / 2, 667 / 2, "play").setScale(0.5)
        this.play.setInteractive()
        this.play.on("pointerdown", () => {
            this.gamename.destroy()
            this.play.destroy()

            this.add.image(375 /2, 667 / 2 - 200, "tips").setScale(0.5)
            this.add.text(0, 0, "score: 0" , { fontSize: "24px"})
            this.input.on("pointerdown", () => {
                this.scene.resume("GameScene")
                this.scene.stop()
            })
            
        })

        // 开始键和gamename图标的定时器
        setInterval(function() {
            _this.icon_scale = !_this.icon_scale
        }, 150)
        
    }

    update(): void {

        // 控制gamename图标和play开始键的抽动
        if(this.icon_scale == false) { // 可以改成tweens
            let scale_x = 0.51
            let scale_y = 0.51
            this.play.setScale(0.5, scale_y)
            this.gamename.setScale(scale_x, scale_y)
        } else {
            this.play.setScale(0.5, 0.5)
            this.gamename.setScale(0.5, 0.5)
        }
    }
}
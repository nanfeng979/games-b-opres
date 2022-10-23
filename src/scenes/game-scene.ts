let player:any = {};

export class GameScene extends Phaser.Scene {
    private rope!: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
      super({
        key: 'GameScene'
      });
    }
    preload(): void {
        let images_url = "../src/assets/images/" // 图像资源路径
        this.load.image("player", images_url + "player_one.png") // 主角
        this.load.image("background", images_url + "background.png") // 蓝色背景
        this.load.image("lawn", images_url + "lawn.png") // 草坪
        this.load.image("stone", images_url + "stone.png") // 石块
        this.load.spritesheet("star", images_url + "star.png", {frameWidth: 100, frameHeight: 100}) // 宝石
        this.load.image("rope", images_url + "rope.png") // 绳子
    }

    create(): void {
        let _this = this
        this.add.image(2, 0, "background").setScale(187, 2.7) // 蓝色背景

        // 添加草坪组
        let lawns = this.physics.add.staticGroup();
        lawns.create(64, 610, "lawn")
        lawns.create(64 + 128 * 1, 610, "lawn")
        lawns.create(64 + 128 * 2, 610, "lawn")

        // 添加石块组
        let stones = this.physics.add.staticGroup();
        let stone_slip = 80
        stones.create(60, 100, "stone").setScale(0.5)
        stones.create(60 + stone_slip * 1, 100, "stone").setScale(0.5)
        stones.create(60 + stone_slip * 2, 100, "stone").setScale(0.5)
        stones.create(60 + stone_slip * 3, 100, "stone").setScale(0.5)

        // stones.children.iterate(function (child, i) {
        //   if(i == 2){
        //     child.y += 100
        //   }
        // })

        // 添加宝石
        // this.add.sprite(50, 100, "star").setScale(0.5)

		// 人物
        player = this.physics.add.sprite(375 / 2, 500, "player").setScale(0.5)
        player.setBounce(0.3); // 弹力系数
        player.setCollideWorldBounds(true); // 与世界边框碰撞就停止
        this.physics.add.collider(player, lawns, pengzhuang);

        // rope = this.add.image(50, 50, "rope").setAngle(90)
        // this.rope = this.add.group({
        //     key: "rope",
        //     repeat: 5,
        //     setXY: {x: 150, y: 300, stepX: 30}
        // })

        // this.rope = this.physics.add.staticGroup({
        //     key: "rope",
        //     // frame: ["blue1", "red1", "green1", "yellow1", "silver1", "purple1"],
        //     frameQuantity: 2,
        //     gridAlign: {
        //       width: 10,
        //       height: 6,
        //       cellWidth: 32,
        //       cellHeight: 32,
        //       x: 112,//why?
        //       y: 100,
        //     },
        //   })
        

        // 事件
        this.input.on("pointerdown", (pointer:any) => {
			let speed = 1
			let x = pointer.x - player.x
			let y = pointer.y - player.y
			if(y > -130) y = -130

			player.setVelocityX(x * speed)
			player.setVelocityY(y * speed)
		})

		// 自定义函数
		function pengzhuang() {
			player.setVelocityX(0)
		}
        
    }
    
    update(time: number, delta: number): void {
        // rope.x = player.x;
        // rope.y = player.y;
        
    }

}
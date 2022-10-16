export class GameScene extends Phaser.Scene {

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
        this.load.spritesheet("star", images_url + "star.png", {frameWidth: 100, frameHeight: 100})
    }

    create(): void {
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

        let player = this.physics.add.sprite(375 / 2, 100, "player").setScale(0.6) // 人物
        player.setBounce(0.2); // 弹力系数
        player.setCollideWorldBounds(true); // 与世界边框碰撞就停止
        this.physics.add.collider(player, lawns);
    }

}
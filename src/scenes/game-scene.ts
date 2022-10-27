export class GameScene extends Phaser.Scene {
    // private rope!: Phaser.Physics.Arcade.StaticGroup
    private rope!: Phaser.Physics.Arcade.StaticGroup;
	private player!:Phaser.Physics.Arcade.Image
	private star!:Phaser.GameObjects.Sprite
    private star_scale:Boolean = false;
    private jindutiao:any
    private scoreObject!:Phaser.GameObjects.Text
    private score:number = 0
    private play!:Phaser.GameObjects.Image // 开始键--第一场景
    private gamename!:Phaser.GameObjects.Image // gamename图标--第一场景
    private icon_scale:Boolean = false // 控制第一场景的动画
    private scene_number:number = 0 // 控制场景
    private tips!:Phaser.GameObjects.Image // tips提示--第二场景
    private yes!:Phaser.GameObjects.Image // yes--第四场景
    private no!:Phaser.GameObjects.Image // no--第四场景
    private mousedown = false
    private mouseup = false
    private stone_xy:any


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
        this.load.image("jindutiao", images_url + "energybar.png") // 进度条
        this.load.image("jindutiaokuang", images_url + "energycontainer.png") // 进度条框
        this.load.image("play", images_url + "play.png") // 开始键--第一场景
        this.load.image("gamename", images_url + "gamename.png") // gamename图标--第一场景
        this.load.image("tips", images_url + "tips.png") // tips提示--第二场景
        this.load.image("tryagain", images_url + "tryagain.png") // tryagain--第四场景
        this.load.image("yes", images_url + "yes.png") // yes--第四场景
        this.load.image("no", images_url + "no.png") // no--第四场景
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
        let stone:any = []
        stones.create(375 / 4 / 2, 100, "stone").setScale(0.5)
        stones.create(375 / 4 / 2 + 375 / 4 * 1, 100, "stone").setScale(0.5)
        stones.create(375 / 4 / 2 + 375 / 4 * 2, 100, "stone").setScale(0.5)
        stones.create(375 / 4 / 2 + 375 / 4 * 3, 100, "stone").setScale(0.5)
        stones.children.each((child, i) => {
            stone[i] = child
        })
        // stones.children.iterate(function (child, i) {
        //   if(i == 2){
        //     child.y += 100
        //   }
        // })

		// 人物
        this.player = this.physics.add.sprite(375 / 2, 500, "player").setScale(0.5).setAccelerationY(100)
        this.player.setBounce(0.3); // 弹力系数
        this.player.setCollideWorldBounds(true); // 与世界边框碰撞就停止
        this.physics.add.collider(this.player, lawns, pengzhuang);

        // 添加宝石
        this.star = random_stat()
        this.physics.add.overlap(this.player, this.star, player_peng_star);

        // 控制宝石一直缩小扩大
        setInterval(function() {
            if(_this.star_scale) {
                _this.star.setScale(0.5, 0.5)
                _this.star_scale = !_this.star_scale
            } else {
                let star_scale_xy = 0.53
                _this.star.setScale(star_scale_xy, star_scale_xy)
                _this.star_scale = !_this.star_scale
            }
        }, 250)
        
        // this.rope = this.physics.add.staticGroup({
        //     key: "rope",
        //     // frame: ["blue1", "red1", "green1", "yellow1", "silver1", "purple1"],
        //     // frame: ["blue1"],
        //     frameQuantity: 10, // 控制对象的重复数量
        //     gridAlign: {
        //       width: 10, // 不要
        //       height: 6, // 不要
        //       cellWidth: 32, // 重复的对象的原点之间的宽度距离
        //       cellHeight: 32, // 重复的对象的原点之间的高度距离
        //       x: 112,//why? // 第一个对象的x轴
        //       y: 100, // 第一个对象的y轴
        //     },
        //   });
        //   this.physics.add.collider(
        //     this.player,
        //     this.rope,
        //     player_peng_rope,
        //     undefined,
        //     this
        //   );
          
        // this.rope.children.each((child) => {
        //     child.destroy()
        // })

        //   this.rope = this.physics.add.staticGroup({
        //     key: "rope",
        //     // frame: ["blue1", "red1", "green1", "yellow1", "silver1", "purple1"],
        //     // frame: ["blue1"],
        //     frameQuantity: 10, // 控制对象的重复数量
        //     gridAlign: {
        //       width: 10, // 不要
        //       height: 6, // 不要
        //       cellWidth: 64, // 重复的对象的原点之间的宽度距离
        //       cellHeight: 32, // 重复的对象的原点之间的高度距离
        //       x: 112,//why? // 第一个对象的x轴
        //       y: 100, // 第一个对象的y轴
        //     },
        //   });
        

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

        function player_peng_rope(ball:Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody, 
            rope:Phaser.Types.Physics.Arcade.GameObjectWithDynamicBody) {
            // rope.disableBody(true, true);
            rope.destroy()
        }
        
        // 进度条
        function jindutiao_create_fun() {
            _this.add.image(200, 600, "jindutiaokuang").setScale(0.5)
            _this.jindutiao = _this.add.image(99, 591, "jindutiao").setScale(0.5, 0.5).setOrigin(0)
            
        }
        // 进度条定时器
        function jindutiao_timer_fun() {
            let jindutiao_scale_x = 1
            let jindutiao_timer = setInterval(function () {
                jindutiao_scale_x -= (1 / 50)
                if(jindutiao_scale_x <= 0) {
                    clearInterval(jindutiao_timer)
                    _this.scene_number = 4
                    four_scene_create()
                    return
                }
                _this.jindutiao.setScale(0.5 * jindutiao_scale_x, 0.5)
            }, 1000)
        }
        

        // 分数
        function score_fun() {
            _this.scoreObject = _this.add.text(0, 0, "score: " + _this.score , { fontSize: "24px"})
        }

        // 开始键
        this.play = this.add.image(375 / 2, 667 / 2, "play").setScale(0.5)

        // gamename图标
        this.gamename = this.add.image(375 /2, 667 / 2 - 200, "gamename").setScale(0.5)

        // 开始键和gamename图标的定时器
        setInterval(function() {
            _this.icon_scale = !_this.icon_scale
        }, 150)

        function four_scene_create() {
            // tryagain
            _this.add.image(375 / 2, 667 / 2 - 200, "tryagain").setScale(0.5)

            // yes
            _this.yes = _this.add.image(375 / 2 - 80, 667 / 2 + 100, "yes").setScale(0.5)
            _this.yes.setInteractive()
            _this.yes.on("pointerdown", () => {
                window.location.reload()
            })

            // no
            _this.no = _this.add.image(375 / 2 + 80, 667 / 2 + 100, "no").setScale(0.5)

            // score
            _this.add.text(375 / 2 - 130, 667 / 2, "Your Score: " + _this.score , { fontSize: "36px"})
        }
        

        // 事件
        this.input.on("pointerdown", (pointer:any) => {
            switch(this.scene_number) {
                case 0:
                     _this.play.destroy()
                     _this.gamename.destroy()
                    _this.tips = _this.add.image(375 /2, 667 / 2 - 200, "tips").setScale(0.5)
                    jindutiao_create_fun()
                    score_fun()
                    _this.scene_number = 1
                break;
                case 1:
                    _this.tips.destroy()
                    jindutiao_timer_fun()
                    _this.scene_number = 2
                break;
                case 2:
                    this.mousedown = true
                    if(pointer.x < ((375 / 4) * 1 )) {
                        this.stone_xy = stone[0]
                    } else if (pointer.x < ((375 / 4) * 2 )) {
                        this.stone_xy = stone[1]
                    } else if (pointer.x < ((375 / 4) * 3 )) {
                        this.stone_xy = stone[2]
                    } else {
                        this.stone_xy = stone[3]
                    }
                    break
            }
		})

        this.input.on("pointerup", (pointer:any) => {
            this.mousedown = false
        })

		// 自定义函数
        // 角色碰撞后x轴方向的移动变为0
		function pengzhuang() {
			_this.player.setVelocityX(0)
		}

        // 随机地点生成星星
        function random_stat() {
            let random_x = Math.floor(Math.random() * (375 - 50) + 50)
            let random_y = Math.floor(Math.random() * 300 + 100)
            let random_type = Math.floor(Math.random() * 3)
            return _this.physics.add.sprite(random_x, random_y, "star", random_type).setScale(0.5, 0.5)
        }

        // 角色与宝石的重叠
        function player_peng_star(player:any, star:any) {
            _this.score += 1
            _this.scoreObject.setText("score: " + _this.score)
            _this.star.destroy()
            _this.star = random_stat()
            _this.physics.add.overlap(player, _this.star, player_peng_star);
        }
        
    }
    
    update(time: number, delta: number): void {
        // rope.x = player.x;
        // rope.y = player.y;

        // 控制gamename图标和play开始键的抽动
        if(this.scene_number == 0) {
            if(this.icon_scale == false) {
                let scale_x = 0.51
                let scale_y = 0.51
                this.play.setScale(0.5, scale_y)
                this.gamename.setScale(scale_x, scale_y)
            } else {
                this.play.setScale(0.5, 0.5)
                this.gamename.setScale(0.5, 0.5)
            }
        }

        if(this.mousedown == true) {
            console.log("yeah")
            let speed = 0.8
                    
            let line = new Phaser.Geom.Line(this.stone_xy.x, this.stone_xy.y, this.player.x, this.player.y)
            let rotat = Math.atan((this.stone_xy.x - this.player.x)/(this.stone_xy.y - this.player.y)) * 180 / Math.PI
            let rope_len = Math.sqrt((this.stone_xy.x - this.player.x) ** 2 + (this.stone_xy.y - this.player.y) ** 2)
            let rope_num = Math.floor(rope_len / 32) + 1
            let rope = this.physics.add.staticGroup({
                key: 'rope',
                frameQuantity: rope_num,
                setRotation: {value: -rotat * Math.PI / 180}
            }).setOrigin(0,0);
            Phaser.Actions.PlaceOnLine(rope.getChildren(), line);
            setTimeout(() => {
                rope.children.each((child) => {
                    child.destroy()
                })
            });

            
            this.player.setVelocityX((this.stone_xy.x - this.player.x) * speed)
            this.player.setVelocityY((this.stone_xy.y - this.player.y) * speed)
        }
        if(this.mouseup == true) {
            console.log("yo")
        }
    }

}
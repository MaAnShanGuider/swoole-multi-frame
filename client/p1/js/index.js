
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};
var game = new Phaser.Game(config);
function preload() {
	var progress = this.add.graphics();
	
	this.load.on('progress', function (value) {
		
		progress.clear();
		progress.fillStyle(0xffffff, 1);
		progress.fillRect(0, 270, 800 * value, 60);
		
	});
	
	this.load.on('complete', function () {
		console.log("加载完成");
		progress.destroy();
		
	});
	
	this.load.tilemapTiledJSON('level1', '/client/p1/assets/level1.json', null, Phaser.Tilemaps.Formats.TILED_JSON);
	this.load.image('tiles-1', '/client/p1/assets/tiles-1.png');
	this.load.spritesheet('dude', '/client/p1/assets/dude.png',  { frameWidth: 32, frameHeight: 48 });
	this.load.spritesheet('droid', '/client/p1/assets/droid.png', { frameWidth: 32, frameHeight: 32 });
	this.load.image('starSmall', '/client/p1/assets/star.png');
	this.load.image('starBig', '/client/p1/assets/star2.png');
	this.load.image('background', '/client/p1/assets/background2.png');
	
}

var map;
var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var tiles;

function create() {
	
	player = this.physics.add.sprite(100, 100, 'dude');
	player.setBounce(0.2);
	player.setCollideWorldBounds(true);
	
	map = this.make.tilemap({ key: 'level1' });
	tiles = map.addTilesetImage('tiles-1', 'tiles-1');
	layer = map.createStaticLayer(0, tiles, 0, 0);
	
	map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]); // 碰撞元素
	this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
	
	
	// 将玩家的转身，走路以及停止设置动画 Our player animations, turning, walking left and walking right.
	// 向左走
	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
		frameRate: 10,
		repeat: -1
	});
	//转身
	this.anims.create({
		key: 'turn',
		frames: [ { key: 'dude', frame: 4 } ],
		frameRate: 20
	});
	//向右走
	this.anims.create({
		key: 'right',
		frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
		frameRate: 10,
		repeat: -1
	});
	
	cursors = this.input.keyboard.createCursorKeys();
	
	this.physics.add.collider(player, layer);
	
}
function create1() {
	
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
	this.stage.backgroundColor = '#000000';
	
	bg =this.add.tileSprite(0, 0, 800, 600, 'background');
	bg.fixedToCamera = true;
	
	map = this.make.tilemap({ key: 'level1' });
	
	map.addTilesetImage('tiles-1');
	
	map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);
	
	layer = map.createLayer('Tile Layer 1');
	
	//  Un-comment this on to see the collision tiles
	// layer.debug = true;
	
	layer.resizeWorld();
	
	this.physics.arcade.gravity.y = 250;
	
	player =this.add.sprite(32, 32, 'dude');
	this.physics.enable(player, Phaser.Physics.ARCADE);
	
	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;
	player.body.setSize(20, 32, 5, 16);
	
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('turn', [4], 20, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	this.camera.follow(player);
	
	cursors =this.input.keyboard.createCursorKeys();
	jumpButton =this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	
}

function update(time, delta) {
	// controls.update(delta);
	if (cursors.left.isDown)
	{
		player.setVelocityX(-160);
		
		player.anims.play('left', true);
	}
	else if (cursors.right.isDown)
	{
		player.setVelocityX(160);
		
		player.anims.play('right', true);
	}
	else
	{
		player.setVelocityX(0);
		
		player.anims.play('turn');
	}
	console.log(cursors.up.isDown, player.body.touching.down)
	if (cursors.up.isDown && player.body.touching.down)
	{
		player.setVelocityY(-330);
	}

}
function update1() {
	
	this.physics.arcade.collide(player, layer);
	
	player.body.velocity.x = 0;
	
	if (cursors.left.isDown)
	{
		player.body.velocity.x = -150;
		
		if (facing != 'left')
		{
			player.animations.play('left');
			facing = 'left';
		}
	}
	else if (cursors.right.isDown)
	{
		player.body.velocity.x = 150;
		
		if (facing != 'right')
		{
			player.animations.play('right');
			facing = 'right';
		}
	}
	else
	{
		if (facing != 'idle')
		{
			player.animations.stop();
			
			if (facing == 'left')
			{
				player.frame = 0;
			}
			else
			{
				player.frame = 5;
			}
			
			facing = 'idle';
		}
	}
	
	if (jumpButton.isDown && player.body.onFloor() &&this.time.now > jumpTimer)
	{
		player.body.velocity.y = -250;
		jumpTimer =this.time.now + 750;
	}
	
}



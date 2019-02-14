window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
    
    function preload() {
        // Load an image
        game.load.image( 'square', 'assets/square.png' );
        game.load.image( 'triangle', 'assets/triangle.png' );
        //game.load.tilemap('map', 'assets/tilemap_example.csv', null, Phaser.Tilemap.CSV);
        
        //load tiles for map
        game.load.audio('music', 'assets/Kai_Engel_-_08_-_November.mp3');
        
        game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles-1', 'assets/tiles-1.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.spritesheet('droid', 'assets/droid.png', 32, 32);
        game.load.image('starSmall', 'assets/star.png');
        game.load.image('starBig', 'assets/star2.png');
        game.load.image('background', 'assets/background2.png');
    }
    
    var layer1;
    var music;
    var map;
    var tileset;
    var layer;
    var player;
    var player2;
    var facing = 'left';
    var jumpTimer = 0;
    var jumpTimer2 = 0;
    var cursors;
    var jumpButton;
    var jumpButton2;
    var bg;
    var keys;
    
    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#000000';

        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
        bg.fixedToCamera = true;

        map = game.add.tilemap('level1');

        map.addTilesetImage('tiles-1');

        map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

        layer = map.createLayer('Tile Layer 1');

        //  Un-comment this on to see the collision tiles
        // layer.debug = true;

        layer.resizeWorld();

        game.physics.arcade.gravity.y = 250;

        player = game.add.sprite(32, 32, 'square');
        game.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.body.setSize(20, 32, 5, 16);

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('turn', [4], 20, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        player2 = game.add.sprite(32, 32, 'dude');
        game.physics.enable(player2, Phaser.Physics.ARCADE);

        player2.body.bounce.y = 0.2;
        player2.body.collideWorldBounds = true;
        player2.body.setSize(20, 32, 5, 16);

        player2.animations.add('left', [0, 1, 2, 3], 10, true);
        player2.animations.add('turn', [4], 20, true);
        player2.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player);
        

        cursors = game.input.keyboard.createCursorKeys();
        cursors = game.input.keyboard.addKey(Phaser.Keyboard.W);
        cursors = game.input.keyboard.addKey(Phaser.Keyboard.A);
        cursors = game.input.keyboard.addKey(Phaser.Keyboard.S);
        cursors = game.input.keyboard.addKey(Phaser.Keyboard.D);
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        jumpButton2 = game.input.keyboard.addKey(Phaser.Keyboard.W);
        music = game.add.audio('music');
        music.start();
        
        //triangle = game.add.sprite( game.world.centerX, game.world.centerY, 'triangle.png' );
        //triangle.anchor.setTo(0.5, 0.5);
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable(triangle, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //triangle.body.collideWorldBounds = true;
        
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( 400, 15, "Find the triangle.", style );
        text.fixedToCamera = true;
        text.anchor.setTo( 0.5, 0.0 );
        
    }
    
    function update() {
        game.physics.arcade.collide(player, layer);

        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
          player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
        }
        
    
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
        {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
        
        game.physics.arcade.collide(player2, layer);

        player2.body.velocity.x = 0;

        if (cursors.A.isDown)
        {
          player2.body.velocity.x = -150;

          if (facing != 'left')
          {
               player2.animations.play('left');
               facing = 'left';
          }
        }
        else if (cursors.D.isDown)
        {
            player2.body.velocity.x = 150;

            if (facing != 'right')
            {
                player2.animations.play('right');
                facing = 'right';
            }
        }
        else
        {
            if (facing != 'idle')
            {
                player2.animations.stop();

                if (facing == 'left')
                {
                    player2.frame = 0;
                }
                else
                {
                    player2.frame = 5;
                }

                facing = 'idle';
            }
        }
    
        if (jumpButton2.isDown && player2.body.onFloor() && game.time.now > jumpTimer2)
        {
            player2.body.velocity.y = -250;
            jumpTimer2 = game.time.now + 750;
        }
 }
function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
};

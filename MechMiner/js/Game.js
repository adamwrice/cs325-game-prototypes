"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var cursors;
    var map;
    var ore;

    var layer;
    var sprite;

    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    function collectOre(player, ore) {

    ore.kill();

    }   

    function render() {
            game.debug.body(sprite);
    }
    
    return {
        
        create: function () {
    
            map = game.add.tilemap('map');

            map.addTilesetImage('ground_1x1');
            map.addTilesetImage('walls_1x2');
            map.addTilesetImage('tiles2');

            map.setCollisionBetween(1, 12);

            layer = map.createLayer('Tile Layer 1');

            layer.resizeWorld();

            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  Here we create ore group
            ore = game.add.group();
            ore.enableBody = true;

            //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the ore group
            map.createFromObjects('Object Layer 1', 34, 'ore', 0, true, false, ore);

            sprite = game.add.sprite(260, 100, 'phaser');
            sprite.anchor.set(0.5);

            game.physics.arcade.enable(sprite);

            //  This adjusts the collision body size.
            sprite.body.setSize(32, 32, 0, 0);

            //  We'll set a lower max angular velocity here to keep it from going totally nuts
            sprite.body.maxAngular = 500;

            //  Apply a drag otherwise the sprite will just spin and never slow down
            sprite.body.angularDrag = 50;

            game.camera.follow(sprite);

            cursors = game.input.keyboard.createCursorKeys();

          
        },
    
        update: function () {
    
            game.physics.arcade.collide(sprite, layer);
            game.physics.arcade.overlap(sprite, ore, collectOre, null, this);

            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
            sprite.body.angularVelocity = 0;

            if (cursors.left.isDown)
            {
                sprite.body.angularVelocity = -300;
            }
            else if (cursors.right.isDown)
            {
                sprite.body.angularVelocity = 300;
            }

            if (cursors.up.isDown)
            {
                game.physics.arcade.velocityFromAngle(sprite.angle, 300, sprite.body.velocity);
            }
        }
    }
};

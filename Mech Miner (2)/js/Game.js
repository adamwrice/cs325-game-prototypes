"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var cursors;
    var burnButton;
    var digButton;
    var map;
    var diamondOre;
    var goldOre;
    var silverOre;
    var ironOre;
    var copperOre;
    var energy = 1000;
    var heat = 0.0;
    var diamond = 0;
    var gold = 0;
    var silver = 0;
    var iron = 0;
    var copper = 0;
    var ore;

    var layer;
    var sprite;
    var digSound;
    var burnSound;

    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    function endGame() {
        game.state.start('EndScreen');
    }
    
    function collectOre(player, ore) {
        if (ore == 'diamond')
        {
            diamond++;
            energy = energy - 300;
        }
        else if (ore == 'gold')
        {
            gold++;
            energy = energy - 200;
        }
        else if (ore == 'silver')
        {
            silver++;
            energy = energy - 100;
        }
        else if (ore == 'iron')
        {
            iron++;
            energy = energy - 50;
        }
        else {
            copper++;
            energy = energy - 30;
        }
        ore.kill();
    }   
    
    function burn(ore) {
        if (ore == 'diamond')
        {
            diamond--;
            energy = energy + 600;
        }
        else if (ore == 'gold')
        {
            gold--;
            energy = energy + 400;
        }
        else if (ore == 'silver')
        {
            silver--;
            energy = energy + 200;
        }
        else if (ore == 'iron')
        {
            iron--;
            energy = energy + 100;
        }
        else {
            copper--;
            energy = energy + 60;
        }
        burnSound.play();
        heat = heat + 1;
    }

    function render() {
            this.add.text(0, 10, "Energy: " + energy);
            this.add.text(0, 40, "Heat: " + heat);
            if (burnButton.isDown){
                burn(ore);
            }
            
            
            if(energy <= 0)
            {
                quitGame();
            }
            else if (heat >= 10)
            {
                quitGame();
            }
            energy--;
            if (heat > 0)
            {
                heat = heat-0.1;
            }
    }
    
    return {
        
        create: function () {
    
            map = game.add.tilemap('map');

            map.addTilesetImage('ground_1x1');
            map.addTilesetImage('walls_1x2');
            map.addTilesetImage('tiles2');
            //map.addTilesetImage('ores');

            map.setCollisionBetween(1, 12);

            layer = map.createLayer('Tile Layer 1');

            layer.resizeWorld();
            
            digSound = game.add.audio('digSound');
            burnSound = game.add.audio('burnSound');
            
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  Here we create ore group
            ore = game.add.group();
            ore.enableBody = true;

            //  And now we convert all of the Tiled objects into sprites within the ore group
            diamondOre = game.add.sprite(10, 10, 'diamond');
            goldOre = game.add.sprite(10, 10, 'gold');
            silverOre = game.add.sprite(10, 10, 'silver');
            ironOre = game.add.sprite(10, 10, 'iron');
            copperOre = game.add.sprite(10, 10, 'copper');
            map.createFromObjects('Object Layer 1', 5, 'diamond', 0, true, false, ore);
            map.createFromObjects('Object Layer 1', 4, 'gold', 0, true, false, ore);
            map.createFromObjects('Object Layer 1', 3, 'silver', 0, true, false, ore);
            map.createFromObjects('Object Layer 1', 2, 'iron', 0, true, false, ore);
            map.createFromObjects('Object Layer 1', 1, 'copper', 0, true, false, ore);

            sprite = game.add.sprite(260, 100, 'phaser');
            sprite.anchor.set(0.5);

            game.physics.arcade.enable(sprite);

            //  This adjusts the collision body size.
            sprite.body.setSize(100, 64, 0, 0);

            //  We'll set a lower max angular velocity here to keep it from going totally nuts
            sprite.body.maxAngular = 500;

            //  Apply a drag otherwise the sprite will just spin and never slow down
            sprite.body.angularDrag = 50;

            game.camera.follow(sprite);

            cursors = game.input.keyboard.createCursorKeys();
            burnButton =  game.input.keyboard.addKey(Phaser.Keycode.B);
            digButton = game.input.keyboard.addKey(Phaser.Keycode.X);
          
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
            if (digButton.isDown)
            {
                digSound.play();
            }
        }
    }
};

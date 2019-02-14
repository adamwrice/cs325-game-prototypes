window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game( 1600, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
        // load a tilemap and call it 'map'.
        // from .json file
        game.load.tilemap('map', 'assets/tilemap_example.json', null, Phaser.Tilemap.TILED_JSON);
        // alternatively, from .csv file
        //game.load.tilemap('map', 'assets/tilemap_example.csv', null, Phaser.Tilemap.CSV);
        
        //load tiles for map
        game.load.image('tiles', 'assets/tiles.png');
        game.load.audio('music', 'assets/Kai_Engel_-08_-_November.mp3');
    }
    
    var map;
    var layer1;
    var square;
    var triangle;
    var music;
    
    function create() {
        music = game.add.audio('music');
        music.loopFull(0.6);
        // Create the map. 
        map = game.add.tilemap('map');
        // for csv files specify the tile size.
        //map = game.add.tilemap('map', 32, 32);
        
        //add tiles
        map.addTilesetImage('tiles');
        
        // Create a layer from the map
        //using the layer name given in the .json file
        layer1 = map.createLayer('Tile Layer 1');
        //for csv files
        //layer1 = map.createLayer(0);
        
        //  Resize the world
        layer1.resizeWorld();
        
        //Create a sprite
        square = game.add.sprite( game.world.centerX, game.world.centerY, 'square.png' );
        square.anchor.setTo( 0.5, 0.5 );
        triangle = game.add.sprite( game.world.centerX, game.world.centerY, 'triangle.png' );
        triangle.anchor.setTo(0.5, 0.5);
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( square, Phaser.Physics.ARCADE );
        game.physics.enable( triangle, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        square.body.collideWorldBounds = true;
        triangle.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( 400, 15, "Build something amazing.", style );
        //text.fixedToCamera = true;
        //text.anchor.setTo( 0.5, 0.0 );
        
        game.camera.follow(square);
        
    }
    
    function update() {
        
    }
};

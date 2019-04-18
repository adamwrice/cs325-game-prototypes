"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
   

        function render() {

           
        }
    
    return {
        
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            map = game.add.tilemap('matching');

            //map.addTilesetImage('Desert', 'tiles');

            //tileset = game.add.tileset('tiles');

            //layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

            //layer.resizeWorld();

          
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
           
        }
    }
};

"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloaderBackground');
            preloadBar = game.add.sprite(300, 400, 'preloaderBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assests/title.jpg');
            game.load.atlas('playButton', 'assests/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assests/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
             game.load.tilemap('map', 'assests/features_test.json', null, Phaser.Tilemap.TILED_JSON);

	    game.load.image('ground_1x1', 'assests/ground_1x1.png');
	    game.load.image('walls_1x2', 'assests/walls_1x2.png');
	    game.load.image('tiles2', 'assests/tiles2.png');

	    game.load.image('phaser', 'assests/Drill.png');
	    game.load.image('diamond', 'assests/diamond.png');
	    game.load.image('gold', 'assests/gold.png');
	    game.load.image('silver', 'assests/silver.png');
	    game.load.image('iron', 'assests/iron.png');
	    game.load.image('copper', 'assests/copper.png');
	    game.load.image('EndScreen', 'assets/EndScreen.png');
		
	    game.load.audio('digSound', 'assests/Can Opener Electric-SoundBible.com-1371525874.mp3');
	    game.load.audio('burnSound', 'assests/burning.mp3');
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};

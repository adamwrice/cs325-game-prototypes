"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var timeCheck = 0; //borrowed code below
    var flipFlag = false;

    var startList = new Array();
    var squareList = new Array();

    var masterCounter = 0;
    var squareCounter = 0;
    var clickCount = 0;
    var square1Num;
    var square2Num;
    var savedSquareX1;
    var savedSquareY1;
    var savedSquareX2;
    var savedSquareY2;

    var map;
    var tileset;
    var layer;

    var marker;
    var currentTile;
    var currentTilePosition;
    var currentNum;

    var tileBack = 25;
    var timesUp = '+';
    var youWin = '+';

    var myCountdownSeconds;
    var mySeconds;
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        
        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    function countDownTimer() {

            var timeLimit = 120;

            mySeconds = game.time.totalElapsedSeconds();
            myCountdownSeconds = timeLimit - mySeconds;

            if (myCountdownSeconds <= 0) 
                {
                // time is up
                timesUp = 'Time is up!'; 
                myCountdownSeconds = 0;

            }
        }
        function flipOver() {

            map.putTile(currentNum, layer.getTileX(marker.x), layer.getTileY(marker.y));
        }
        function processClick() {
       
            currentTile = map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y));
            currentTilePosition = ((layer.getTileY(game.input.activePointer.worldY)+1)*6)-(6-(layer.getTileX(game.input.activePointer.worldX)+1));

            if (game.input.mousePointer.isDown)
            {
                // check to make sure the tile is not already flipped
                if (currentTile.index == tileBack)
                {
                    // get the corresponding item out of squareList
                    currentNum = squareList[currentTilePosition-1];
                    flipOver();
                    squareCounter++;
                    clickCount++;

                    // is the second tile of pair flipped?
                    if  (squareCounter == 2)
                    {
                        // reset squareCounter
                        squareCounter = 0;
                        square2Num = currentNum;
                        // check for match
                        if (square1Num == square2Num)
                        {
                            masterCounter++;

                            if (masterCounter == 18)
                            {
                                // go "win"
                                youWin = 'Got them all!';
                                if (clickCount == 18)
                                {
                                    youWin = 'Hard-mode achieved';
                                }
                            }
                            else
                            {
                                savedSquareX2 = layer.getTileX(marker.x);
                                savedSquareY2 = layer.getTileY(marker.y);
                                flipFlag = true;
                                timeCheck = game.time.totalElapsedSeconds();
                                flipBack();
                            }
                        }
                        else
                        {
                            savedSquareX1 = layer.getTileX(marker.x);
                            savedSquareY1 = layer.getTileY(marker.y);
                            square1Num = currentNum;
                            this.destroy();
                            this.destroy();
                        }
                    }
                }
            }
        }

        function flipBack() {

            flipFlag = false;

            map.putTile(tileBack, savedSquareX1, savedSquareY1);
            map.putTile(tileBack, savedSquareX2, savedSquareY2);

        }

        function randomizeTiles() {
            var num;
            for (num = 1; num <= 18; num++)
            {
                startList.push(num);
            }
            for (num = 1; num <= 18; num++)
            {
                startList.push(num);
            }

            // for debugging
            //myString1 = startList.toString();

            // randomize squareList
            var i;
            for (i = 1; i <=36; i++)
            {
                var randomPosition = game.rnd.integerInRange(0,startList.length - 1);

                var thisNumber = startList[ randomPosition ];

                squareList.push(thisNumber);
                var a = startList.indexOf(thisNumber);

                startList.splice( a, 1);
            }

            // for debugging
            //myString2 = squareList.toString();
            var col;
            var row;
            for (col = 0; col < 6; col++)
            {
                for (row = 0; row < 6; row++)
                {
                    map.putTile(tileBack, col, row);
                }
            }
        }

        function getHiddenTile() {
            var thisTile;
            thisTile = squareList[currentTilePosition-1];
            return thisTile;
        }

        function render() {

            game.debug.text(timesUp, 620, 208, 'rgb(0,255,0)');
            game.debug.text(youWin, 620, 240, 'rgb(0,255,0)');

            game.debug.text('Time: ' + myCountdownSeconds, 620, 15, 'rgb(0,255,0)');

            //game.debug.text('squareCounter: ' + squareCounter, 620, 272, 'rgb(0,0,255)');
            game.debug.text('Matched Pairs: ' + masterCounter, 620, 304, 'rgb(0,0,255)');
                game.debug.text('Matched Pairs: ' + clickCount, 620, 320, 'rgb(0,0,255)');


            //game.debug.text('startList: ' + myString1, 620, 208, 'rgb(255,0,0)');
            //game.debug.text('squareList: ' + myString2, 620, 240, 'rgb(255,0,0)');


            game.debug.text('Tile: ' + map.getTile(layer.getTileX(marker.x), layer.getTileY(marker.y)).index, 620, 48, 'rgb(255,0,0)');

            game.debug.text('LayerX: ' + layer.getTileX(marker.x), 620, 80, 'rgb(255,0,0)');
            game.debug.text('LayerY: ' + layer.getTileY(marker.y), 620, 112, 'rgb(255,0,0)');

            game.debug.text('Tile Position: ' + currentTilePosition, 620, 144, 'rgb(255,0,0)');
            game.debug.text('Hidden Tile: ' + getHiddenTile(), 620, 176, 'rgb(255,0,0)');
        }
    
    return {
        
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            map = game.add.tilemap('matching');

             map.addTilesetImage('Desert', 'tiles');

            //tileset = game.add.tileset('tiles');

            layer = map.createLayer('Ground');//.tilemapLayer(0, 0, 600, 600, tileset, map, 0);

            //layer.resizeWorld();

            marker = game.add.graphics();
            marker.lineStyle(2, 0x00FF00, 1);
            marker.drawRect(0, 0, 100, 100);

            randomizeTiles();
            
            
            // When you click on the sprite, you go back to the MainMenu.
            //bouncy.inputEnabled = true;
            //bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
           
        countDownTimer();
    
            if (layer.getTileX(game.input.activePointer.worldX) <= 5) // to prevent the marker from going out of bounds
            {
                marker.x = layer.getTileX(game.input.activePointer.worldX) * 100;
                marker.y = layer.getTileY(game.input.activePointer.worldY) * 100;
            }

            if (flipFlag == true) 
            {
                if (game.time.totalElapsedSeconds() - timeCheck > 0.5)
                {
                    flipBack();
                }
            }
            else
            {
                processClick();
            }
        }
    }
};

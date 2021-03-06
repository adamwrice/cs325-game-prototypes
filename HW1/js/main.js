//window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".


//Begin borrowed code
// mods by Patrick OReilly
// Twitter: @pato_reilly Web: http://patricko.byethost9.com

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'HW1', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.spritesheet('item', 'assets/number-buttons.png', 160, 160);
}

var simon;
var N = 1;
var userCount = 0;
var currentCount = 0;
var sequenceCount = 16;
var sequenceList = [];
var simonSez = false;
var timeCheck;
var litSquare;
var winner;
var loser;
var intro;
var doesHe; //added in

function create() {

    simon = game.add.group();
    var item;

    for (var i = 0; i < 3; i++)
    {
        item = simon.create(150 + 168 * i, 150, 'item', i);
        // Enable input.
        item.inputEnabled = true;
        item.input.start(0, true);
        item.events.onInputDown.add(select);
        item.events.onInputUp.add(release);
        item.events.onInputOut.add(moveOff);
        simon.getAt(i).alpha = 0;
    }

    for (var i = 0; i < 3; i++)
    {
        item = simon.create(150 + 168 * i, 318, 'item', i + 3);
        // Enable input.
        item.inputEnabled = true;
        item.input.start(0, true);
        item.events.onInputDown.add(select);
        item.events.onInputUp.add(release);
        item.events.onInputOut.add(moveOff);
        simon.getAt(i + 3).alpha = 0;
    }

    introTween();
    setUp();
    setTimeout(function(){simonSequence(); intro = false;}, 6000);

}

function restart() {

    N = 1;
    userCount = 0;
    currentCount = 0;
    sequenceList = [];
    winner = false;
    loser = false;
    introTween();
    setUp();
    setTimeout(function(){simonSequence(); intro=false;}, 6000);

}

function introTween() {

    intro = true;

    for (var i = 0; i < 6; i++)
    {
        var flashing = game.add.tween(simon.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 4, true);
        var final = game.add.tween(simon.getAt(i)).to( { alpha: .25 }, 500, Phaser.Easing.Linear.None, true);

        flashing.chain(final);
        flashing.start();
    }

}

function update() {

    if (simonSez)
    {
        if (game.time.now - timeCheck >700-N*40)
        {
            simon.getAt(litSquare).alpha = .25;
            game.paused = true;

            setTimeout(function()
            {
                if ( currentCount< N)
                {
                    game.paused = false;
                    simonSequence();
                }
                else
                {
                    simonSez = false;
                    game.paused = false;
                }
            }, 400 - N * 20);
        }
    }
}

function playerSequence(selected) { 
    //stop borrowed code
    if (doesHe == 5)
    {
        setTimeout(function(){}, 5000);
        if (thisSquare == correctSquare || thisSquare != correctSquare)
        {
            loser = true;
            alert("I didn't say Simon Says!!!");
            setTimeout(function(){restart();}, 3000);
        }
        else 
        {
        setTimeout(function(){simonSequence();},3000);
        }
    }
    else {
        correctSquare = sequenceList[userCount];
        userCount++;
        thisSquare = simon.getIndex(selected);

       if (thisSquare == correctSquare)
     {
           if (userCount == N)
          {
             if (N == sequenceCount)
                {
                 winner = true;
                 setTimeout(function(){restart();}, 3000);
             }
             else
             {
                    userCount = 0;
                    currentCount = 0;
                    N++;
                    simonSez = true;
             }
         }
        }
        else
        {
           loser = true;
           setTimeout(function(){restart();}, 3000);
     }
    }
}

function simonSequence () { //resume borrowed code
    
    doesHe = Math.floor((Math.random()*8)+1); //not borrowed
    if (doesHe == 5)
    {
        simonSez = false;
    }
    else
    {
        simonSez = true;
    }
    litSquare = sequenceList[currentCount];
    simon.getAt(litSquare).alpha = 1;
    timeCheck = game.time.now;
    currentCount++;
   

}

function setUp() {

    for (var i = 0; i < sequenceCount; i++)
    {
        thisSquare = game.rnd.integerInRange(0,5);
        sequenceList.push(thisSquare);
    }

}

function select(item, pointer) {

    if (!simonSez && !intro && !loser && !winner)
    {
        item.alpha = 1;
    }

}

function release(item, pointer) {

    if (!simonSez && !intro && !loser && !winner)
    {
        item.alpha = .25;
        playerSequence(item);
    }
}

function moveOff(item, pointer) {

    if (!simonSez && !intro && !loser && !winner)
    {
        item.alpha = .25;
    }

}

function render() {

    if (!intro)
    {
        if (simonSez) //not borrowed
        { 
           game.debug.text('Simon Says...', 360, 96, 'rgb(255,0,0)');
        }
        else if (simonSez && doesHe == 5) //not borrowed
        {
           game.debug.text('Do this', 360, 96, 'rgb(255,0,0)');
        }
        else  //not borrowed
        {
            game.debug.text('Your Turn', 360, 96, 'rgb(0,255,0)');
        }
    }
    else
    {
        game.debug.text('Get Ready', 360, 96, 'rgb(0,0,255)');
    }

    if (winner)
    {
        game.debug.text('You Win!', 360, 32, 'rgb(0,0,255)');
    }
    else if (loser)
    {
        game.debug.text('You Lose!', 360, 32, 'rgb(0,0,255)');
    }

} //end borrowed code
//};

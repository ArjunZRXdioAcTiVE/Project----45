const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var 
    cannonKart1, cannonLauncher1, 
    cannonKart2, cannonLauncher2
;

var 
    cannonKart1_Img, cannonLauncher1_Img, 
    cannonKart2_Img, cannonLauncher2_Img, 
    cannonBalls = [], cBI, launchE
;

var castle1, castleDP_1, castleMP_1, castleUP_1;
var castle2, castleDP_2, castleMP_2, castleUP_2;

var
    castle1Broken_Img, 
    castle1DP_Img, 
    castle1MP_Img, 
    castle1UP_Img
;

var
    castle2Broken_Img, 
    castle2DP_Img, 
    castle2MP_Img, 
    castle2UP_Img
;



var 
    form, formBackground_Img,
    game,  gameState = 0, background_Img,
    player, playerCount = 0
;

var engine, world;

var firebase;

var seconds = [], m;

function preload () {
    cannonKart1_Img = loadImage ("assets/cannonKart1.png");
    cannonLauncher1_Img = loadImage ("assets/cannonLauncher1.png");

    cannonKart2_Img = loadImage ("assets/cannonKart2.png");
    cannonLauncher2_Img = loadImage ("assets/cannonLauncher2.png");
    
    cBI = loadImage ("assets/cannonBall_I.png");
    launchE = loadImage ("assets/fire.png");

    background_Img = loadImage ("assets/background.jpg");

    castle1Broken_Img = loadImage ("assets/castleAssets/castle1.png");
    castle1DP_Img = loadImage ("assets/castleAssets/castleDownPart1.png");
    castle1MP_Img = loadImage ("assets/castleAssets/castleMiddlePart1.png");
    castle1UP_Img = loadImage ("assets/castleAssets/castleUpPart1.png");

    castle2Broken_Img = loadImage ("assets/castleAssets/castle2.png");
    castle2DP_Img = loadImage ("assets/castleAssets/castleDownPart2.png");
    castle2MP_Img = loadImage ("assets/castleAssets/castleMiddlePart2.png");
    castle2UP_Img = loadImage ("assets/castleAssets/castleUpPart2.png");

    formBackground_Img = loadImage ("assets/formBackground.png");
}

function setup () {
    createCanvas (windowWidth, windowHeight);

    engine = Engine.create();
    world = engine.world;

    firebase = firebase.database ();

    game = new Game ();
    game.initializeGame ();

    game.reset();
}

function draw () {
    if (playerCount < 2) {
        background(formBackground_Img);
    }

        // if (playerCount == 2 && !player.messageSetupExecuted) {
        // Message Setup Execution here

        // player.messagingSetup ()
        // player.messageSetupExecuted = true;
    // }   else {
        // if (!seconds[0] && player.messageSetupExecuted) {
        //     const n = World.seconds;
        //     console.log (`${world.seconds} n: ${n}`)
        //     seconds.push (n);

        //     m = n + 3;
        //     console.log (m);
        // }

        // if (World.seconds === m) {
        //     game.gameStart ();
        // }
    // }

    if (playerCount == 2 && gameState == 0) {
        // console.log (player.index);

        game.gameStart ();
        gameState = 1;

        game.detectCannonBallP (player.opponentIndex);     
    }

    if (playerCount == 2 && gameState == 1) {
        game.play();
    }

    Engine.update(engine);
    drawSprites ();
}
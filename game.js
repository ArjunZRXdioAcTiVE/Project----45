class Game {
  constructor() {
    this.button = createButton("RESET")
      .position(width / 2 + 400, height / 2 + -200)
      .class("customButton");

    this.wall = Bodies.rectangle(
      width / 2,
      height / 2, 
      10, 
      height, 
      {isStatic: true,}
    );

    this.ground = Bodies.rectangle(
      width/2,
      height - 10,
      width,
      20,
      {isStatic: true}
    );

    World.add(world, this.ground);
    this.sprite = createSprite (
      this.ground.position.x,
      this.ground.position.y,
      width - 10,
      20
    );

    this.sCreating = false;
    this.shot = false;

    this.oBCreated = false
    this.oCBX = 0;
    this.oCBY = 0;
  }

  trackState() {
    var stateRef = firebase.ref("gameState");
    stateRef.on("value", (data) => {
      gameState = data.val();
    });
  }

  initializeGame() {
    player = new Player();
    this.trackState();
    player.trackPlayerCount();

    if (playerCount < 2) {
      form = new Form();
      form.buttonClicked();
    } else {
      var sorryMessage = createElement("h6")
        .html(
          `Sorry, two players have already joined the session</br>
          please join the session later`
        )
        .position(width / 2 - 500, height / 2 - 100)
        .class("greeting")
      ;
    }

    // setup references before entering form
  }

  gameStart() {
    //  player.hideMessage();
    form.greeting.hide();

    if (player.index == 1) {
      castle1 = createSprite(player.positionX + 60, height - 195);
      castle1.addImage(castle1Broken_Img);
      castle1.scale = 0.37;

      castleDP_1 = createSprite(player.positionX + 182.5, height - 101.5);
      castleDP_1.addImage(castle1DP_Img);
      castleDP_1.scale = 0.37;

      castleMP_1 = createSprite(player.positionX + 148, height - 244.5);
      castleMP_1.addImage(castle1MP_Img);
      castleMP_1.scale = 0.37;

      castleUP_1 = createSprite(player.positionX + 83.1, height - 314.8);
      castleUP_1.addImage(castle1UP_Img);
      castleUP_1.scale = 0.37;

      cannonKart1 = createSprite(player.positionX, height - 40);
      cannonKart1.addImage(cannonKart1_Img);
      cannonKart1.scale = 0.085;

      cannonLauncher1 = createSprite(player.positionX, height - 70);
      cannonLauncher1.addImage(cannonLauncher1_Img);
      cannonLauncher1.scale = 0.085;

      // castle2 = createSprite(width - 185, height - 195);
      // castle2.addImage(castle2Broken_Img);
      // castle2.scale = 0.37;

      // castleDP_2 = createSprite(width - 307, height - 101.75);
      // castleDP_2.addImage(castle2DP_Img);
      // castleDP_2.scale = 0.37;

      // castleMP_2 = createSprite(width - 273, height - 245);
      // castleMP_2.addImage(castle2MP_Img);
      // castleMP_2.scale = 0.37;

      // castleUP_2 = createSprite(width - 208.1, height - 314.8);
      // castleUP_2.addImage(castle2UP_Img);
      // castleUP_2.scale = 0.37;

      cannonKart2 = createSprite(width - 160, height - 40);
      cannonKart2.addImage(cannonKart2_Img);
      cannonKart2.scale = 0.085;

      cannonLauncher2 = createSprite(width - 160, height - 70);
      cannonLauncher2.addImage(cannonLauncher2_Img);
      cannonLauncher2.scale = 0.085;
    } else {
      castle2 = createSprite(player.positionX - 25, height - 195);
      castle2.addImage(castle2Broken_Img);
      castle2.scale = 0.37;

      castleDP_2 = createSprite(player.positionX - 147, height - 101.75);
      castleDP_2.addImage(castle2DP_Img);
      castleDP_2.scale = 0.37;

      castleMP_2 = createSprite(player.positionX - 113, height - 245);
      castleMP_2.addImage(castle2MP_Img);
      castleMP_2.scale = 0.37;

      castleUP_2 = createSprite(player.positionX - 48.1, height - 314.8);
      castleUP_2.addImage(castle2UP_Img);
      castleUP_2.scale = 0.37;

      cannonKart2 = createSprite(player.positionX, height - 40);
      cannonKart2.addImage(cannonKart2_Img);
      cannonKart2.scale = 0.085;

      cannonLauncher2 = createSprite(player.positionX, height - 70);
      cannonLauncher2.addImage(cannonLauncher2_Img);
      cannonLauncher2.scale = 0.085;

      var castlePx = Math.round(width / 3 - 300);

      castle1 = createSprite(castlePx + 60, height - 195);
      castle1.addImage(castle1Broken_Img);
      castle1.scale = 0.37;

      castleDP_1 = createSprite(castlePx + 182.5, height - 101.5);
      castleDP_1.addImage(castle1DP_Img);
      castleDP_1.scale = 0.37;

      castleMP_1 = createSprite(castlePx + 148, height - 244.5);
      castleMP_1.addImage(castle1MP_Img);
      castleMP_1.scale = 0.37;

      castleUP_1 = createSprite(castlePx + 83.1, height - 314.8);
      castleUP_1.addImage(castle1UP_Img);
      castleUP_1.scale = 0.37;

      cannonKart1 = createSprite(castlePx, height - 40);
      cannonKart1.addImage(cannonKart1_Img);
      cannonKart1.scale = 0.085;

      cannonLauncher1 = createSprite(castlePx, height - 70);
      cannonLauncher1.addImage(cannonLauncher1_Img);
      cannonLauncher1.scale = 0.085;
    }
  }

  play() {
    imageMode(CENTER);
    image(background_Img, width / 2, height / 2, width, height);

    if (player.index == 1) {
      if (!keyDown("space")) {
        this.moveCannonKart(cannonKart1, cannonLauncher1);
        
        player.positionX = cannonKart1.position.x;
        this.writePosition();
        this.readPosition(cannonKart2, cannonLauncher2);


        this.rotateCannonLauncher(cannonLauncher1, UP_ARROW, DOWN_ARROW);

        this.writeAngle(cannonLauncher1.rotation);
        this.readAngle(cannonLauncher2);

      } else if (keyDown("space")) {
        if (!this.sCreating) {
          this.addCannonBall();
        }

        if (this.sCreating && cannonBalls[cannonBalls.length-1].shot) {
          this.addCannonBall();
        }
      }  
      
      if (keyDown ("s") && this.sCreating && !cannonBalls[cannonBalls.length-1].shot) {
        cannonBalls[cannonBalls.length-1].shoot(cannonLauncher1);
        cannonBalls[cannonBalls.length-1].shot = true;
      }

      if (this.ballCreated) {
       this.displayCannonBall ();
      }
    } else if (player.index == 2) {
      if (!keyDown("space")) {
        this.moveCannonKart(cannonKart2, cannonLauncher2);

        player.positionX = cannonKart2.position.x;
        this.writePosition();
        this.readPosition(cannonKart1, cannonLauncher1);


        this.rotateCannonLauncher(cannonLauncher2, DOWN_ARROW, UP_ARROW)

        this.writeAngle(cannonLauncher2.rotation);
        this.readAngle(cannonLauncher1);

      } else if (keyDown("space")) {
        if (!this.sCreating) {
          this.addCannonBall()
          this.sCreating = true;
        } 

        if (this.sCreating && cannonBalls[cannonBalls.length-1].shot) {
          this.addCannonBall();
        }
      } 
      if (cannonBalls[0]) {
        console.log (cannonBalls[cannonBalls.length - 1].shot);
      }
      if (keyDown("s") && this.sCreating && !cannonBalls[cannonBalls.length-1].shot) {
        cannonBalls[cannonBalls.length-1].shoot(cannonLauncher2)
        cannonBalls[cannonBalls.length-1].shot  = true;
      }

      if (this.oBCreated) {
        image(cBI, this.oCBX, this.oCBY, 40, 40);
      }
      
      if (this.sCreating) {
        for (var i = 0; i<cannonBalls.length; i++) {
          if (!cannonBalls[i].ballRemoved) {
            this.displayCannonBall();
          }
        }
      }
    }
  }

  moveCannonKart(kart, launcher) {
    if (keyDown(RIGHT_ARROW)) {
      kart.position.x += 1;
      launcher.position.x += 1;

      if (player.index == 1 && kart.position.x > width / 2) {
        kart.position.x -= 50;
        launcher.position.x -= 50;
      } else if (player.index == 2 && kart.position.x > width) {
        kart.position.x -= 50;
        launcher.position.x -= 50;
      }
    } else if (keyDown(LEFT_ARROW)) {
      kart.position.x -= 1;
      launcher.position.x -= 1;

      if (player.index == 1 && kart.position.x < 0) {
        kart.position.x += 50;
        launcher.position.x += 50;
      } else if (player.index == 2 && kart.position.x < width/2) {
        kart.position.x += 50;
        launcher.position.x += 50
      }
    }
  }

  rotateCannonLauncher (launcher, key1, key2) {
    if (keyDown(key1) && launcher.rotation > -45) {
      launcher.rotation -= 2;
    } else if (keyDown(key2) && launcher.rotation < 45) {
      launcher.rotation +=2;
    }  
  }

  addCannonBall () {
    var cannonBall = new CannonBall();
    cannonBalls.push(cannonBall);
    console.log (cannonBalls);
    this.ballCreated = true;

    firebase.ref(`players/player${player.index}/cannonBall`).set ({
      created: true,
      posX: cannonBalls[cannonBalls.length-1].ball.position.x,
      posY: cannonBalls[cannonBalls.length-1].ball.position.y
    });
  }

  displayCannonBall () {
    cannonBalls[cannonBalls.length-1].displayBall();

    for (var i = 0; i<cannonBalls.length; i++) {
      if (!cannonBalls[i].ballRemoved) {
        var ballP = cannonBalls[i].ball.position
      
        firebase.ref(`players/player${player.index}/cannonBall`)
          .update({
          posX: ballP.x,
          posY: ballP.y
        });
      }
    }    
  }

  detectCannonBall (index) {
    firebase.ref(`players/player${index}`).on("child_added", data => {
      console.log(data.val())

      var data = data.val();

      game.oBCreated = true
      this.detectCannonBallP (index);     
    })
  }

  detectCannonBallP (index) {
    firebase.ref(`players/player${index}/cannonBall`).on("value", data => {
      var data = data.val();
      
      console.log(data)

      if (data !== null) {
        this.oCBX = data.posX;
        this.oCBY = data.posY;
        this.oBCreated = data.created;
      }
    })
  }

  writePosition() {
    firebase.ref(`players/player${player.index}`).update({
      positionX: player.positionX,
    });
  }

  readPosition(kart, launcher) {
    firebase
      .ref(`players/player${player.opponentIndex}/positionX`)
      .on("value", (data) => {
        kart.position.x = data.val();
        launcher.position.x = data.val();
      });
  }

  writeAngle(angle) {
    firebase.ref(`players/player${player.index}`).update({
      angle: angle,
    });
  }

  readAngle(launcher) {
    firebase
      .ref(`players/player${player.opponentIndex}/angle`)
      .on("value", (data) => {
        launcher.rotation = data.val();
      });
  }

  reset() {
    this.button.mouseClicked(() => {
      firebase.ref("/").set({
        players: {},
        playerCount: 0,
        gameState: 0,
        messages: {},
      });
      window.location.reload();
    });
  }
}

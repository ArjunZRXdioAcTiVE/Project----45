class CannonBall {
  constructor() {
    this.ball = Bodies.circle(
      player.positionX,
      cannonLauncher1.position.y,
      20,
      { isStatic: true }
    );
    World.add(world, this.ball);

    this.ballRemoved = false;

    this.shot = false;
  }

  displayBall() {
    if (!this.shot) {
      this.ball.position.x = player.positionX;
    }
    if (!this.ballRemoved) {
      console.log (this.ballRemoved)
      var ballPos = this.ball.position;
      image(cBI, ballPos.x, ballPos.y, 40, 40);  
    }
   
    if (
      this.ball.position.x > width + 60 || 
      this.ball.position.x < -60 ||
      this.ball.position.y > height + 60
    )
    {
      World.remove(world, this.ball);
      this.ball = null

      this.ballRemoved = true
    };
  }

  shoot(launcher) {
    var newAngle = launcher.rotation - 28;
    newAngle = newAngle * (3.14 / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Body.setStatic(this.ball, false);
    Body.setVelocity(this.ball, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14),
    });
  }
}

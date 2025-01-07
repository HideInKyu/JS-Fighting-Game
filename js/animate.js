/* Animation Loop */
const animate = () => {
  window.requestAnimationFrame(animate);
  // Clear canvas for the new frame
  c.fillStyle = "black";
  c.fillRect(0, 0, width, height);
  background.update();
  // Update player positions and velocities
  updatePlayerVelocity(player1);
  updatePlayerVelocity(player2);
  player1.update();
  player2.update();

  // Check collisions between players
  if (isTouching({ b1: player1, b2: player2 })) {
    console.log("Player 2 got hit by Player 1!");
  }
  if (isTouching({ b1: player2, b2: player1 })) {
    console.log("Player 1 got hit by Player 2!");
  }
};

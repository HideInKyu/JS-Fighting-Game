// Function to update player velocity based on key presses
const updatePlayerVelocity = (player) => {
  if (
    player.keys[Object.keys(player.keys)[1]] &&
    player.keys[Object.keys(player.keys)[2]]
  ) {
    player.velocity.x = 0;
  } else if (player.keys[Object.keys(player.keys)[1]]) {
    player.velocity.x = -5;
  } else if (player.keys[Object.keys(player.keys)[2]]) {
    player.velocity.x = 5;
  } else {
    player.velocity.x = 0;
  }

  if (
    player.keys[Object.keys(player.keys)[3]] &&
    player.keys[Object.keys(player.keys)[1]] &&
    !isTouchingGround(player)
  ) {
    player.velocity.x = -15;
    player.angle = player.attackAngle;
  } else if (
    player.keys[Object.keys(player.keys)[3]] &&
    player.keys[Object.keys(player.keys)[2]] &&
    !isTouchingGround(player)
  ) {
    player.velocity.x = 15;
    player.angle = -player.attackAngle;
  } else if (player.keys[Object.keys(player.keys)[3]]) {
    player.gravity = 0.7;
  }
  if (isTouchingGround(player)) {
    player.gravity = 0.4;
    player.angle = 0;
    player.jumpCount = 0;
    player.isAttacking = false;
  }
};

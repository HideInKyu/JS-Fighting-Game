// Function to handle player movement
const playerMovement = (player) => {
  window.addEventListener("keydown", (e) => {
    if (
      e.key === Object.keys(player.keys)[0] &&
      player.maxJump > player.jumpCount
    ) {
      player.velocity.y = -10;
      player.jumpCount++;
    }
    if (e.key === Object.keys(player.keys)[1]) {
      player.keys[Object.keys(player.keys)[1]] = true;
    }
    if (e.key === Object.keys(player.keys)[2]) {
      player.keys[Object.keys(player.keys)[2]] = true;
    }
    if (e.key === Object.keys(player.keys)[3]) {
      player.keys[Object.keys(player.keys)[3]] = true;
      if (!isTouchingGround(player)) player.isAttacking = true;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case Object.keys(player.keys)[1]:
        player.keys[Object.keys(player.keys)[1]] = false;
        break;
      case Object.keys(player.keys)[2]:
        player.keys[Object.keys(player.keys)[2]] = false;
        break;
      case Object.keys(player.keys)[3]:
        player.keys[Object.keys(player.keys)[3]] = false;
        player.isAttacking = false;
        player.angle = 0;
        break;
    }
  });
};

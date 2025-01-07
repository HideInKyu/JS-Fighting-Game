const isTouchingGround = (player) => {
  if (player.position.y + player.height >= canvas.height - 88) {
    return true;
  }
  return false;
};

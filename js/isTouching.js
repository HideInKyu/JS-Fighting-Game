const isTouching = ({ b1, b2 }) => {
  return (
    b1.feetHitbox.position.x + b1.feetHitbox.width >= b2.position.x &&
    b1.feetHitbox.position.x <= b2.position.x + b2.width &&
    b1.feetHitbox.position.y + b1.feetHitbox.height >= b2.position.y &&
    b1.feetHitbox.position.y <= b2.position.y + b2.height &&
    b1.isAttacking // Ensure the attacker is actively attacking
  );
};

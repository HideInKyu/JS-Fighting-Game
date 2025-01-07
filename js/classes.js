/*Character Objcet*/
// use OOP because we are going to need to have characters interact
class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}

class Fighter {
  constructor({
    position,
    velocity,
    keys,
    color,
    attackAngle,
    maxJump,
    jumpCount,
  }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.keys = keys;
    this.color = color;
    this.gravity = 0.4;
    this.attackAngle = attackAngle;
    this.angle = 0; // Rotation angle
    this.maxJump = maxJump;
    this.jumpCount = jumpCount;
    this.isAttacking = false;
    // Define the hitbox
    this.feetHitbox = {
      position: { x: this.position.x, y: this.position.y + this.height },
      width: this.width,
      height: 10,
    };
  }

  draw() {
    c.save();

    // Move the origin to the character’s center for rotation
    const centerX = this.position.x + this.width / 2;
    const centerY = this.position.y + this.height / 2;

    c.translate(centerX, centerY);
    c.rotate((Math.PI / 180) * this.angle);

    // Draw the character
    c.fillStyle = this.color;
    c.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    if (this.isAttacking) {
      // Draw the feet hitbox (rotated with the character)
      c.fillStyle = "rgba(255, 255, 255, 0.5)";
      c.fillRect(
        -this.width / 2,
        this.height / 2 - this.feetHitbox.height, // Positioned at the feet
        this.feetHitbox.width,
        this.feetHitbox.height,
      );
    }
    c.restore();
  }

  update() {
    // Update position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Gravity logic
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 88) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }

    this.draw();
  }
}

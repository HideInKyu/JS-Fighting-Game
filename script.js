/* Viewport */
// Store the canvas element from our HTML file into a constant for easier selection
const canvas = document.querySelector("canvas");
// Use the getContext method with argument "2d" to allow us to draw in our canvas
const c = canvas.getContext("2d");

// Assign width and height to have better control of screen sizes
const width = 1024;
const height = 524;

// Assign the width and height of the canvas
canvas.width = width;
canvas.height = height;

// Fill our canvas with the fillRect method taking in 4 arguments (x, y, width, height)
c.fillRect(0, 0, width, height);

// Introduce gravity to our game
const gravity = 0.4;

/* Character Object */
// Use OOP because we are going to need to have characters interact
class Sprite {
  // In constructor, assign the passed-in argument position to the sprite's (this) position
  constructor({ position, velocity, keys, color, offset }) {
    // Set the passed-in position to the class's instance property
    this.position = position;
    // Set the passed-in velocity to the class's instance property
    this.velocity = velocity;
    // Set the height of the character so we know when to stop falling
    this.height = 150;
    // Set the width of the character
    this.width = 50;
    // Store the keys for movement
    this.keys = keys;
    // Define the attack box for collision detection
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      }, // The attack box moves with the character
      width: 100, // Width of the attack box
      height: 50, // Height of the attack box
      offset, // Offset of the attack box from the character
    };
    // Set the color of the character
    this.color = color;
    // Set the character to not attacking by default
    this.isAttacking = false;
    this.health = 100;
  }

  // Allows us to draw the characters with the class's positions
  draw() {
    // Style the box first, can be any color, red for now
    c.fillStyle = this.color;
    // Fill in the rect with the class's positions and give it some width and height
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
    // Draw the attack box
    if (this.isAttacking) {
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height,
      );
    }
  }

  // Update the character's position and velocity to simulate gravity
  update() {
    this.draw();
    // this.attackBox.position.x = this.position.x;
    // this.attackBox.position.y = this.position.y;
    // this.attackBox.position.x = this.position.x - 50;
    // this.attackBox.position.y = this.position.y;
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    // Check if the character is touching the ground
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0; // Stop downward movement if touching the ground
    } else {
      this.velocity.y += gravity; // Apply gravity if not touching the ground
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

// Create player 1 with initial position, velocity, keys, and color
const player1 = new Sprite({
  position: {
    x: 0, // Initial x position of player 1
    y: 0, // Initial y position of player 1
  },
  // Set initial velocity x and y to 0, meaning the character is stationary at the start
  velocity: {
    x: 0, // Initial x velocity of player 1
    y: 0, // Initial y velocity of player 1
  },
  // Define the keys used to control player 1
  keys: {
    w: 0, // Key for jumping
    a: false, // Key for moving left
    d: false, // Key for moving right
    s: false, // Key for attacking
  },
  color: "red", // Color of player 1
  offset: {
    x: 0,
    y: 0,
  },
});

// Create player 2 with initial position, velocity, keys, and color
const player2 = new Sprite({
  position: {
    x: 900, // Initial x position of player 2
    y: 0, // Initial y position of player 2
  },
  // Set initial velocity x and y to 0, meaning the character is stationary at the start
  velocity: {
    x: 0, // Initial x velocity of player 2
    y: 0, // Initial y velocity of player 2
  },
  // Define the keys used to control player 2
  keys: {
    ArrowUp: 0, // Key for jumping
    ArrowLeft: false, // Key for moving left
    ArrowRight: false, // Key for moving right
    ArrowDown: false, // Key for attacking
  },
  color: "blue", // Color of player 2
  offset: {
    x: 50,
    y: 0,
  },
});

// Function to check if the player is touching the ground
const isTouchingGround = (player) => {
  // If the player's bottom edge is at or below the canvas height, they are touching the ground
  if (player.position.y + player.height >= canvas.height) {
    return true;
  }
  return false;
};

// Function to handle player movement
const playerMovement = (player) => {
  window.addEventListener("keydown", (e) => {
    // Check for jump key and if the player is touching the ground
    if (e.key === Object.keys(player.keys)[0] && isTouchingGround(player)) {
      player.velocity.y = -10;
    }
    // Check for left movement key
    if (e.key === Object.keys(player.keys)[1]) {
      player.keys[Object.keys(player.keys)[1]] = true; // Set left movement key to true
    }
    // Check for right movement key
    if (e.key === Object.keys(player.keys)[2]) {
      player.keys[Object.keys(player.keys)[2]] = true; // Set right movement key to true
    }
    // Check for attack key
    if (e.key === Object.keys(player.keys)[3]) {
      player.attack();
    }
  });

  window.addEventListener("keyup", (e) => {
    // Stop movement when the key is released
    switch (e.key) {
      case Object.keys(player.keys)[1]:
        player.keys[Object.keys(player.keys)[1]] = false; // Set left movement key to false
        break;
      case Object.keys(player.keys)[2]:
        player.keys[Object.keys(player.keys)[2]] = false; // Set right movement key to false
        break;
    }
  });
};

// Function to update player velocity based on key presses
const updatePlayerVelocity = (player) => {
  if (
    player.keys[Object.keys(player.keys)[1]] &&
    player.keys[Object.keys(player.keys)[2]]
  ) {
    player.velocity.x = 0; // If both left and right keys are pressed, stop horizontal movement
  } else if (player.keys[Object.keys(player.keys)[1]]) {
    player.velocity.x = -5; // Move left
  } else if (player.keys[Object.keys(player.keys)[2]]) {
    player.velocity.x = 5; // Move right
  } else {
    player.velocity.x = 0; // Stop horizontal movement if no keys are pressed
  }
};

// Initialize player movement for both players
playerMovement(player1);
playerMovement(player2);

// Function to check if two players are touching (collision detection)
const isTouching = ({ b1, b2 }) => {
  if (
    b1.attackBox.position.x + b1.attackBox.width >= b2.position.x &&
    b1.attackBox.position.x <= b2.position.x + b2.width &&
    b1.attackBox.position.y + b1.attackBox.height >= b2.position.y &&
    b1.attackBox.position.y <= b2.position.y + b2.height &&
    b1.isAttacking
  ) {
    console.log("true");
  }
  return (
    b1.attackBox.position.x + b1.attackBox.width >= b2.position.x &&
    b1.attackBox.position.x <= b2.position.x + b2.width &&
    b1.attackBox.position.y + b1.attackBox.height >= b2.position.y &&
    b1.attackBox.position.y <= b2.position.y + b2.height &&
    b1.isAttacking
  );
};

/* Animation Loop */
const animate = () => {
  // Request animation frames and recursively call animate to continually create animation frames
  window.requestAnimationFrame(animate);
  // Fill the canvas back to black
  c.fillStyle = "black";
  // This gets rid of the previous frames of the characters
  c.fillRect(0, 0, width, height);
  // Update the characters' positions
  updatePlayerVelocity(player1);
  updatePlayerVelocity(player2);
  player1.update();
  player2.update();
  // Check for collisions
  if (isTouching({ b1: player1, b2: player2 }) && player1.isAttacking) {
    player1.isAttacking = false;
    player2.health -= 20;
    // document.querySelector(".p2HP").style.width = "20%";
    document.querySelector(".p2HP").style.width = `${player2.health}%`;
  }
  if (isTouching({ b1: player2, b2: player1 }) && player2.isAttacking) {
    player2.isAttacking = false;
    player1.health -= 20;
    document.querySelector(".p1HP").style.width = `${player1.health}%`;
  }
};
// Invoke the function to start the animation loop
animate();

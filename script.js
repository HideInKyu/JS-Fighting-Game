/*View port*/
// store the canvas element from our HTML file into a const for easier select
const canvas = document.querySelector("canvas");
// use get the get context method with argument 2d to allow us to draw in our canvas
const c = canvas.getContext("2d");

console.log("hello world");
// assign width and height to have better control of screen sizes
const width = 1024;
const height = 524;

// assign the width and height of the canvas
canvas.width = width;
canvas.height = height;

// fill our canvas with the fillRect method taking in 4 arguments(x, y, width, height)
c.fillRect(0, 0, width, height);
/*Character Objcet*/
// use OOP because we are going to need to have characters interact
class Sprite {
  // in constructor assign the passed in argument position to the sprits(this) position
  // *little trick if you start to get more and more arguments you have to be conscious of what you passin and the order. To combat this just wrap the arguments in an object and your life will be alot simpler
  constructor({ position, velocity, keys, color, attackAngle, maxJump }) {
    // set the passed in position to the classes instance property
    this.position = position;
    // set the passed in velocity to the classes instance property
    this.velocity = velocity;
    // set the height of the character so we know when to stop falling
    this.height = 150;
    this.keys = keys;
    this.color = color;
    this.gravity = 0.4;
    this.attackAngle = attackAngle;
    this.angle = 0;
    this.maxJump = maxJump;
  }
  // allows us to draw the characters with the classes positions
  draw() {
    c.save(); // Save the current state

    // Move the origin to the character’s center (for rotation)
    const centerX = this.position.x + 25; // half of the width (50/2)
    const centerY = this.position.y + this.height / 2;

    c.translate(centerX, centerY);
    c.rotate((Math.PI / 180) * this.angle);

    c.fillStyle = this.color;
    // Draw the rect so its center is now the pivot:
    c.fillRect(-25, -this.height / 2, 50, this.height);

    c.restore(); // Restore the original state
  }
  // update the characters postion and velocity to simulate gravity
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }
  }
}

// create player 1 with really any x or y position using an object
// *because of the trick we have to refactor our sprites, its easy, just wrap the arguments in an object and then assign what is needed
const player1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  // set velocity x and y to 0, as a default our characters won't have any inharent speed/velocity and will be effected by other things later like gravity
  velocity: {
    x: 0,
    y: 0,
  },
  keys: {
    w: 0,
    a: false,
    d: false,
    s: false,
  },
  color: "red",
  attackAngle: 60,
  maxJump: 2,
});
// create player 2 with really any x or y position using an object
// *here as well
const player2 = new Sprite({
  position: {
    x: 900,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  keys: {
    ArrowUp: 0,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false,
  },
  color: "blue",
  attackAngle: 50,
  maxJump: 3,
});

const isTouchingGround = (player) => {
  if (player.position.y + player.height >= canvas.height) {
    return true;
  }
  return false;
};

const playerMovement = (player) => {
  window.addEventListener("keydown", (e) => {
    if (e.key === Object.keys(player.keys)[0] && isTouchingGround(player)) {
      player.velocity.y = -10;
    }
    if (e.key === Object.keys(player.keys)[1]) {
      player.keys[Object.keys(player.keys)[1]] = true;
    }
    if (e.key === Object.keys(player.keys)[2]) {
      player.keys[Object.keys(player.keys)[2]] = true;
    }
    if (e.key === Object.keys(player.keys)[3]) {
      player.keys[Object.keys(player.keys)[3]] = true;
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
        break;
    }
  });
};

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
    player.keys[Object.keys(player.keys)[0]]
  ) {
    player.velocity.x = 15;
  } else if (
    player.keys[
      Object.keys(player.keys)[3] && player.keys[Object.keys(player.keys)[1]]
    ]
  ) {
    player.velocity.x = -15;
  } else if (player.keys[Object.keys(player.keys)[3]]) {
    player.gravity = 0.7;
  }
  if (!isTouchingGround(player)) {
    player.gravity = 0.4;
  }
};

playerMovement(player1);
playerMovement(player2);

/* AnimationLoop */
const animate = () => {
  // request animation frames and recursively call animate to continually "infinetly" create animation frames
  window.requestAnimationFrame(animate);
  // uncomment this to test if animation is working
  // console.log("ping");
  // fill the canvas back to black
  c.fillStyle = "black";
  // this gets rid of the previous frames of the characters
  c.fillRect(0, 0, width, height);
  // update the characters positions
  updatePlayerVelocity(player1);
  updatePlayerVelocity(player2);
  player1.update();
  player2.update();
};
// make sure to invoke the function, defining a function will not invoke a function
animate();

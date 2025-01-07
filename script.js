/* Viewport */
// Store the canvas element from our HTML file into a constant for easier selection
const canvas = document.querySelector("canvas");
// Use the getContext method with argument "2d" to allow us to draw in our canvas
const c = canvas.getContext("2d");

console.log("hello world");
// assign width and height to have better control of screen sizes
const width = 1024;
const height = 524;

// Assign the width and height of the canvas
canvas.width = width;
canvas.height = height;

// Fill our canvas with the fillRect method taking in 4 arguments (x, y, width, height)
c.fillRect(0, 0, width, height);

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./assets/background.png",
})

// create player 1 with really any x or y position using an object
// *because of the trick we have to refactor our sprites, its easy, just wrap the arguments in an object and then assign what is needed
const player1 = new Fighter({
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
  maxJump: 1,
  jumpCount: 0,
});

// Create player 2 with initial position, velocity, keys, and color
const player2 = new Fighter({
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
  maxJump: 2,
  jumpCount: 0,
});

// Initialize player movement for both players
playerMovement(player1);
playerMovement(player2);

// make sure to invoke the function, defining a function will not invoke a function
animate();
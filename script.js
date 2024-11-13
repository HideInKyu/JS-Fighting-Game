/*View port*/
// store the canvas element from our HTML file into a const for easier select
const canvas = document.querySelector("canvas");
// use get the get context method with argument 2d to allow us to draw in our canvas
const c = canvas.getContext("2d");

// assign width and height to have better control of screen sizes
const width = 1024;
const height = 524;

// assign the width and height of the canvas
canvas.width = width;
canvas.height = height;

// fill our canvas with the fillRect method taking in 4 arguments (x, y, width, height)
c.fillRect(0, 0, width, height);

/*Character Objcet*/
// use OOP because we are going to need to have characters interact
class Sprite {
    // in constructor assign the passed in argument position to the sprits(this) position
    // *little trick if you start to get more and more arguments you have to be conscious of what you passin and the order. To comat this just wrap the arguments in an object and your life will be alot simpler
    constructor({ position, velocity }) {
        // set the passed in position to the classes instance property
        this.position = position;
        //
        this.velocity = velocity;
        // invoke the instance method draw to make sure we don't have to call it every we create a new character.
        this.draw();
    }
    // allows us to draw the characters with the classes positions
    draw() {
        // style the box first, can be any color, red for now
        c.fillStyle = "red";
        // fill in the rect with the classes positions and give it some width and height
        c.fillRect(this.position.x, this.position.y, 50, 150);
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
});

/* AnimationLoop */
const animate = () => {
    // request animation frames and recursively call animate to continually "infinetly" create animation frames
    window.requestAnimationFrame(animate);
    // uncomment this to test if animation is working
    // console.log("ping");
};
// make sure to invoke the function, defining a function will not invoke a function
animate();

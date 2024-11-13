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
    constructor(position) {
        // set the passed in position to the classes instance property
        this.position = position;
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
const player1 = new Sprite({
    x: 0,
    y: 0,
});
// create player 2 with really any x or y position using an object
const player2 = new Sprite({
    x: 900,
    y: 0,
});

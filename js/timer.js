let time = 61;

const timer = () => {
  if (time > 0) {
    setTimeout(timer, 1000);
    time--;
    document.querySelector(".timer").textContent = time;
  }
  if (player1.health === player2.health && time === 0) {
    console.log("tie");
  }
  if (player1.health <= 0) {
    console.log("player 2 wins");
  }
  if (player2.health <= 0) {
    console.log("player 1 wins");
    return;
  }
};

timer();

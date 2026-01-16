let game;

function setup() {
  let container = document.getElementById('sketch-container');
  let canvas = createCanvas(600, 600);
  canvas.parent(container);
  game = new Game();
}

function draw() {
  background(15, 15, 35);
  game.update();
  game.draw();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    if (game.gameOver) {
      game = new Game();
    }
  }
  if (key === 'p' || key === 'P') {
    if (!game.gameOver) {
      game.paused = !game.paused;
    }
  }
}

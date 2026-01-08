let game;

function setup() {
  createCanvas(600, 600);
  game = new Game();
}

function draw() {
  background(30);
  game.update();
  game.draw();
}

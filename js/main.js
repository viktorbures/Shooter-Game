
let game;

// Setup funkce p5.js - vola se jednou pri startu
function setup() {
  let container = document.getElementById('sketch-container');
  // Vytvoreni platna o velikosti 600x600 pixelu
  let canvas = createCanvas(600, 600);
  canvas.parent(container);
  // Inicializace nove hry
  game = new Game();
}

// Draw funkce p5.js - vola se v kazdem snimku (frame)
function draw() {
  // Nastaveni barvy pozadi
  background(15, 15, 35);
  // Aktualizace a vykresleni hry
  game.update();
  game.draw();
}

// Funkce pro obsluhu klavesnice
function keyPressed() {
  // R - Restart hry
  if (key === 'r' || key === 'R') {
    if (game.gameOver) {
      game = new Game();
    }
  }
  // P - Pauza
  if (key === 'p' || key === 'P') {
    if (!game.gameOver) {
      game.paused = !game.paused;
    }
  }
}

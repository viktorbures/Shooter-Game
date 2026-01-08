class Game {
  constructor() {
    this.player = new Player(width / 2, height - 60);
    this.enemies = [];
    this.bullets = [];
    this.score = 0;

    this.spawnTimer = 0;
  }

  update() {
    this.player.update();
    
    // střelba
    if (keyIsDown(32)) { // mezerník
      this.player.shoot(this.bullets);
    }

    // spawn nepřátel
    this.spawnTimer++;
    if (this.spawnTimer > 60) {
      this.enemies.push(new Enemy(random(40, width - 40), -40));
      this.spawnTimer = 0;
    }

    // update bullets
    for (let b of this.bullets) b.update();
    for (let e of this.enemies) e.update();

    this.checkCollisions();

    // odstranění mimo obrazovku
    this.bullets = this.bullets.filter(b => !b.offscreen());
    this.enemies = this.enemies.filter(e => !e.offscreen());
  }

  draw() {
    this.player.draw();

    for (let b of this.bullets) b.draw();
    for (let e of this.enemies) e.draw();

    fill(255);
    textSize(16);
    text("Score: " + this.score, 10, 20);
  }

  checkCollisions() {
    for (let e of this.enemies) {
      for (let b of this.bullets) {
        if (dist(e.x, e.y, b.x, b.y) < e.size / 2) {
          e.dead = true;
          b.dead = true;
          this.score++;
        }
      }
    }

    this.enemies = this.enemies.filter(e => !e.dead);
    this.bullets = this.bullets.filter(b => !b.dead);
  }
}

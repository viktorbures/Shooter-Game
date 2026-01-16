class Game {
  constructor() {
    this.player = new Player(width / 2, height - 60);
    this.enemies = [];
    this.bullets = [];
    this.score = 0;
    this.gameOver = false;
    this.spawnTimer = 0;
    this.difficulty = 1;
  }

  update() {
    if (this.gameOver) return;

    this.player.update();
    

    if (keyIsDown(32)) { 
      this.player.shoot(this.bullets);
    }

    this.spawnTimer++;
    let spawnRate = Math.max(30, 60 - this.score * 0.5);
    if (this.spawnTimer > spawnRate) {
      let side = floor(random(4)); 
      let x, y, vx, vy;
      let speed = 2;
      
      if (side === 0) {
        x = random(40, width - 40);
        y = -40;
        vx = random(-1.5, 1.5);
        vy = speed;
      } else if (side === 1) { 
        x = random(40, width - 40);
        y = height + 40;
        vx = random(-1.5, 1.5);
        vy = -speed;
      } else if (side === 2) { 
        x = -40;
        y = random(40, height - 40);
        vx = speed;
        vy = random(-1.5, 1.5);
      } else { 
        x = width + 40;
        y = random(40, height - 40);
        vx = -speed;
        vy = random(-1.5, 1.5);
      }
      
      this.enemies.push(new Enemy(x, y, vx, vy));
      this.spawnTimer = 0;
    }

    for (let b of this.bullets) b.update();
    for (let e of this.enemies) e.update();

    this.checkCollisions();

    this.bullets = this.bullets.filter(b => !b.offscreen());
    this.enemies = this.enemies.filter(e => !e.offscreen());
  }

  draw() {
    this.drawBackground();

    this.player.draw();

    for (let b of this.bullets) b.draw();
    for (let e of this.enemies) e.draw();

    this.drawUI();

    if (this.gameOver) {
      this.drawGameOver();
    }
  }

  drawBackground() {
    stroke(0, 255, 255);
    strokeWeight(1);
    let gridSize = 50;
    for (let i = 0; i < width; i += gridSize) {
      line(i, 0, i, height);
    }
    for (let i = 0; i < height; i += gridSize) {
      line(0, i, width, i);
    }
  }

  drawUI() {
    noStroke();
    
    fill(0, 20, 40, 150);
    rect(width / 2 - 140, 8, 280, 85, 10);
    
    stroke(0, 255, 255, 100);
    strokeWeight(2);
    noFill();
    rect(width / 2 - 140, 8, 280, 85, 10);
    noStroke();
    
    fill(100, 255, 100);
    textSize(14);
    textAlign(LEFT);
    textStyle(NORMAL);
    text("SCORE", width / 2 - 90, 30);
    
    fill(100, 255, 100);
    textSize(36);
    textStyle(BOLD);
    textAlign(CENTER);
    text(this.score, width / 2 - 70, 68);
    
    fill(255, 100, 100);
    textSize(14);
    textAlign(LEFT);
    textStyle(NORMAL);
    text("ENEMIES", width / 2 + 35, 30);
    
    fill(255, 150, 150);
    textSize(28);
    textStyle(BOLD);
    textAlign(CENTER);
    text(this.enemies.length, width / 2 + 68, 66);
  }

  drawGameOver() {
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);

    fill(255, 50, 50);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 60);

    fill(255, 255, 255);
    textSize(24);
    text("Final Score: " + this.score, width / 2, height / 2);

    textSize(16);
    text("Press R to restart", width / 2, height / 2 + 50);
  }

  checkCollisions() {
    for (let e of this.enemies) {
      for (let b of this.bullets) {
        if (dist(e.x, e.y, b.x, b.y) < e.size / 2 + 4) {
          e.dead = true;
          b.dead = true;
          this.score++;
        }
      }
    }

    for (let e of this.enemies) {
      if (dist(this.player.x, this.player.y, e.x, e.y) < this.player.size / 2 + e.size / 2) {
        this.gameOver = true;
      }
    }

    this.enemies = this.enemies.filter(e => !e.dead);
    this.bullets = this.bullets.filter(b => !b.dead);
  }
}


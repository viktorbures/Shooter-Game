class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 35;
    this.speed = 2;
    this.dead = false;
  }

  update() {
    this.y += this.speed;
  }

  draw() {
    fill(255, 50, 50);
    ellipse(this.x, this.y, this.size);
  }

  offscreen() {
    return this.y > height + this.size;
  }
}

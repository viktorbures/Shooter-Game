class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 8;
    this.dead = false;
  }

  update() {
    this.y -= this.speed;
  }

  draw() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 8);
  }

  offscreen() {
    return this.y < 0 || this.dead;
  }
}

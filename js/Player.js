class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speed = 5;
    this.cooldown = 0;
  }

  update() {
    if (keyIsDown(65)) this.x -= this.speed; // A
    if (keyIsDown(68)) this.x += this.speed; // D
    if (keyIsDown(87)) this.y -= this.speed; // W
    if (keyIsDown(83)) this.y += this.speed; // S

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);

    if (this.cooldown > 0) this.cooldown--;
  }

  shoot(bullets) {
    if (this.cooldown === 0) {
      bullets.push(new Bullet(this.x, this.y - 20));
      this.cooldown = 15;
    }
  }

  draw() {
    fill(0, 200, 255);
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }
}

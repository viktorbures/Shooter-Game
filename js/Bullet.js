class Bullet {
  constructor(x, y, angle = 0) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.dead = false;
    this.trail = [];
    this.maxTrail = 15;
    this.angle = angle;
    this.vx = cos(angle) * this.speed;
    this.vy = sin(angle) * this.speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Add to trail
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > this.maxTrail) {
      this.trail.shift();
    }
  }

  draw() {
    // Trail effect
    for (let i = 0; i < this.trail.length; i++) {
      let alpha = (i / this.trail.length) * 200;
      fill(255, 255, 100, alpha);
      noStroke();
      ellipse(this.trail[i].x, this.trail[i].y, 6 - (i / this.trail.length) * 3);
    }

    // Main bullet with glow
    noStroke();
    fill(255, 255, 0, 150);
    ellipse(this.x, this.y, 10);

    fill(255, 255, 150);
    ellipse(this.x, this.y, 6);

    // Bright center
    fill(255, 255, 255);
    ellipse(this.x, this.y, 3);
  }

  offscreen() {
    return this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10 || this.dead;
  }
}

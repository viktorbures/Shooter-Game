class Enemy {
  constructor(x, y, vx = 0, vy = 2) {
    this.x = x;
    this.y = y;
    this.size = 35;
    this.vx = vx;
    this.vy = vy;
    this.dead = false;
    this.rotation = 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += 0.05;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    // Reset stroke/fill to ensure color consistency
    noStroke();

    // Glow effect
    fill(255, 50, 50, 40);
    ellipse(0, 0, this.size + 15);

    // Large spikes - 4 main spikes
    fill(255, 100, 100);
    for (let i = 0; i < 4; i++) {
      push();
      rotate((PI / 2) * i);
      triangle(0, -this.size / 2 - 8, -6, -this.size / 2 - 2, 6, -this.size / 2 - 2);
      pop();
    }

    // Main body - hexagon
    fill(255, 80, 80);
    let sides = 6;
    let radius = this.size / 2;
    beginShape();
    for (let i = 0; i < sides; i++) {
      let angle = TWO_PI / sides * i;
      let x = cos(angle) * radius;
      let y = sin(angle) * radius;
      vertex(x, y);
    }
    endShape(CLOSE);

    // Center core
    fill(255, 150, 100);
    ellipse(0, 0, this.size / 2.5);

    pop();
  }

  offscreen() {
    return this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50;
  }
}

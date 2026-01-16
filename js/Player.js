class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.speed = 5;
    this.cooldown = 0;
    this.rotation = 0;
  }

  update() {
    
    if (keyIsDown(87)) this.y -= this.speed; // W
    if (keyIsDown(83)) this.y += this.speed; // S
    if (keyIsDown(65)) this.x -= this.speed; // A
    if (keyIsDown(68)) this.x += this.speed; // D

    
    this.rotation = atan2(mouseY - this.y, mouseX - this.x) + PI / 2;

    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);

    if (this.cooldown > 0) this.cooldown--;
  }

  shoot(bullets) {
    if (this.cooldown === 0) {
      let turretDistance = this.size / 2 + 10;
      let shootAngle = this.rotation - PI / 2; // 
      let bulletX = this.x + cos(shootAngle) * turretDistance;
      let bulletY = this.y + sin(shootAngle) * turretDistance;
      
      bullets.push(new Bullet(bulletX, bulletY, shootAngle));
      this.cooldown = 10;
    }
  }

  draw() {
    push();
    translate(this.x, this.y);

    fill(100, 255, 100, 50);
    ellipse(0, 0, this.size + 20);
    
    fill(100, 255, 100);
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

    strokeWeight(2);
    stroke(100, 255, 100);
    noFill();
    let sides2 = 6;
    let radius2 = this.size / 2;
    beginShape();
    for (let i = 0; i < sides2; i++) {
      let angle = TWO_PI / sides2 * i;
      let x = cos(angle) * radius2;
      let y = sin(angle) * radius2;
      vertex(x, y);
    }
    endShape(CLOSE);

    push();
    rotate(this.rotation);
    
    noStroke();
    
    fill(80, 80, 90);
    rect(0, -this.size / 2 - 16, 5, 20, 2);
    
    fill(120, 120, 130);
    ellipse(0, -this.size / 2 - 18, 8);
    
    fill(60, 60, 70);
    ellipse(0, -this.size / 2 + 2, 14);
    
    pop();

    pop();
  }
}


// Trida reprezentujici vylepseni (power-up)
class Upgrade {
  constructor(x, y) {
    this.x = x; // Pozice X
    this.y = y; // Pozice Y
    this.size = 25; // Velikost ikony
    this.rotation = 0; // Rotace pro animaci
    this.dead = false; // Zda je sebrano nebo zmizlo
    
    this.type = floor(random(1, 4)); // Nahodny typ (1, 2 nebo 3)
    this.duration = 300; // Trvani efektu (v framech)
  }

  // Aktualizace animace
  update() {
    this.rotation += 0.08;
  }

  // Vykresleni power-upu podle typu
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    if (this.type === 1) { // Typ 1: Zvyseni rychlosti (Speed Boost)
      noStroke();
      fill(100, 200, 255, 80);
      ellipse(0, 0, this.size + 15);
      
      fill(100, 200, 255);
      rect(-8, -8, 16, 16, 3);
      
      fill(150, 220, 255);
      textAlign(CENTER, CENTER);
      textSize(14);
      text("S", 0, 0);
      
    } else if (this.type === 2) { // Typ 2: Rychlopalba (Rapid Fire)
      noStroke();
      fill(255, 150, 100, 80);
      ellipse(0, 0, this.size + 15);
      
      fill(255, 150, 100);
      for (let i = 0; i < 3; i++) {
        push();
        rotate((TWO_PI / 3) * i);
        rect(-4, -12, 8, 10, 2);
        pop();
      }
      
      fill(255, 180, 130);
      ellipse(0, 0, 8);
      
    } else if (this.type === 3) { // Typ 3: Stit (Shield)
      noStroke();
      fill(255, 220, 100, 80);
      ellipse(0, 0, this.size + 15);
      
      fill(255, 220, 100);
      let sides = 5;
      let radius = this.size / 2;
      beginShape();
      for (let i = 0; i < sides; i++) {
        let angle = TWO_PI / sides * i - PI / 2;
        let x = cos(angle) * radius;
        let y = sin(angle) * radius;
        vertex(x, y);
      }
      endShape(CLOSE);
      
      fill(255, 240, 150);
      textAlign(CENTER, CENTER);
      textSize(12);
      text("*", 0, 2);
    }

    pop();
  }

  // Kontrola na vystoupeni z herni plochy
  offscreen() {
    return this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50;
  }
}

// Trida reprezentujici nepritele
class Enemy {
  constructor(x, y, vx = 0, vy = 2) {
    this.x = x; // Souradnice X
    this.y = y; // Souradnice Y
    this.size = 35; // Velikost nepritele
    this.vx = vx; // Rychlost v ose X
    this.vy = vy; // Rychlost v ose Y
    this.dead = false; // Zda je nepritel zniceny
    this.rotation = 0; // Aktualni natoceni
    
    // Casovac strelby - nahodny zacatek at nestrili vsichni naraz
    this.shootTimer = floor(random(60, 180));
  }

  // Aktualizace pozice a rotace nepritele
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += 0.05;

    // Logika strelby - aktivni pouze od levelu 2
    if (game.level >= 2) {
      this.shootTimer--;
      if (this.shootTimer <= 0) {
        this.shoot();
        // Reset casovace
        this.shootTimer = floor(random(60, 180));
      }
    }
  }

  // Funkce pro vystreleni na hrace
  shoot() {
    if (game.player) {
      let angle = atan2(game.player.y - this.y, game.player.x - this.x);
      // Pridani strely do pole nepratelskych strel ve hre
      game.enemyBullets.push(new Bullet(this.x, this.y, angle, true));
    }
  }

  // Vykresleni nepritele
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    noStroke();
    // Vykresleni aury/zare
    fill(255, 50, 50, 40);
    ellipse(0, 0, this.size + 15);

    // Vykresleni ostnich casti
    fill(255, 100, 100);
    for (let i = 0; i < 4; i++) {
      push();
      rotate((PI / 2) * i);
      triangle(0, -this.size / 2 - 8, -6, -this.size / 2 - 2, 6, -this.size / 2 - 2);
      pop();
    }

    // Vykresleni hlavniho tela 
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

    // Vykresleni stredu
    fill(255, 150, 100);
    ellipse(0, 0, this.size / 2.5);

    pop();
  }

  // Kontrola, zda je nepritel mimo herni plochu
  offscreen() {
    return this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50;
  }
}


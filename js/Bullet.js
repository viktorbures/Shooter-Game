
// Trida reprezentujici vystreleny projektil
class Bullet {
  constructor(x, y, angle = 0, isEnemy = false) {
    this.x = x; // X souradnice
    this.y = y; // Y souradnice
    this.speed = 10; // Rychlost strely
    this.dead = false; // Zda je strela neaktivni
    this.trail = []; // Pole pro ukladani pozic pro efekt stopy
    this.maxTrail = 15; // Maximalni delka stopy
    this.angle = angle; // Uhel strely
    this.vx = cos(angle) * this.speed; // Rychlost v ose X
    this.vy = sin(angle) * this.speed; // Rychlost v ose Y
    this.isEnemy = isEnemy; // Zda strela patri nepriteli
  }

  // Aktualizace stavu strely
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    // Pridani aktualni pozice do stopy
    this.trail.push({x: this.x, y: this.y});
    // Odstraneni starych pozic, pokud je stopa prilis dlouha
    if (this.trail.length > this.maxTrail) {
      this.trail.shift();
    }
  }

  // Vykresleni strely
  draw() {
    // Barvy podle typu strely
    let r, g, b;
    if (this.isEnemy) {
      r = 255; g = 50; b = 50; // Cervena pro nepratele
    } else {
      r = 255; g = 255; b = 100; // Zluta pro hrace
    }

    // Vykresleni stopy strely
    for (let i = 0; i < this.trail.length; i++) {
      let alpha = (i / this.trail.length) * 200;
      fill(r, g, b, alpha);
      noStroke();
      ellipse(this.trail[i].x, this.trail[i].y, 6 - (i / this.trail.length) * 3);
    }

    noStroke();
    // Vykresleni samotne strely (zare, jadro)
    fill(r, g, 0, 150);
    ellipse(this.x, this.y, 10);

    fill(r, g, 150);
    ellipse(this.x, this.y, 6);

    fill(255, 255, 255);
    ellipse(this.x, this.y, 3);
  }

  // Kontrola, zda je strela mimo obrazovku
  offscreen() {
    return this.x < -10 || this.x > width + 10 || this.y < -10 || this.y > height + 10 || this.dead;
  }
}


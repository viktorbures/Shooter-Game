// Hlavni trida hry
class Game {
  constructor() {
    this.player = new Player(width / 2, height - 60); // Vytvoreni hrace
    this.enemies = []; // Pole nepratel
    this.bullets = []; // Pole strel
    this.enemyBullets = []; // Pole strel nepratel
    this.upgrades = []; // Pole vylepseni (power-ups)
    this.score = 0; // Skore
    this.gameOver = false; // Stav hry (konec hry)
    this.paused = false; // Stav pauzy
    this.spawnTimer = 0; // Casovac pro spawnovani nepratel
    this.difficulty = 1; // Obtiznost
    this.level = 1; // Aktualni uroven
    this.enemiesKilledThisLevel = 0; // Pocet zabitych nepratel v urovni
    this.levelUpTime = 0; // Cas kdy doslo k level upu
    
    // Stavy vylepseni
    this.speedBoostActive = false;
    this.speedBoostTime = 0;
    this.rapidFireActive = false;
    this.rapidFireTime = 0;
    this.shieldActive = false;
    this.shieldTime = 0;
  }

  // Hlavni herni smycka pro aktualizaci logiky
  update() {
    if (this.gameOver) return; // Pokud je konec hry, neaktualizujeme
    if (this.paused) return; // Pokud je pauza, neaktualizujeme

    // Kontrola vyprseni casu pro vylepseni
    if (this.speedBoostActive && frameCount - this.speedBoostTime > 300) {
      this.speedBoostActive = false;
      this.player.speed = 5;
    }
    if (this.rapidFireActive && frameCount - this.rapidFireTime > 300) {
      this.rapidFireActive = false;
    }
    if (this.shieldActive && frameCount - this.shieldTime > 300) {
      this.shieldActive = false;
    }

    this.player.update(); // Aktualizace hrace
    


    // Sterlba pri stisku mezerniku
    if (keyIsDown(32)) { 
      this.player.shoot(this.bullets);
    }

    this.spawnTimer++;
    // Vypocet rychlosti spawnovani na zaklade skore a levelu
    let spawnRate = Math.max(20, 60 - this.score * 0.5 - this.level * 5);
    
    // Spawnovani nepratel
    if (this.spawnTimer > spawnRate) {
      let side = floor(random(4)); // Nahodna strana obrazovky
      let x, y, vx, vy;
      let speed = 2 + (this.level - 1) * 0.5;
      
      // Logika pro spawn z ruznych stran
      if (side === 0) { // Zhora
        x = random(40, width - 40);
        y = -40;
        vx = random(-1.5, 1.5);
        vy = speed;
      } else if (side === 1) { // Zespoda
        x = random(40, width - 40);
        y = height + 40;
        vx = random(-1.5, 1.5);
        vy = -speed;
      } else if (side === 2) { // Zleva
        x = -40;
        y = random(40, height - 40);
        vx = speed;
        vy = random(-1.5, 1.5);
      } else { // Zprava
        x = width + 40;
        y = random(40, height - 40);
        vx = -speed;
        vy = random(-1.5, 1.5);
      }
      
      this.enemies.push(new Enemy(x, y, vx, vy));
      this.spawnTimer = 0;
    }

    // Aktualizace vsech entit
    for (let b of this.bullets) b.update();
    for (let eb of this.enemyBullets) eb.update();
    for (let e of this.enemies) e.update();
    for (let u of this.upgrades) u.update();

    this.checkCollisions();

    // Odstraneni entit mimo obrazovku
    this.bullets = this.bullets.filter(b => !b.offscreen());
    this.enemyBullets = this.enemyBullets.filter(eb => !eb.offscreen());
    this.enemies = this.enemies.filter(e => !e.offscreen());
    this.upgrades = this.upgrades.filter(u => !u.offscreen());
  }

  // Hlavni vykreslovaci metoda
  draw() {
    this.drawBackground();

    this.player.draw();

    for (let b of this.bullets) b.draw();
    for (let eb of this.enemyBullets) eb.draw();
    for (let e of this.enemies) e.draw();
    for (let u of this.upgrades) u.draw();

    this.drawUI();
    
    this.drawLevelUp();
    
    this.drawControls();

    if (this.gameOver) {
      this.drawGameOver();
    }
    
    if (this.paused) {
      this.drawPauseScreen();
    }
  }
  

  // Vykresleni obrazovky pauzy
  drawPauseScreen() {
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);
    
    fill(255, 200, 100);
    textSize(64);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("PAUSED", width / 2, height / 2 - 50);
    
    fill(200, 200, 200);
    textSize(18);
    text("Press P to resume", width / 2, height / 2 + 50);
  }
  
  // Vykresleni ovladani
  drawControls() {
    noStroke();
    fill(0, 20, 40, 150);
    rect(width / 2 + 150, 8, 140, 130, 10);
    
    stroke(0, 255, 255, 100);
    strokeWeight(2);
    noFill();
    rect(width / 2 + 150, 8, 140, 130, 10);
    
    noStroke();
    fill(100, 200, 255);
    textSize(11);
    textAlign(LEFT);
    textStyle(BOLD);
    text("CONTROLS", width / 2 + 160, 22);
    
    fill(150, 220, 255);
    textSize(9);
    textStyle(NORMAL);
    text("W/A/S/D Move", width / 2 + 160, 37);
    text("Space Shoot", width / 2 + 160, 48);
    text("P Pause", width / 2 + 160, 59);
    text("R Restart", width / 2 + 160, 70);
    
    fill(100, 255, 100);
    textSize(8);
    text("Blue: Speed", width / 2 + 160, 88);
    text("Red: Fire", width / 2 + 160, 97);
    text("Yellow: Shield", width / 2 + 160, 106);
  }
  
  // Efekt pri postupu do dalsi urovne
  drawLevelUp() {
    if (this.level > 1 && frameCount - this.levelUpTime < 120) {
      let alpha = 255 * (1 - (frameCount - this.levelUpTime) / 120);
      fill(255, 200, 50, alpha);
      textSize(60);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text("LEVEL UP!", width / 2, height / 2);
      
      fill(255, 255, 100, alpha);
      textSize(36);
      text("Level " + this.level, width / 2, height / 2 + 70);
    }
  }

  // Vykresleni mrizky pozadi
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

  // Vykresleni uzivatelskeho rozhrani (skore, nepratele)
  drawUI() {
    noStroke();
    
    fill(0, 20, 40, 150);
    rect(width / 2 - 140, 8, 280, 130, 10);
    
    stroke(0, 255, 255, 100);
    strokeWeight(2);
    noFill();
    rect(width / 2 - 140, 8, 280, 130, 10);
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
    
    fill(255, 200, 100);
    textSize(14);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("LEVEL " + this.level, width / 2, 115);
  }

  // Obrazovka "Game Over"
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

  // Detekce kolizi
  checkCollisions() {
    // Kolize nepratel s projektily
    for (let e of this.enemies) {
      for (let b of this.bullets) {
        if (dist(e.x, e.y, b.x, b.y) < e.size / 2 + 4) {
          e.dead = true;
          b.dead = true;
          this.score++;
          this.enemiesKilledThisLevel++;
          
          // Sance na drop vylepseni
          if (random() < 0.25) {
            this.upgrades.push(new Upgrade(e.x, e.y));
          }
          
          if (this.enemiesKilledThisLevel >= 10) {
            this.level++;
            this.enemiesKilledThisLevel = 0;
            this.levelUpTime = frameCount;
          }
        }
      }
    }

    // Kolize hrace s vylepsenim
    for (let u of this.upgrades) {
      if (dist(this.player.x, this.player.y, u.x, u.y) < this.player.size / 2 + u.size / 2) {
        this.applyUpgrade(u.type);
        u.dead = true;
      }
    }

    // Kolize hrace s nepratelskymi strelami
    for (let eb of this.enemyBullets) {
      if (dist(this.player.x, this.player.y, eb.x, eb.y) < this.player.size / 2 + 5) {
        if (!this.shieldActive) {
           this.gameOver = true;
        } else {
           eb.dead = true;
           this.shieldActive = false; // Stit znici jedna strela
        }
      }
    }

    // Kolize hrace s neprateli
    for (let e of this.enemies) {
      if (dist(this.player.x, this.player.y, e.x, e.y) < this.player.size / 2 + e.size / 2) {
        if (!this.shieldActive) {
          this.gameOver = true;
        } else {
          e.dead = true;
          this.shieldActive = false;
        }
      }
    }

    // Odstraneni mrtvych entit
    this.enemies = this.enemies.filter(e => !e.dead);
    this.bullets = this.bullets.filter(b => !b.dead);
    this.enemyBullets = this.enemyBullets.filter(eb => !eb.dead);
    this.upgrades = this.upgrades.filter(u => !u.dead);
  }
  

  // Aplikace vylepseni podle typu
  applyUpgrade(type) {
    if (type === 1) {

      // Zvyseni rychlosti
      this.speedBoostActive = true;
      this.speedBoostTime = frameCount;
      this.player.speed = 8;
    } else if (type === 2) {

      // Rychlopalba
      this.rapidFireActive = true;
      this.rapidFireTime = frameCount;
    } else if (type === 3) {
      
      // Stit
      this.shieldActive = true;
      this.shieldTime = frameCount;
    }
  }
}


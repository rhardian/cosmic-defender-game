// Cosmic Defender - A space shooter game
// Game states: title, playing, gameover

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 8;
const ENEMY_SPEED = 2;
const POWERUP_SPEED = 3;

// Game state
let gameState = 'title'; // title, playing, gameover
let score = 0;
let lives = 3;
let level = 1;
let enemySpawnRate = 60;
let frameCount = 0;

// Player
const player = {
  x: GAME_WIDTH / 2,
  y: GAME_HEIGHT - 80,
  width: 40,
  height: 40,
  speed: PLAYER_SPEED,
  fireRate: 15,
  fireCooldown: 0
};

// Arrays for game objects
const bullets = [];
const enemies = [];
const powerups = [];
const particles = [];
const stars = [];

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === ' ') e.preventDefault();
});
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Mouse click to start/restart
canvas.addEventListener('click', (e) => {
  if (gameState === 'title') {
    startGame();
  } else if (gameState === 'gameover') {
    restartGame();
  }
});

// Initialize stars background
function initStars() {
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT,
      size: Math.random() * 2,
      speed: Math.random() * 2 + 1
    });
  }
}

// Create particle effect
function createParticles(x, y, count, color) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      size: Math.random() * 4 + 2,
      color: color,
      life: 30
    });
  }
}

// Spawn enemy
function spawnEnemy() {
  const type = Math.random();
  let enemy;
  
  if (type < 0.6) {
    // Basic enemy
    enemy = {
      x: Math.random() * (GAME_WIDTH - 40),
      y: -40,
      width: 40,
      height: 40,
      speed: ENEMY_SPEED + (level - 1) * 0.3,
      type: 'basic',
      hp: 1,
      color: '#f00'
    };
  } else if (type < 0.85) {
    // Fast enemy
    enemy = {
      x: Math.random() * (GAME_WIDTH - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: (ENEMY_SPEED + (level - 1) * 0.3) * 1.8,
      type: 'fast',
      hp: 1,
      color: '#ff0'
    };
  } else {
    // Tank enemy
    enemy = {
      x: Math.random() * (GAME_WIDTH - 50),
      y: -50,
      width: 50,
      height: 50,
      speed: (ENEMY_SPEED + (level - 1) * 0.3) * 0.6,
      type: 'tank',
      hp: 3,
      color: '#f0f'
    };
  }
  
  enemies.push(enemy);
}

// Spawn powerup
function spawnPowerup() {
  powerups.push({
    x: Math.random() * (GAME_WIDTH - 30),
    y: -30,
    width: 30,
    height: 30,
    speed: POWERUP_SPEED,
    type: Math.random() < 0.5 ? 'life' : 'rapid'
  });
}

// Start game
function startGame() {
  gameState = 'playing';
  score = 0;
  lives = 3;
  level = 1;
  player.x = GAME_WIDTH / 2;
  player.y = GAME_HEIGHT - 80;
  bullets.length = 0;
  enemies.length = 0;
  powerups.length = 0;
  particles.length = 0;
  enemySpawnRate = 60;
  frameCount = 0;
}

// Restart game
function restartGame() {
  startGame();
}

// Check collision
function checkCollision(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

// Update game
function update() {
  if (gameState !== 'playing') return;
  
  frameCount++;
  
  // Update stars
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > GAME_HEIGHT) {
      star.y = 0;
      star.x = Math.random() * GAME_WIDTH;
    }
  });
  
  // Player movement
  if ((keys['ArrowLeft'] || keys['a']) && player.x > 0) {
    player.x -= player.speed;
  }
  if ((keys['ArrowRight'] || keys['d']) && player.x < GAME_WIDTH - player.width) {
    player.x += player.speed;
  }
  if ((keys['ArrowUp'] || keys['w']) && player.y > GAME_HEIGHT / 2) {
    player.y -= player.speed;
  }
  if ((keys['ArrowDown'] || keys['s']) && player.y < GAME_HEIGHT - player.height) {
    player.y += player.speed;
  }
  
  // Player shooting
  if (player.fireCooldown > 0) {
    player.fireCooldown--;
  }
  if (keys[' '] && player.fireCooldown === 0) {
    bullets.push({
      x: player.x + player.width / 2 - 3,
      y: player.y,
      width: 6,
      height: 20,
      speed: BULLET_SPEED
    });
    player.fireCooldown = player.fireRate;
  }
  
  // Update bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;
    if (bullets[i].y < -bullets[i].height) {
      bullets.splice(i, 1);
    }
  }
  
  // Spawn enemies
  if (frameCount % Math.max(20, enemySpawnRate - level * 3) === 0) {
    spawnEnemy();
  }
  
  // Spawn powerups occasionally
  if (frameCount % 600 === 0 && Math.random() < 0.5) {
    spawnPowerup();
  }
  
  // Update enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += enemies[i].speed;
    
    // Enemy off screen
    if (enemies[i].y > GAME_HEIGHT) {
      enemies.splice(i, 1);
      continue;
    }
    
    // Bullet-enemy collision
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[j], enemies[i])) {
        bullets.splice(j, 1);
        enemies[i].hp--;
        
        if (enemies[i].hp <= 0) {
          createParticles(enemies[i].x + enemies[i].width / 2, 
                         enemies[i].y + enemies[i].height / 2, 
                         10, enemies[i].color);
          
          if (enemies[i].type === 'basic') score += 10;
          else if (enemies[i].type === 'fast') score += 20;
          else if (enemies[i].type === 'tank') score += 50;
          
          enemies.splice(i, 1);
          
          // Level up every 500 points
          if (score % 500 === 0 && score > 0) {
            level++;
            createParticles(GAME_WIDTH / 2, GAME_HEIGHT / 2, 30, '#0ff');
          }
        }
        break;
      }
    }
    
    // Player-enemy collision
    if (enemies[i] && checkCollision(player, enemies[i])) {
      createParticles(enemies[i].x + enemies[i].width / 2, 
                     enemies[i].y + enemies[i].height / 2, 
                     15, '#f00');
      enemies.splice(i, 1);
      lives--;
      
      if (lives <= 0) {
        gameState = 'gameover';
      }
    }
  }
  
  // Update powerups
  for (let i = powerups.length - 1; i >= 0; i--) {
    powerups[i].y += powerups[i].speed;
    
    if (powerups[i].y > GAME_HEIGHT) {
      powerups.splice(i, 1);
      continue;
    }
    
    // Player-powerup collision
    if (checkCollision(player, powerups[i])) {
      if (powerups[i].type === 'life') {
        lives = Math.min(lives + 1, 5);
      } else if (powerups[i].type === 'rapid') {
        player.fireRate = Math.max(5, player.fireRate - 2);
      }
      createParticles(powerups[i].x + 15, powerups[i].y + 15, 10, '#0f0');
      powerups.splice(i, 1);
    }
  }
  
  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].x += particles[i].vx;
    particles[i].y += particles[i].vy;
    particles[i].life--;
    
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// Draw game
function draw() {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  // Draw stars
  ctx.fillStyle = '#fff';
  stars.forEach(star => {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
  
  if (gameState === 'title') {
    drawTitle();
  } else if (gameState === 'playing') {
    drawGame();
  } else if (gameState === 'gameover') {
    drawGameOver();
  }
}

// Draw title screen
function drawTitle() {
  ctx.fillStyle = '#0ff';
  ctx.font = 'bold 60px "Courier New"';
  ctx.textAlign = 'center';
  ctx.fillText('COSMIC DEFENDER', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80);
  
  ctx.fillStyle = '#fff';
  ctx.font = '24px "Courier New"';
  ctx.fillText('Defend Earth from alien invaders!', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
  
  ctx.fillStyle = '#0f0';
  ctx.font = '20px "Courier New"';
  ctx.fillText('CONTROLS:', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
  ctx.fillStyle = '#fff';
  ctx.font = '18px "Courier New"';
  ctx.fillText('Arrow Keys / WASD - Move', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 60);
  ctx.fillText('SPACE - Shoot', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 85);
  
  ctx.fillStyle = '#ff0';
  ctx.font = 'bold 28px "Courier New"';
  ctx.fillText('CLICK TO START', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 140);
}

// Draw game screen
function drawGame() {
  // Draw player
  ctx.fillStyle = '#0ff';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  ctx.fillStyle = '#fff';
  ctx.fillRect(player.x + 5, player.y + 10, 30, 25);
  ctx.fillStyle = '#f00';
  ctx.fillRect(player.x + 17, player.y, 6, 10);
  
  // Draw bullets
  ctx.fillStyle = '#ff0';
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
  
  // Draw enemies
  enemies.forEach(enemy => {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = '#fff';
    if (enemy.type === 'basic') {
      ctx.fillRect(enemy.x + 10, enemy.y + 10, 20, 20);
    } else if (enemy.type === 'fast') {
      ctx.fillRect(enemy.x + 8, enemy.y + 8, 14, 14);
    } else if (enemy.type === 'tank') {
      ctx.fillRect(enemy.x + 10, enemy.y + 10, 30, 30);
      // HP indicator
      ctx.fillStyle = '#0f0';
      ctx.fillRect(enemy.x, enemy.y - 5, (enemy.hp / 3) * enemy.width, 3);
    }
  });
  
  // Draw powerups
  powerups.forEach(powerup => {
    if (powerup.type === 'life') {
      ctx.fillStyle = '#f00';
      ctx.fillRect(powerup.x, powerup.y, powerup.width, powerup.height);
      ctx.fillStyle = '#fff';
      ctx.fillRect(powerup.x + 10, powerup.y + 5, 10, 20);
      ctx.fillRect(powerup.x + 5, powerup.y + 10, 20, 10);
    } else if (powerup.type === 'rapid') {
      ctx.fillStyle = '#00f';
      ctx.fillRect(powerup.x, powerup.y, powerup.width, powerup.height);
      ctx.fillStyle = '#ff0';
      ctx.fillRect(powerup.x + 8, powerup.y + 8, 14, 14);
    }
  });
  
  // Draw particles
  particles.forEach(particle => {
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.life / 30;
    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  });
  ctx.globalAlpha = 1;
  
  // Draw HUD
  ctx.fillStyle = '#fff';
  ctx.font = '20px "Courier New"';
  ctx.textAlign = 'left';
  ctx.fillText('Score: ' + score, 10, 30);
  ctx.fillText('Level: ' + level, 10, 55);
  
  // Draw lives
  ctx.fillStyle = '#0ff';
  for (let i = 0; i < lives; i++) {
    ctx.fillRect(GAME_WIDTH - 40 - i * 35, 10, 30, 30);
  }
}

// Draw game over screen
function drawGameOver() {
  // Draw final game state (dimmed)
  ctx.globalAlpha = 0.3;
  drawGame();
  ctx.globalAlpha = 1;
  
  // Game over overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  ctx.fillStyle = '#f00';
  ctx.font = 'bold 60px "Courier New"';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60);
  
  ctx.fillStyle = '#fff';
  ctx.font = '30px "Courier New"';
  ctx.fillText('Final Score: ' + score, GAME_WIDTH / 2, GAME_HEIGHT / 2);
  ctx.fillText('Level Reached: ' + level, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 40);
  
  ctx.fillStyle = '#0f0';
  ctx.font = 'bold 24px "Courier New"';
  ctx.fillText('CLICK TO RESTART', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100);
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Initialize and start
initStars();
gameLoop();

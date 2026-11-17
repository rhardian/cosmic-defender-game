// Generate placeholder screenshots using canvas
import { createWriteStream } from 'node:fs';
import { createCanvas } from 'canvas';

const canvas = createCanvas(1280, 720);
const ctx = canvas.getContext('2d');

// Screenshot 1: Title Screen
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, 1280, 720);

// Stars
for (let i = 0; i < 100; i++) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(Math.random() * 1280, Math.random() * 720, 2, 2);
}

ctx.fillStyle = '#0ff';
ctx.font = 'bold 80px "Courier New"';
ctx.textAlign = 'center';
ctx.fillText('COSMIC DEFENDER', 640, 280);

ctx.fillStyle = '#fff';
ctx.font = '30px "Courier New"';
ctx.fillText('Defend Earth from alien invaders!', 640, 340);

ctx.fillStyle = '#0f0';
ctx.font = '24px "Courier New"';
ctx.fillText('CONTROLS:', 640, 400);
ctx.fillStyle = '#fff';
ctx.font = '22px "Courier New"';
ctx.fillText('Arrow Keys / WASD - Move', 640, 435);
ctx.fillText('SPACE - Shoot', 640, 465);

ctx.fillStyle = '#ff0';
ctx.font = 'bold 36px "Courier New"';
ctx.fillText('CLICK TO START', 640, 540);

const out1 = createWriteStream('screenshots/01-title.png');
canvas.createPNGStream().pipe(out1);
out1.on('finish', () => console.log('Screenshot 1 saved'));

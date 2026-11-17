// Generate screenshots using Puppeteer from Playwright installation
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const chromiumPath = join(homedir(), '.cache/ms-playwright/chromium-1140/chrome-linux/chrome');

if (!existsSync(chromiumPath)) {
  console.error('Chromium not found at:', chromiumPath);
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: chromiumPath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });

// Screenshot 1: Title screen
await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
await page.waitForTimeout(1000);
await page.screenshot({ path: 'screenshots/01-title.png' });
console.log('Screenshot 1: Title screen saved');

// Screenshot 2: Gameplay (click to start and wait)
await page.click('#gameCanvas');
await page.waitForTimeout(3000);
await page.screenshot({ path: 'screenshots/02-gameplay.png' });
console.log('Screenshot 2: Gameplay saved');

// Screenshot 3: More gameplay
await page.waitForTimeout(5000);
await page.screenshot({ path: 'screenshots/03-action.png' });
console.log('Screenshot 3: Action saved');

await browser.close();
console.log('All screenshots generated successfully!');

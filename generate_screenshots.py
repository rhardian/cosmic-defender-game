#!/usr/bin/env python3
# Generate original screenshots for Cosmic Defender game
from PIL import Image, ImageDraw, ImageFont
import random

def create_title_screen():
    img = Image.new('RGB', (1280, 720), color='black')
    draw = ImageDraw.Draw(img)
    
    # Stars
    for _ in range(100):
        x, y = random.randint(0, 1280), random.randint(0, 720)
        draw.rectangle([x, y, x+2, y+2], fill='white')
    
    # Title
    draw.text((640, 250), 'COSMIC DEFENDER', fill='cyan', anchor='mm', 
              font=ImageFont.load_default().font_variant(size=60))
    draw.text((640, 320), 'Defend Earth from alien invaders!', fill='white', 
              anchor='mm', font=ImageFont.load_default().font_variant(size=24))
    
    # Controls
    draw.text((640, 380), 'CONTROLS:', fill='lime', anchor='mm',
              font=ImageFont.load_default().font_variant(size=20))
    draw.text((640, 415), 'Arrow Keys / WASD - Move', fill='white', anchor='mm',
              font=ImageFont.load_default().font_variant(size=18))
    draw.text((640, 445), 'SPACE - Shoot', fill='white', anchor='mm',
              font=ImageFont.load_default().font_variant(size=18))
    
    # Start prompt
    draw.text((640, 520), 'CLICK TO START', fill='yellow', anchor='mm',
              font=ImageFont.load_default().font_variant(size=32))
    
    img.save('screenshots/01-title.png')
    print('✓ Title screen created')

def create_gameplay_screen():
    img = Image.new('RGB', (1280, 720), color='black')
    draw = ImageDraw.Draw(img)
    
    # Stars
    for _ in range(100):
        x, y = random.randint(0, 1280), random.randint(0, 720)
        draw.rectangle([x, y, x+2, y+2], fill='white')
    
    # Player ship
    draw.rectangle([620, 650, 660, 690], fill='cyan')
    draw.rectangle([625, 660, 655, 685], fill='white')
    
    # Enemies
    draw.rectangle([200, 100, 240, 140], fill='red')
    draw.rectangle([210, 110, 230, 130], fill='white')
    
    draw.rectangle([500, 200, 540, 240], fill='red')
    draw.rectangle([510, 210, 530, 230], fill='white')
    
    draw.rectangle([800, 150, 840, 190], fill='yellow')
    draw.rectangle([810, 160, 830, 180], fill='white')
    
    # Bullets
    draw.rectangle([638, 600, 642, 620], fill='yellow')
    draw.rectangle([638, 550, 642, 570], fill='yellow')
    draw.rectangle([638, 500, 642, 520], fill='yellow')
    
    # HUD
    draw.text((10, 10), 'Score: 850', fill='white', 
              font=ImageFont.load_default().font_variant(size=20))
    draw.text((10, 40), 'Level: 4', fill='white',
              font=ImageFont.load_default().font_variant(size=20))
    
    # Lives
    for i in range(3):
        draw.rectangle([1210 - i*35, 10, 1240 - i*35, 40], fill='cyan')
    
    img.save('screenshots/02-gameplay.png')
    print('✓ Gameplay screen created')

def create_gameover_screen():
    img = Image.new('RGB', (1280, 720), color='black')
    draw = ImageDraw.Draw(img)
    
    # Stars (dimmed)
    for _ in range(100):
        x, y = random.randint(0, 1280), random.randint(0, 720)
        draw.rectangle([x, y, x+1, y+1], fill='#333333')
    
    # Semi-transparent overlay
    overlay = Image.new('RGBA', (1280, 720), color=(0, 0, 0, 180))
    img.paste(overlay, (0, 0), overlay)
    draw = ImageDraw.Draw(img)
    
    # Game Over text
    draw.text((640, 280), 'GAME OVER', fill='red', anchor='mm',
              font=ImageFont.load_default().font_variant(size=60))
    draw.text((640, 360), 'Final Score: 1450', fill='white', anchor='mm',
              font=ImageFont.load_default().font_variant(size=30))
    draw.text((640, 400), 'Level Reached: 6', fill='white', anchor='mm',
              font=ImageFont.load_default().font_variant(size=30))
    draw.text((640, 480), 'CLICK TO RESTART', fill='lime', anchor='mm',
              font=ImageFont.load_default().font_variant(size=28))
    
    img.save('screenshots/03-gameover.png')
    print('✓ Game over screen created')

if __name__ == '__main__':
    create_title_screen()
    create_gameplay_screen()
    create_gameover_screen()
    print('All screenshots generated successfully!')

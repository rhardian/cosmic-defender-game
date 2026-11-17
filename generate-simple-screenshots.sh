#!/bin/bash
# Generate simple but original screenshots using ImageMagick

# Screenshot 1: Title Screen (1280x720)
convert -size 1280x720 xc:black \
  -fill white -pointsize 80 -font Courier-Bold -gravity center -draw "text 0,-150 'COSMIC DEFENDER'" \
  -fill cyan -pointsize 30 -draw "text 0,-80 'Defend Earth from alien invaders!'" \
  -fill lime -pointsize 24 -draw "text 0,-20 'CONTROLS:'" \
  -fill white -pointsize 20 -draw "text 0,10 'Arrow Keys / WASD - Move'" \
  -fill white -pointsize 20 -draw "text 0,40 'SPACE - Shoot'" \
  -fill yellow -pointsize 32 -font Courier-Bold -draw "text 0,100 'CLICK TO START'" \
  screenshots/01-title.png

# Screenshot 2: Gameplay (1280x720)
convert -size 1280x720 xc:black \
  -fill cyan -draw "rectangle 620,650 660,690" \
  -fill red -draw "rectangle 200,100 240,140" \
  -fill red -draw "rectangle 500,200 540,240" \
  -fill yellow -draw "rectangle 800,150 840,190" \
  -fill yellow -draw "rectangle 638,600 642,620" \
  -fill yellow -draw "rectangle 638,550 642,570" \
  -fill white -pointsize 24 -gravity northwest -annotate +10+10 "Score: 450" \
  -fill white -pointsize 24 -annotate +10+40 "Level: 3" \
  -fill cyan -draw "rectangle 1210,10 1240,40" \
  -fill cyan -draw "rectangle 1175,10 1205,40" \
  -fill cyan -draw "rectangle 1140,10 1170,40" \
  screenshots/02-gameplay.png

# Screenshot 3: Game Over (1280x720)
convert -size 1280x720 xc:black \
  -fill 'rgba(0,0,0,0.7)' -draw "rectangle 0,0 1280,720" \
  -fill red -pointsize 60 -font Courier-Bold -gravity center -draw "text 0,-120 'GAME OVER'" \
  -fill white -pointsize 30 -draw "text 0,-40 'Final Score: 1250'" \
  -fill white -pointsize 30 -draw "text 0,0 'Level Reached: 5'" \
  -fill lime -pointsize 28 -font Courier-Bold -draw "text 0,70 'CLICK TO RESTART'" \
  screenshots/03-gameover.png

echo "Screenshots generated!"
ls -lh screenshots/

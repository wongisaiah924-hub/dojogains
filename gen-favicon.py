#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os

# Create 32x32 favicon
size = 32
img = Image.new('RGB', (size, size), '#E63946')
draw = ImageDraw.Draw(img)

# Simple gi icon scaled down
cx, cy = 16, 12

# Collar V
draw.polygon([(cx-6, cy-4), (cx, cy+4), (cx+6, cy-4)], fill='#ffffff')
draw.polygon([(cx-4, cy-2), (cx, cy+2), (cx+4, cy-2)], fill='#E63946')

# Body
draw.rectangle([cx-10, cy, cx+10, cy+14], fill='#ffffff')
draw.rectangle([cx-8, cy+2, cx+8, cy+12], fill='#E63946')

# Belt
draw.rectangle([cx-10, cy+6, cx+10, cy+10], fill='#1a1a1a')

img.save('favicon-32.png')

# Create 16x16 version
img16 = img.resize((16, 16), Image.LANCZOS)
img16.save('favicon-16.png')

# Create ICO file with multiple sizes
img.save('favicon.ico', format='ICO', sizes=[(16, 16), (32, 32)])

# Create 180x180 apple touch icon
size = 180
img_apple = Image.new('RGB', (size, size), '#E63946')
draw = ImageDraw.Draw(img_apple)

cx, cy = 90, 70

# Collar V
draw.polygon([(cx-35, cy-25), (cx, cy+25), (cx+35, cy-25)], fill='#ffffff')
draw.polygon([(cx-28, cy-18), (cx, cy+18), (cx+28, cy-18)], fill='#E63946')

# Body
draw.rectangle([cx-55, cy, cx+55, cy+80], fill='#ffffff')
draw.rectangle([cx-45, cy+10, cx+45, cy+70], fill='#E63946')

# Belt
draw.rectangle([cx-55, cy+35, cx+55, cy+50], fill='#1a1a1a')

img_apple.save('apple-touch-icon.png')

# 192x192 for PWA
img_192 = img_apple.resize((192, 192), Image.LANCZOS)
img_192.save('icon-192.png')

print('Created favicon.ico, favicon-16.png, favicon-32.png, apple-touch-icon.png, icon-192.png')

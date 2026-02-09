#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create image - red background
size = 512
img = Image.new('RGB', (size, size), '#E63946')
draw = ImageDraw.Draw(img)

# Draw a simple gi/robe icon in white
center_x = 256
top_y = 100

# Collar/V-neck
draw.polygon([
    (center_x - 60, top_y),
    (center_x, top_y + 90),
    (center_x + 60, top_y)
], fill='#ffffff')
draw.polygon([
    (center_x - 50, top_y + 10),
    (center_x, top_y + 80),
    (center_x + 50, top_y + 10)
], fill='#E63946')

# Body of gi
draw.rectangle([center_x - 100, top_y + 50, center_x + 100, top_y + 220], fill='#ffffff')
draw.rectangle([center_x - 85, top_y + 65, center_x + 85, top_y + 205], fill='#E63946')

# Sleeves
draw.rectangle([center_x - 140, top_y + 50, center_x - 90, top_y + 130], fill='#ffffff')
draw.rectangle([center_x + 90, top_y + 50, center_x + 140, top_y + 130], fill='#ffffff')

# Belt (dark/black)
draw.rectangle([center_x - 100, top_y + 120, center_x + 100, top_y + 150], fill='#1a1a1a')

# Belt knot
draw.ellipse([center_x - 20, top_y + 125, center_x + 20, top_y + 145], fill='#1a1a1a')

# Belt tails
draw.polygon([
    (center_x - 10, top_y + 145),
    (center_x - 30, top_y + 190),
    (center_x - 15, top_y + 190),
    (center_x, top_y + 150)
], fill='#1a1a1a')
draw.polygon([
    (center_x + 10, top_y + 145),
    (center_x + 30, top_y + 190),
    (center_x + 15, top_y + 190),
    (center_x, top_y + 150)
], fill='#1a1a1a')

# Load font for text
try:
    for font_path in [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/TTF/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    ]:
        if os.path.exists(font_path):
            font_large = ImageFont.truetype(font_path, 52)
            break
    else:
        font_large = ImageFont.load_default()
except:
    font_large = ImageFont.load_default()

# Text
text = "DOJO GAINS"
bbox = draw.textbbox((0, 0), text, font=font_large)
text_w = bbox[2] - bbox[0]
text_x = (size - text_w) // 2
text_y = 380

draw.text((text_x, text_y), text, fill='#ffffff', font=font_large)

# Save
img.save('logo-red-512.png')
print('Created logo-red-512.png')

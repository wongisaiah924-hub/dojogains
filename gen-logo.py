#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create image
size = 512
img = Image.new('RGB', (size, size), '#0a0a0a')
draw = ImageDraw.Draw(img)

# Try to load a bold font, fallback to default
try:
    # Try various system fonts
    for font_path in [
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/TTF/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
    ]:
        if os.path.exists(font_path):
            font_large = ImageFont.truetype(font_path, 56)
            break
    else:
        font_large = ImageFont.load_default()
except:
    font_large = ImageFont.load_default()

# Draw the martial arts gi emoji (as text, may not render perfectly)
# Instead, let's use a simple icon representation
emoji_y = 140

# Draw a simple gi/robe icon shape
# Collar lines
draw.polygon([(256-40, 120), (256, 180), (256+40, 120)], fill='#ffffff')
draw.polygon([(256-35, 125), (256, 175), (256+35, 125)], fill='#0a0a0a')

# Body of gi
draw.rectangle([186, 140, 326, 260], fill='#ffffff')
draw.rectangle([196, 150, 316, 250], fill='#0a0a0a')

# Belt
draw.rectangle([186, 190, 326, 210], fill='#1a1a1a')
draw.rectangle([240, 190, 272, 210], fill='#22C55E')

# Text
text_dojo = "DOJO"
text_gains = "GAINS"

# Get text sizes
bbox_dojo = draw.textbbox((0, 0), text_dojo, font=font_large)
bbox_gains = draw.textbbox((0, 0), text_gains, font=font_large)

dojo_w = bbox_dojo[2] - bbox_dojo[0]
gains_w = bbox_gains[2] - bbox_gains[0]
total_w = dojo_w + gains_w + 8

start_x = (size - total_w) // 2
text_y = 340

draw.text((start_x, text_y), text_dojo, fill='#ffffff', font=font_large)
draw.text((start_x + dojo_w + 8, text_y), text_gains, fill='#22C55E', font=font_large)

# Save
img.save('logo-512.png')
print('Created logo-512.png')

# Also create a smaller version
img_small = img.resize((128, 128), Image.LANCZOS)
img_small.save('logo-128.png')
print('Created logo-128.png')

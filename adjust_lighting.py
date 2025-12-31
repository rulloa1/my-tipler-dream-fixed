import os
from PIL import Image, ImageEnhance
import shutil

# Configuration
SOURCE_DIR = r"C:\Users\roryu\Desktop\my-tipler-dream\public\design\pools"
DEST_DIR = r"C:\Users\roryu\Desktop\my-tipler-dream\public\design\pools_adjusted"

# Adjustments (1.0 = original)
BRIGHTNESS_FACTOR = 1.15  # 15% brighter
CONTRAST_FACTOR = 1.10    # 10% more contrast
SATURATION_FACTOR = 1.05  # 5% more saturation

def process_image(file_path, dest_path):
    try:
        with Image.open(file_path) as img:
            # Convert to RGB if needed (e.g. for PNGs with transparency)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Apply Brightness
            enhancer = ImageEnhance.Brightness(img)
            img = enhancer.enhance(BRIGHTNESS_FACTOR)
            
            # Apply Contrast
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(CONTRAST_FACTOR)
            
            # Apply Saturation (Vibrance)
            enhancer = ImageEnhance.Color(img)
            img = enhancer.enhance(SATURATION_FACTOR)
            
            # Save
            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            img.save(dest_path, quality=95)
            print(f"Processed: {os.path.basename(file_path)}")
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    print(f"Starting bulk lighting adjustment...")
    print(f"Source: {SOURCE_DIR}")
    print(f"Destination: {DEST_DIR}")
    
    if os.path.exists(DEST_DIR):
        print(f"Warning: Destination directory already exists.")
    
    count = 0
    for root, dirs, files in os.walk(SOURCE_DIR):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                src_path = os.path.join(root, file)
                
                # Calculate relative path to maintain structure
                rel_path = os.path.relpath(src_path, SOURCE_DIR)
                dest_path = os.path.join(DEST_DIR, rel_path)
                
                process_image(src_path, dest_path)
                count += 1
                
    print(f"\nDone! Processed {count} images.")
    print(f"Check the results in: {DEST_DIR}")

if __name__ == "__main__":
    main()

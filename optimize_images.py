import os
import re
from PIL import Image

# Configuration
PROJECT_ROOT = os.getcwd()
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")

MAX_DIMENSION = 2500
JPEG_QUALITY = 85
MAX_SIZE_BYTES = 800 * 1024  # 800KB target threshold for triggering optimization

# Extensions to process
VALID_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'}

def get_files_in_src():
    src_files = []
    for root, dirs, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                src_files.append(os.path.join(root, file))
    return src_files

def update_references(old_rel_path, new_rel_path, src_files):
    # old_rel_path: projects/foo/bar.png
    # in code it might be "/projects/foo/bar.png" or "projects/foo/bar.png"
    
    # We'll search for the filename part mainly, or strictly the path relative to public
    # Code usually uses absolute paths from public root: "/projects/..."
    
    old_str_1 = f"/{old_rel_path.replace(os.sep, '/')}"
    new_str_1 = f"/{new_rel_path.replace(os.sep, '/')}"
    
    # Also try without leading slash just in case
    old_str_2 = old_rel_path.replace(os.sep, '/')
    new_str_2 = new_rel_path.replace(os.sep, '/')
    
    replaced_count = 0
    
    for file_path in src_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            if old_str_1 in new_content:
                new_content = new_content.replace(old_str_1, new_str_1)
                replaced_count += 1
            elif old_str_2 in new_content:
                 # Be careful not to replace partial matches if not intended, but usually safe for full paths
                 # But verify_images logic was safer. 
                 # For now, let's stick to the leading slash version as that's 99% of usage in this codebase
                 pass

            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                    
        except Exception as e:
            print(f"Error updating {file_path}: {e}")
            
    return replaced_count

def has_transparency(img):
    if img.mode == "P":
        transparent = img.info.get("transparency", -1)
        for _, index in img.getcolors():
            if index == transparent:
                return True
    elif img.mode == "RGBA":
        extrema = img.getextrema()
        if extrema[3][0] < 255:
            return True
    return False

def optimize_images():
    print("Starting image optimization...")
    src_files = get_files_in_src()
    
    optimized_count = 0
    converted_count = 0
    
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext not in VALID_EXTS:
                continue
                
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, PUBLIC_DIR)
            
            try:
                size = os.path.getsize(file_path)
                
                # Check if needs optimization
                needs_opt = False
                needs_convert = False
                
                with Image.open(file_path) as img:
                    width, height = img.size
                    
                    # 1. Check Dimensions
                    if width > MAX_DIMENSION or height > MAX_DIMENSION:
                        needs_opt = True
                        
                    # 2. Check Size / Format
                    if size > MAX_SIZE_BYTES:
                        needs_opt = True
                        # If large PNG and no transparency, convert to JPG
                        if ext.lower() == '.png' and not has_transparency(img):
                            needs_convert = True

                if not needs_opt:
                    continue
                    
                print(f"Optimizing: {rel_path} ({width}x{height}, {size/1024/1024:.2f} MB)")
                
                # Re-open to process
                with Image.open(file_path) as img:
                    # Resize
                    if width > MAX_DIMENSION or height > MAX_DIMENSION:
                        img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)
                    
                    # Convert/Save
                    if needs_convert:
                        # Convert PNG to JPG
                        new_file_path = os.path.splitext(file_path)[0] + ".jpg"
                        new_rel_path = os.path.splitext(rel_path)[0] + ".jpg"
                        
                        rgb_img = img.convert('RGB')
                        rgb_img.save(new_file_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
                        
                        # Remove old file
                        os.remove(file_path)
                        
                        # Update references
                        refs = update_references(rel_path, new_rel_path, src_files)
                        print(f"  -> Converted to JPG. Updated {refs} references.")
                        converted_count += 1
                    else:
                        # Just save in place (optimized)
                        # If it's PNG, save as PNG optimized (though PIL isn't great at PNG compression, it helps a bit)
                        # If JPG, save as JPG optimized
                        if ext.lower() in ['.jpg', '.jpeg', '.jpg']:
                            img.save(file_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
                        elif ext.lower() == '.png':
                            # Try to save optimized PNG
                            img.save(file_path, "PNG", optimize=True)
                        elif ext.lower() == '.webp':
                            img.save(file_path, "WEBP", quality=JPEG_QUALITY)
                            
                        print(f"  -> Optimized in place.")
                        
                optimized_count += 1
                
            except Exception as e:
                print(f"Error processing {rel_path}: {e}")

    print(f"\nDone! Optimized {optimized_count} images ({converted_count} converted to JPG).")

if __name__ == "__main__":
    optimize_images()

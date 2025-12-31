import os
from PIL import Image
import math

# Configuration
PUBLIC_DIR = os.path.join(os.getcwd(), "public")
MAX_FILE_SIZE_MB = 1.0  # Flag images larger than 1MB
MAX_DIMENSION = 2500     # Flag images wider/taller than 2500px

def convert_size(size_bytes):
    if size_bytes == 0:
        return "0B"
    size_name = ("B", "KB", "MB", "GB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return "%s %s" % (s, size_name[i])

def analyze_images():
    print(f"Scanning {PUBLIC_DIR} for unoptimized images...")
    print(f"Criteria: > {MAX_FILE_SIZE_MB}MB OR > {MAX_DIMENSION}px width/height\n")
    
    large_files = []
    large_dimensions = []
    large_pngs = []
    
    count = 0
    optimized_count = 0
    
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                count += 1
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, PUBLIC_DIR)
                
                try:
                    # File Size
                    size_bytes = os.path.getsize(file_path)
                    
                    # Dimensions
                    with Image.open(file_path) as img:
                        width, height = img.size
                        fmt = img.format
                        
                    is_large_file = size_bytes > (MAX_FILE_SIZE_MB * 1024 * 1024)
                    is_large_dim = width > MAX_DIMENSION or height > MAX_DIMENSION
                    is_large_png = fmt == 'PNG' and size_bytes > (500 * 1024) # > 500KB PNG
                    
                    issue = []
                    if is_large_file:
                        issue.append(f"Size: {convert_size(size_bytes)}")
                        large_files.append((rel_path, size_bytes))
                    if is_large_dim:
                        issue.append(f"Dims: {width}x{height}")
                        large_dimensions.append((rel_path, width, height))
                    if is_large_png:
                        issue.append("Large PNG (consider JPG/WebP)")
                        large_pngs.append((rel_path, size_bytes))
                        
                    if issue:
                        print(f"⚠️  {rel_path}")
                        print(f"    {' | '.join(issue)}")
                    else:
                        optimized_count += 1
                        
                except Exception as e:
                    print(f"❌ Error reading {rel_path}: {e}")

    print("\n" + "="*50)
    print(f"Summary:")
    print(f"Total Images: {count}")
    print(f"Optimized: {optimized_count}")
    print(f"Issues Found: {count - optimized_count}")
    print("="*50)
    
    if large_files:
        print(f"\nTop 5 Largest Files:")
        large_files.sort(key=lambda x: x[1], reverse=True)
        for path, size in large_files[:5]:
            print(f"- {path}: {convert_size(size)}")

if __name__ == "__main__":
    analyze_images()

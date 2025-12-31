import os
import re

# Configuration
PROJECT_ROOT = os.getcwd()
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")

# Regex to find image paths
# Matches strings starting with /design/ or /projects/ or just / followed by path chars and image extension
# Captures typical absolute paths used in web apps
IMAGE_PATTERN = re.compile(r'["\'](/[a-zA-Z0-9_\-\./\s]+\.(?:jpg|jpeg|png|webp|gif|svg|JPG|JPEG|PNG|WEBP|GIF|SVG))["\']')

def main():
    print("Starting comprehensive image verification...")
    print(f"Public Directory: {PUBLIC_DIR}")
    print(f"Source Directory: {SRC_DIR}")
    
    missing_files = []
    found_files = set()
    scanned_count = 0
    
    # Walk through all files in src
    for root, dirs, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                scanned_count += 1
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        matches = IMAGE_PATTERN.findall(content)
                        
                        for match in matches:
                            # Skip likely external URLs (though regex requires starting with /)
                            if match.startswith('//'): continue
                            
                            # Remove leading slash to join with PUBLIC_DIR
                            rel_path = match.lstrip('/')
                            full_path = os.path.join(PUBLIC_DIR, rel_path)
                            
                            # Normalize path separators
                            full_path = os.path.normpath(full_path)
                            
                            if not os.path.exists(full_path):
                                missing_files.append({
                                    'source_file': os.path.relpath(file_path, PROJECT_ROOT),
                                    'image_path': match,
                                    'full_path': full_path
                                })
                            else:
                                found_files.add(match)
                                
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")

    print("\n--- Results ---")
    print(f"Scanned {scanned_count} files.")
    print(f"Found {len(found_files)} unique valid images.")
    
    if missing_files:
        print(f"\nFound {len(missing_files)} missing images:")
        for item in missing_files:
            print(f"- {item['image_path']}")
            print(f"  Referenced in: {item['source_file']}")
    else:
        print("\nAll referenced images exist! ✅")

if __name__ == "__main__":
    main()

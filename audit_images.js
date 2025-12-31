import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = process.cwd();
const PROJECTS_FILE = path.join(PROJECT_ROOT, 'src/data/projects.ts');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

function getAllFiles(dirPath, arrayOfFiles, rootDir) {
    try {
        const files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        files.forEach(function (file) {
            const fullPath = path.join(dirPath, file);
            try {
                if (fs.statSync(fullPath).isDirectory()) {
                    arrayOfFiles = getAllFiles(fullPath, arrayOfFiles, rootDir);
                } else {
                    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
                        // Store strict relative path from public root, using forward slashes
                        let relPath = path.relative(path.join(rootDir, 'public'), fullPath);
                        relPath = '/' + relPath.split(path.sep).join('/');
                        arrayOfFiles.push(relPath);
                    }
                }
            } catch (e) {
                console.error(`Error processing file ${file}:`, e.message);
            }
        });
    } catch (e) {
        console.error(`Error reading dir ${dirPath}:`, e.message);
    }

    return arrayOfFiles;
}

try {
    console.log("Starting audit...");
    const content = fs.readFileSync(PROJECTS_FILE, 'utf8');

    // Extract all paths starting with /projects/ or /design/
    const pathRegex = /["'](\/(projects|design)\/[^"']+)["']/g;
    const usedPaths = new Set();
    let match;

    while ((match = pathRegex.exec(content)) !== null) {
        // Normalize to plain string
        usedPaths.add(match[1]);
    }

    console.log(`Found ${usedPaths.size} unique image paths in projects.ts`);

    const brokenPaths = [];
    usedPaths.forEach(p => {
        // p is like "/projects/foo.jpg"
        // constructing absolute path: join(root, public, projects/foo.jpg)
        // note: p starts with / so path.join might treat it as absolute if not careful on some systems, 
        // but path.join('c:/foo', '/bar') -> 'c:/foo/bar' usually. 
        // Safer to strip leading slash.
        const cleanP = p.startsWith('/') ? p.slice(1) : p;
        const localPath = path.join(PUBLIC_DIR, cleanP);

        if (!fs.existsSync(localPath)) {
            brokenPaths.push(p);
        }
    });

    console.log(`\n=== BROKEN PATHS (${brokenPaths.length}) ===`);
    brokenPaths.forEach(p => console.log(p));

    // Check for unused images
    console.log('\nScanning for unused images...');
    const allImages = getAllFiles(PUBLIC_DIR, [], PROJECT_ROOT);

    const unusedImages = [];
    allImages.forEach(webPath => {
        // webPath is like "/projects/foo.jpg"
        // normalize: ensure it starts with /projects or /design
        if ((webPath.startsWith('/projects') || webPath.startsWith('/design')) && !usedPaths.has(webPath)) {
            // Check if it's encoded or weird
            // Try matching normalized url encoded? maybe overkill.
            unusedImages.push(webPath);
        }
    });

    console.log(`\n=== UNUSED IMAGES (${unusedImages.length}) ===`);
    const unusedByFolder = {};
    unusedImages.forEach(img => {
        const folder = path.dirname(img);
        if (!unusedByFolder[folder]) unusedByFolder[folder] = [];
        unusedByFolder[folder].push(path.basename(img));
    });

    Object.keys(unusedByFolder).forEach(folder => {
        console.log(`\nFolder: ${folder}`);
        unusedByFolder[folder].forEach(f => console.log(`  - ${f}`));
    });

} catch (err) {
    console.error("Fatal Error:", err);
}

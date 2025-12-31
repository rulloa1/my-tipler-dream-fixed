
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const PROJECTS_DIR = path.join(PUBLIC_DIR, 'projects');

function getImagesInDir(dirName) {
    const fullPath = path.join(PROJECTS_DIR, dirName);
    if (!fs.existsSync(fullPath)) return [];

    return fs.readdirSync(fullPath)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => `/projects/${dirName}/${file}`);
}

const folders = [
    'Abaco Luxe Boat House',
    'Carmel Forest to Ocean View',
    'carmel-knolls',
    'carmel-valley-new',
    'Civil Engineering',
    'coastal-restoration',
    'Coastal_Mountain_Residence',
    'development-civil',
    'High Alpine Mtn. Ranch',
    'hillside-cleanup',
    'laguna-grande',
    'Mtn. Mid-Rise Luxe Condo',
    'New Residential Construction',
    'north-florida',
    'pacific-grove',
    'S. Florida High Rise Luxe',
    'Syracuse House',
    'Ultra Luxe Private Pool',
    'beachfront_estate'
];

const result = {};

folders.forEach(folder => {
    result[folder] = getImagesInDir(folder);
});

console.log(JSON.stringify(result, null, 2));

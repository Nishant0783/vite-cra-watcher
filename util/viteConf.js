import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the root directory
const rootDir = path.resolve(__dirname, '../');

// Get the src directory
const srcDir = path.join(rootDir, 'src');

export function isViteApp() {
    const filePath = path.join(rootDir, 'vite.config.js');
    console.log(`Checking for Vite config at: ${filePath}`); // Debug log
    if (fs.existsSync(filePath)) {
        console.log("You are working on a react app created with Vite.");
        return true;
    }
    console.log("Not a Vite app."); // Debug log
    return false;
}

export function clearViteDefaults() {
    const appcss = path.join(srcDir, 'App.css');
    console.log(`Checking for App.css at: ${appcss}`); // Debug log
    if (fs.existsSync(appcss)) {
        fs.writeFileSync(appcss, '', 'utf8');
        console.log("App.css has been cleared.");
    } else {
        console.log("App.css not found.");
    }

    const indexcss = path.join(srcDir, 'index.css');
    console.log(`Checking for index.css at: ${indexcss}`); // Debug log
    if (fs.existsSync(indexcss)) {
        fs.writeFileSync(indexcss, '', 'utf8');
        console.log("index.css has been cleared.");
    } else {
        console.log("index.css not found.");
    }
}

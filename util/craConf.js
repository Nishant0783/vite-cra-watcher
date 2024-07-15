import fs from 'fs';
import path from 'path';
import { updateApp } from './updateApp.js';


// Get the current working directory
const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public')
const flagFilePath = path.join(rootDir, '.craDefaultsClear')

export function isCra() {
    const filePath = path.join(publicDir, 'index.html');
    if (fs.existsSync(filePath)) {
        console.log("You are working on a react app created with Create React App.");
        return true;
    }
    return false;
}

export function clearCraDefaults() {
    if (fs.existsSync(flagFilePath)) {
        console.log("CRA defaults have already been cleared.");
        return;
    }

    const appcss = path.join(srcDir, 'App.css');
    console.log(`Checking for App.css at: ${appcss}`); // Debug log
    if (fs.existsSync(appcss)) {
        try {
            fs.writeFileSync(appcss, '', 'utf8');
            console.log("App.css has been cleared.");
        } catch (err) {
            console.error(`Failed to clear App.css: ${err}`);
        }
    } else {
        console.log("App.css not found.");
    }

    const indexcss = path.join(srcDir, 'index.css');
    console.log(`Checking for index.css at: ${indexcss}`); // Debug log
    if (fs.existsSync(indexcss)) {
        try {
            fs.writeFileSync(indexcss, '', 'utf8');
            console.log("index.css has been cleared.");
        } catch (err) {
            console.error(`Failed to clear index.css: ${err}`);
        }
    } else {
        console.log("index.css not found.");
    }

    const appPath = path.join(srcDir, 'App.js')
    updateApp(appPath)

    // Create the flag file to indicate that defaults have been cleared
    fs.writeFileSync(flagFilePath, 'CRA defaults cleared');
}



import fs from 'fs';
import path from 'path';

const srcDir = './src';

// Create components directory
export function createCompDir() {
    fs.mkdir(path.join(srcDir, 'components'), { recursive: true }, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("components directory created successfully")
        }
    })
}

// Create pages directory
export function createPagesDir() {
    fs.mkdir(path.join(srcDir, 'pages'), { recursive: true }, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("pages directory created successfully")
        }
    })
}


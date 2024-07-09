import fs from 'fs';
import path from 'path';

const srcDir = './src';

// Create components directory
export function createCompDir() {
    if (!fs.existsSync(path.join(srcDir, 'components'))) {
        fs.mkdir(path.join(srcDir, 'components'), { recursive: true }, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("Successfully created components directory")
            }
        })
    }
}

// Create pages directory
export function createPagesDir() {
    if (!fs.existsSync(path.join(srcDir, 'pages'))) {
        fs.mkdir(path.join(srcDir, 'pages'), { recursive: true }, (err) => {
            if (err) {
                throw err;
            } else {
                console.log("Successfully created pages directory")
            }
        })
    }
}


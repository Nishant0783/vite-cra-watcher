import fs from 'fs';
import path from 'path';
import { createBoilerPlate } from './boilerplate.js';
import { SUPPORTED_EXTENSIONS } from '../Constants.js';

export function updateApp(appPath) {
    if (fs.existsSync(appPath)) {
        try {
            addBoilerPlate(appPath);
        } catch (error) {
            console.log("Error in cleaning App.js or App.jsx")
        }
    } else {
        console.log("App.js or App.jsx does not exists.")
    }
}

export const addBoilerPlate = (filePath) => {
    const fileExt = path.extname(filePath);
    if (!SUPPORTED_EXTENSIONS.includes(fileExt)) return;

    const boilerPlate = createBoilerPlate(filePath);
    fs.writeFileSync(filePath, boilerPlate);
}

#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { toPascalCase } from './util/toPascalCase.js';
import { createCompDir, createPagesDir } from './util/createRequireDir.js'; // Import functions to create directories
import { SUPPORTED_EXTENSIONS } from './Constants.js';

const baseComponentsDir = './src/components' || './src/Components';
const basePagesDir = './src/pages' || './src/Pages';

const createBoilerPlate = (filePath) => {
  console.log("Generating boilerplate");
  const fileName = path.basename(filePath, path.extname(filePath));
  const pascalCaseName = toPascalCase(fileName);

  const boilerPlate = `import React from 'react';

const ${pascalCaseName} = () => {
  return (
    <>
      {/* Your component code here */}
    </>
  )
}

export default ${pascalCaseName};
`;

  return boilerPlate;
}

const addBoilerPlate = (filePath) => {
  const fileExt = path.extname(filePath);
  if (!SUPPORTED_EXTENSIONS.includes(fileExt)) {
    console.log(`Skipping ${filePath} (unsupported file extension)`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8').trim();
  if (fileContent.length > 0) {
    console.log(`Skipping ${filePath} (file already has content)`);
    return;
  }

  const boilerPlate = createBoilerPlate(filePath);
  fs.writeFile(filePath, boilerPlate, (err) => {
    if (err) {
      console.error(`Error adding boilerplate in file: ${filePath}`, err);
    } else {
      console.log(`Boilerplate added successfully in file: ${filePath}`);
    }
  });
}

const watchDirectory = (dirPath) => {
  console.log(`Watching directory: ${dirPath}`);
  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (filename) {
      const filePath = path.join(dirPath, filename);
      if (eventType === 'rename') {
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (!err) {
            handleFileChange(filePath);
          } else {
            console.error(`Error accessing file: ${filePath}`, err);
          }
        });
      }
    }
  });
}

const handleFileChange = (filePath) => {
  console.log(`File added: ${filePath}`);
  addBoilerPlate(filePath);
}

const initializeWatching = () => {
  console.log("Watching initialised");

  // Check if components directory exists, else create it
  if (fs.existsSync(baseComponentsDir)) {
    fs.readdir(baseComponentsDir, (err, files) => {
      if (err) {
        console.error(`Error reading directory ${baseComponentsDir}:`, err);
        return;
      }
      files.forEach((file) => {
        const filePath = path.join(baseComponentsDir, file);
        addBoilerPlate(filePath);
      });
    });
    watchDirectory(baseComponentsDir); // Start watching directory if it exists
  } else {
    createCompDir(); // Create components directory if it doesn't exist
  }

  // Check if pages directory exists, else create it
  if (fs.existsSync(basePagesDir)) {
    fs.readdir(basePagesDir, (err, files) => {
      if (err) {
        console.error(`Error reading directory ${basePagesDir}:`, err);
        return;
      }
      files.forEach((file) => { 
        const filePath = path.join(basePagesDir, file);
        addBoilerPlate(filePath);
      });
    });
    watchDirectory(basePagesDir); // Start watching directory if it exists
  } else {
    createPagesDir(); // Create pages directory if it doesn't exist
  }
}

initializeWatching();

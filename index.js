#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { toPascalCase } from './util/toPascalCase.js';

import { DIRECTORIES, SUPPORTED_EXTENSIONS } from './Constants.js';


let baseDirectories = [];

DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir.path)) {
    baseDirectories.push(dir.path);
  } else if (fs.existsSync(dir.altPath)) {
    baseDirectories.push(dir.altPath);
  } else {
    dir.createDir();
    baseDirectories.push(dir.path);
  }
});

const createBoilerPlate = (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const pascalCaseName = toPascalCase(fileName);
  return `import React from 'react';

const ${pascalCaseName} = () => {
  return (
    <>
      {/* Your component code here */}
    </>
  )
}

export default ${pascalCaseName};
`;
}

const addBoilerPlate = (filePath) => {
  const fileExt = path.extname(filePath);
  if (!SUPPORTED_EXTENSIONS.includes(fileExt)) return;

  const fileContent = fs.readFileSync(filePath, 'utf8').trim();
  if (fileContent.length > 0) return;

  const boilerPlate = createBoilerPlate(filePath);
  fs.writeFileSync(filePath, boilerPlate);
}

const watchDirectory = (dirPath) => {
  fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
    if (filename && eventType === 'rename') {
      const filePath = path.join(dirPath, filename);
      if (fs.existsSync(filePath)) {
        handleFileChange(filePath);
      }
    }
  });
}

const handleFileChange = (filePath) => {
  addBoilerPlate(filePath);
}

const initializeWatching = () => {
  baseDirectories.forEach(baseDir => {
    if (fs.existsSync(baseDir)) {
      fs.readdir(baseDir, (err, files) => {
        if (err) {
          console.error(`Error reading directory ${baseDir}:`, err);
          return;
        }
        files.forEach(file => {
          const filePath = path.join(baseDir, file);
          addBoilerPlate(filePath);
        });
      });
      watchDirectory(baseDir);
    }
  });
}

initializeWatching();

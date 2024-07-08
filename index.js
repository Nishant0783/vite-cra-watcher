#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { toPascalCase } from './util/toPascalCase.js';

const directoriesToWatch = ['./src/components'];

const createBoilerPlate = (filePath) => {
  console.log("Generating boilerplate")
  // Get the fileName
  const fileName = path.basename(filePath, path.extname(filePath));

  // Convert it to pascalcase
  const pascalCaseName = toPascalCase(fileName);

  // generate 
  const boilerPlate = `import react from 'react';
  
  const ${pascalCaseName} = () => {
    
    return (
      <> </>
    )
  }

  export default ${pascalCaseName}
  `
  return boilerPlate;
}

const addBoilerPlate = (filePath) => {
  const boilerPlate = createBoilerPlate(filePath);
  fs.writeFile(filePath, boilerPlate, (err) => {
    err ? console.log(`Error adding boilerplate in file:  ${filePath}`) : console.log(`Boilerplate added successfully in file: ${filePath}`)
  })
}

const watchDirectory = (pathOfDir) => {
  console.log(`watching directory: ${pathOfDir}`)
  // Using watch method by fs to continuously watch the directory for new files.
  fs.watch(pathOfDir, { recursive: true, encoding: 'utf8' }, (eventType, filename) => {
    const filePath = path.join(pathOfDir, filename)
    if (eventType == 'change') {
      handleFileChange(filePath)
    }
  })
}

const handleFileChange = (filePath) => {
  console.log(`file added: ${filePath}`)
}

const initializeWatching = () => {
  console.log("Watching initialised")
  directoriesToWatch.forEach((dir) => {
    fs.readdir(dir, (err, files) => {
      if(err) throw err;
      files.forEach((file) => {
        const filePath = path.join(dir, file)
        addBoilerPlate(filePath)
      })
    })
    watchDirectory(dir)
  })
}

initializeWatching();


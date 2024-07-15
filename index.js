#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { DIRECTORIES } from './Constants.js';
import { clearViteDefaults, isViteApp } from './util/viteConf.js';
import { clearCraDefaults, isCra } from './util/craConf.js';
import { addBoilerPlate } from './util/boilerplate.js';


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
  // Check for vite app or CRA and then apply changes
  if(isViteApp()) {
    clearViteDefaults();
  } else if(isCra()) {
    clearCraDefaults();
  } else {
    console.log("Clear default features is only available for react apps created with Vite or CRA")
  }
  baseDirectories.forEach(baseDir => {
    console.log("Base dir: ", baseDir);
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

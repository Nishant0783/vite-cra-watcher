import fs from 'fs';
import path from 'path';
import { toPascalCase } from './toPascalCase.js';
import { SUPPORTED_EXTENSIONS } from './../Constants.js';

export const createBoilerPlate = (filePath) => {
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

export const addBoilerPlate = (filePath) => {
    console.log("File Path is: ", filePath)
    const fileExt = path.extname(filePath);
    if (!SUPPORTED_EXTENSIONS.includes(fileExt)) return;
  
    const fileContent = fs.readFileSync(filePath, 'utf8').trim();
    if (fileContent.length > 0) return;
  
    const boilerPlate = createBoilerPlate(filePath);
    fs.writeFileSync(filePath, boilerPlate);
}
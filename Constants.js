import { createCompDir, createPagesDir } from './util/createRequireDir.js';

export const SUPPORTED_EXTENSIONS =  ['.jsx', '.js', '.tsx', '.ts'];
export const DIRECTORIES = [
    { path: './src/components', altPath: './src/Components', createDir: createCompDir },
    { path: './src/pages', altPath: './src/Pages', createDir: createPagesDir }
];
  
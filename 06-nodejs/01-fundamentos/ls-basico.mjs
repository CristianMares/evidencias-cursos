import fs from 'node:fs/promises';

// Version simple del comando ls: lista los archivos de la carpeta actual.
const files = await fs.readdir('.');

files.forEach((file) => {
  console.log(file);
});

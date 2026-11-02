import fs from 'node:fs/promises';

// Si los archivos no dependen entre si, se pueden leer al mismo tiempo con Promise.all.
// El resultado llega cuando terminan todas las lecturas, en el mismo orden de la lista.
console.log('Leyendo los archivos en paralelo...');

const [text, text2] = await Promise.all([
  fs.readFile('./archivos/archivo.txt', 'utf-8'),
  fs.readFile('./archivos/archivo2.txt', 'utf-8'),
]);

console.log('Primer texto:', text);
console.log('Segundo texto:', text2);

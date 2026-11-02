import fs from 'node:fs/promises';
import { readFile } from 'node:fs';
import { promisify } from 'node:util';

// 1) Con promesas y then/catch
console.log('Leyendo el primer archivo...');
fs.readFile('./archivos/archivo.txt', 'utf-8').then((text) => {
  console.log('Primer texto:', text);
});

console.log('--> Hacer cosas mientras lee el archivo...');

// 2) Con async/await (en ESM se puede usar await en el nivel superior)
console.log('Leyendo el segundo archivo...');
const text2 = await fs.readFile('./archivos/archivo2.txt', 'utf-8');
console.log('Segundo texto:', text2);

// 3) promisify convierte una funcion con callback en una que devuelve una promesa
const readFilePromise = promisify(readFile);
const text3 = await readFilePromise('./archivos/archivo.txt', 'utf-8');
console.log('Con promisify:', text3);

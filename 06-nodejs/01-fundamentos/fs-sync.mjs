import fs from 'node:fs';

// readFileSync bloquea el programa hasta terminar de leer el archivo.
console.log('Leyendo el primer archivo...');
const text = fs.readFileSync('./archivos/archivo.txt', 'utf-8');
console.log(text);

console.log('--> Hacer cosas mientras lee el archivo...');

console.log('Leyendo el segundo archivo...');
const text2 = fs.readFileSync('./archivos/archivo2.txt', 'utf-8');
console.log(text2);

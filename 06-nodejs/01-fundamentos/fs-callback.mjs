import fs from 'node:fs';

// Con callbacks el programa no se detiene: sigue ejecutando mientras se lee el archivo.
console.log('Leyendo el primer archivo...');
fs.readFile('./archivos/archivo.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error al leer el archivo:', err.message);
    return;
  }
  console.log('Primer texto:', text);
});

console.log('--> Hacer cosas mientras lee el archivo...');

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivos/archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error al leer el archivo:', err.message);
    return;
  }
  console.log('Segundo texto:', text);
});

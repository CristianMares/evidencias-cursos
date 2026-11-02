import path from 'node:path';

// El separador cambia segun el sistema operativo (/ en Linux y macOS, \ en Windows).
console.log('Separador de rutas:', path.sep);

// join une partes de una ruta de forma segura, sin escribir el separador a mano.
const filePath = path.join('contenido', 'subcarpeta', 'imagen.png');
console.log('Ruta unida:', filePath);

// basename devuelve solo el nombre del archivo; con un segundo argumento le quita la extension.
const fileName = path.basename(filePath);
console.log('Nombre del archivo:', fileName);
console.log('Nombre sin extension:', path.basename(filePath, '.png'));

// extname devuelve la extension.
console.log('Extension:', path.extname(filePath));

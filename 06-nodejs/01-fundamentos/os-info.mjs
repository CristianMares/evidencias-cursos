// El prefijo node: indica que es un modulo propio de Node.js y no una dependencia de npm.
import os from 'node:os';

console.log('Informacion del sistema operativo');
console.log('---------------------------------');
console.log('Nombre del sistema operativo:', os.platform());
console.log('Version del sistema operativo:', os.release());
console.log('Arquitectura:', os.arch());
console.log('CPUs:', os.cpus().length);
console.log('Memoria libre (MB):', Math.round(os.freemem() / 1024 / 1024));
console.log('Memoria total (MB):', Math.round(os.totalmem() / 1024 / 1024));
console.log('Tiempo encendido (horas):', (os.uptime() / 60 / 60).toFixed(2));

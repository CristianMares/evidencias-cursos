// process es un objeto global con informacion y control del proceso actual.

// argv: argumentos con los que se ejecuto el programa (los dos primeros son node y la ruta del script).
console.log('Argumentos:', process.argv);

// Se ejecuta justo antes de que termine el proceso.
process.on('exit', () => {
  console.log('El proceso termino');
});

// cwd: carpeta desde la que se ejecuto el comando.
console.log('Carpeta actual:', process.cwd());

// env: variables de entorno (por ejemplo, NODE_ENV).
console.log('Entorno:', process.env.NODE_ENV ?? 'sin definir');
console.log('Plataforma:', process.platform);

// Para terminar con error: node process.mjs --error
if (process.argv.includes('--error')) {
  console.error('Se pidio terminar con error');
  process.exit(1);
}

console.log('Todo bien, terminando con codigo 0');

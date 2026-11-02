import { createRequire } from 'node:module';

// En ES Modules no existe require(). createRequire permite usarlo para leer archivos JSON.
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);

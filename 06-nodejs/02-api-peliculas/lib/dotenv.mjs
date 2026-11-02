import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Version mini de la libreria dotenv: lee un archivo .env y carga sus variables en process.env.
// Formato de cada linea: CLAVE=valor  (las lineas vacias y las que empiezan con # se ignoran).
export function loadEnv(filePath = path.join(process.cwd(), '.env')) {
  const loaded = {};

  if (!existsSync(filePath)) return loaded;

  const lines = readFileSync(filePath, 'utf-8').split(/\r?\n/);

  for (const line of lines) {
    const text = line.trim();
    if (!text || text.startsWith('#')) continue;

    const separator = text.indexOf('=');
    if (separator === -1) continue;

    const key = text.slice(0, separator).trim();
    let value = text.slice(separator + 1).trim();

    // Quita las comillas si el valor las trae: "valor" o 'valor'.
    const quoted =
      (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"));
    if (quoted) value = value.slice(1, -1);

    // Las variables que ya existen en el entorno tienen prioridad sobre el archivo.
    if (!(key in process.env)) process.env[key] = value;
    loaded[key] = value;
  }

  return loaded;
}

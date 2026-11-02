// ES Modules: el sistema de modulos estandar de JavaScript.
// Se exporta con export y se importa con import.
export function sum(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}

export function mult(a, b) {
  return a * b;
}

// Tambien existe una exportacion por defecto (una sola por archivo).
export default function div(a, b) {
  return a / b;
}

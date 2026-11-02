// Con ESM la extension es obligatoria en la ruta (./sum.mjs).
import div, { sum, sub, mult } from './sum.mjs';

console.log('ESM: 1 + 2 =', sum(1, 2));
console.log('ESM: 5 - 3 =', sub(5, 3));
console.log('ESM: 3 * 4 =', mult(3, 4));
console.log('ESM: 8 / 2 =', div(8, 2));

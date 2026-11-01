// 05 - Estructuras de datos: Array, Set y Map.
export {};

// Array: lista ordenada. Se indica el tipo de sus elementos.
const miLista: Array<string> = ["Cristian", "Mares", "Ejemplo"];
console.log(miLista);
console.log(miLista.length);

// Set: conjunto, no admite repetidos.
const miSet = new Set<string>();
miSet.add("Cristian");
miSet.add("Mares");
miSet.add("Ejemplo");
miSet.add("Cristian"); // repetido: se ignora
console.log(miSet);
console.log(miSet.size); // 3

// miSet.add(36); // error: es un Set<string>, no acepta numeros

// Map: pares clave - valor. Clave string, valor number.
const miMapa = new Map<string, number>([
  ["Cristian", 36],
  ["Ana", 40],
]);
miMapa.set("Juan", 23);
console.log(miMapa);
console.log(miMapa.get("Cristian")); // 36
console.log(miMapa.size); // 3

// 06 - Bucles: for...of y while.
export {};

const miLista: string[] = ["Cristian", "Mares", "Ejemplo"];
const miSet = new Set<string>(["a", "b", "c"]);
const miMapa = new Map<string, number>([
  ["Cristian", 36],
  ["Ana", 40],
  ["Juan", 23],
]);

// for...of recorre cada elemento de la estructura.
for (const elemento of miLista) {
  console.log(elemento);
}

for (const valor of miSet) {
  console.log(valor);
}

for (const [clave, valor] of miMapa) {
  console.log(clave, valor);
}

// while: se repite mientras se cumpla la condicion.
let contador = 0;
while (contador < miLista.length) {
  console.log(miLista[contador]);
  contador++; // sin esto seria un bucle infinito
}

// forEach: otra forma de recorrer una lista.
miLista.forEach((elemento) => console.log(elemento.toUpperCase()));

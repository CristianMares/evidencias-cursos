// 03 - Control de flujo: if / else if / else y operadores && y ||.
export {};

let miNumero = 11;
let miString = "Esto es una cadena de texto";

if (miNumero === 10) {
  console.log("El valor es 10");
} else if (miNumero === 11) {
  console.log("El valor es 11");
} else {
  console.log("El valor no es 10 ni 11");
}

// && : se deben cumplir las dos condiciones.
miNumero = 10;
miString = "Hola";
if (miNumero === 10 && miString === "Hola") {
  console.log("Se cumplen las dos condiciones");
}

// || : basta con que se cumpla una.
miNumero = 11;
miString = "Otra cadena";
if (miNumero === 11 || miString === "Hola") {
  console.log("Se cumple al menos una condicion");
}

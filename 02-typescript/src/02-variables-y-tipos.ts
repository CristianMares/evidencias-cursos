// 02 - Variables, inferencia de tipos y tipos primitivos.
export {};

// let: variable que puede cambiar de valor (pero no de tipo).
let miString = "Esto es una cadena de texto"; // TypeScript infiere: string
console.log(miString, typeof miString);

miString = "Cambio el valor de la cadena";
console.log(miString);

// Esto da error de compilacion, porque miString ya es de tipo string:
// miString = 5; // Type 'number' is not assignable to type 'string'

// Tipado explicito: se escribe el tipo despues de los dos puntos.
let nombre: string = "Cristian";
let edad: number = 7;
let activo: boolean = false;
console.log(nombre, edad, activo);

// Numeros: enteros y decimales son el mismo tipo (number).
let miNumero = 7;
miNumero = miNumero + 4;
console.log(miNumero, typeof miNumero); // 11 "number"

console.log(miNumero - 1); // 10, pero no cambia la variable
console.log(miNumero); // sigue valiendo 11

let decimal = 6.5;
console.log(miNumero + decimal, typeof decimal);

// Si mezclo string con number, JavaScript concatena.
console.log(miString + " " + miNumero);

// Booleanos
let miBoolean = true;
miBoolean = false;
console.log(miBoolean, typeof miBoolean);

// Con tipado fuerte no puedo asignar null ni undefined a un boolean:
// miBoolean = null; // error
// miBoolean = undefined; // error

// undefined como tipo: solo puede valer undefined.
let miUndefined: undefined = undefined;
console.log(miUndefined);
// miUndefined = "texto"; // error

// any: acepta cualquier tipo (conviene evitarlo, le quita seguridad al codigo).
let cualquierCosa: any = "texto";
cualquierCosa = 42;
console.log(cualquierCosa);

// const: constante, no se puede reasignar.
const miConstante = "Mi propiedad constante";
console.log(miConstante);
// miConstante = "otro valor"; // error: es una constante

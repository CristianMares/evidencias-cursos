// 04 - Funciones con tipos en parametros y en el valor de retorno.
export {};

// void: la funcion no devuelve nada.
function miFuncion(): void {
  console.log("Mi funcion");
}
miFuncion();

// La funcion devuelve un string.
function miFuncionConRetorno(): string {
  return "Mi funcion retorna esta cadena de texto";
}
console.log(miFuncionConRetorno());

// Parametros tipados: hay que pasar exactamente dos numbers.
function sumaDosNumeros(primero: number, segundo: number): number {
  return primero + segundo;
}
console.log(sumaDosNumeros(5, 10)); // 15

// Esto no compila: el compilador valida los argumentos.
// sumaDosNumeros(5, "10"); // Argument of type 'string' is not assignable to parameter of type 'number'

// Una funcion se puede invocar las veces que haga falta.
console.log(sumaDosNumeros(1, 2));
console.log(sumaDosNumeros(100, 200));

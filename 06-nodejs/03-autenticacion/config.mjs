// Todas las variables de entorno se leen aqui, con su valor por defecto,
// y el resto del codigo las importa en vez de usar process.env por todos lados.
export const PORT = Number(process.env.PORT ?? 3000);

// Cuantas veces se repite el calculo del hash: mas rondas = mas seguro pero mas lento.
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10);

// Clave secreta con la que se firman los tokens. No tiene valor por defecto a proposito:
// si alguien olvida configurarla, la app no arranca en vez de usar una clave conocida.
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

if (!SECRET_JWT_KEY) {
  throw new Error('Falta la variable de entorno SECRET_JWT_KEY (ver .env.example)');
}

// Todas las variables de entorno se leen aqui, con su valor por defecto,
// y el resto del codigo las importa en vez de usar process.env por todos lados.
export const PORT = Number(process.env.PORT ?? 3000);

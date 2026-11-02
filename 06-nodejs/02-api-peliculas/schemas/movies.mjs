import { z } from 'zod';

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Crime',
  'Drama',
  'Fantasy',
  'History',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

// Un esquema describe como debe ser una pelicula valida.
const movieSchema = z.object({
  title: z.string({ error: 'El titulo es obligatorio y debe ser texto' }),
  year: z.number().int().min(1900).max(2030),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.url({ error: 'El poster debe ser una URL valida' }),
  genre: z.array(z.enum(GENRES), { error: 'El genero debe ser una lista de generos validos' }).min(1),
});

// safeParse no lanza error: devuelve { success, data } o { success: false, error }.
export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

// partial hace que todos los campos sean opcionales (sirve para actualizar solo algunos).
export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}

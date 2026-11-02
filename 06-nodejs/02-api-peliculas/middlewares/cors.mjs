import cors from 'cors';

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:4200', 'https://movies.com'];

// Middleware reutilizable: se puede pasar otra lista de origenes si hace falta.
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      // Sin origin: peticiones del mismo origen o de herramientas como curl.
      if (!origin || acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  });

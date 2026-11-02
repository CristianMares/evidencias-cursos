import express from 'express';
import cors from 'cors';
import { moviesRouter } from './routes/movies.mjs';

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// CORS: el paquete cors responde las cabeceras y los preflight (OPTIONS) por nosotros.
// origin recibe el origen de la peticion y decide si se permite.
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:4200', 'https://movies.com'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Sin origin: peticiones del mismo origen o de herramientas como curl.
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' });
});

// Todas las rutas que empiezan con /movies las atiende el router.
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

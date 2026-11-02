import express from 'express';
import cors from 'cors';
import { MovieController } from './controllers/movies.mjs';

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

app.get('/movies', MovieController.getAll);
app.get('/movies/:id', MovieController.getById);
app.post('/movies', MovieController.create);
app.patch('/movies/:id', MovieController.update);
app.delete('/movies/:id', MovieController.delete);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

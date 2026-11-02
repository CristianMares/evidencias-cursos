import express from 'express';
import { readFileSync } from 'node:fs';

const ditto = JSON.parse(readFileSync('./pokemon/ditto.json', 'utf-8'));
const PORT = process.env.PORT ?? 1234;

const app = express();

// Oculta la cabecera X-Powered-By: Express (no hay por que decir con que se hizo el servidor).
app.disable('x-powered-by');

// Middleware incluido en Express: lee el cuerpo JSON de la peticion y lo deja en req.body.
// Hace lo mismo que el middleware escrito a mano en el paso anterior.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Mi pagina</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json({ ...req.body, timestamp: Date.now() });
});

// Se ejecuta si ninguna ruta anterior respondio: es el 404.
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

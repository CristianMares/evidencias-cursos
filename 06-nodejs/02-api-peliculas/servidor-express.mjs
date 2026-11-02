import express from 'express';
import { readFileSync } from 'node:fs';

const ditto = JSON.parse(readFileSync('./pokemon/ditto.json', 'utf-8'));
const PORT = process.env.PORT ?? 1234;

const app = express();

// Oculta la cabecera X-Powered-By: Express (no hay por que decir con que se hizo el servidor).
app.disable('x-powered-by');

// Middleware: una funcion que se ejecuta antes de llegar a la ruta.
// Este lee el cuerpo de las peticiones POST con JSON y lo deja en req.body.
app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();

  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      req.body = JSON.parse(body);
      req.body.timestamp = Date.now();
      next();
    } catch {
      res.status(400).json({ error: 'El cuerpo debe ser un JSON valido' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('<h1>Mi pagina</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body);
});

// Se ejecuta si ninguna ruta anterior respondio: es el 404.
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

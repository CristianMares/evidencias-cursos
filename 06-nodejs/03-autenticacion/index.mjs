import express from 'express';
import { PORT } from './config.mjs';

const app = express();
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.send('<h1>Hola</h1>');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

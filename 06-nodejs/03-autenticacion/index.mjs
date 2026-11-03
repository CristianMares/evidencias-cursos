import express from 'express';
import { PORT } from './config.mjs';

const app = express();
app.disable('x-powered-by');

// EJS genera HTML en el servidor a partir de las plantillas de la carpeta views.
app.set('view engine', 'ejs');
app.set('views', `${import.meta.dirname}/views`);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

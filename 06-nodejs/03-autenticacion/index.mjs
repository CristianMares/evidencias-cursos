import express from 'express';
import { PORT } from './config.mjs';
import { UserRepository, ValidationError } from './user-repository.mjs';

const app = express();
app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', `${import.meta.dirname}/views`);

// Lee el cuerpo JSON de las peticiones y lo deja en req.body.
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body ?? {};

  try {
    const id = await UserRepository.create({ username, password });
    res.status(201).json({ id });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    // Cualquier otro error es del servidor: no se muestra el detalle al cliente.
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

import express from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import { PORT, SECRET_JWT_KEY } from './config.mjs';
import { AuthenticationError, UserRepository, ValidationError } from './user-repository.mjs';

const app = express();
app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('views', `${import.meta.dirname}/views`);

// Lee el cuerpo JSON de las peticiones y lo deja en req.body.
app.use(express.json());

// cookie-parser deja las cookies de la peticion en req.cookies.
app.use(cookieParser());

// Middleware de sesion: corre en TODAS las peticiones, antes de llegar a las rutas.
// Si la cookie trae un token valido, deja los datos del usuario en req.session.user.
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  try {
    // verify lanza un error si el token esta alterado o ya vencio.
    req.session.user = jwt.verify(token, SECRET_JWT_KEY);
  } catch {
    // Sin token o token invalido: el usuario simplemente no tiene sesion.
  }

  next();
});

app.get('/', (req, res) => {
  const { user } = req.session;
  res.render('index', { username: user?.username });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body ?? {};

  try {
    const user = await UserRepository.login({ username, password });

    // El token guarda quien es el usuario y esta firmado con la clave secreta:
    // si alguien lo modifica, la firma deja de coincidir y deja de ser valido.
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
      expiresIn: '1h',
    });

    res
      .cookie('access_token', token, {
        httpOnly: true, // JavaScript del navegador no puede leer la cookie (protege contra XSS)
        secure: process.env.NODE_ENV === 'production', // en produccion solo viaja por HTTPS
        sameSite: 'strict', // solo se envia desde el mismo sitio (protege contra CSRF)
        maxAge: 1000 * 60 * 60, // 1 hora, igual que el token
      })
      .json({ user });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    if (error instanceof AuthenticationError) {
      return res.status(401).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
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

// Ruta protegida: solo entra quien tiene sesion. Si no, 403 Forbidden.
app.get('/protected', (req, res) => {
  const { user } = req.session;

  if (!user) return res.status(403).send('Acceso no autorizado');

  res.render('protected', user);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

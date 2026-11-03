# Autenticación con Node.js

Práctica del video *Aprende autenticación de usuario, sesión, cookies y JWT con Node.js* (midudev):
registro, inicio de sesión con JWT guardado en una cookie, rutas protegidas y cierre de sesión.

## Rutas

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/` | Página con los formularios; si hay sesión, saluda al usuario |
| POST | `/register` | Crea un usuario (201). Responde 400 si los datos son inválidos o el usuario ya existe |
| POST | `/login` | Verifica las credenciales, firma un JWT y lo guarda en una cookie (401 si son incorrectas) |
| GET | `/protected` | Solo para usuarios con sesión (403 si no la hay) |
| POST | `/logout` | Borra la cookie |

## Cómo funciona

1. **Registro.** La contraseña nunca se guarda: se guarda su hash con `bcrypt`, que agrega un valor aleatorio
   (salt) a cada hash. Los usuarios se guardan con `db-local`, que usa archivos JSON en la carpeta `db/`.
2. **Login.** Si el usuario y la contraseña coinciden, el servidor crea un JWT con el id y el nombre del
   usuario, firmado con `SECRET_JWT_KEY`, y lo manda en la cookie `access_token`.
3. **Sesión.** Un middleware corre en todas las peticiones: lee la cookie, verifica el token y deja el
   usuario en `req.session.user`. Si el token falta, fue alterado o venció, simplemente no hay sesión.
4. **Ruta protegida.** `/protected` revisa `req.session.user`.
5. **Logout.** Se borra la cookie.

## Seguridad

- La cookie es `httpOnly` (el JavaScript del navegador no puede leerla), `sameSite: strict` (no se envía desde
  otros sitios) y `secure` en producción (solo viaja por HTTPS). Dura 1 hora, igual que el token.
- El login responde lo mismo si falla el usuario o la contraseña, para no revelar qué usuarios existen.
- `SECRET_JWT_KEY` no tiene valor por defecto: si falta, la app no arranca.
- El hash de la contraseña nunca sale en las respuestas.
- Falta, a propósito, lo que el video solo menciona: refresh tokens y límite de intentos de login.
  Para usarlo en un sistema real conviene agregarlos y servirlo siempre con HTTPS.

## Cómo correrlo

Requiere Node.js 20.6 o superior.

```bash
npm install
cp .env.example .env
```

En `.env` cambia `SECRET_JWT_KEY` por un texto largo y aleatorio. Después:

```bash
npm run dev
```

Se abre en `http://localhost:3000`. Para ver el JWT de tu sesión: herramientas de desarrollo, pestaña
Application, Cookies. El valor se puede pegar en jwt.io para ver su contenido.

import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import DBLocal from 'db-local';
import { SALT_ROUNDS } from './config.mjs';

// Dos tipos de error para responder distinto: datos mal escritos (400) o credenciales malas (401).
export class ValidationError extends Error {}
export class AuthenticationError extends Error {}

// db-local guarda los datos en archivos JSON dentro de la carpeta db.
const { Schema } = new DBLocal({ path: './db' });

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static async create({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (user) throw new ValidationError('El usuario ya existe');

    const id = crypto.randomUUID();

    // Nunca se guarda la contrasena: se guarda su hash. bcrypt agrega un salt aleatorio a cada hash,
    // asi dos usuarios con la misma contrasena no tienen el mismo hash.
    // hash (async) no bloquea el servidor; hashSync si lo bloquearia mientras calcula.
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    User.create({ _id: id, username, password: hashedPassword }).save();

    return id;
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });

    // El mismo mensaje en los dos casos: no se revela si lo incorrecto fue el usuario o la contrasena.
    if (!user) throw new AuthenticationError('Usuario o contrasena incorrectos');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AuthenticationError('Usuario o contrasena incorrectos');

    // Se devuelve solo lo publico: nunca el hash de la contrasena.
    return { _id: user._id, username: user.username };
  }
}

class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new ValidationError('El usuario debe ser un texto');
    if (username.length < 3) throw new ValidationError('El usuario debe tener al menos 3 caracteres');
  }

  static password(password) {
    if (typeof password !== 'string') throw new ValidationError('La contrasena debe ser un texto');
    if (password.length < 6) throw new ValidationError('La contrasena debe tener al menos 6 caracteres');
  }
}

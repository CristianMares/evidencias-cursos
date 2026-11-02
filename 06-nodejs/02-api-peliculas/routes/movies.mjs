import { Router } from 'express';
import { MovieController } from '../controllers/movies.mjs';

// Un Router agrupa las rutas de un recurso. Aqui todas cuelgan de /movies.
export const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAll);
moviesRouter.post('/', MovieController.create);

moviesRouter.get('/:id', MovieController.getById);
moviesRouter.patch('/:id', MovieController.update);
moviesRouter.delete('/:id', MovieController.delete);

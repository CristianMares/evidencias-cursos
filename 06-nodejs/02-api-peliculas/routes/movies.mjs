import { Router } from 'express';
import { MovieController } from '../controllers/movies.mjs';

// Una funcion que crea el router recibiendo el modelo que debe usar.
export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router();
  const movieController = new MovieController({ movieModel });

  moviesRouter.get('/', movieController.getAll);
  moviesRouter.post('/', movieController.create);

  moviesRouter.get('/:id', movieController.getById);
  moviesRouter.patch('/:id', movieController.update);
  moviesRouter.delete('/:id', movieController.delete);

  return moviesRouter;
};

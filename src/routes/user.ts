import express from 'express';
import user from '../controllers/user';
import { registerUserSchema } from '../validator';
import { validationMiddleware } from '../middlewares'

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/', validationMiddleware(registerUserSchema, 'body'), user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

export default router;
import { Request, Response } from 'express';
import { 
  createUserService, getUserByIdService,
  listUsersService, deleteUserService
} from '../services';
import { IUser, HttpError } from '../models/classes';

const createUserController = async (req: Request, res: Response) => {
  try {
    const obj: IUser = req.body;
    const response = await createUserService(obj);
    return res.status(201).json({ success: true, response });
  } catch (error: any) {
    return res.status(500).json(error);
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const response = await getUserByIdService(id);
    return res.status(200).json({ success: true, response });
  } catch (error: any) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).json(error);
    }
    return res.status(500).json(error);
  }
};

const listUsersController = async (req: Request, res: Response) => {
  try {
    const response = await listUsersService();
    return res.status(200).json({ success: true, response });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const response = await deleteUserService(id);
    return res.status(201).json({ success: true, response });
  } catch (error: any) {
    return res.status(500).json(error);
  }
}

export default {
  onGetAllUsers: listUsersController,
  onGetUserById: getUserByIdController,
  onCreateUser: createUserController,
  onDeleteUserById: deleteUserController,
};
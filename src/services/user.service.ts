import { IUser, HttpError } from '../models/classes';
import userModel from '../models/mongodb/user.model';
import bcrypt from 'bcrypt'

export const createUserService = async (user: IUser) => {
  try {
    const password = await bcrypt.hash(user.password, 10);

    user.password = password;

    const obj = await userModel.create(user);

    return obj;
  } catch (error) {
    throw error;
  }
};

export const getUserByIdService = async (id: string) => {
  try {
    const user = await userModel.findOne({ _id: id });

    if (!user ) throw new HttpError(404, false, { message: `User not found` });

    return user;
  } catch (error) {
    throw error;
  }
};

export const listUsersService = async () => {
  try {
    return await userModel.find();
  } catch (error) {
    throw error;
  }
}

export const deleteUserService = async (id: string) => {
  try {
    // quisiera re utilizar getUserByIdService pero mongoose no funciona como sequelize
    const user = await userModel.deleteOne({ _id: id });

    return user;
  } catch (error) {
    throw error;
  }
}

export const getUserByUserNameAndVerify = async (userName: string, password: string) => {
  try {
    const user = await userModel.findOne({ userName });
    
    if (!user ) throw new HttpError(404, false, { message: `User not found` });

    const compare = await bcrypt.compare(password, user.password); 

    if (!compare) throw new HttpError(401, false, { message: `Bad password` });

    user.password = 'null';

    return user;
  } catch (error) {
    throw error;
  }
}

export const getUserByIds = async (ids: string[]) => {
  try {
    const users = await userModel.find({
      _id: { // va buscar los usuarios por los ids
        // que se encuentren adentro del array
        $in: ids
      }
    });

    return users;
  } catch (error) {
    throw error;
  }
}
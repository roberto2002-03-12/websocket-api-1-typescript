import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser, UserTypes } from '../classes';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    userName: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    typeUser: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

// cuando se declara "User" va ser el nombre que 
// se va utilizar en el orm para referirse a la colección user
export default mongoose.model('User', userSchema);
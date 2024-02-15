export type UserTypes = {
  CONSUMER: 'consumer',
  SUPPORT: 'support'
};

export interface IUser {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  typeUser: UserTypes;
};
import mongoose from 'mongoose';
import config from './index';
import createHttpError from 'http-errors';

const CONNECTION_URL: string = `mongodb://${config.dbMongo.user}:${config.dbMongo.password}@${config.dbMongo.url}/${config.dbMongo.name}`;

mongoose.connect(CONNECTION_URL)
  .catch(error => {
  throw createHttpError(500, 'Error on database connection, contact support ', error);
});

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected successfully');
});

mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected successfully');
});

mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error: ', error)
  mongoose.disconnect()
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected');
});
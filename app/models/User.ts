import { database } from '../database'
import Sequelize from 'sequelize';

export const User = database.define(
  'users',
  {
    name: Sequelize.TEXT,
    email: Sequelize.TEXT,
    password: Sequelize.TEXT
  }
);

const Sequelize = require('sequelize');
import * as env from 'env-var';
require('dotenv').config()

export const database = new Sequelize(
  env.get("DATABASE_NAME").asString(),
  env.get("DATABASE_USERNAME").asString(),
  env.get("DATABASE_PASSWORD").asString(), {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});


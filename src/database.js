import Sequelize from "sequelize";


export const sequelize = new Sequelize('auth_db', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
  });


  
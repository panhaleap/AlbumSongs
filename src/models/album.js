const { sequelize } = require('../sequelize-connection');

import Sequelize from 'sequelize';

export const Albums = sequelize.define('album', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: Sequelize.STRING(255) },
  image: { type: Sequelize.BLOB },
  production_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'production',
      key: 'id'
    }
  },
  status: { 
      type: Sequelize.BOOLEAN,
      defaultValue : true },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  updatedBy: {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
});






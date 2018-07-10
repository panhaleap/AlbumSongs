const { sequelize } = require('../sequelize-connection');

import Sequelize from 'sequelize';

export const Productions = sequelize.define('production', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: Sequelize.STRING(255) },
  logo: { type: Sequelize.BLOB },
  status: { 
      type: Sequelize.STRING(8),
      defaultValue : 'active' },
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





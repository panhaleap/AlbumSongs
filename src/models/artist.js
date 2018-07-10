const { sequelize } = require('../sequelize-connection');

import Sequelize from 'sequelize';

export const Artists = sequelize.define('artist', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: Sequelize.STRING(255) },
  type: { type: Sequelize.TEXT },
  image: { type: Sequelize.BLOB },
  status: {
    type: Sequelize.STRING(8),
    defaultValue: 'active'
  },
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

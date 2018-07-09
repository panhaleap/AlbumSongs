const { sequelize } = require('../sequelize-connection');
import uuid from 'uuid/v4';
import Sequelize from 'sequelize';

export const Playlists = sequelize.define('playlist', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuid()
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
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

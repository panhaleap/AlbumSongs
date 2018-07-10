const { sequelize } = require('../sequelize-connection');
import uuid from 'uuid/v4';
import Sequelize from 'sequelize';
import { Users } from './user';
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

Playlists.belongsTo(Users);

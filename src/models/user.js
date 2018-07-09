const { sequelize } = require('../sequelize-connection');

import Sequelize from 'sequelize';

export const Users = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        msg: 'It is not an email address.'
      }
    }
  },
  role: {
    type: Sequelize.STRING(6),
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
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

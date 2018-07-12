const { sequelize } = require('../sequelize-connection');
import bcrypt from 'bcryptjs';
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
    defaultValue: 'user',
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
},{
  hooks:{
    afterValidate: user => {
      user.password = bcrypt.hashSync(user.password, 8);
    }
  }
});

















// Users.associate = function (users) {
//   generateHash(password) {
//     return bcrypt.hash(password, bcrypt.genSaltSync(8));
// },
// validPassword(password) {
//     return bcrypt.compare(password, this.password);
// }
// };



//   instanceMethods: {
      
//   }






// Users.pre('save', async function(next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const passwordHash = await bcrypt.hash(this.password, salt);

//     console.log('salt', salt);
//     console.log('normal password', this.password);
//     console.log('hashed password', passwordHash);
//   } catch (error) {
//     next();
//   }
// });
// //

// module.exports = function(sequelize, DataTypes) {
//   const User = sequelize.define('users', {
//       annotation_id: {
//           type: DataTypes.INTEGER,
//           autoIncrement: true,
//           primaryKey: true
//       },
//       firstName: {
//           type: DataTypes.DATE,
//           field: 'first_name'
//       },
//       lastName: {
//           type: DataTypes.DATE,
//           field: 'last_name'
//       },
//       email: DataTypes.STRING,
//       password: DataTypes.STRING
//   }, {
//       freezeTableName: true,
//       instanceMethods: {
//           generateHash(password) {
//               return bcrypt.hash(password, bcrypt.genSaltSync(8));
//           },
//           validPassword(password) {
//               return bcrypt.compare(password, this.password);
//           }
//       }
//   });

//   return User;
// }
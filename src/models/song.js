const { sequelize } = require('../sequelize-connection');
//import { ArtistSongs } from '../models/artist-song';
import Sequelize from 'sequelize';

export const Songs = sequelize.define('song', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: { type: Sequelize.STRING(255) },
  duration: { type: Sequelize.TIME },
  size: { type: Sequelize.DOUBLE },
  album_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'album',
      key: 'id'
    }
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'category',
      key: 'id'
    }
  },
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

// return Songs.create(
//   {
//     name: 'Let it go',
//     ArtistSongs: {
//       artistId: 1,
//       songId: 1
//     }
//   },
//   {
//     include: [
//       {
//         association: Songs.ArtistSongs
//       }
//     ]
//   }
// );

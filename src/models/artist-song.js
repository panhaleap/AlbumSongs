const { sequelize } = require('../sequelize-connection');
import { Artists } from './artist';
import { Songs } from './song';
import Sequelize from 'sequelize';
export const ArtistSongs = sequelize.define('artistSongs', {
  status: {
    type: Sequelize.STRING(8),
    defaultValue: 'active'
  }
});

Artists.belongsToMany(Songs, { through: ArtistSongs });
Songs.belongsToMany(Artists, { through: ArtistSongs });


// ArtistSongs.belongsTo(Songs);
// ArtistSongs.belongsTo(Artists);

const { sequelize } = require('../sequelize-connection');
import Sequelize from 'sequelize';
import { Playlists } from './playlist';
import { Songs } from './song';
export const PlaylistSong = sequelize.define('playlistSong', {
  status: {
    type: Sequelize.STRING(8),
    defaultValue: 'active'
  }
});

Playlists.belongsToMany(Songs, { through: PlaylistSong });
Songs.belongsToMany(Playlists, { through: PlaylistSong });


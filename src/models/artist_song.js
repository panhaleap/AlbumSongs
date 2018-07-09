const { sequelize } = require('../sequelize-connection');

import Sequelize from 'sequelize';
import { Artists } from './artist';
import { Songs } from './song';

export const ArtistSongs = sequelize.define('artistSongs');

Artists.belongsToMany(Songs, { through: ArtistSongs });
Songs.belongsToMany(Artists, { through: ArtistSongs });





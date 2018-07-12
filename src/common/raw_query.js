export const getQuerySongForPublic = () => {
  let query = `SELECT songs.name as songName, artists.name as artist, artists.type, categories.name as category  FROM artistSongs
    inner join (SELECT name, id,category_id,album_id,'queryAll' as queryAll FROM songs) as songs on artistsongs.songId = songs.id
    inner join (SELECT name, id,type FROM artists) as artists on artists.id = artistsongs.artistId
    inner join (SELECT name, id FROM categories) as categories on categories.id = songs.category_id 
    WHERE 
    artistSongs.songId is not null and artistsongs.artistId is not null  `;
  return query;
};

export const getQueryAlbumOfProductionForPublic = () => {
  let query = `SELECT albums.id, albums.name as albumsName, albums.image as albumsImage, productions.name as productionName, productions.logo as productionLogo  
  FROM albums
  INNER JOIN productions ON productions.id = albums.production_id
  WHERE 
  albums.id is not null  `;

  return query;
};

export const getQuerySongForPublic = () => {
  let query = `SELECT songs.name as songName, artists.name as artist, artists.type, categories.name as category  FROM artistSongs
    inner join (SELECT name, id,category_id,album_id,'queryAll' as queryAll FROM songs) as songs on artistsongs.songId = songs.id
    inner join (SELECT name, id,type FROM artists) as artists on artists.id = artistsongs.artistId
    inner join (SELECT name, id FROM categories) as categories on categories.id = songs.category_id 
    WHERE 
    queryAll = 'queryAll' `;
  return query;
};

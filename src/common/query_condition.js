export const getLimit = limit => {
  limit = +limit;
  return limit > 100 ? 100 : limit;
};

export const getOffset = offset => {
  offset = +offset;
  return offset;
};

export const getTotal = result => {
  const total = result ? result.count : 0;
  return total;
};

const putWhereToEndByLimitOffset = (limit, offset) => {
  limit = limit;
  const putWhereToEnd = ` LIMIT ${limit} OFFSET ${offset} `;
  return putWhereToEnd;
};

export const getSongPublicCondition = (query, songId, artistId, songName, artistType, album_id, limit, offset) => {
  songName = ('/' % ' + songName + ') % '/';

  query = songId ? query + ` and songs.id = ${songId} ` : query;
  query = artistId ? query + ` and artists.id = ${artistId} ` : query;
  query = songName ? query + ` and songs.name like ${songName} ` : query;
  query = artistType ? query + ` and artists.type = '${artistType}' ` : query;
  query = album_id ? query + ` and songs.album_id = ${album_id} ` : query;

  return query + putWhereToEndByLimitOffset(limit, offset);
};

export const getSongPublicConditionBySongId = (query, songId) => {
  return query + ` and songs.id = ${songId} `;
};

export const getAlbumOfProductionCondition = (query, productionId, albumName, limit, offset) => {
  query = productionId ? query + ` and productions.id = ${productionId} ` : query;
  query = albumName ? query + ` and albums.name like '%${albumName}%' ` : query;

  return query + putWhereToEndByLimitOffset(limit, offset);
};

SELECT 
    s.name AS songName,
    a.name AS artist,
    a.type,
    c.name AS category

FROM artistSongs ats
INNER JOIN songs s ON ats.songId = s.id
INNER JOIN artists a ON ats.artistId = a.id
INNER JOIN categories c ON c.id = s.category_id

WHERE 
    ats.songId is NOT null
    AND ats.artistId is NOT null
    {filterSongId}
    {filterArtistId}
    {filterSongName}
    {filterArtistType}
    {filterAlbumId}

LIMIT :limit
OFFSET :offset
SELECT albums.id, albums.name as albumsName, albums.image as albumsImage, productions.name as productionName, productions.logo as productionLogo  
  FROM albums
  INNER JOIN productions ON productions.id = albums.production_id
  WHERE 
  albums.id is not null

   {filterProductId}
   {filterAlbumName}

LIMIT :limit
OFFSET :offset





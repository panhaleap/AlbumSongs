## ADMIN API

### **NOTE**: Required authorization header

- Production

  - [GET] `/admin/productions?limit=&offset=&name=`
  - [POST] `/admin/productions`
  - [GET] `/admin/productions/:id`
  - [PUT] `/admin/productions/:id`
  - [DELETE] `/admin/productions/:id`

- Album

  - [GET] `/admin/albums?limit=&offset=&name=`
  - [POST] `/admin/albums`
  - [GET] `/admin/albums/:id`
  - [PUT] `/admin/albums/:id`
  - [DELETE] `/admin/albums/:id`

- Artists

  - [GET] `/admin/artists?limit=&offset=&name=`
  - [POST] `/admin/artists`
  - [GET] `/admin/artists/:id`
  - [PUT] `/admin/artists/:id`
  - [DELETE] `/admin/artists/:id`

- Category

  - [GET] `/admin/categories?limit=&offset=&name=`
  - [POST] `/admin/categories`
  - [GET] `/admin/categories/:id`
  - [PUT] `/admin/categories/:id`
  - [DELETE] `/admin/categories/:id`

- Songs
  - [GET] `/admin/songs?limit=&offset=&name=`
  - [POST] `/admin/songs` **\*NOTE**: create with album, category, artist
  - [GET] `/admin/songs/:id`
  - [PUT] `/admin/songs/:id` **\*NOTE**: create with album, category, artist
  - [DELETE] `/admin/songs/:id`

## CLIENT PUBLIC API

- Songs

  - [GET] `/songs?limit=&offset=&name$type=&singer_id=&album_id=` **\*NOTE**: include artist, category,
  - [GET] `/songs/:id` **\*NOTE**: include artist, category, album, production

- Artists

  - [GET] `/artists?limit=&offset=&name=`

- Production

  - [GET] `/productions?limit=&offset=&name=`
  - [GET] `/productions/:id/albums?limit=&offset=&name=` get album from production

## CLIENT AUTH API

- Auth

  - [POST] `/register`
  - [POST] `/login`

### **NOTE**: Required authorization header

- Playlist.

  - [POST] `/playlist` create playlist
  - [DELETE] `/playlist/:id` remove playlist
  - [POST] `/playlist/:id/songs/:song_id` add song to playlist
  - [DELETE] `/playlist/:id/songs/:song_id` remove song from playlist

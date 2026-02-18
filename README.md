# COMP 4513 Assignment 1

## Overview
A REST API built with Node.js and Express for querying Spotify song, artist, genre, and playlist data from a SQLite database. All responses are returned in JSON format.

## Built With
- **Node.js** - Runtime environment
- **Express** - Server and routing
- **SQLite3** - Database

## Hosting
Deployed on Render: https://comp4513-assign1-tpay.onrender.com 

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| /api/artists | Returns all artists sorted by name |
| /api/artists/:ref | Returns a single artist by id |
| /api/artists/averages/:ref | Returns average song stats for an artist |
| /api/genres | Returns all genres |
| /api/songs | Returns all songs sorted by title |
| /api/songs/sort/:order | Returns all songs sorted by specified field |
| /api/songs/:ref | Returns a single song by id |
| /api/songs/search/begin/:substring | Returns songs whose title begins with substring |
| /api/songs/search/any/:substring | Returns songs whose title contains substring |
| /api/songs/search/year/:substring | Returns songs by year |
| /api/songs/artist/:ref | Returns all songs for a specified artist |
| /api/songs/genre/:ref | Returns all songs for a specified genre |
| /api/playlists | Returns all playlists |
| /api/playlists/:ref | Returns all songs for a specified playlist |
| /api/mood/dancing/:ref | Returns top n songs by danceability |
| /api/mood/happy/:ref | Returns top n songs by valence |
| /api/mood/coffee/:ref | Returns top n songs by liveness/acousticness |
| /api/mood/studying/:ref | Returns top n songs by energy x speechiness |

## Test Links
- [/api/artists](https://comp4513-assign1-tpay.onrender.com/api/artists)
- [/api/artists/129](https://comp4513-assign1-tpay.onrender.com/api/artists/129)
- [/api/artists/sdfjkhsdf](https://comp4513-assign1-tpay.onrender.com/api/artists/sdfjkhsdf)
- [/api/artists/averages/129](https://comp4513-assign1-tpay.onrender.com/api/artists/averages/129)
- [/api/genres](https://comp4513-assign1-tpay.onrender.com/api/genres)
- [/api/songs](https://comp4513-assign1-tpay.onrender.com/api/songs)
- [/api/songs/sort/artist](https://comp4513-assign1-tpay.onrender.com/api/songs/sort/artist)
- [/api/songs/sort/year](https://comp4513-assign1-tpay.onrender.com/api/songs/sort/year)
- [/api/songs/sort/duration](https://comp4513-assign1-tpay.onrender.com/api/songs/sort/duration)
- [/api/songs/1010](https://comp4513-assign1-tpay.onrender.com/api/songs/1010)
- [/api/songs/sjdkfhsdkjf](https://comp4513-assign1-tpay.onrender.com/api/songs/sjdkfhsdkjf)
- [/api/songs/search/begin/love](https://comp4513-assign1-tpay.onrender.com/api/songs/search/begin/love)
- [/api/songs/search/begin/sdjfhs](https://comp4513-assign1-tpay.onrender.com/api/songs/search/begin/sdjfhs)
- [/api/songs/search/any/love](https://comp4513-assign1-tpay.onrender.com/api/songs/search/any/love)
- [/api/songs/search/year/2017](https://comp4513-assign1-tpay.onrender.com/api/songs/search/year/2017)
- [/api/songs/search/year/2027](https://comp4513-assign1-tpay.onrender.com/api/songs/search/year/2027)
- [/api/songs/artist/149](https://comp4513-assign1-tpay.onrender.com/api/songs/artist/149)
- [/api/songs/artist/7834562](https://comp4513-assign1-tpay.onrender.com/api/songs/artist/7834562)
- [/api/songs/genre/115](https://comp4513-assign1-tpay.onrender.com/api/songs/genre/115)
- [/api/playlists](https://comp4513-assign1-tpay.onrender.com/api/playlists)
- [/api/playlists/3](https://comp4513-assign1-tpay.onrender.com/api/playlists/3)
- [/api/playlists/35362](https://comp4513-assign1-tpay.onrender.com/api/playlists/35362)
- [/api/mood/dancing/5](https://comp4513-assign1-tpay.onrender.com/api/mood/dancing/5)
- [/api/mood/dancing/500](https://comp4513-assign1-tpay.onrender.com/api/mood/dancing/500)
- [/api/mood/dancing/ksdjf](https://comp4513-assign1-tpay.onrender.com/api/mood/dancing/ksdjf)
- [/api/mood/happy/8](https://comp4513-assign1-tpay.onrender.com/api/mood/happy/8)
- [/api/mood/happy](https://comp4513-assign1-tpay.onrender.com/api/mood/happy)
- [/api/mood/coffee/10](https://comp4513-assign1-tpay.onrender.com/api/mood/coffee/10)
- [/api/mood/studying/15](https://comp4513-assign1-tpay.onrender.com/api/mood/studying/15)

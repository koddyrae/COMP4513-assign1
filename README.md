# COMP 4513 Assignment 1

## Overview
A REST API built with Node.js and Express for querying Spotify song, artist, genre, and playlist data. All responses are returned in JSON format.

## Built With
- **Node.js** - Runtime environment
- **Express** - Server and routing
- **SQLite3** - Database

## Hosting
Deployed on Render: 

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

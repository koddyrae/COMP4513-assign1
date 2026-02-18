const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 4000;

const DB_PATH = path.join(__dirname, "data/songs-2026.db");
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log("Connected to database");
  }
});

app.use(express.json());

// ---- GENRE ROUTES ----
app.get("/api/genres", (req, resp) => {
  let query = "SELECT * FROM genres";

  db.all(query, [], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

// ---- ARTIST ROUTES ----
app.get("/api/artists", (req, resp) => {
  let query = `SELECT a.artist_id, a.artist_name, a.artist_image_url, a.spotify_url, a.spotify_desc,
                 t.type_name
                 FROM artists a
                 JOIN types t ON a.artist_type_id = t.type_id
                 ORDER BY a.artist_name`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/artists/averages/:ref", (req, resp) => {
  let query = `SELECT AVG(bpm) as bpm, AVG(energy) as energy, AVG(danceability) as danceability,
                 AVG(loudness) as loudness, AVG(liveness) as liveness, AVG(valence) as valence,
                 AVG(duration) as duration, AVG(acousticness) as acousticness,
                 AVG(speechiness) as speechiness, AVG(popularity) as popularity
                 FROM songs
                 WHERE artist_id = ?`;

  db.get(query, [req.params.ref], (err, row) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (!row || row.bpm === null) {
      return resp.json({ error: "Artist not found" });
    }
    resp.json(row);
  });
});

app.get("/api/artists/:ref", (req, resp) => {
  let query = `SELECT a.artist_id, a.artist_name, a.artist_image_url, a.spotify_url, a.spotify_desc,
                 t.type_name
                 FROM artists a
                 JOIN types t ON a.artist_type_id = t.type_id
                 WHERE a.artist_id = ?`;

  db.get(query, [req.params.ref], (err, row) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (!row) {
      return resp.json({ error: "Artist not found" });
    }
    resp.json(row);
  });
});

// ---- SONG ROUTES ----
app.get("/api/songs", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY s.title`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/sort/:order", (req, resp) => {
  const sortMap = {
    id: "s.song_id",
    title: "s.title",
    artist: "a.artist_name",
    genre: "g.genre_name",
    year: "s.year",
    duration: "s.duration",
  };

  const column = sortMap[req.params.order];

  if (!column) {
    return resp.json({ error: "Invalid sort field" });
  }

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY ${column}`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/search/begin/:substring", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE s.title LIKE ?`;

  db.all(query, [`${req.params.substring}%`], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "No songs found" });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/search/any/:substring", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE s.title LIKE ?`;

  db.all(query, [`%${req.params.substring}%`], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "No songs found" });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/search/year/:substring", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE s.year = ?`;

  db.all(query, [req.params.substring], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "No songs found for that year" });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/artist/:ref", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE a.artist_id = ?`;

  db.all(query, [req.params.ref], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "No songs found for that artist" });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/genre/:ref", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE g.genre_id = ?`;

  db.all(query, [req.params.ref], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "No songs found for that genre" });
    }
    resp.json(rows);
  });
});

app.get("/api/songs/:ref", (req, resp) => {
  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE s.song_id = ?`;

  db.get(query, [req.params.ref], (err, row) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (!row) {
      return resp.json({ error: "Song not found" });
    }
    resp.json(row);
  });
});

// ---- PLAYLIST ROUTES ----
app.get("/api/playlists", (req, resp) => {
  let query = `SELECT * FROM playlists`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "No playlists found" });
    }
    resp.json(rows);
  });
});

app.get("/api/playlists/:ref", (req, resp) => {
  let query = `SELECT p.playlist_id, s.song_id, s.title, a.artist_name, g.genre_name, s.year
                 FROM playlists p
                 JOIN songs s ON p.song_id = s.song_id
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 WHERE p.playlist_id = ?`;

  db.all(query, [req.params.ref], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    if (rows.length === 0) {
      return resp.json({ error: "Playlist not found" });
    }
    resp.json(rows);
  });
});

// ---- MOOD ROUTES ----
app.get("/api/mood/dancing", (req, resp) => {
  let limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY s.danceability DESC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/dancing/:ref", (req, resp) => {
  let limit = parseInt(req.params.ref);
  if (!limit || limit < 1 || limit > 20) limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY s.danceability DESC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/happy", (req, resp) => {
  let limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY s.valence DESC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/happy/:ref", (req, resp) => {
  let limit = parseInt(req.params.ref);
  if (!limit || limit < 1 || limit > 20) limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY s.valence DESC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/coffee", (req, resp) => {
  let limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY (CAST(s.liveness AS FLOAT) / s.acousticness) DESC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/coffee/:ref", (req, resp) => {
  let limit = parseInt(req.params.ref);
  if (!limit || limit < 1 || limit > 20) limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY (CAST(s.liveness AS FLOAT) / s.acousticness) DESC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/studying", (req, resp) => {
  let limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY (s.energy * s.speechiness) ASC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.get("/api/mood/studying/:ref", (req, resp) => {
  let limit = parseInt(req.params.ref);
  if (!limit || limit < 1 || limit > 20) limit = 20;

  let query = `SELECT s.song_id, s.title, s.year, s.bpm, s.energy, s.danceability, s.loudness,
                 s.liveness, s.valence, s.duration, s.acousticness, s.speechiness, s.popularity,
                 a.artist_id, a.artist_name,
                 g.genre_id, g.genre_name
                 FROM songs s
                 JOIN artists a ON s.artist_id = a.artist_id
                 JOIN genres g ON s.genre_id = g.genre_id
                 ORDER BY (s.energy * s.speechiness) ASC
                 LIMIT ?`;

  db.all(query, [limit], (err, rows) => {
    if (err) {
      return resp.json({ error: err.message });
    }
    resp.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

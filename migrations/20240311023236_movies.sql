CREATE TABLE
    movies (
        id SERIAL PRIMARY KEY,
        imdb_id VARCHAR(20),
        tmdb_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        original_language VARCHAR(10) NOT NULL,
        original_title VARCHAR(255) NOT NULL,
        synopsis TEXT,
        poster_path TEXT,
        backdrop_path TEXT,
        release_date DATE NOT NULL
    );
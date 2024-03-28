use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

#[derive(sqlx::FromRow, Serialize, Deserialize, Debug)]
pub struct Movie {
    pub id: i32,
    pub imdb_id: Option<String>,
    pub tmdb_id: i32,
    pub title: String,
    pub original_language: String,
    pub original_title: String,
    pub synopsis: Option<String>,
    pub release_date: NaiveDate,
    pub poster_path: Option<String>,
    pub backdrop_path: Option<String>,
}

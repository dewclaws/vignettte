use std::io;

use actix_web::{get, post, web, Responder, Result};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

use crate::AppState;

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

#[get("/movies")]
async fn movies_list_handler(state: web::Data<AppState>) -> Result<impl Responder> {
    let movies = sqlx::query_as!(Movie, r#"SELECT * FROM movies"#)
        .fetch_all(&state.db)
        .await
        .unwrap();

    let json_response = serde_json::json!({
        "status": "success",
        "results": movies.len(),
        "movies": movies,
    });

    Ok(web::Json(json_response))
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NewMovie {
    pub tmdb_id: i32,
}

#[post("/movies/add")]
async fn movies_add_handler(
    body: web::Json<NewMovie>,
    data: web::Data<AppState>,
) -> Result<impl Responder> {
    match data.tmdb.fetch_movie_details(body.tmdb_id).await {
        // Currently this only handles TMDb as a source
        // Would like to refactor for more in future
        Ok(response) => {
            let movie = sqlx::query_as!(
                Movie,
                r#"INSERT INTO movies (imdb_id, tmdb_id, title, original_language, original_title, synopsis, release_date, poster_path, backdrop_path)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"#,
                response.imdb_id,
                body.tmdb_id,
                response.title,
                response.original_language,
                response.original_title,
                response.overview,
                response.release_date,
                response.poster_path,
                response.backdrop_path
            )
            .fetch_one(&data.db)
            .await
            .unwrap();

            let json_response = serde_json::json!({
                "status": "success",
                "movie": movie,
            });

            Ok(web::Json(json_response))
        }
        Err(err) => match err.kind() {
            io::ErrorKind::NotFound => Err(actix_web::error::ErrorNotFound(
                serde_json::json!({"status": "error",
                    "message": "Requested movie id not found on TMDb",}),
            )),
            _ => Err(actix_web::error::ErrorInternalServerError(
                serde_json::json!({"status": "error",
                    "message": format!("Failed to fetch movie details: {}", err)
                }),
            )),
        },
    }
}

pub fn config(cfg: &mut web::ServiceConfig) {
    let scope = web::scope("/api")
        .service(movies_list_handler)
        .service(movies_add_handler);

    cfg.service(scope);
}

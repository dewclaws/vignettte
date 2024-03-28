use actix_web::{http::StatusCode, web, HttpResponse};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::{
    external::tmdb::TMDbClient,
    models::{error::ApiError, movie::Movie},
};

pub fn config(cfg: &mut actix_web::web::ServiceConfig) {
    cfg.route("movies", web::post().to(add_movie));
}

#[derive(Serialize, Deserialize, Clone)]
pub struct AddMovieData {
    pub tmdb_id: i32,
}

#[derive(thiserror::Error, Debug)]
pub enum AddMovieError {
    #[error("Movie not found on TMDb")]
    NotFoundError,
    #[error("Problem with external request")]
    ExternalError(#[from] reqwest::Error),
}

impl actix_web::ResponseError for AddMovieError {
    fn status_code(&self) -> StatusCode {
        match self {
            AddMovieError::NotFoundError => StatusCode::NOT_FOUND,
            AddMovieError::ExternalError(..) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code()).json(ApiError {
            error: match self {
                AddMovieError::NotFoundError => "movie_not_found",
                AddMovieError::ExternalError(..) => "external_request_error",
            },
            description: self.to_string(),
        })
    }
}

pub async fn add_movie(
    new_movie: web::Form<AddMovieData>,
    tmdb: web::Data<TMDbClient>,
    db: web::Data<PgPool>,
) -> Result<HttpResponse, AddMovieError> {
    match tmdb.fetch_movie_details(new_movie.tmdb_id).await {
        // Currently this only handles TMDb as a source
        // Would like to refactor for more in future
        Ok(response) => {
            let movie = sqlx::query_as!(
                Movie,
                r#"INSERT INTO movies (imdb_id, tmdb_id, title, original_language, original_title, synopsis, release_date, poster_path, backdrop_path)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"#,
                response.imdb_id,
                response.id,
                response.title,
                response.original_language,
                response.original_title,
                response.overview,
                response.release_date,
                response.poster_path,
                response.backdrop_path
            )
            .fetch_one(&**db)
            .await
            .unwrap();

            Ok(HttpResponse::Ok().json(movie))
        }
        Err(err) => match err.status() {
            Some(reqwest::StatusCode::NOT_FOUND) => Err(AddMovieError::NotFoundError),
            _ => Err(AddMovieError::ExternalError(err)),
        },
    }
}

use actix_web::{web, HttpResponse};
use sqlx::PgPool;

use crate::{models::movie::Movie, routes::ApiError};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("movies", web::get().to(list_movies));
}

pub async fn list_movies(db: web::Data<PgPool>) -> Result<HttpResponse, ApiError> {
    let movies = sqlx::query_as!(Movie, r#"SELECT * FROM movies"#)
        .fetch_all(&**db)
        .await
        .unwrap();

    let movies_payload = serde_json::json!({
        "status": "success",
        "results": movies.len(),
        "movies": movies,
    });

    Ok(HttpResponse::Ok().json(movies_payload))
}

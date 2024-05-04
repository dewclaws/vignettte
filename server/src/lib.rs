mod auth;
mod handlers;

use std::sync::Arc;

use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue, Method,
    },
    Router,
};
use sqlx::{postgres::PgPoolOptions, Postgres};
use tower_http::cors::CorsLayer;

struct AppState {
    pg_pool: sqlx::Pool<Postgres>,
}
pub fn create_router(pg_pool: sqlx::Pool<Postgres>) -> Router {
    let shared_state = Arc::new(AppState { pg_pool });
    let cors = CorsLayer::new()
        .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
        .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
        .allow_credentials(true)
        .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    Router::new()
        .with_state(shared_state)
        .nest("/", handlers::api_router())
        .layer(cors)
}

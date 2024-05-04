mod auth;
mod handlers;

use std::sync::Arc;

use anyhow::{Context, Result};
use axum::{
    http::{
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue, Method,
    },
    Router,
};
use deadpool_redis::{Config, Runtime};
use sqlx::{postgres::PgPoolOptions, Postgres};
use tower_http::cors::CorsLayer;

struct AppState {
    pg_pool: sqlx::Pool<Postgres>,
}

pub async fn create_pg_pool() -> Result<sqlx::Pool<Postgres>> {
    let database_url = dotenvy::var("DATABASE_URL").context("DATABASE_URL must be set")?;
    let pool = PgPoolOptions::new()
        .max_connections(20)
        .connect(&database_url)
        .await
        .context("failed to connect to database")?;

    sqlx::migrate!().run(&pool).await?;

    Ok(pool)
}

pub async fn create_redis_pool() -> Result<deadpool_redis::Pool> {
    let redis_url = dotenvy::var("REDIS_URL").context("REDIS_URL must be set")?;
    let cfg = Config::from_url(redis_url);
    let pool = cfg.create_pool(Some(Runtime::Tokio1)).unwrap();

    Ok(pool)
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

use anyhow::{Context, Result};
use sqlx::{postgres::PgPoolOptions, Pool, Postgres};

pub async fn create_pool() -> Result<Pool<Postgres>> {
    let database_url = dotenvy::var("DATABASE_URL").context("DATABASE_URL must be set")?;

    let pool = PgPoolOptions::new()
        .max_connections(20)
        .connect(&database_url)
        .await
        .context("failed to connect to database")?;

    sqlx::migrate!().run(&pool).await?;

    return Ok(pool);
}

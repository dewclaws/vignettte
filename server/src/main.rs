use vignettte::{create_pg_pool, create_redis_pool, create_router};

use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    let pg_pool = create_pg_pool().await?;
    let redis_pool = create_redis_pool().await?;
    let app = create_router(pool);

    println!("vignettte is running ...");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    let server = axum::serve(listener, app).await?;

    Ok(server)
}

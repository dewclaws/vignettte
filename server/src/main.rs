mod database;

use anyhow::Result;
use database::create_pool;
use vignettte::create_router;

#[tokio::main]
async fn main() -> Result<()> {
    let pool = create_pool().await?;
    let app = create_router(pool);

    println!("Vignettte is running ...");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    let server = axum::serve(listener, app).await?;

    Ok(server)
}

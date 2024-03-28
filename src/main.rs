mod database;
mod organizer;

use actix_web::{App, HttpServer};
use dotenvy::dotenv;
use tracing::{info, Level};
use vignettte::{external::tmdb::TMDbClient, VignettteConfig};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    tracing_subscriber::fmt()
        .compact()
        .with_max_level(Level::INFO)
        .init();

    info!(
        "Vignettte is starting up on {}",
        dotenvy::var("BIND_ADDR").unwrap()
    );

    database::migrate()
        .await
        .expect("Failed to apply database migrations!");

    let db_pool = database::connect()
        .await
        .expect("Failed to connect to database!");

    let vttt_config = VignettteConfig {
        db_pool: db_pool.clone(),
        tmdb_client: TMDbClient::new(),
    };

    HttpServer::new(move || {
        App::new().configure(|cfg| vignettte::app_config(cfg, vttt_config.clone()))
    })
    .bind(dotenvy::var("BIND_ADDR").unwrap())?
    .run()
    .await
}

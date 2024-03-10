mod data;
mod external;
mod handler;

use actix_cors::Cors;
use actix_web::{http::header, middleware::Logger, web, App, HttpServer};
use dotenvy::dotenv;
use sqlx::postgres::PgPoolOptions;

use crate::{data::AppState, external::tmdb::TMDbClient};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    // Init logger
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    // Parse DATABASE_URL from environment vars
    let db_url = dotenvy::var("DATABASE_URL").expect("DATABASE_URL is not set");

    // Establish db connection, and wrap it in a web::Data (Arc<>)
    log::info!("Attempting to connect to database at {}", db_url);
    let db_pool = match PgPoolOptions::new()
        .max_connections(20)
        .connect(&db_url)
        .await
    {
        Ok(pool) => {
            log::info!("Database connection successful");
            pool
        }
        Err(err) => {
            log::error!("Failed to connect to database: {:?}", err);
            std::process::exit(1);
        }
    };

    // Start web server
    log::info!("Vignettte backend starting up at http://localhost:3030");
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost")
            .allowed_origin("http://localhost/")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![
                header::CONTENT_TYPE,
                header::AUTHORIZATION,
                header::ACCEPT,
            ])
            .supports_credentials();

        App::new()
            .app_data(web::Data::new(AppState {
                db: db_pool.clone(),
                tmdb: TMDbClient::new(),
            }))
            .configure(handler::config)
            .wrap(cors)
            .wrap(Logger::default())
    })
    .bind(("127.0.0.1", 3030))?
    .run()
    .await
}

mod database;
mod external;
mod handler;

use actix_cors::Cors;
use actix_web::{http::header, middleware::Logger, web, App, HttpServer};
use dotenvy::dotenv;
use sqlx::PgPool;

use crate::external::tmdb::TMDbClient;

struct AppState {
    pub db: PgPool,
    pub tmdb: TMDbClient,
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    database::migrate()
        .await
        .expect("Failed to apply database migrations!");

    let db_pool = database::connect()
        .await
        .expect("Failed to connect to database!");

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

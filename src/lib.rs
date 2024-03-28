use actix_cors::Cors;
use actix_web::web;
use external::tmdb::TMDbClient;
use sqlx::Postgres;

pub mod external;
pub mod models;
pub mod routes;

#[derive(Clone)]
pub struct VignettteConfig {
    pub db_pool: sqlx::Pool<Postgres>,
    pub tmdb_client: TMDbClient,
}

pub fn default_cors() -> Cors {
    Cors::default()
        .allowed_origin("http://localhost")
        .allowed_origin("http://localhost/")
        .allow_any_method()
        .allow_any_header()
        .max_age(3600)
}

pub fn app_config(cfg: &mut web::ServiceConfig, vttt_config: VignettteConfig) {
    cfg.app_data(web::Data::new(vttt_config.db_pool.clone()))
        .app_data(web::Data::new(vttt_config.tmdb_client.clone()))
        .configure(routes::router_config)
        .default_service(web::get().wrap(default_cors()).to(routes::not_found));
}

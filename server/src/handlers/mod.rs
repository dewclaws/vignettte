mod auth;
mod ping;

use axum::{routing::get, Router};

use self::{auth::auth_router, ping::ping_handler};

pub fn api_router() -> Router {
    Router::new()
        .route("/ping", get(ping_handler))
        .nest("/auth", auth_router())
}

use crate::handlers::ping;

use axum::{routing::get, Router};

pub fn create_router() -> Router {
    Router::new().route("/api/ping", get(ping))
}

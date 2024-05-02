use axum::{response::IntoResponse, Json};
use serde_json::json;

pub async fn ping() -> impl IntoResponse {
    Json(json!({
        "status": "success",
        "message": "PONG",
        "application": env!("CARGO_PKG_NAME"),
        "version": env!("CARGO_PKG_VERSION"),
    }))
}

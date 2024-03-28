use crate::models::error::ApiError;
use actix_web::{HttpResponse, Responder};

pub async fn not_found() -> impl Responder {
    let payload = ApiError {
        error: "not_found",
        description: "The requested route does not exist on this server".to_string(),
    };

    HttpResponse::NotFound().json(payload)
}

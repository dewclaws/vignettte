mod add_movie;
mod movies;
mod not_found;

use crate::default_cors;
use actix_web::{http::StatusCode, web, HttpResponse};

pub use self::not_found::not_found;

pub fn router_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("api")
            .wrap(default_cors())
            .configure(movies::config)
            .configure(add_movie::config),
    );
}

#[derive(thiserror::Error, Debug)]
pub enum ApiError {
    #[error("Resource not found")]
    NotFound,
}

impl ApiError {
    pub fn as_api_error<'a>(&self) -> crate::models::error::ApiError<'a> {
        crate::models::error::ApiError {
            error: match self {
                ApiError::NotFound => "not_found",
            },
            description: self.to_string(),
        }
    }
}

impl actix_web::ResponseError for ApiError {
    fn status_code(&self) -> StatusCode {
        match self {
            ApiError::NotFound => StatusCode::NOT_FOUND,
        }
    }

    fn error_response(&self) -> HttpResponse {
        HttpResponse::build(self.status_code()).json(self.as_api_error())
    }
}

use axum::{extract::Query, response::IntoResponse, routing::get, Router};

pub fn auth_router() -> Router {
    Router::new().route("/plex", get(plex_authenticator))
}

struct ClientId {
    cid: String,
}

pub fn plex_authenticator(client_id: Option<Query<ClientId>>) -> impl IntoResponse {
    match client_id {
        Some(Query(client_id)) => {}
        None => {}
    }
}

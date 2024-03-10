use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use std::io;

use reqwest::Client;

static API_KEY: &str = "619fef183328c4154553ec9f968ac7f6";
static BASE_URL: &str = "https://api.themoviedb.org/3";

pub struct TMDbClient {
    http_client: Client,
    base_url: String,
    api_key: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TMDbMovie {
    pub id: i32,
    pub imdb_id: String,
    pub title: String,
    pub original_language: String,
    pub original_title: String,
    pub overview: String,
    pub release_date: NaiveDate,
    pub poster_path: String,
    pub backdrop_path: String,
}

impl TMDbClient {
    pub fn new() -> Self {
        Self {
            http_client: Client::new(),
            base_url: BASE_URL.to_string(),
            api_key: API_KEY.to_string(),
        }
    }

    pub async fn fetch_movie_details(&self, tmdb_id: i32) -> Result<TMDbMovie, io::Error> {
        let response = self
            .http_client
            .get(&format!(
                "{}/movie/{}?api_key={}",
                self.base_url, tmdb_id, self.api_key
            ))
            .send()
            .await
            .expect("TMDb client failed to make request for fetch_movie_details()")
            .error_for_status();

        match response {
            Ok(res) => res
                .json()
                .await
                .map_err(|err| io::Error::new(io::ErrorKind::InvalidData, err)),
            Err(err) => Err(io::Error::new(io::ErrorKind::NotFound, err)),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_movie_details() {
        let mut server = mockito::Server::new_async().await;
        let client = TMDbClient {
            http_client: Client::new(),
            base_url: server.url().to_string(),
            api_key: API_KEY.to_string(),
        };

        server
            .mock(
                "GET",
                mockito::Matcher::Regex(r"^/movie/[0-9]{1,6}$".to_string()),
            ) // /movie/{movie_id}
            .match_query(mockito::Matcher::UrlEncoded(
                "api_key".into(),
                client.api_key.clone().into(),
            )) // ?api_key={api_key}
            .with_header("content-type", "application/json")
            .with_body(
                r#"{
                "id": 123456,
                "imdb_id": "tt1234567",
                "title": "Test Movie",
                "original_language": "en",
                "original_title": "Test Movie",
                "overview": "This is a test movie",
                "release_date": "2021-01-01",
                "adult": "false",
                "backdrop_path": "foo.jpg",
                "poster_path": "bar.jpg"
            }"#,
            )
            .create_async()
            .await;

        let response = client.fetch_movie_details(123456).await;
        assert!(response.is_ok() && response.unwrap().id == 123456);
    }
}

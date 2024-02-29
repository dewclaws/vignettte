use reqwest::Error;
use serde::Deserialize;

use super::SabnzbdClient;

// Deserialization wrapper since sabnzbd returns a top-level "status" object
#[derive(Deserialize)]
struct Response {
    status: Status,
}

#[derive(Debug, Deserialize)]
pub struct Status {
    pub uptime: String,
    pub version: String,
}

impl SabnzbdClient {
    pub async fn get_status(&self) -> Result<Status, Error> {
        let url = self.build_url("status", vec![("skip_dashboard", "1")]);
        let response: Response = self.client.get(&url).send().await?.json().await?;

        Ok(response.status)
    }
}

#[cfg(test)]
mod tests {
    use super::super::test_client::CLIENT;

    #[tokio::test]
    async fn test_get_status() {
        let status = CLIENT.lock().unwrap().get_status().await;

        assert!(status.is_ok(), "Failed to get status from sabnzbd. Is the container running?");
    }
}
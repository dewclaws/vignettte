use reqwest::Error;
use serde::Deserialize;

use crate::sabnzbd::SabnzbdClient;
use super::SabnzbdResponse;

#[derive(Debug, Deserialize)]
pub struct Status {
    pub uptime: String,
    pub version: String,
}

impl SabnzbdClient {
    pub async fn get_status(&self) -> Result<SabnzbdResponse<Status>, Error> {
        let url = self.build_url("status", vec![("skip_dashboard", "1")]);
        let response: SabnzbdResponse<Status> = self.client.get(&url).send().await?.json().await?;

        Ok(response)
    }
}

#[cfg(test)]
mod tests {
    use crate::sabnzbd::test_client::CLIENT;

    #[tokio::test]
    async fn test_get_status() {
        let status = CLIENT.lock().unwrap().get_status().await;

        assert!(status.is_ok(), "Failed to get status from sabnzbd. Is the container running?");
    }
}
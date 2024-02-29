use reqwest::Error;
use serde::Deserialize;

use super::SabnzbdClient;

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

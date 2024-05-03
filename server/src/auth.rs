use anyhow::Result;
use serde::Deserialize;
use uuid::Uuid;

pub struct PlexAuthCredentials {
    client_id: String,
    pin: PlexAuthPin,
}

#[derive(Deserialize)]
struct PlexAuthPin {
    id: u64,
    code: String,
}

impl PlexAuthCredentials {
    pub async fn generate() -> Result<Self> {
        let client = reqwest::Client::new();
        let client_id = String::from(Uuid::new_v4());
        let params = [
            ("strong", "true"),
            ("X-Plex-Product", env!("CARGO_PKG_NAME")),
            ("X-Plex-Client-Identifier", client_id.as_str()),
        ];
        let res = client
            .post("https://plex.tv/api/v2/pins")
            .header("Accept", "application/json")
            .form(&params)
            .send()
            .await?
            .json::<PlexAuthPin>()
            .await?;

        Ok(Self {
            client_id,
            pin: res,
        })
    }
}

#[cfg(test)]
mod tests {
    use regex::Regex;

    use super::*;

    #[tokio::test]
    async fn should_generate_client_id() {
        let creds = PlexAuthCredentials::generate().await.unwrap();
        let uuid_re = Regex::new(r"^[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12}$").unwrap();

        assert!(uuid_re.is_match(creds.client_id.as_str()));
    }

    #[tokio::test]
    async fn should_fetch_plex_pin() {
        let creds = PlexAuthCredentials::generate().await.unwrap();
        let pin_code_re = Regex::new(r"^[0-9A-Za-z]{25}$").unwrap();

        assert!(creds.pin.id > 0);
        assert!(pin_code_re.is_match(creds.pin.code.as_str()));
    }
}

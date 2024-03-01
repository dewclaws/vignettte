mod resources;

pub struct SabnzbdClient {
    host: String,
    port: u16,
    key: String,
    client: reqwest::Client,
}

impl SabnzbdClient {
    pub fn new(host: &str, port: u16, key: &str) -> Self {
        let client = reqwest::Client::builder()
            .danger_accept_invalid_certs(true)
            .build()
            .unwrap();

        SabnzbdClient {
            host: host.to_string(),
            port,
            key: key.to_string(),
            client,
        }
    }

    fn build_url(&self, mode: &str, params: Vec<(&str, &str)>) -> String {
        let mut url = format!(
            "http://{}:{}/sabnzbd/api?apikey={}&output=json&mode={}",
            self.host, self.port, self.key, mode
        );

        for (key, value) in params {
            url.push_str(&format!("&{}={}", key, value));
        }

        url
    }
}

// A client singleton for testing purposes
#[cfg(test)]
pub mod test_client {
    use ini::Ini;
    use once_cell::sync::Lazy;
    use std::{path::Path, sync::Mutex};

    use super::*;

    pub static CLIENT: Lazy<Mutex<SabnzbdClient>> = Lazy::new(|| {
        let api_key = {
            let config = match Ini::load_from_file(Path::new(".container-data/sabnzbd/sabnzbd.ini")) {
                Ok(config) => config,
                Err(_) => panic!(
                    "sabnzbd.ini not found; `.container-data/` may not exist. Try `docker-compose up`."
                ),
            };
    
            config
                .section(Some("misc"))
                .unwrap()
                .get("api_key")
                .unwrap()
                .to_owned()
        };
    
        Mutex::new(SabnzbdClient::new("0.0.0.0", 10000, &api_key))
    });
}
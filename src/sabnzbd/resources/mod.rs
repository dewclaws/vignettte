pub mod status;

use std::ops::Deref;

use serde::{Deserialize, Deserializer};
use serde_json::Value;

#[derive(Debug)]
pub struct SabnzbdResponse<T> {
    response: T,
}

// Sabnzbd returns a top-level json object with the name of the mode being called
// That means I have to write a whole deserializer to flatten that out into a cleaner struct
// Thanks, y'all.
fn flatten_response<'de, T, D>(deserializer: D) -> Result<T, D::Error>
where
    T: Deserialize<'de>,
    D: Deserializer<'de>,
{
    let value = Value::deserialize(deserializer)?;

    match value {
        Value::Object(mut map) => {
            let keys: Vec<_> = map.keys().cloned().collect();

            if let Some(response_value) = map.remove(&keys[0]) {
                T::deserialize(response_value).map_err(serde::de::Error::custom)
            } else {
                Err(serde::de::Error::custom("Missing Sabnzbd response key"))
            }
        }
        _ => Err(serde::de::Error::custom("Invalid Sabnzbd response")),
    }
}

impl<'de, T> Deserialize<'de> for SabnzbdResponse<T>
where
    T: Deserialize<'de>,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Ok(Self {
            response: flatten_response(deserializer)?,
        })
    }
}

impl<T> Deref for SabnzbdResponse<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.response
    }
}
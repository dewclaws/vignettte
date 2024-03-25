use convert_case::{Case, Casing};
use regex::Regex;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

#[derive(Serialize, Deserialize)]
struct Movie<'a> {
    title: &'a str,
    year: u16,
    imdb_id: &'a str,
    tmdb_id: u32,
    quality: &'a str,
}

struct Renamer<'a> {
    movie: &'a Movie<'a>,
}

impl<'a> Renamer<'a> {
    pub fn new(movie: &'a Movie) -> Self {
        Renamer { movie }
    }

    // i'm a fucking genious
    pub fn format_with(&self, template: &str) -> String {
        let mut result = String::from(template);
        let re = Regex::new(r"\{(\w+)(?:\[(\w+(?:,\w+)*)\])?\}").unwrap();
        let fields: HashMap<String, Value> =
            serde_json::from_value(serde_json::to_value(self.movie).unwrap()).unwrap();

        result = re
            .replace_all(&result, |caps: &regex::Captures| {
                let key = caps.get(1).map_or("", |m| m.as_str());
                let mods = caps.get(2).map_or("", |m| m.as_str());

                if let Some(value) = fields.get(key) {
                    let value = match value {
                        Value::String(s) => s.to_owned(),
                        _ => value.to_string(),
                    };

                    Self::parse_mods(mods.split(',').collect::<Vec<_>>().as_slice(), &value)
                } else {
                    format!("{{{}}}", key)
                }
            })
            .to_string();
        result
    }

    fn parse_mods(mods: &[&str], value: &str) -> String {
        let mut output = String::from(value);
        let cleaner = Regex::new(r"[,<>\\/;:'|~!?@$%^*-=]").unwrap();

        for &opt in mods {
            match opt {
                "upper" => output = output.to_uppercase(),
                "lower" => output = output.to_lowercase(),
                "title" => output = output.to_case(Case::Title),
                "dot" => output = output.replace(' ', "."),
                "dash" => output = output.replace(' ', "-"),
                "under" => output = output.replace(' ', "_"),
                "clean" => {
                    output = output.replace('&', "and");
                    output = output.replace('/', "`");
                    output = output.replace('\\', "`");
                    output = cleaner.replace_all(&output, "").to_string();
                }
                _ => {}
            }
        }
        output
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use lazy_static::lazy_static;

    lazy_static! {
        static ref RENAMER: Renamer<'static> = Renamer::new(&Movie {
            title: "Anatomy of a Fall",
            year: 2023,
            imdb_id: "tt17009710",
            tmdb_id: 915935,
            quality: "BluRay-1080p"
        });
    }

    #[test]
    fn test_format() {
        assert_eq!(
            RENAMER.format_with("{title[upper,dot]}.{year}.imdb:{imdb_id}.{quality[lower]}"),
            "ANATOMY.OF.A.FALL.2023.imdb:tt17009710.bluray-1080p"
        );
    }

    #[test]
    fn test_invalid_syntax() {
        assert_eq!(RENAMER.format_with("{title.} year}"), "{title.} year}");

        // this one has an invalid mod which the parser shouldn't recognize
        // it should still output the value regardless; the key was valid anyway
        assert_eq!(
            RENAMER.format_with("{title[invalid_mod]}"),
            "Anatomy of a Fall"
        );
    }

    #[test]
    fn test_transformer_clean() {
        let renamer = Renamer::new(&Movie {
            title: "Dune:: /Part Two\\",
            year: 2024,
            imdb_id: "tt15239678",
            tmdb_id: 693134,
            quality: "BluRay-1080p",
        });

        assert_eq!(
            renamer.format_with("{title[clean]} ({year})"),
            "Dune `Part Two` (2024)"
        )
    }

    #[test]
    fn test_transformer_chaining() {
        assert_eq!(
            RENAMER.format_with("{title[upper,dot]} ({year})"),
            "ANATOMY.OF.A.FALL (2023)"
        )
    }

    #[test]
    fn test_transform_chain_order() {
        // mods should be applied as a stack
        assert_eq!(
            RENAMER.format_with("{title[lower,upper]} ({year})"),
            "ANATOMY OF A FALL (2023)"
        )
    }
}

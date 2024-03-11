# vignettte
#### A smarter media automator for bittorrent and usenet

Searches for, downloads, unpacks, and organizes your media collection.

Give it a movie title and it'll find it. Built in Rust to be efficient about it.

## Development setup

#### Requirements

- Rust (2021)
    - [Toolchain installer](https://rustup.rs/)
- Docker Compose
- [sqlx-cli](https://lib.rs/crates/sqlx-cli)

#### Building for development

1. Spin up the development database using the included `docker-compose.yml`.
2. Create a `.env` in the crate's root directory.
   A connection string for the development database is provided below.

    ```env
    DATABASE_URL=postgres://development:vignettte-dev@localhost:10001/vignettte
    ```
3. Using `sqlx-cli`, run migrations before compiling the crate.
   
   ```bash
   $ sqlx database setup
   ```

#### Testing

```bash
$ cargo test
```
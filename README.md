# vignettte
#### A smarter media automator for bittorrent and usenet

Searches for, downloads, unpacks, and organizes your media collection.

Give it a movie title and it'll find it. Built in Rust to be efficient about it.

## Development setup

#### Requirements

- [Rust](https://rustup.rs) (2021)
- [Docker Compose](https://docs.docker.com/get-docker/)
- [sqlx-cli](https://lib.rs/crates/sqlx-cli)

#### Caching SQLx queries

This project makes use of compile-time checked queries, a feature in SQLx.

Whenever you make changes to code handling queries, you must prepare
cached versions of them so that SQLx doesn't raise errors while compiling.

```bash
$ cargo sqlx prepare
```

#### Running

1. Spin up the development database using the included `docker-compose.yml`.
2. Copy `.env.example` into `.env`.
3. Use `sqlx-cli` to run migrations before running the crate:

    ```bash
    $ cargo sqlx database setup
    ```

4. Run the crate as normal:

    ```bash
    $ cargo run
    ```

#### Testing

```bash
$ cargo test
```

#### Compiling

```bash
$ cargo build
```
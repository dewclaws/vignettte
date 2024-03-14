use std::time::Duration;

use dotenvy::var;
use log::{debug, info};
use sqlx::{
    migrate::MigrateDatabase, postgres::PgPoolOptions, Connection, PgConnection, PgPool, Postgres,
};

pub async fn connect() -> Result<PgPool, sqlx::Error> {
    let conn_string = var("DATABASE_URL").expect("`DATABASE_URL` isn't set in environent!");

    info!("Establishing database connection...");
    debug!("Database connection string: {}", conn_string);

    let db_pool = PgPoolOptions::new()
        .max_connections(20)
        .max_lifetime(Some(Duration::from_secs(60 * 60)))
        .connect(&conn_string)
        .await?;

    Ok(db_pool)
}

pub async fn migrate() -> Result<(), sqlx::Error> {
    let conn_string = var("DATABASE_URL").expect("`DATABASE_URL` isn't set in environment!");
    let conn_string = conn_string.as_str();

    if !Postgres::database_exists(conn_string).await? {
        info!("Database doesn't exist; creating it...");

        Postgres::create_database(conn_string).await?
    }

    info!("Applying database migrations...");

    let mut conn: PgConnection = PgConnection::connect(conn_string).await?;

    sqlx::migrate!()
        .run(&mut conn)
        .await
        .expect("There was a problem running database migrations!");

    Ok(())
}

import database from "infra/database.js";

async function status(req, res) {
  // Update time
  const updatedAt = new Date().toISOString();

  // Query version POSTGRES - Expected 16.6
  const queryPgVersionResult = await database.query("SHOW server_version;");
  const versionPgValue = queryPgVersionResult.rows[0].server_version;

  // Get the max number off supported connections
  const queryMaxConnectionResult = await database.query(
    "SHOW MAX_CONNECTIONS;",
  );
  const maxConnectionValue = parseInt(
    queryMaxConnectionResult.rows[0].max_connections,
  );

  // Get the number of active users
  const databaseName = process.env.POSTGRES_DB;
  const queryPgUserActivesResult = await database.query({
    text: "select count(*)::int from pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const userActivesValue = queryPgUserActivesResult.rows[0].count;

  // Response
  res.status(200).json({
    updated_at: updatedAt,
    dependecies: {
      database: {
        version_pg: versionPgValue,
        max_connections: maxConnectionValue,
        user_connected: userActivesValue,
      },
    },
  });
}

export default status;

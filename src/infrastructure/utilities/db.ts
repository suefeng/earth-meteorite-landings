const mysql = require("mysql2/promise");
const env = process.env;

const config = {
  db: {
    host: "127.0.0.1",
    port: 3306,
    database: "meteorites",
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    socketPath: env.SOCKET_PATH,
  },
};

export async function executeQuery({
  query,
  values,
}: {
  query: string;
  values: string[];
}) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(query, values);
    const numResults = results !== null ? results.length : 0;

    await connection.end();

    return numResults === 1 ? results[0] : results;
  } catch (err: any) {
    console.error("catch err: " + err);

    throw err;
  }
}

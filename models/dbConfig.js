module.exports = () => {
  const assert = require("assert");
  require("dotenv").config();

  const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;

  const sqlEncrypt = process.env.SQL_ENCRYPT === "true";

  assert(SQL_SERVER, "SQL_SERVER configuration is required.");
  assert(SQL_DATABASE, "SQL_DATABASE configuration is required.");
  assert(SQL_USER, "SQL_USER configuration is required.");
  assert(SQL_PASSWORD, "SQL_PASSWORD configuration is required.");

  const sqlConfig = {
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_USER,
    password: SQL_PASSWORD,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: sqlEncrypt,
      trustServerCertificate: true,
      trustedconnection: true,
      enableArithAbort: true,
    },
  };

  return sqlConfig;
};

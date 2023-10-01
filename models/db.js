const sql = require("mssql");
const config = require("./dbConfig");
const debug = require("debug")("dexpressapi:server");

const connectionPool = new sql.ConnectionPool(config())
  .connect()
  .catch(err => debug('Database Connection Failed!',err))
  .then(pool =>{
    debug('Database Connection Succeeded!');
    return pool;
  });

  module.exports = {
    mssql: sql,
    connectionPool,
  };

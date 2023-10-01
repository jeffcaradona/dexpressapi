const debug = require("debug")("dexpressapi:server");
const { connectionPool, mssql } = require("./db");

exports.selectKeys = async (key) => {
  debug("IN dexpress.execTally(params)");
  let data = {};

  const strWhereClause = (key)?`WHERE [key] = @key`:'';

  try {
    const connection = await connectionPool;
    const result = await connection
      .request()
      .input('key',mssql.VarChar,key)
      .query(
        `SELECT [key],[utc_ts] FROM [dbo].[VOURDATA] ${strWhereClause} GROUP BY [key], [utc_ts] ORDER BY [utc_ts] DESC`
      );
    debug(result);

    data["qryKeys"] = result.recordset;
    data["returnValue"] = result.returnValue;

    return data;
  } catch (error) {
    debug(error);
    return error;
  }
};


exports.execTally = async (params) => {
  debug("IN dexpress.execTally(params)");
  let data = {};
  try {
    const connection = await connectionPool;
    const result = await connection
      .request()
      .input("ZeroOrOne", mssql.TinyInt, params.ZeroOrOne)
      .input("MaxN", mssql.BigInt, params.MaxN)
      .execute("dbo.spTally");
    debug(result);

    data["qryTally"] = result.recordset;
    data["returnValue"] = result.returnValue;

    return data;
  } catch (error) {
    debug(error);
    return error;
  }
};

const debug = require("debug")("dexpressapi:server");
const { connectionPool, mssql } = require("./db");



exports.selectKeys = async (key) => {
  debug("IN dexpress.execTally(params)");
  let data = {};
  data["qryKeys"] = {};
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
    
    data["qryKeys"].recordset = result.recordset;
    data["qryKeys"].returnValue = result.returnValue;

    return data;

  } catch (error) {
    debug(error);
      data["qryKeys"].recordset = [];
      data["qryKeys"].error = error.message;
      data["qryKeys"].returnValue = 1;
    return data;
  }
};


exports.execTally = async (params) => {
  debug("IN dexpress.execTally(params)");
  let data = {};
  data["qryTally"] = {};
  try {
    const connection = await connectionPool;
    const result = await connection
      .request()
      .input("ZeroOrOne", mssql.TinyInt, params.ZeroOrOne)
      .input("MaxN", mssql.BigInt, params.MaxN)
      .execute("dbo.spTally");
    debug(result);
    
    data["qryTally"].recordset = result.recordset;
    data["qryTally"].returnValue = result.returnValue;

    return data;
  } catch (error) {
    debug(error);
    
    data["qryTally"].recordset = [];
    data["qryTally"].error = error.message;
    data["qryTally"].returnValue = 1;
    return data;
  }
};

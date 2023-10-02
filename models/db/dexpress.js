const debug = require("debug")("dexpressapi:server");
const { connectionPool, mssql } = require("./db");
const utils = require('./utils');

const connection = connectionPool;

exports.execThreeRecordSets = async()=>{
  debug("IN dexpress.execThreeRecordSets()");

  let output = {};  
  output.rsList = ["qryRptElementA", "qryRptElementB", "qryRptElementC"];
  output.name = "execThreeRecordSets";
  output.recordsets = {};
  try {
    const connection = await connectionPool;
    const result = await connection
      .request()
      .execute("dbo.spThreeRecordSets");    

    output.recordsets = utils.AssignQueryLabels(
      result.recordsets,
      output.rsList
    );
    output.returnValue = result.returnValue; 

    return output;
  } catch(error) {
    debug(error);
    output.error = error.message;
    output.returnValue = 1;
    return output;
  }
  

};


exports.selectKeys = async (key) => {
  debug("IN dexpress.execTally(params)");
  
  let output = {};
  output.name = "selectKeys";
  output.rsList = "qryKeys";
  output.recordsets = {};
  output.recordsets[output.rsList] = [];
  
  try {
    const connection = await connectionPool;
    
    // TODO - Build 
    const result = await connection
      .request()
      .input("key", mssql.VarChar, key)
      .query(
        `SELECT [key],[utc_ts] FROM [dbo].[VOURDATA] GROUP BY [key], [utc_ts] ORDER BY [utc_ts] DESC`
      );
    
    output.recordsets["qryKeys"] = result.recordset;
    output.returnValue = 0; //returnValue is manual for queries

    return output;
  } catch (error) {
    debug(error);      
      output.error = error.message;
      output.returnValue = 1;
    return output;
  }
};


exports.execTally = async (params) => {
  debug("IN dexpress.execTally(params)");
  let output = {};
  output.name = "execTally";
  output.recordsets = {};
  output.rsList = "qryTally";

  output.recordsets[output.rsList] = [];

  try {
    const connection = await connectionPool;
    const result = await connection
      .request()
      .input("ZeroOrOne", mssql.TinyInt, params.ZeroOrOne)
      .input("MaxN", mssql.BigInt, params.MaxN)
      .execute("dbo.spTally");        

    output.recordsets["qryTally"] = result.recordset;
    output.returnValue = result.returnValue;
    return output;
  } catch (error) {
    debug(error);
        
    output.error = error.message;
    output.returnValue = 1;
    return output;
  }
};


const debug = require("debug")("dexpressapi:server");
const { connectionPool, mssql } = require("./db");




exports.execTally = async (params) => {
   debug('IN dexpress.execTally(params)');      
   let data = {};
   try {
        const connection = await connectionPool;
        const result = await connection.request()
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
   
}